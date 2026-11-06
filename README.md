# UnfollowX Pro website

Marketing site for [UnfollowX Pro](https://www.unfollowx.com/), the free-forever Chrome extension for managing who you follow on X (Twitter).

Next.js 16 App Router (JavaScript), statically generated, deployed on Vercel. No runtime dependencies beyond `next`, `react` and `react-dom`.

## Requirements

- Node.js 20.9 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Production build:

```bash
npm run build
npm run start
```

Technical SEO checks (with the production server running):

```bash
npm run check:seo
```

## Where things live

| Path | What |
| --- | --- |
| `app/` | Routes, metadata, OG images, sitemap, robots, styles (`app/styles/`) and self-hosted fonts |
| `components/` | Header, footer, consent/analytics, hero dashboard, interactive demo, FAQ accordion, cards… |
| `content/articles/` | Blog article bodies (Markdown subset, see `lib/markdown.js`) |
| `lib/site.js` | Store URL, contact details, extension version and facts, navigation |
| `lib/blog.js` | Article registry and categories |
| `lib/features.js`, `lib/faq.js` | Verified feature list and FAQ data |
| `lib/analytics-config.js`, `lib/analytics.js` | Google tag in every page (GTM-M4QHPXQV + GA4 G-DEEP3H3Q83) with Consent Mode v2, consent updates and events |
| `public/images/screenshots/` | Real extension screenshots (WebP) |
| `SEO/` | Keyword research, content roadmap, technical audit, internal linking map, launch checklist |
| `docs/` | Design system, implementation notes, analytics setup, test report |

## Deploy to Vercel

Import this repository in Vercel (framework: Next.js, root directory: repository root, default build settings). Add `www.unfollowx.com` as the primary domain and point DNS to Vercel. The app redirects `unfollowx.com` to `www.unfollowx.com`, so don’t configure the reverse redirect in Vercel. Then work through `SEO/launch-checklist.md`.

## Content rules

UnfollowX Pro is free forever: no pricing pages, premium tiers or upgrade CTAs. Product claims must match the extension source; X platform limits must never be described as bypassed or guaranteed. See `docs/website-implementation.md` §4.
