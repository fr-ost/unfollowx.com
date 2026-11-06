# Internal linking map

_Last updated: 2026-11-06_

Principles: every page is reachable from the global header or footer; pillars link to their supporting guides and back; anchor text describes the destination and varies (no repeated exact-match anchors); every article ends with related articles and next steps.

## Global links (every page)

- **Header:** Features · How It Works (`/#how-it-works`) · How-to Guides (`/guides`) · Blog · FAQ · Privacy · Add to Chrome (store)
- **Mobile menu:** the same + Setup guide
- **Footer:** Features, How it works, Setup guide, Non-followers checker, Follower tracker, Chrome Web Store · How-to guides, Blog, FAQ, Free forever promise · Privacy policy, Contact, Telegram support, Analytics settings

## Homepage `/`

| Section | Links to |
| --- | --- |
| Hero | Store (install), `/features` |
| Free forever footnote | `/faq#faq-rate-limits` |
| Features bento + grid | `/features#<feature-id>` (17 anchors), `/features` |
| How it works | Store, `/setup` |
| Privacy | `/privacy` |
| Comparison | `/blog/best-free-x-unfollow-tools-what-to-look-for` |
| Blog preview | 4 core guides (non-followers, unfollowers, mass unfollow, inactive), `/blog` |
| FAQ | `/faq`, inline links to non-follower and unfollower guides |

## Features `/features`

Each of the 17 feature cards links to the guide that explains it:

| Feature | Guide |
| --- | --- |
| Non-followers | how-to-see-who-doesnt-follow-you-back-on-x |
| Follower changes | how-to-find-out-who-unfollowed-you-on-x |
| Inactive | how-to-find-inactive-accounts-on-x |
| Not blue, filters, groups | a-thoughtful-guide-to-cleaning-up-your-x-following-list |
| Whitelist, Keep rules | how-to-whitelist-accounts-before-unfollowing-on-x |
| CSV | how-to-export-your-x-following-list-to-csv |
| History, follow again | how-to-recover-from-an-accidental-unfollow-on-x |
| Follow back | what-an-x-follower-tracker-can-and-cannot-tell-you |
| Multiple accounts | how-to-manage-multiple-x-accounts-in-chrome |
| Pacing, run controls | how-to-mass-unfollow-accounts-on-x |

Plus “Focused tools”: `/twitter-non-followers-checker`, `/x-follower-tracker`, `/guides`.

## Landing pages

- `/twitter-non-followers-checker` → non-follower how-to, whitelist guide, mass unfollow guide, `/features`, X data archive (external).
- `/x-follower-tracker` → unfollower how-to, follower tracking explainer, following-vs-followers explainer, `/features`, X follow limits (external).

## Hubs

- `/guides`: 8 tasks → 13 guides + both tool pages + `/setup`.
- `/blog`: category anchors (`#unfollow-guides`, `#followers`, `#account-management`, `#tutorials`, `#tips`) → every article.
- `/setup` → non-follower guide, whitelist guide, unfollower guide, mass unfollow guide, `/privacy`, `/guides`.

## Article cluster links (in-body)

| Article | Links out to |
| --- | --- |
| see-who-doesnt-follow-back | checker, setup, inactive, whitelist, mass unfollow, unfollowed-you |
| find-out-who-unfollowed | tracker, setup, whitelist, tracking explainer |
| mass-unfollow | features, non-followers, inactive, unfollow-everyone, setup, whitelist, accidental unfollow |
| unfollow-everyone | cleanup, CSV export, setup, unfollowed-you |
| inactive | setup, whitelist, mass unfollow, cleanup |
| cleanup | features, whitelist, inactive, mass unfollow, accidental unfollow, following-vs-followers |
| whitelist | features, setup, accidental unfollow, mass unfollow |
| CSV export | unfollow-everyone, features, setup, privacy |
| tracking explainer | tracker, setup, privacy, unfollowed-you |
| accidental unfollow | features, whitelist |
| best free tools | privacy, mass unfollow |
| following vs followers | non-followers, inactive, unfollowed-you, cleanup |
| multiple accounts | features, CSV export |

Every article also has: breadcrumbs (Home → Blog → Article), a category link, a table of contents, 3 related articles (`related` in `lib/blog.js`, topped up from the same category), next-step links to `/setup`, `/features`, `/faq`, and install CTAs (inline, sidebar, footer).

## Orphan check

`npm run check:seo` crawls every sitemap URL and fails if an internal link returns a non-200 status. On 2026-11-06: 22 sitemap URLs, 22 distinct internal link targets, 0 broken.
