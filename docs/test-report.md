# Test report

_Run on 2026-11-06 against a local production build (`next build` + `next start`, Next.js 16.4.5, Node 22), Chromium 1243 via Playwright. Only tests listed here were executed._

## Build

| Check | Result |
| --- | --- |
| `npm run build` | ✅ Compiled successfully; 52 static routes generated (pages, 13 SSG articles, 22 OG images, icons, manifest, sitemap, robots) |
| Build warnings | None |

## Technical SEO — `npm run check:seo`

✅ **All checks passed, 0 warnings.** 22 sitemap URLs, 22 internal link targets, 22 OG images.

Covered: HTTP 200 for every sitemap URL; unique titles (≤ 70 chars) and descriptions (70–170 chars); canonical = production URL; no `noindex` on indexable pages; `og:title/description/url/image`, `twitter:card/image` present; og:image returns `image/png`; exactly one `<h1>` and no skipped heading levels; every `<img>` has `alt`; all JSON-LD parses, has `@type`, contains no ratings; every internal link returns 200; robots.txt lists the sitemap; unknown URL returns **404** with `noindex`; `/features/`, `/features.html`, `/index.html`, `/blog/<slug>.html` return **308** to the clean URL.

## Responsive layout

Horizontal-overflow test on 12 routes (`/`, `/features`, `/setup`, `/faq`, `/privacy`, `/blog`, `/guides`, both landing pages, two articles, a 404) at **360, 390, 768, 1024, 1440 and 1920 px**: ✅ no page wider than the viewport.

Visual review (screenshots): homepage at 1440 px (light) and 390 px (dark); article page 1440 px (light); blog index 1440 px (dark). Issues found and fixed during review: header overflow on phones (theme toggle moved into the mobile menu below 560 px), receipt stamp overlapping text, article-card chips colliding on narrow cards, demo stat mismatch.

## Accessibility — axe-core 4.14 (WCAG 2.0/2.1 A + AA + best practices)

14 routes × light and dark themes: ✅ **0 serious or critical violations** after fixes (light-theme contrast of muted/status text was raised; a missing button style on the privacy page was fixed).

## Functional (Playwright)

| Area | Checks | Result |
| --- | --- | --- |
| Console | No console errors on 14 routes, both themes (the 404 document’s own 404 excluded) | ✅ |
| Mobile menu | Toggle visible at 390 px, opens (`aria-expanded`), locks scroll, Escape closes and returns focus, closes on navigation, focus trapped, theme switch inside works | ✅ 8/8 |
| Theme | Toggle → dark; persists across loads (applied before paint); system dark preference respected on first visit | ✅ 3/3 |
| Demo | 7 non-follower rows, search filters, Mutuals = 5, whitelist disables selection, simulated unfollow removes only unprotected rows, demo notice, reset, Followers view, sample scan completes | ✅ 9/9 |
| Reduced motion | No element hidden by reveals; reveal system off; hero simulation does not tick | ✅ 3/3 |
| No JavaScript | Hero, 13 FAQ items and 7 install links render visibly; FAQ expands natively | ✅ 2/2 |
| Keyboard | First Tab = skip link; Enter moves focus to `<main>`; focused element shows an outline | ✅ 3/3 |
| HTTP | 404 status for unknown route (both themes) | ✅ |

Total: **60/60** accessibility + functional checks passed.

## Analytics & consent (GA4 + GTM)

Google domains are blocked in the test environment, so gtag.js and gtm.js were replaced with stub scripts and `window.dataLayer` was inspected. **56/56 passed**, including:

- No gtag/gtm request, no `dataLayer`, no `_ga` cookie and no GTM `<noscript>` iframe before consent; clicks before consent send nothing.
- After “Accept analytics”: exactly one `gtag/js?id=G-DEEP3H3Q83` and one `gtm.js?id=GTM-M4QHPXQV`; consent defaults (ads denied) pushed before the `gtm.js` bootstrap event; one `config` with `send_page_view: true`, Google signals and ad personalisation off; no manual `page_view` duplicates.
- `chrome_install_click` with correct `button_location` for hero, header, footer, final CTA, blog inline and blog sidebar; `button_text` excludes screen-reader text; mirrored once per click as a GTM dataLayer event; store clicks not double-counted as outbound.
- `faq_expand` (open only), `theme_change`, `demo_interaction` (deduplicated, search text never sent), `navigation_click`, `feature_page_view` (features + landing page), `blog_article_view` (title, category, slug), `outbound_link_click` (help.x.com), `cta_click`.
- Scripts and GTM bootstrap not repeated after client-side navigation; no email addresses or `mailto` in any payload.
- Decline, withdraw (consent update denied, no further events, nothing loaded after reload), Global Privacy Control (no banner, nothing loaded, settings still reachable), returning visitor with stored consent.

**Not tested:** real data in GA4 DebugView / Realtime, and the GTM container’s configuration — both require the live site and Google access.

## Lighthouse 12 (simulated throttling, local build)

| Page | Mobile (Perf/A11y/BP/SEO) | Mobile LCP | CLS | TBT |
| --- | --- | --- | --- | --- |
| `/` | 94 / 100 / 100 / 100 | 3.0 s | 0 | 100 ms |
| `/features` | 95 / 100 / 100 / 100 | 3.0 s | 0 | 50 ms |
| `/faq` | 95 / 100 / 100 / 100 | 2.9 s | 0 | 90 ms |
| `/blog` | 96 / 100 / 100 / 100 | 2.9 s | 0 | 50 ms |
| `/setup` | 95 / 100 / 100 / 100 | 2.9 s | 0 | 50 ms |
| `/twitter-non-followers-checker` | 94 / 100 / 96 / 100 | 3.0 s | 0 | 60 ms |
| `/privacy` | 95 / 100 / 100 / 100 | 2.8 s | 0 | 80 ms |
| `/blog/how-to-mass-unfollow-accounts-on-x` | 95 / 100 / 100 / 100 | 2.9 s | 0 | 50 ms |

Desktop: `/` and the mass-unfollow article scored **100 / 100 / 100 / 100** (LCP 0.6 s, CLS 0, TBT 0).

Targets: Accessibility, SEO and Best Practices met (one page at 96 BP: 1× screenshot source). Mobile performance 94–96 (target 95+) and simulated mobile LCP 2.8–3.0 s (target ≤ 2.5 s) are **not fully met in the lab**; observed unthrottled LCP was 0.23 s. Confirm with field data after launch.

## Not executed

- Tests against the live production domain (www/apex redirects, Vercel headers) — the domain was unreachable from the environment.
- Real-device testing (iOS Safari, Android Chrome) and non-Chromium browsers.
- GA4 DebugView/Realtime and GTM Preview.

## Round 2 — smoothness, screenshots, sidebar, support box (2026-11-06)

### Rendering performance (Playwright, Chromium with 4× CPU throttling, software rendering)

Scroll = mouse-wheel scroll through the whole page; idle = 4 s with no input at the top of the page.

| Page | Before: scroll | Before: idle main-thread / layouts | After: scroll | After: idle main-thread / layouts |
| --- | --- | --- | --- | --- |
| `/` desktop 1440 | 44 fps, 6% janky frames | **2,172 ms / 172** | 49–50 fps, 4% | **~120 ms / 4** |
| `/` mobile 390 | 42 fps, 5% | **2,295 ms / 170** | 50–53 fps, 2–4% | **~5 ms / 0** |
| article desktop | 56 fps, 2% | 6 ms / 0 | 55–57 fps, 1–2% | 2–4 ms / 0 |
| `/features` desktop | 50 fps, 3% | 5 ms / 0 | 51–55 fps, 2–4% | 4–6 ms / 0 |

Root causes fixed: a `width` animation (layout every frame) and a `box-shadow` pulse running forever, the hero re-rendering every second, blurred sticky header/feature nav, a blurred drifting background, full-page `<ViewTransition>` snapshots on navigation, per-card reveal layers in large grids, and startup layout reads that defeated `content-visibility`. A/B tests showed masks, shadows, images and gradients had no measurable effect. Numbers vary ±3 fps between runs in this shared, GPU-less sandbox; real devices with GPU rasterisation should do better.

Lighthouse (mobile, homepage, 2 runs): **93–95 / 100 / 100 / 100**, TBT 150–160 ms, CLS 0. Desktop: 100 on `/`, `/features`, the checker page and an article. The low-resolution image warning is gone.

### Screenshots

Replaced with 2× captures of the real extension UI (2720 px dashboards, 760 px popups) rendered by the extension’s own offline capture tool against its mock x.com with fictional accounts. Verified: the optimizer serves the 2720 px original for a 1198 px slot on a 2× display and 1200 px (32 KB AVIF) on 1× screens.

### Other checks

- Blog sidebar: contents list and CTA are one sticky column; at a 1,400 px scroll position the list ends at 454 px and the CTA starts at 478 px (no overlap).
- Support box: review link counted as `cta_click` (not an install), Telegram and copy-email tracked without the copied value, “Copied” state shown.
- No-JS: a `<Suspense>` experiment hid homepage content without JavaScript and was reverted; the no-JS test passes.
- Suites on the final build: technical SEO ✅, accessibility + functional 60/60 ✅, analytics 60/60 ✅, horizontal overflow (12 routes × 6 widths) ✅, reveal behaviour ✅.
