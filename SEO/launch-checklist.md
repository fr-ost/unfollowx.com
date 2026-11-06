# Launch checklist

## Before deploying

- [ ] `npm ci && npm run build` succeeds (no errors).
- [ ] `npm run start` and, in another terminal, `npm run check:seo` → “All technical SEO checks passed.”
- [ ] Spot-check `/`, `/features`, `/blog`, one article, `/faq`, `/privacy` in light and dark mode, desktop and phone.
- [ ] Privacy policy “Last updated” date and extension version (`lib/site.js` → `EXTENSION.version`) are current.

## Vercel

- [ ] Project root = repository root, framework = Next.js, default build command.
- [ ] Domains: `www.unfollowx.com` is the **primary** domain; `unfollowx.com` redirects to it (or is attached without a redirect — the app redirects it). Never configure www → apex: the app’s apex → www redirect would loop.
- [ ] After deploy: `curl -I https://unfollowx.com/features` → `308` to `https://www.unfollowx.com/features`.
- [ ] `curl -I https://unfollowx-com.vercel.app/features` → `308` to `https://www.unfollowx.com/features`.
- [ ] `curl -I https://www.unfollowx.com/features/` → `308` to `/features`.
- [ ] `curl -I https://www.unfollowx.com/features.html` → `308` to `/features`.
- [ ] `https://www.unfollowx.com/robots.txt` and `/sitemap.xml` load.
- [ ] `https://www.unfollowx.com/opengraph-image` returns a PNG.

## Analytics (see `docs/google-analytics-setup.md`)

- [ ] On the live site, accept the banner → GA4 Realtime shows your visit; DebugView (with Tag Assistant) shows `page_view` and a `chrome_install_click` after clicking a store link.
- [ ] Decline → no requests to `googletagmanager.com` (DevTools → Network).
- [ ] GA4 Admin → Events → mark `chrome_install_click` as a **key event**.
- [ ] GA4 Admin → Data streams → Enhanced measurement: “Page changes based on browser history events” is **on** (the app relies on it for client-side page views).
- [ ] GTM container GTM-M4QHPXQV: contains **no** Google tag / GA4 tags for G-DEEP3H3Q83 (the site already sends GA4 directly), or switch `GA4_DELIVERY` to `'gtm'`.
- [ ] GA4 Admin → Data retention set to the period stated in the privacy policy (2 or 14 months).

## Social previews

- [ ] Paste a few URLs into the X post composer, LinkedIn Post Inspector and Facebook Sharing Debugger; confirm title, description and image.

## Google Search Console — post-launch

1. [ ] Add a **Domain property** for `unfollowx.com` (DNS TXT verification) so both hosts are covered.
2. [ ] **Sitemaps** → submit `https://www.unfollowx.com/sitemap.xml`; status should become “Success” with 22 discovered URLs.
3. [ ] **URL Inspection** → inspect `/`, `/twitter-non-followers-checker`, `/x-follower-tracker` and two articles → “Request indexing”.
4. [ ] Confirm the **Google-selected canonical** equals the user-declared canonical (www, no trailing slash).
5. [ ] **Pages** report after 1–2 weeks: investigate “Duplicate without user-selected canonical”, “Crawled – currently not indexed”, “Page with redirect” (expected for legacy `.html` and apex URLs).
6. [ ] **Enhancements**: Breadcrumbs should validate; FAQ/HowTo rich results may not appear (Google restricts them) — that’s expected.
7. [ ] **Core Web Vitals** (field data needs traffic; may take 28+ days): LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 on mobile.
8. [ ] **Performance → Queries** after 4–8 weeks: check each article ranks for its intended primary keyword (`keyword-research.md`); look for two URLs competing for one query.
9. [ ] **Links** report: confirm internal links distribute to pillars (home, checker, tracker).
10. [ ] Link GSC to GA4 (GA4 Admin → Product links → Search Console) for organic landing-page reports.
11. [ ] Optional: verify in **Bing Webmaster Tools** (import from GSC) and submit the sitemap.

## Ongoing

- Monthly: GSC queries/coverage review; refresh facts if X changes its UI, rules or limits.
- Each extension release: update features, screenshots and privacy policy if data handling changes.
