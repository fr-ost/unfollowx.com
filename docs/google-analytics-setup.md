# Google Analytics 4 + Google Tag Manager setup

| | |
| --- | --- |
| GA4 measurement ID | **G-DEEP3H3Q83** |
| GTM container ID | **GTM-M4QHPXQV** |
| Integration | Official Google tags (gtag.js and gtm.js), injected by `lib/analytics.js` **only after opt-in consent** |
| Consent UI | `components/Analytics.jsx` (banner + footer “Analytics settings”) |
| Code | `lib/analytics.js`, `components/Analytics.jsx`, `components/InstallLink.jsx` |

## How it works

1. **Before consent, nothing loads.** No request to `googletagmanager.com`, no `dataLayer`, no cookies. A banner offers equal-weight “Decline” and “Accept analytics” buttons.
2. **Global Privacy Control** (`navigator.globalPrivacyControl === true`) is treated as “Decline” and the banner is not shown; the visitor can still opt in from the footer.
3. **On “Accept analytics”** (or on any page load once accepted), `initAnalytics()` runs once per page lifetime:
   1. `gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })` — pushed **first**, so GA4 and every GTM tag inherit it.
   2. `gtag('js', new Date())`.
   3. GA4 (when `GA4_DELIVERY = 'gtag'`, the default): `gtag('config', 'G-DEEP3H3Q83', { send_page_view: true, allow_google_signals: false, allow_ad_personalization_signals: false })` and `gtag/js?id=G-DEEP3H3Q83` is injected.
   4. GTM: `dataLayer.push({ 'gtm.start': <time>, event: 'gtm.js' })` and `gtm.js?id=GTM-M4QHPXQV` is injected. The `gtm.js` event is what fires the container’s Initialization / All Pages triggers.
4. **Choice is stored** in `localStorage` (`unfollowx-analytics-consent`, versioned). “Analytics settings” in the footer reopens the banner.
5. **Withdrawing consent** pushes `gtag('consent', 'update', { analytics_storage: 'denied' })`, sets `ga-disable-G-DEEP3H3Q83`, deletes `_ga` / `_ga_*` cookies and stops all custom events. Scripts already loaded can’t be unloaded; from the next page load nothing is requested.

### Why the snippet you were given was changed

The supplied snippet loaded `gtm.js` directly and only called `gtag('js', …)`. Two problems: it ran without consent, and it never pushed the `gtm.js` event, so GTM’s page-load triggers would not fire. The site uses the standard GTM bootstrap instead, behind consent. The `<noscript>` GTM iframe is intentionally omitted — it would load GTM for visitors who cannot give consent.

## One GA4 path only (avoid double counting)

`lib/analytics.js` → `GA4_DELIVERY`:

| Value | GA4 sent by | GTM container must… |
| --- | --- | --- |
| `'gtag'` **(default)** | gtag.js directly (page views + all custom events) | **not** contain a Google tag or GA4 event tags for G-DEEP3H3Q83. Use GTM for other tags only (e.g. a Google Ads conversion on the `chrome_install_click` custom event). |
| `'gtm'` | Your GTM container | contain a Google tag for G-DEEP3H3Q83 (Initialization – All Pages) and a GA4 Event tag (see below). gtag.js is not loaded. |

> The container could not be inspected from the build environment (Google domains were blocked). **Open GTM-M4QHPXQV and check which case applies before going live.** If it already has a Google tag for G-DEEP3H3Q83, either remove it or set `GA4_DELIVERY = 'gtm'`.

### If you choose `'gtm'`

In GTM:

1. **Variables → New → Data Layer Variable** for each parameter: `page_location`, `page_path`, `button_location`, `button_text`, `cta_name`, `cta_location`, `article_title`, `article_category`, `article_slug`, `feature_name`, `faq_question`, `navigation_item`, `navigation_location`, `selected_theme`, `link_url`, `link_text`, `interaction_type`, `demo_section`.
2. **Triggers → Custom Event**, “Use regex matching”, event name:
   `^(chrome_install_click|cta_click|blog_article_view|feature_page_view|faq_expand|navigation_click|theme_change|outbound_link_click|demo_interaction)$`
3. **Tags → Google tag** with tag ID `G-DEEP3H3Q83`, trigger *Initialization – All Pages*; configuration parameters `allow_google_signals = false`, `allow_ad_personalization_signals = false`.
4. **Tags → Google Analytics: GA4 Event**, measurement ID `G-DEEP3H3Q83`, event name `{{Event}}`, add the parameters from step 1, trigger from step 2.
5. Publish, then set `GA4_DELIVERY = 'gtm'` and deploy.

## Page views and client-side navigation

- The **first page view** is sent by `config` (gtag mode) or the Google tag (GTM mode).
- **Client-side route changes** (Next.js navigation) are counted by GA4 **Enhanced measurement → Page views → “Page changes based on browser history events”**, on by default for web streams. The app does **not** send its own `page_view` — that would double count.
- If you turn that setting off, set `MANUAL_PAGE_VIEWS = true` in `lib/analytics.js`; the app then sends `page_view` (gtag mode) or a `virtual_page_view` dataLayer event (GTM mode) on every route change, deduplicated per path.

## Events

Lowercase snake_case, consistent parameter names. Each event is sent through gtag (gtag mode) **and** mirrored once as a dataLayer event (`{ event: name, …params }`) so GTM triggers can use it.

| Event | Parameters | Fired when | Where |
| --- | --- | --- | --- |
| `chrome_install_click` | `page_location`, `page_path`, `button_location`, `button_text` | Any click on a Chrome Web Store link. **An outbound install attempt, not a confirmed installation.** | Delegated click handler; every store link is `components/InstallLink.jsx` or has `data-install` + `data-location` |
| `cta_click` | `cta_name`, `cta_location`, `page_path` | Clicks on internal CTA links/buttons with `data-cta` | Delegated |
| `blog_article_view` | `article_title`, `article_category`, `article_slug` | Article page viewed | `TrackEvent` in `app/blog/[slug]/page.jsx` |
| `feature_page_view` | `feature_name`, `page_path` | `/features` (`features_overview`), `/twitter-non-followers-checker` (`non_followers_checker`), `/x-follower-tracker` (`follower_tracker`) | `TrackEvent` |
| `faq_expand` | `faq_question`, `page_path` | A FAQ item is opened (not on close) | `components/FaqAccordion.jsx` |
| `navigation_click` | `navigation_item`, `navigation_location` (`header`, `mobile_menu`, `footer`) | Header, mobile menu and footer navigation links | Delegated (`data-nav`) |
| `theme_change` | `selected_theme` (`light` / `dark`) | Theme toggle | `components/SiteHeader.jsx` |
| `outbound_link_click` | `link_url` (origin + path, no query), `link_text`, `page_path` | External http(s) links other than the store (`mailto:` is never tracked) | Delegated |
| `demo_interaction` | `interaction_type`, `demo_section` | Homepage demo: `view_switch`, `filter_change`, `search`, `select_account`, `select_all`, `whitelist_toggle`, `simulate_scan`, `simulate_unfollow`, `simulate_follow_back`, `reset` — **each type at most once per page view** | `components/ProductDemo.jsx` |

`button_location` values: `hero`, `header_nav`, `mobile_menu`, `how_it_works`, `final_cta`, `footer`, `footer_links`, `features_hero`, `features_cta`, `setup_hero`, `setup_step`, `setup_cta`, `checker_hero`, `checker_cta`, `tracker_hero`, `tracker_cta`, `guides_cta`, `faq_cta`, `blog_inline`, `blog_sidebar`, `blog_footer_cta`, `blog_index_cta`.

### Never sent

X usernames, passwords, account lists, follower data, emails, tokens, anything typed in the demo search box, or query strings of outbound links. `track()` trims every string parameter (100 characters; 300 for URLs).

## Conversion reporting

1. **GA4 Admin → Events** → toggle **Mark as key event** on `chrome_install_click` (appears after the first event is received).
2. **Custom dimensions** (Admin → Custom definitions, event scope): `button_location`, `cta_location`, `article_category`, `feature_name`, `navigation_location`, `interaction_type`.
3. Useful explorations:
   - **CTA engagement:** Free-form, rows `button_location`, metric event count of `chrome_install_click`.
   - **Organic landing pages:** Reports → Engagement → Landing page, filter *Session default channel group = Organic Search*; add key event rate for `chrome_install_click`.
   - **Blog → install journeys:** Path exploration starting at `blog_article_view`, next step `chrome_install_click`; or a Funnel exploration: `blog_article_view` → `chrome_install_click`.
   - **Feature → install journeys:** Funnel: `feature_page_view` → `chrome_install_click`, broken down by `feature_name`.

Always describe `chrome_install_click` as an **install attempt**. Confirmed installs are only visible in the Chrome Web Store developer dashboard.

## Verification

### DebugView

1. Install the **Tag Assistant** browser extension or open [tagassistant.google.com](https://tagassistant.google.com) and connect to `https://www.unfollowx.com`.
2. Accept the analytics banner in the debugged tab.
3. GA4 → Admin → **DebugView**: you should see `page_view`, then events as you click (e.g. `chrome_install_click` with `button_location = hero`).
4. In Tag Assistant, the GTM container should show the `gtm.js` event and any tags you configured.

### Realtime

GA4 → Reports → **Realtime**: after accepting, your visit appears within ~30 s; “Event count by event name” lists the events above.

### Browser DevTools (no Google account needed)

- Before consent: Network panel filtered by `googletagmanager` shows **nothing**; `window.dataLayer` is `undefined`.
- After accepting: exactly one `gtag/js?id=G-DEEP3H3Q83` and one `gtm.js?id=GTM-M4QHPXQV` request; `dataLayer` begins with `consent default` → `js` → `config` → `{event: 'gtm.js'}`.
- Navigate between pages: no new script requests.

### What was verified during development

Google’s domains were blocked in the build environment, so verification used Playwright with **stub scripts** served in place of gtag.js/gtm.js and inspection of `window.dataLayer` (56 checks, all passing): no request or cookie before consent; exactly one load of each script after consent with the correct IDs; consent defaults before the GTM bootstrap; one `config` call and no duplicate page views; every event above with correct parameters on hero, header, footer, final, blog-inline and blog-sidebar CTAs; FAQ, theme, demo, navigation, outbound and CTA events; single loads after SPA navigation; no emails in any payload; decline, withdraw, GPC and returning-visitor behaviour.

**Not verified:** real hits in GA4 DebugView/Realtime and the contents of the GTM container. Do the steps above on the deployed site.

## Privacy

- Matches the published policy (`/privacy#website`): opt-in only, GPC honoured, Google signals and ad personalization off, ad consent types denied, `_ga` cookies only after consent, withdrawal from the footer.
- GA4 does not log or store IP addresses ([Google](https://support.google.com/analytics/answer/12017362)). Set GA4 data retention (Admin → Data collection and modification → Data retention) to match the policy.
- If you add other tags to GTM (ads, heatmaps…), update the privacy policy first and respect the same consent state.
