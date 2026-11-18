#!/usr/bin/env node
// Notify IndexNow search engines (Bing, Yandex, Naver, Seznam…) about every
// URL in the live sitemap. Run after a deploy that adds or changes pages:
//   npm run indexnow
// The key is public by design: it is served at /316cf66fdb7c66a60d58667548972c1f.txt so engines can
// confirm the request comes from the site owner. Google does not use IndexNow;
// use Search Console → Sitemaps for Google.

const SITE = 'https://www.unfollowx.com';
const KEY = '316cf66fdb7c66a60d58667548972c1f';

const sitemap = await fetch(`${SITE}/sitemap.xml`).then((r) => {
  if (!r.ok) throw new Error(`sitemap.xml returned HTTP ${r.status}`);
  return r.text();
});
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => u.startsWith(SITE));
if (!urlList.length) throw new Error('No URLs found in sitemap.xml');

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: 'www.unfollowx.com', key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList })
});
console.log(`IndexNow: submitted ${urlList.length} URLs → HTTP ${res.status} ${res.statusText}`);
if (res.status >= 400) { console.log(await res.text()); process.exit(1); }
