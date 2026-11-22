#!/usr/bin/env node
// Technical SEO checks (no dependencies).
//
//   npm run seo:check              builds if needed, starts `next start` on a free
//                                  port, crawls the sitemap, stops the server
//   npm run seo:check -- --build   always rebuild first
//   BASE_URL=https://preview.example.com npm run seo:check   check a running site
//
// For every URL in /sitemap.xml: HTTP 200, unique <title> (fail <30 or >70
// chars, warn outside 50–60), unique meta description (fail outside 70–170,
// warn outside 140–158), self-canonical on the production host, hreflang
// present with x-default and reciprocal, index/follow, Open Graph + Twitter
// card with a 1200×630 PNG image, exactly one <h1>, no skipped heading
// levels, alt on every <img>, JSON-LD that parses and has valid shapes
// (FAQPage, HowTo, SoftwareApplication, BreadcrumbList, BlogPosting,
// Organization…), BreadcrumbList on every non-home page, and every internal
// link resolving with 200. Also robots.txt, 404 handling and redirects.

import { spawn, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import net from 'node:net';

const PROD = 'https://www.unfollowx.com';
const args = process.argv.slice(2);
let server = null;

async function freePort() {
  return new Promise((resolve) => {
    const srv = net.createServer();
    srv.listen(0, () => { const { port } = srv.address(); srv.close(() => resolve(port)); });
  });
}

async function startServer() {
  if (args.includes('--build') || !existsSync('.next/BUILD_ID')) {
    console.log('Building (next build)…');
    const build = spawnSync('npx', ['next', 'build'], { stdio: 'inherit' });
    if (build.status !== 0) process.exit(build.status || 1);
  }
  const port = await freePort();
  server = spawn('npx', ['next', 'start', '-p', String(port)], { stdio: ['ignore', 'pipe', 'pipe'], detached: true });
  const base = `http://localhost:${port}`;
  for (let i = 0; i < 120; i++) {
    try { const r = await fetch(`${base}/robots.txt`); if (r.ok) return base; } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error('next start did not come up');
}
const stopServer = () => { if (server) { try { process.kill(-server.pid); } catch {} server = null; } };
process.on('exit', stopServer);
process.on('SIGINT', () => { stopServer(); process.exit(130); });

const BASE = (process.env.BASE_URL || (await startServer())).replace(/\/$/, '');
console.log(`Checking ${BASE}\n`);

const failures = [];
const warnings = [];
const fail = (url, msg) => failures.push(`${url}: ${msg}`);
const warn = (url, msg) => warnings.push(`${url}: ${msg}`);
const toLocal = (url) => url.replace(PROD, BASE);
const norm = (url) => { try { return new URL(url).href; } catch { return url; } };
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const meta = (html, attr, name) => {
  const tag = html.match(new RegExp(`<meta[^>]+${attr}="${name}"[^>]*>`, 'i'))?.[0];
  return tag ? decode(tag.match(/content="([^"]*)"/i)?.[1] ?? '') : null;
};
const text = (html) => decode(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
async function get(url, opts = {}) {
  const res = await fetch(url, { redirect: 'manual', ...opts });
  const body = opts.method === 'HEAD' ? '' : await res.text();
  return { status: res.status, headers: res.headers, body };
}

// ---------- JSON-LD shape validation ----------
const types = (n) => [].concat(n['@type'] || []);
const need = (path, node, keys) => keys.forEach((k) => { if (node[k] === undefined || node[k] === '' || (Array.isArray(node[k]) && !node[k].length)) fail(path, `${types(node).join('/')} missing "${k}"`); });
function validateNode(path, node, pageText) {
  const t = types(node);
  if (!t.length) { fail(path, 'JSON-LD node without @type'); return; }
  if (t.includes('FAQPage')) {
    need(path, node, ['mainEntity']);
    for (const q of node.mainEntity || []) {
      if (q['@type'] !== 'Question' || !q.name || q.acceptedAnswer?.['@type'] !== 'Answer' || !q.acceptedAnswer?.text) fail(path, `FAQPage question malformed: ${q.name || '?'}`);
      else if (!pageText.includes(decode(q.name).replace(/\s+/g, ' '))) fail(path, `FAQ question not visible on page: "${q.name}"`);
    }
  }
  if (t.includes('HowTo')) {
    need(path, node, ['name', 'step']);
    (node.step || []).forEach((s, i) => { if (s['@type'] !== 'HowToStep' || !s.text) fail(path, `HowTo step ${i + 1} malformed`); });
  }
  if (t.includes('SoftwareApplication')) {
    need(path, node, ['name', 'operatingSystem', 'applicationCategory', 'offers']);
    if (node.offers && String(node.offers.price) !== '0') fail(path, 'SoftwareApplication offers.price should be "0"');
    if (node.aggregateRating) {
      const r = node.aggregateRating;
      if (!(r.ratingValue > 0 && r.ratingValue <= (r.bestRating || 5)) || !(r.ratingCount > 0)) fail(path, 'aggregateRating values invalid');
      // Google requires the rating to be visible on the same page.
      const value = Number(r.ratingValue).toFixed(1).replace('.', '\\.');
      const shown = new RegExp(`${value}\\s*/\\s*${r.bestRating || 5}`).test(pageText) && pageText.includes(`${r.ratingCount} ratings`);
      if (!shown) fail(path, `aggregateRating ${r.ratingValue} (${r.ratingCount}) is not shown visibly on the page`);
    }
  }
  if (t.includes('BreadcrumbList')) {
    need(path, node, ['itemListElement']);
    (node.itemListElement || []).forEach((it, i) => { if (it.position !== i + 1 || !it.name || !String(it.item || '').startsWith(PROD)) fail(path, `BreadcrumbList item ${i + 1} malformed`); });
  }
  if (t.includes('BlogPosting')) {
    need(path, node, ['headline', 'datePublished', 'dateModified', 'author', 'publisher', 'image']);
    if (node.headline?.length > 110) warn(path, `BlogPosting headline is ${node.headline.length} chars (Google truncates at 110)`);
  }
  if (t.includes('Organization')) need(path, node, ['name', 'url', 'logo']);
  if (t.includes('WebSite')) need(path, node, ['name', 'url']);
  if (t.includes('Person')) need(path, node, ['name']);
  if (/reviewCount|"review"/.test(JSON.stringify(node))) fail(path, 'JSON-LD contains reviews (none are published on this site)');
}

// ---------- crawl ----------
const sitemap = await get(`${BASE}/sitemap.xml`);
if (sitemap.status !== 200) { console.error('sitemap.xml not reachable at', BASE); process.exit(1); }
const urls = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urls.length) fail('/sitemap.xml', 'no URLs');
urls.forEach((u) => { if (!u.startsWith(PROD + '/')) fail('/sitemap.xml', `non-canonical URL ${u}`); });
if (!/<lastmod>/.test(sitemap.body)) fail('/sitemap.xml', 'no <lastmod> entries');

const titles = new Map();
const descriptions = new Map();
const hreflangs = new Map();
const internalLinks = new Set();
const ogImages = new Set();
const report = [];

for (const url of urls) {
  const path = new URL(toLocal(url)).pathname;
  const { status, body: html } = await get(toLocal(url));
  if (status !== 200) { fail(path, `HTTP ${status}`); continue; }
  const body = html.slice(html.indexOf('<body'));
  const pageText = text(body);

  const title = decode(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? '');
  if (!title) fail(path, 'missing <title>');
  else {
    if (title.length < 30 || title.length > 70) fail(path, `title is ${title.length} chars: "${title}"`);
    else if (title.length < 50 || title.length > 60) warn(path, `title is ${title.length} chars (target 50–60): "${title}"`);
    if (titles.has(title)) fail(path, `duplicate title (also ${titles.get(title)})`);
    titles.set(title, path);
  }
  const description = meta(html, 'name', 'description');
  if (!description) fail(path, 'missing meta description');
  else {
    if (description.length < 70 || description.length > 170) fail(path, `description is ${description.length} chars`);
    else if (description.length < 140 || description.length > 158) warn(path, `description is ${description.length} chars (target 140–158)`);
    if (descriptions.has(description)) fail(path, `duplicate description (also ${descriptions.get(description)})`);
    descriptions.set(description, path);
  }

  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1];
  if (norm(canonical) !== norm(url)) fail(path, `canonical "${canonical}" should be "${url}"`);
  const robots = meta(html, 'name', 'robots') || '';
  if (/noindex/i.test(robots)) fail(path, 'indexable page has noindex');
  if (!/index/i.test(robots) || !/follow/i.test(robots)) fail(path, `robots meta should be "index, follow" (got "${robots}")`);

  for (const [attr, name] of [['property', 'og:title'], ['property', 'og:description'], ['property', 'og:url'], ['property', 'og:image'], ['name', 'twitter:card'], ['name', 'twitter:image']]) {
    if (!meta(html, attr, name)) fail(path, `missing ${name}`);
  }
  if (meta(html, 'property', 'og:image:width') !== '1200' || meta(html, 'property', 'og:image:height') !== '630') fail(path, 'og:image is not declared as 1200×630');
  const ogImage = meta(html, 'property', 'og:image');
  if (ogImage) ogImages.add(ogImage);
  if (meta(html, 'property', 'og:url') && norm(meta(html, 'property', 'og:url')) !== norm(url)) fail(path, `og:url ≠ ${url}`);

  const alt = {};
  for (const m of html.matchAll(/<link[^>]+rel="alternate"[^>]+hrefLang="([^"]+)"[^>]+href="([^"]+)"/gi)) alt[m[1]] = m[2];
  for (const m of html.matchAll(/<link[^>]+rel="alternate"[^>]+href="([^"]+)"[^>]+hrefLang="([^"]+)"/gi)) alt[m[2]] = m[1];
  if (!Object.keys(alt).length) fail(path, 'no hreflang alternates');
  else hreflangs.set(url, alt);

  const h1s = body.match(/<h1[\s>]/gi) || [];
  if (h1s.length !== 1) fail(path, `${h1s.length} <h1> elements`);
  const levels = [...body.matchAll(/<h([1-6])[\s>]/gi)].map((m) => +m[1]);
  levels.forEach((lvl, i) => { if (i && lvl > levels[i - 1] + 1) warn(path, `heading jumps from h${levels[i - 1]} to h${lvl}`); });
  for (const img of body.match(/<img[^>]*>/gi) || []) {
    if (!/\salt="/i.test(img)) fail(path, `image without alt: ${img.slice(0, 90)}`);
    if (!/\swidth="/i.test(img) || !/\sheight="/i.test(img)) warn(path, `image without width/height: ${img.slice(0, 90)}`);
  }

  const schemaTypes = new Set();
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      const data = JSON.parse(m[1]);
      const nodes = (Array.isArray(data) ? data : [data]).flatMap((d) => d['@graph'] || [d]);
      nodes.forEach((n) => { types(n).forEach((t) => schemaTypes.add(t)); validateNode(path, n, pageText); });
    } catch (e) { fail(path, `invalid JSON-LD: ${e.message}`); }
  }
  if (path !== '/' && !/^\/(es|pt-br|hi|id|tr|ar)$/.test(path) && !schemaTypes.has('BreadcrumbList')) fail(path, 'no BreadcrumbList JSON-LD');
  if (path !== '/' && !/^\/(es|pt-br|hi|id|tr|ar)$/.test(path) && !/aria-label="Breadcrumb"/.test(body)) fail(path, 'no visible breadcrumb');

  for (const m of body.matchAll(/<a[^>]+href="([^"]+)"/gi)) {
    const href = decode(m[1]);
    if (href.startsWith('/') && !href.startsWith('//')) internalLinks.add(href.split('#')[0] || '/');
  }
  report.push({ path, title: title.length, description: description?.length ?? 0, schema: [...schemaTypes].sort().join(', ') });
}

// hreflang: every alternate must be in the sitemap and link back.
for (const [page, alt] of hreflangs) {
  const p = new URL(page).pathname;
  if (!alt['x-default']) fail(p, 'hreflang set has no x-default');
  for (const [lang, href] of Object.entries(alt)) {
    if (!urls.map(norm).includes(norm(href))) { fail(p, `hreflang ${lang} → ${href} is not in the sitemap`); continue; }
    const back = hreflangs.get(urls.find((u) => norm(u) === norm(href)));
    if (!back || !Object.values(back).map(norm).includes(norm(page))) fail(p, `hreflang ${lang} → ${href} does not link back`);
  }
}

// Internal links: no broken links, and no orphan sitemap pages.
for (const href of internalLinks) {
  const { status, headers } = await get(BASE + href);
  if (status === 308 || status === 301) warn(href, `internal link redirects to ${headers.get('location')}`);
  else if (status !== 200) fail(href, `internal link returns HTTP ${status}`);
}
for (const url of urls) {
  const p = new URL(url).pathname;
  if (p !== '/' && !internalLinks.has(p)) fail(p, 'orphan: no internal link points to this page');
}

for (const img of ogImages) {
  const res = await fetch(toLocal(img));
  const type = res.headers.get('content-type') || '';
  if (res.status !== 200 || !type.includes('image/png')) fail(img, `og:image HTTP ${res.status} ${type}`);
}

const robotsTxt = await get(`${BASE}/robots.txt`);
if (robotsTxt.status !== 200 || !robotsTxt.body.includes(`Sitemap: ${PROD}/sitemap.xml`)) fail('/robots.txt', 'missing sitemap line');
if (/Disallow:\s*\/\s*$/m.test(robotsTxt.body)) fail('/robots.txt', 'blocks the whole site');

const missing = await get(`${BASE}/this-page-does-not-exist`);
if (missing.status !== 404) fail('/this-page-does-not-exist', `expected 404, got ${missing.status}`);
if (!/<meta[^>]+name="robots"[^>]+noindex/i.test(missing.body)) fail('/this-page-does-not-exist', '404 page is missing noindex');

const redirects = [['/features/', '/features'], ['/mass-unfollow-twitter/', '/mass-unfollow-twitter'], ['/features.html', '/features'], ['/blog/how-to-find-out-who-unfollowed-you-on-x.html', '/blog/how-to-find-out-who-unfollowed-you-on-x'], ['/index.html', '/']];
for (const [from, to] of redirects) {
  const { status, headers } = await get(BASE + from);
  const location = headers.get('location') || '';
  if (![301, 308].includes(status) || !location.endsWith(to)) fail(from, `expected permanent redirect to ${to}, got ${status} ${location}`);
}

if (args.includes('--table')) {
  console.log('| Path | Title | Description | JSON-LD |\n| --- | --- | --- | --- |');
  report.forEach((r) => console.log(`| ${r.path} | ${r.title} | ${r.description} | ${r.schema} |`));
  console.log('');
}
console.log(`Checked ${urls.length} sitemap URLs, ${internalLinks.size} internal links, ${ogImages.size} OG images, ${hreflangs.size} pages with hreflang.`);
if (warnings.length) console.log(`\nWarnings (${warnings.length}):\n  ${warnings.join('\n  ')}`);
stopServer();
if (failures.length) { console.log(`\nFailures (${failures.length}):\n  ${failures.join('\n  ')}`); process.exit(1); }
console.log('\nAll technical SEO checks passed.');
