#!/usr/bin/env node
// Technical SEO checks against a running build (no dependencies).
//   npm run build && npm run start   (in another terminal)
//   npm run check:seo                 (defaults to http://localhost:3000)
//   BASE_URL=https://preview.example.com npm run check:seo
//
// Crawls every URL in /sitemap.xml and verifies: HTTP 200, unique <title>
// and meta description (with sane lengths), canonical pointing at the
// production URL, Open Graph / Twitter tags, a reachable PNG og:image,
// exactly one <h1>, no skipped heading levels, alt text on images, valid
// JSON-LD, and that every internal link resolves. Also checks robots.txt,
// 404 handling and legacy redirects.

const BASE = (process.env.BASE_URL || 'http://localhost:3000').replace(/\/$/, '');
const PROD = 'https://www.unfollowx.com';
const failures = [];
const warnings = [];
const fail = (url, msg) => failures.push(`${url}: ${msg}`);
const warn = (url, msg) => warnings.push(`${url}: ${msg}`);

const toLocal = (url) => url.replace(PROD, BASE);
const norm = (url) => { try { return new URL(url).href; } catch { return url; } };
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const meta = (html, attr, name) => {
  const re = new RegExp(`<meta[^>]+${attr}="${name}"[^>]*>`, 'i');
  const tag = html.match(re)?.[0];
  return tag ? decode(tag.match(/content="([^"]*)"/i)?.[1] ?? '') : null;
};

async function get(url, opts = {}) {
  const res = await fetch(url, { redirect: 'manual', ...opts });
  const body = opts.method === 'HEAD' ? '' : await res.text();
  return { status: res.status, headers: res.headers, body };
}

const sitemap = await get(`${BASE}/sitemap.xml`);
if (sitemap.status !== 200) { console.error('sitemap.xml not reachable at', BASE); process.exit(1); }
const urls = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urls.length) fail('/sitemap.xml', 'no URLs');
urls.forEach((u) => { if (!u.startsWith(PROD + '/') && u !== PROD + '/') fail('/sitemap.xml', `non-canonical URL ${u}`); });

const titles = new Map();
const descriptions = new Map();
const internalLinks = new Set();
const ogImages = new Set();

for (const url of urls) {
  const local = toLocal(url);
  const path = new URL(local).pathname;
  const { status, body: html } = await get(local);
  if (status !== 200) { fail(path, `HTTP ${status}`); continue; }

  const title = decode(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? '');
  if (!title) fail(path, 'missing <title>');
  else {
    if (title.length > 70) warn(path, `title is ${title.length} chars: "${title}"`);
    if (titles.has(title)) fail(path, `duplicate title (also ${titles.get(title)})`);
    titles.set(title, path);
  }
  const description = meta(html, 'name', 'description');
  if (!description) fail(path, 'missing meta description');
  else {
    if (description.length < 70 || description.length > 170) warn(path, `description is ${description.length} chars`);
    if (descriptions.has(description)) fail(path, `duplicate description (also ${descriptions.get(description)})`);
    descriptions.set(description, path);
  }
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1];
  if (norm(canonical) !== norm(url)) fail(path, `canonical "${canonical}" should be "${url}"`);
  if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html)) fail(path, 'indexable page has noindex');
  for (const [attr, name] of [['property', 'og:title'], ['property', 'og:description'], ['property', 'og:url'], ['property', 'og:image'], ['name', 'twitter:card'], ['name', 'twitter:image']]) {
    if (!meta(html, attr, name)) fail(path, `missing ${name}`);
  }
  const ogImage = meta(html, 'property', 'og:image');
  if (ogImage) ogImages.add(ogImage);
  if (meta(html, 'property', 'og:url') && norm(meta(html, 'property', 'og:url')) !== norm(url)) fail(path, `og:url ${meta(html, 'property', 'og:url')} ≠ ${url}`);

  const body = html.slice(html.indexOf('<body'));
  const h1s = body.match(/<h1[\s>]/gi) || [];
  if (h1s.length !== 1) fail(path, `${h1s.length} <h1> elements`);
  const levels = [...body.matchAll(/<h([1-6])[\s>]/gi)].map((m) => +m[1]);
  levels.forEach((lvl, i) => { if (i && lvl > levels[i - 1] + 1) warn(path, `heading jumps from h${levels[i - 1]} to h${lvl}`); });

  for (const img of body.match(/<img[^>]*>/gi) || []) if (!/\salt="/i.test(img)) fail(path, `image without alt: ${img.slice(0, 80)}`);

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      const data = JSON.parse(m[1]);
      const nodes = (Array.isArray(data) ? data : [data]).flatMap((d) => d['@graph'] || [d]);
      nodes.forEach((n) => { if (!n['@type']) fail(path, 'JSON-LD node without @type'); });
      if (/aggregateRating|reviewCount|ratingValue/.test(m[1])) fail(path, 'JSON-LD contains ratings (not allowed: none are verified)');
    } catch (e) { fail(path, `invalid JSON-LD: ${e.message}`); }
  }

  for (const m of body.matchAll(/<a[^>]+href="([^"]+)"/gi)) {
    const href = decode(m[1]);
    if (href.startsWith('/') && !href.startsWith('//')) internalLinks.add(href.split('#')[0] || '/');
  }
}

for (const href of internalLinks) {
  const { status, headers } = await get(BASE + href);
  if (status === 308 || status === 301) warn(href, `internal link redirects to ${headers.get('location')}`);
  else if (status !== 200) fail(href, `internal link returns HTTP ${status}`);
}

for (const img of ogImages) {
  const res = await fetch(toLocal(img));
  const type = res.headers.get('content-type') || '';
  if (res.status !== 200 || !type.includes('image/png')) fail(img, `og:image HTTP ${res.status} ${type}`);
}

const robots = await get(`${BASE}/robots.txt`);
if (robots.status !== 200 || !robots.body.includes(`Sitemap: ${PROD}/sitemap.xml`)) fail('/robots.txt', 'missing sitemap line');
if (/Disallow:\s*\/\s*$/m.test(robots.body)) fail('/robots.txt', 'blocks the whole site');

const missing = await get(`${BASE}/this-page-does-not-exist`);
if (missing.status !== 404) fail('/this-page-does-not-exist', `expected 404, got ${missing.status}`);
if (!/<meta[^>]+name="robots"[^>]+noindex/i.test(missing.body)) fail('/this-page-does-not-exist', '404 page is missing noindex');

const redirects = [['/features/', '/features'], ['/features.html', '/features'], ['/blog/how-to-find-out-who-unfollowed-you-on-x.html', '/blog/how-to-find-out-who-unfollowed-you-on-x'], ['/index.html', '/']];
for (const [from, to] of redirects) {
  const { status, headers } = await get(BASE + from);
  const location = headers.get('location') || '';
  if (![301, 308].includes(status) || !location.endsWith(to)) fail(from, `expected permanent redirect to ${to}, got ${status} ${location}`);
}

console.log(`Checked ${urls.length} sitemap URLs, ${internalLinks.size} internal links, ${ogImages.size} OG images.`);
if (warnings.length) console.log(`\nWarnings (${warnings.length}):\n  ${warnings.join('\n  ')}`);
if (failures.length) { console.log(`\nFailures (${failures.length}):\n  ${failures.join('\n  ')}`); process.exit(1); }
console.log('\nAll technical SEO checks passed.');
