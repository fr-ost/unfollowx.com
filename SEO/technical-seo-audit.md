# Technical SEO audit

_Audit date: 2026-11-06 · Next.js 16.4.5 (App Router), React 19.3, deployed on Vercel_

The live site (www.unfollowx.com) could not be fetched from the build environment (outbound network policy), so the “before” audit is based on the repository at commit `9545439`. All “after” results were measured on a local production build (`next build && next start`).

## 1. Findings before the redesign

| Area | Finding | Severity |
| --- | --- | --- |
| Social images | `og:image` / `twitter:image` pointed to an **SVG** (`/assets/social-card.svg`). X, Facebook, LinkedIn and most crawlers do not render SVG previews. | High |
| Metadata | Homepage and root layout shared one description; several pages had generic titles (“Privacy Policy”). | Medium |
| Content depth | 9 articles of ~250–300 words each, six two-sentence sections, no FAQs, few external sources. | High |
| Structured data | Organization exposed an email; `FAQPage` on `/faq` listed 3 Q&As while the page showed 13 (mismatch). | Medium |
| Analytics | None. | — |
| Fonts | System font only (fine for performance). | — |
| Headings | Hero headline rotated words client-side; FAQ answers rendered only after click (not in HTML). | Medium |
| Legacy URLs | Pre-Next.js static site used `.html` URLs (`/features.html`, `/blog/*.html`) with no redirects. | Medium |
| Host | No code-level apex → www redirect (depends on Vercel domain settings). | Low |
| Accuracy | Setup page said the X tab must stay visible during scans — outdated since extension v7 (background engine). | Medium |

## 2. What was implemented

| # | Requirement | Implementation | Verified |
| --- | --- | --- | --- |
| 1–2 | Unique titles and descriptions | `pageMetadata()` in `lib/seo.js`; every page sets its own; titles ≤ 70 chars incl. “ \| UnfollowX Pro”, descriptions 70–170 chars | `check:seo`: 0 duplicates, 0 length warnings |
| 3 | Canonical URLs | `alternates.canonical` per page against `metadataBase` `https://www.unfollowx.com` | `check:seo` |
| 4 | Robots directives | Global `index, follow, max-image-preview:large`; 404 is `noindex, follow` | `check:seo` |
| 5–6 | XML sitemap, robots.txt | `app/sitemap.js` (9 pages + 13 articles, real `lastModified`), `app/robots.js` with sitemap + host | `check:seo` |
| 7–8 | Open Graph + X cards | Per-route PNG images via `opengraph-image.jsx` (1200×630, generated at build with `next/og`); `summary_large_image`; article OG includes published/modified time, section, author | 22 PNGs return `image/png` |
| 9–10 | Semantic HTML, heading hierarchy | One `<h1>` per page, no skipped levels (FAQ uses a visually hidden `<h2>`), landmarks (`header`, `nav`, `main`, `footer`), FAQ questions as `<h3>` inside `<summary>` | `check:seo`, axe |
| 11 | Breadcrumbs | `components/Breadcrumbs.jsx` renders visible trail + `BreadcrumbList` JSON-LD on all inner pages | JSON-LD parse |
| 12 | Internal linking | See `internal-linking-map.md` | 0 broken links |
| 13–16 | Images | Real screenshots as WebP with descriptive filenames (`unfollowx-pro-dashboard-followers-tracker.webp`…), `next/image` with explicit width/height, `sizes`, AVIF/WebP negotiation; descriptive `alt` | `check:seo` (alt), CLS 0 |
| 17 | HTTP status codes | Unknown URLs → 404; unknown blog slugs → 404 (`dynamicParams = false`) | `check:seo` |
| 18 | Redirects | `/features.html`, `/faq.html`, `/privacy.html`, `/setup.html`, `/index.html`, `/blog/index.html`, `/blog/:slug.html` → clean URLs (308); `unfollowx.com/*` → `https://www.unfollowx.com/*` (308) | `check:seo` (legacy redirects) |
| 19–20 | Trailing slash, duplicates | Next default: no trailing slash; `/features/` → 308 → `/features` | `check:seo` |
| 21 | Broken links | `npm run check:seo` | 0 |
| 22 | Crawlable navigation | Plain `<a href>` links (Next `<Link>`), no JS-only navigation; FAQ answers always in HTML (`<details>`) | No-JS test |
| 23 | Indexable blog | All articles statically generated, full text in HTML | Build output (SSG) |
| 24 | Pagination | 13 articles on one `/blog` page grouped by category — no pagination needed. Revisit beyond ~40 articles. | — |
| 25 | Search Console readiness | Sitemap, canonical host, robots; see `launch-checklist.md` | — |

### Structured data

| Page | Types | Notes |
| --- | --- | --- |
| All | `Organization`, `WebSite`, `Person` (author) in one `@graph` | No email, no address, no ratings |
| `/`, `/features`, landing pages | `SoftwareApplication` | `price: 0` (verifiably free), version 7.3.4, Chrome, store URL. **No `aggregateRating`/`review`** — none are verified, so Google’s software rich result may not show; that is intentional. |
| `/features` | `ItemList` of features | |
| `/setup` | `HowTo` | Valid schema; Google no longer shows HowTo rich results, kept for semantic clarity |
| `/faq` | `FAQPage` | Generated from the same `lib/faq.js` data as the visible accordion (23 Q&As, all in HTML). Google limits FAQ rich results to certain sites; markup is still valid. Homepage FAQ has **no** FAQPage markup to avoid duplicates. |
| `/blog` | `CollectionPage` + `ItemList` | |
| `/blog/*` | `BlogPosting` + `BreadcrumbList` | headline, description, image (OG), dates, author `Person` (Shahriar Ahmed, developer — verifiable from the extension), publisher, wordCount |
| `/guides` | `CollectionPage` | |

`check:seo` parses every JSON-LD block and fails on syntax errors, missing `@type` or any rating fields.

### Metadata reference

| URL | Title |
| --- | --- |
| `/` | UnfollowX Pro — Free & Unlimited X Unfollow Tool |
| `/features` | Features — Non-Follower Finder & Unfollower Tracker \| UnfollowX Pro |
| `/twitter-non-followers-checker` | Free Twitter Non-Followers Checker for X \| UnfollowX Pro |
| `/x-follower-tracker` | Free X Follower Tracker — See Who Unfollowed You \| UnfollowX Pro |
| `/setup` | How to Set Up UnfollowX Pro in Chrome (Step-by-Step) \| UnfollowX Pro |
| `/guides` | How-to Guides for Managing Your X (Twitter) Following \| UnfollowX Pro |
| `/blog` | Blog — X Following, Followers & Unfollow Guides \| UnfollowX Pro |
| `/faq` | FAQ — Free Forever, X Limits, Privacy & Features \| UnfollowX Pro |
| `/privacy` | Privacy Policy — Extension Data & Website Analytics \| UnfollowX Pro |
| `/blog/*` | `seoTitle` from `lib/blog.js` + “ \| UnfollowX Pro” |

## 3. Performance (Lighthouse 12, local production build)

Simulated throttling (Moto G Power / Slow 4G for mobile). These are lab numbers from the build sandbox, not field data.

| Page | Mobile Perf / A11y / BP / SEO | Mobile LCP | CLS | TBT | Desktop |
| --- | --- | --- | --- | --- | --- |
| `/` | 94 / 100 / 100 / 100 | 3.0 s | 0 | 100 ms | 100 / 100 / 100 / 100 (LCP 0.6 s) |
| `/features` | 95 / 100 / 100 / 100 | 3.0 s | 0 | 50 ms | — |
| `/faq` | 95 / 100 / 100 / 100 | 2.9 s | 0 | 90 ms | — |
| `/blog` | 96 / 100 / 100 / 100 | 2.9 s | 0 | 50 ms | — |
| `/setup` | 95 / 100 / 100 / 100 | 2.9 s | 0 | 50 ms | — |
| `/twitter-non-followers-checker` | 94 / 100 / 96 / 100 | 3.0 s | 0 | 60 ms | — |
| `/privacy` | 95 / 100 / 100 / 100 | 2.8 s | 0 | 80 ms | — |
| `/blog/how-to-mass-unfollow-accounts-on-x` | 95 / 100 / 100 / 100 | 2.9 s | 0 | 50 ms | 100 / 100 / 100 / 100 |

- **Unthrottled observed LCP: 226 ms** (equal to FCP). The simulated mobile LCP (≈2.9–3.0 s) is dominated by Lighthouse attributing the framework JavaScript (~120 KB React/Next runtime) and two preloaded fonts (89 KB) to the LCP path under Slow 4G. Target (≤ 2.5 s) is **not met in the simulation**; confirm with field data (CrUX / Search Console Core Web Vitals) after launch.
- Best-practices 96 on the checker page: the popup screenshot source is 401 px wide (1× store asset), slightly low-resolution on high-DPI phones. Fix by exporting 2× captures from the extension repo (`design/store-assets.mjs`).

## 4. Remaining recommendations

1. Confirm in Vercel → Domains that `unfollowx.com` redirects to `www.unfollowx.com` (and **not** the reverse — the code-level redirect would loop).
2. Submit the sitemap in Google Search Console and Bing Webmaster Tools.
3. Replace 1× screenshots with 2× captures.
4. Re-validate X help-center quotes (help.x.com was unreachable from the build environment).
5. Consider hreflang + localised pages for the extension’s 7 languages.
