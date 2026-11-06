# UnfollowX Pro design system

The visual identity is built around the extension’s own brand (blue → indigo → violet gradient, red “unfollow” badge) and an idea of **clarity and precision**: fine grids, tabular numbers, calm surfaces, and one bold statement per section. The “free forever” promise has its own signature visual — an itemised **receipt** that totals $0.00.

All tokens live in `app/styles/tokens.css`. Components only use semantic tokens, so light and dark themes are swapped by changing one layer.

## Files

| File | Contents | Loaded |
| --- | --- | --- |
| `app/styles/tokens.css` | Brand palette, type scale, spacing, radii, motion, z-index, light/dark semantic colours | Every page (layout) |
| `app/styles/base.css` | Reset, typography, layout primitives, focus, theme & route transitions, scroll reveal, reduced motion | Every page |
| `app/styles/components.css` | Header, nav, mobile menu, buttons, chips, cards, page hero, breadcrumbs, screenshots, CTA band, callouts, accordion, article cards, tables, footer, consent banner, prose | Every page |
| `app/styles/home.css` | Hero, dashboard demo, free-forever receipt, interactive demo, bento features, steps, privacy, comparison | `/` only |
| `app/styles/pages.css` | Blog, article, features, setup, FAQ, privacy, guides, landing pages, 404 | Inner pages only |

## Colour

### Brand (theme-independent)

| Token | Value | Use |
| --- | --- | --- |
| `--brand-blue` | `#3b82f6` | Gradient start |
| `--brand-indigo` | `#5046e5` | Primary brand |
| `--brand-violet` | `#8b5cf6` | Gradient end |
| `--brand-red` | `#e5484d` | Unfollow / attention |
| `--brand-mint` | `#12b886` | Free-forever accent |
| `--brand-amber` | `#f59f00` | Inactive / warning |

### Semantic (light → dark)

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | `#f7f8fc` | `#07090f` | Page background |
| `--bg-elevated` | `#ffffff` | `#0d111b` | Bands, footer |
| `--surface` / `-2` / `-3` | `#fff` / `#f3f5fa` / `#e9edf5` | `#0e121c` / `#141a27` / `#1b2232` | Cards, insets |
| `--border` / `--border-strong` | `#e3e7f0` / `#cfd6e3` | 8% / 15% white | Hairlines |
| `--text` / `--text-2` / `--text-3` | `#0b1020` / `#475069` / `#5b6480` | `#eef1f8` / `#a8b1c8` / `#7f89a3` | Primary / secondary / muted |
| `--accent` / `--accent-text` | `#4f46e5` / `#4338ca` | `#8b93ff` / `#aab0ff` | Links, active states |
| `--danger` / `--success` / `--warning` | `#c01f2d` / `#08734f` / `#8f5600` | `#ff6b72` / `#3ddc97` / `#ffc046` | Status text (each has a `-soft` background) |
| `--grad-brand` | blue → indigo → violet | brighter variant | Primary buttons, progress |
| `--grad-text` | | | Gradient headline words |
| `--band-bg` | `#0b1020` | `#0d111b` | Free-forever section, CTA bands |

All text/background pairs meet **WCAG 2.1 AA** (verified with axe-core on 14 routes in both themes). Dark mode is designed, not inverted: deep ink backgrounds, 1 px translucent borders with an inner top highlight (`--highlight`), brighter accents and stronger shadows.

## Typography

- **Display:** Bricolage Grotesque (variable, 200–800), weight ~680, tracking −0.035em, slight width reduction (`wdth 96`). Headlines and big numbers.
- **Text/UI:** Inter (variable, 100–900) with `cv11`/`ss01` features, tabular numerals (`.tabular`) for counters.
- Both are **self-hosted** Latin subsets (`app/fonts/*.woff2`, OFL licences included) loaded through `next/font/local` with `display: swap` and metric-adjusted fallbacks. No request to Google Fonts.

| Token | Size | Use |
| --- | --- | --- |
| `--text-xs` | 12px | Eyebrows, captions |
| `--text-sm` | 14px | Buttons, secondary |
| `--text-base` | 16px | Body |
| `--text-md` | 17px | Article body |
| `--text-lg` | 19px | Lead paragraphs |
| `--text-xl` | 22px | Card titles |
| `--text-2xl` | 24→30px fluid | h3 / article h2 |
| `--text-3xl` | 30→44px fluid | Section h2 |
| `--text-4xl` | 38→60px fluid | Page h1 |
| `--text-5xl` | 42→76px fluid | Hero h1 |

Styles: `.eyebrow` (uppercase label with gradient dash), `.lead`, `.gradient-text`, `.text-link`, `.prose` (long-form).

## Spacing, layout, radii, shadows

- Spacing: 4 px base (`--space-1` … `--space-24`), section padding `--section-y` (72→128 px fluid), gutter `--gutter` (16→32 px).
- Containers: `.container` (1200 px), `.container-narrow` (760 px).
- Breakpoints (in media queries): 480, 560, 640, 720, 768, 900, 960, 1024, 1080 (nav collapse), 1100, 1280.
- Radii: `--radius-xs` 6 · `-sm` 10 · `-md` 14 · `-lg` 20 · `-xl` 28 · `-pill`.
- Shadows: `--shadow-xs` … `--shadow-lg`, `--shadow-brand` for primary buttons.

## Motion

| Token | Value |
| --- | --- |
| `--dur-1` … `--dur-5` | 120, 200, 320, 560, 900 ms |
| `--ease-out` | `cubic-bezier(.22, 1, .36, 1)` |
| `--ease-in` | `cubic-bezier(.55, 0, 1, .45)` |
| `--ease-in-out` | `cubic-bezier(.65, 0, .35, 1)` |
| `--ease-spring` | `cubic-bezier(.34, 1.4, .64, 1)` |

What moves, and how:

- **Route transitions:** React `<ViewTransition update="page-swap">` around `<main>` (Next.js 16) — 150 ms fade-out, 320 ms fade/slide-in.
- **Theme switch:** View Transitions API circular reveal from the toggle; falls back to a 320 ms colour transition.
- **Scroll reveals:** `[data-reveal]` and staggered `[data-stagger]` children (`components/RevealOnView.jsx`). Content is visible by default; hiding only happens after JS confirms motion is allowed, and anything already on screen is shown immediately (no LCP delay).
- **Hero:** transform-only entrance (text is painted immediately), gently floating cards, live counters and a simulated paced run — paused when off-screen or the tab is hidden.
- **Micro-interactions:** button lift + light sweep, cursor spotlight on cards (`[data-spotlight]`), sliding nav indicator, accordion height animation (`interpolate-size`, progressive), demo row entrances.
- Rules: transform and opacity only, no scroll-jacking, no continuous expensive effects (the two hero aurora gradients drift slowly via transform), **`prefers-reduced-motion: reduce` disables all of it** and the hero simulation does not run.

## Components

| Component | File | Notes |
| --- | --- | --- |
| Header | `components/SiteHeader.jsx` | Sticky, glass after scroll, sliding hover pill, theme toggle, CTA; mobile sheet with focus trap, Escape, scroll lock |
| Footer | `components/SiteFooter.jsx` | Product / Learn / Company columns, free-forever promise, disclaimer, analytics settings |
| Install button | `components/InstallLink.jsx` | Every store link; `location` feeds analytics |
| Icons | `components/Icon.jsx` | Inline 24 px stroke icons (no icon library) |
| Hero dashboard | `components/HeroDashboard.jsx` | Sample data, labelled; `role="img"` summary for assistive tech |
| Interactive demo | `components/ProductDemo.jsx` | Sample accounts only; real form controls; never connected to X |
| Accordion | `components/FaqAccordion.jsx` | Native `<details>`; works without JS |
| Screenshot | `components/Screenshot.jsx` | Real extension screenshots, `next/image`, fixed dimensions |
| CTA band | `components/CtaBand.jsx` | Dark band with grid + glow |
| Article card / cover | `components/ArticleCard.jsx` | Generated CSS/SVG cover art (zero image bytes) |
| Breadcrumbs | `components/Breadcrumbs.jsx` | Visible trail + BreadcrumbList JSON-LD |

Buttons: `.btn` + `.btn-primary | .btn-secondary | .btn-ghost | .btn-light`, sizes `.btn-sm | .btn-lg`. Chips: `.chip` with `aria-pressed`. Cards: `.card`, `.card-hover`, `.icon-tile` (+ `red | green | amber`). Callouts: `.callout` / `.callout.warn`.

## Accessibility rules

- Visible focus ring on every interactive element (`:focus-visible`, 2 px accent outline).
- Skip link to `#main`.
- Real buttons for actions, links for navigation; toggles use `aria-pressed`, the menu uses `aria-expanded`/`aria-controls`.
- Decorative visuals are `aria-hidden`; meaningful demos have text equivalents.
- Minimum AA contrast in both themes; status colours never carry meaning alone.
