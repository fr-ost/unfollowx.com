# Website implementation

_Last updated: 2026-11-06_

## 1. Audit summary (before the redesign)

| Area | Finding |
| --- | --- |
| Framework | Next.js 16.4.5 App Router, React 19.3.1, JavaScript (no TypeScript), npm, Turbopack. Deployed on Vercel (no `vercel.json`; legacy one removed in the Next.js migration). |
| Routes | `/`, `/features`, `/setup`, `/faq`, `/privacy`, `/blog`, `/blog/[slug]` (9 articles), `robots.txt`, `sitemap.xml`, 404. |
| Styling | One minified 61 KB `globals.css` plus a 600-line `performance.css` overriding it (`!important`, hidden elements). No token system beyond a few colour variables. |
| Fonts | System font stack. |
| Motion | IntersectionObserver reveals, rotating hero word, CSS ring animations. No animation library. |
| Interactivity | Theme toggle (localStorage, applied after hydration → flash of light theme), FAQ filter (answers rendered only after click), small product preview, pacing slider. |
| Images | `logo.svg`, `icon128.png`, an **SVG** social card. No product screenshots. |
| SEO | Per-page metadata (some generic), canonical tags, Organization/WebSite/SoftwareApplication/BlogPosting/Breadcrumb JSON-LD, FAQPage with 3 of 13 visible questions, SVG OG image. |
| Content | 9 articles of ~250–300 words; accurate but thin. |
| Analytics | None; privacy policy said the site used no analytics. |
| Store URL | One listing, used everywhere: `chromewebstore.google.com/detail/x-twitter-mass-unfollow-t/igpjmagghnibmjkkdcgpjgpkfkpiglnl`. |
| Accuracy | Setup guide said the X tab must stay visible during scans — outdated since extension v7 (background engine with API reads). |
| Secrets | None in the repo. |

### Source of truth for product claims

The extension’s private repository (`fr-ost/UNFOLLOWX`, v7.3.4) was used read-only to verify every claim: features (README, CHANGELOG), presets and limits (`shared/config.js`: Safe 15–35 s / 30 / 10 min / 250; Balanced 8–20 s / 50 / 6 min / 400; Fast 4–10 s / 80 / 5 min / 1,000; daily limit 0–5,000), telemetry payload (`shared/telemetry.js`), CSV columns (`dashboard.js`), scan behaviour (`background.js`), permissions (`manifest.json`) and the five Chrome Web Store screenshots used on the site.

Corrections made while verifying: whitelist has CSV **export** but no file import (handles are pasted); CSV exports include a UTF-8 BOM; scans no longer need a visible X tab except in the page-scrolling fallback.

## 2. Architecture

```
app/
  layout.jsx            fonts, no-flash theme script, header/footer, <ViewTransition>, analytics, site JSON-LD
  page.jsx              homepage (+ styles/home.css)
  features/ setup/ faq/ privacy/ guides/ blog/ blog/[slug]/
  twitter-non-followers-checker/  x-follower-tracker/      landing pages
  */opengraph-image.jsx PNG social cards (lib/og.jsx)
  sitemap.js robots.js manifest.js icon.svg icon.png apple-icon.png not-found.jsx
  styles/               tokens, base, components, home, pages
  fonts/                Inter + Bricolage Grotesque (woff2, OFL)
components/             Header, Footer, Analytics (consent + tracking), InstallLink, HeroDashboard,
                        ProductDemo, FaqAccordion, Screenshot, CtaBand, ArticleCard, Breadcrumbs, Icon, …
content/articles/*.md   article bodies (Markdown subset)
lib/
  site.js               URLs, store link, contact, extension facts, nav
  seo.js                metadata helper + JSON-LD builders
  features.js faq.js    verified feature and FAQ data (shared by several pages)
  blog.js markdown.js   article registry, categories, Markdown-lite renderer
  analytics.js          consent-gated GA4 + GTM
  og.jsx og-fonts/      OG image renderer
public/images/screenshots/  real extension screenshots, 2× captures (WebP)
scripts/check-seo.mjs   technical SEO checker
```

- **No new runtime dependencies.** Fonts, icons, Markdown rendering, OG images and analytics use the platform, Next.js built-ins or small local modules.
- Every page is **statically generated** at build time (52 routes incl. OG images). Article Markdown is read with `fs` during the build.
- Server components by default; client components only where interaction is needed (header, analytics, reveal/spotlight, hero dashboard, demo, FAQ accordion).

## 3. Routes

| Route | Status | Notes |
| --- | --- | --- |
| `/` | Redesigned | 12 sections per brief |
| `/features` | Rebuilt | 17 verified features in 6 groups, each linked to a guide; real screenshots |
| `/setup` | Rebuilt | 8 steps updated for v7, troubleshooting, FAQ, HowTo JSON-LD |
| `/faq` | Rebuilt | 23 Q&As in 5 categories, all in HTML, matching FAQPage JSON-LD |
| `/privacy` | Updated | Extension data, telemetry, permissions + consent-based GA4/GTM disclosure |
| `/blog` | Rebuilt | Featured post + 5 categories |
| `/blog/[slug]` | Rebuilt | 13 articles (9 rewritten at existing URLs, 4 new), TOC, author, dates, related, CTAs |
| `/guides` | **New** | Task-oriented “How-to Guides” hub (header nav item) |
| `/twitter-non-followers-checker` | **New** | Tool landing page |
| `/x-follower-tracker` | **New** | Tool landing page |
| `*/opengraph-image` | **New** | PNG social cards |
| `/manifest.webmanifest`, `/icon.svg`, `/icon.png`, `/apple-icon.png` | **New** | |
| `/robots.txt`, `/sitemap.xml` | Updated | |
| Legacy `*.html`, apex host | **Redirects** | 308 to canonical URLs |

No existing URL was removed or renamed.

### New blog articles

1. `/blog/how-to-unfollow-everyone-on-x`
2. `/blog/best-free-x-unfollow-tools-what-to-look-for`
3. `/blog/x-following-vs-followers-explained`
4. `/blog/how-to-manage-multiple-x-accounts-in-chrome`

Rewritten (same URLs): see-who-doesn’t-follow-back, find-out-who-unfollowed, mass unfollow, inactive accounts, cleanup guide, whitelist, CSV export, follower tracking (retitled), accidental unfollow.

### Adding an article

1. Create `content/articles/<slug>.md` (syntax documented at the top of `lib/markdown.js`; use `[[cta]]` once).
2. Add an entry to `registry` in `lib/blog.js` (title, seoTitle, description, category, icon, cover, dates, related).
3. `npm run build`; the article, its OG image and its sitemap entry are generated automatically.

## 4. Brand and compliance rules enforced in copy

- **Free forever, unlimited product access, no subscription, no premium tier** — stated on the homepage, footer, FAQ, receipt section and every CTA band. No pricing page, upgrade CTA or locked feature anywhere.
- **Unlimited ≠ unlimited platform actions:** every mention of bulk actions carries the X-limits caveat; no claims of guaranteed safety, bypassing limits or circumventing checks. X’s own rules are linked (help.x.com).
- **No fabricated social proof:** no user counts, ratings, testimonials or download numbers anywhere, including structured data.
- **Sample data is labelled** (“Sample data”, “Interactive demo · sample accounts · not connected to X”).
- **Real screenshots** come from the extension’s store assets and are captioned as such.
- **Independent product disclaimer** in the footer, features page, articles and privacy policy.
- Optional donations and the GrowX link inside the extension are disclosed in the FAQ (“Why is it free?”) rather than hidden; no commercial reason or future funding claim is invented.

## 5. Analytics

See `docs/google-analytics-setup.md`. GA4 (G-DEEP3H3Q83) and GTM (GTM-M4QHPXQV) load only after opt-in.

## 6. Deployment

```bash
npm ci
npm run build
npm run start            # local production server on :3000
npm run check:seo        # in a second terminal
```

On Vercel: import the repository, framework preset Next.js, root directory = repo root, default build command. Add `www.unfollowx.com` as the primary domain. Then follow `SEO/launch-checklist.md`.

## 7. Known limitations

- Lighthouse mobile performance is 94–96 with simulated LCP ≈ 2.8–3.0 s (observed unthrottled LCP 0.23 s); see `SEO/technical-seo-audit.md`.
- Extension v7.3.5 (in the extension repo) adds a second, opt-out “Share anonymous feature usage” stream (GA4 via the developer’s Worker). The website’s privacy policy and copy still describe v7.3.4’s data practices — update them when 7.3.5 is published on the Chrome Web Store.
- GA4/GTM delivery verified with stubs only; confirm in DebugView/Realtime and inspect the GTM container (`GA4_DELIVERY`).
- X help-center statements were taken from search results (help.x.com blocked in the build environment); re-check wording periodically.
- The website is English-only; the extension supports 7 languages.
