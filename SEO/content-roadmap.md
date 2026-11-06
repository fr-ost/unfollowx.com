# Content roadmap

_Last updated: 2026-11-06_

## Status of the 20 proposed topics

Each proposal was checked against search intent (see `keyword-research.md`), existing content and what the product can truthfully support.

| # | Proposed topic | Decision | URL | Status |
| --- | --- | --- | --- | --- |
| 1 | How to See Who Doesn’t Follow You Back on X | Kept existing URL, fully rewritten (3 methods, result reading, FAQ) | `/blog/how-to-see-who-doesnt-follow-you-back-on-x` | Published (1,124 words) |
| 2 | How to Find Out Who Unfollowed You on X | Kept URL, rewritten | `/blog/how-to-find-out-who-unfollowed-you-on-x` | Published (961) |
| 3 | How to Mass Unfollow on X | Kept URL, rewritten with X limits, presets, timing tables | `/blog/how-to-mass-unfollow-accounts-on-x` | Published (1,241) |
| 4 | Best Free X Unfollow Tools: What to Look For | New — vendor-neutral checklist, no competitor prices | `/blog/best-free-x-unfollow-tools-what-to-look-for` | Published (923) |
| 5 | How to Unfollow Everyone on X | New — full-reset guide (backup, staging, timing) | `/blog/how-to-unfollow-everyone-on-x` | Published (925) |
| 6 | How to Find Inactive Accounts on X | Kept URL, rewritten | `/blog/how-to-find-inactive-accounts-on-x` | Published (906) |
| 7 | How to Clean Up Your Twitter Following List | Kept URL (`a-thoughtful-guide-…`), retitled and rewritten | `/blog/a-thoughtful-guide-to-cleaning-up-your-x-following-list` | Published (933) |
| 8 | How to Export Your X Following List to CSV | Kept URL, rewritten (X archive + CSV, real column list) | `/blog/how-to-export-your-x-following-list-to-csv` | Published (778) |
| 9 | How to Whitelist Accounts Before Unfollowing | Kept URL, rewritten | `/blog/how-to-whitelist-accounts-before-unfollowing-on-x` | Published (786) |
| 10 | How to Manage Your X Following List More Efficiently | **Merged into #7** — same intent as cleanup | — | Covered |
| 11 | How to Track New and Lost Followers on X | **Retargeted existing article** (`what-an-x-follower-tracker-…`) | `/blog/what-an-x-follower-tracker-can-and-cannot-tell-you` | Published (855) |
| 12 | How to Use a Twitter Non-Followers Checker | **Became a tool landing page** (tool intent) | `/twitter-non-followers-checker` | Published |
| 13 | How to Unfollow Non-Followers on X | **Not created** — duplicates #1 + #3; covered as sections | — | Covered |
| 14 | How to Find Accounts That Don’t Follow You Back on Twitter | **Not created** — same intent as #1 | — | Covered by #1 |
| 15 | X Following vs Followers | New explainer, includes X follow limits | `/blog/x-following-vs-followers-explained` | Published (768) |
| 16 | How to Recover From an Accidental Unfollow | Kept URL, rewritten | `/blog/how-to-recover-from-an-accidental-unfollow-on-x` | Published (615) |
| 17 | How to Identify Inactive Twitter Accounts | **Not created** — same intent as #6 | — | Covered by #6 |
| 18 | How to Review Your X Following List Safely | **Not created** — overlaps #3, #7, #9 | — | Covered |
| 19 | Can You See Who Unfollowed You on Twitter? | **Not created** — answered at the top of #2 and in its FAQ | — | Covered by #2 |
| 20 | How to Manage Multiple X Accounts in Chrome | New | `/blog/how-to-manage-multiple-x-accounts-in-chrome` | Published (729) |

**Result:** 13 substantive articles (9 rewritten at their existing URLs, 4 new) instead of 20 thin ones. No existing URL was removed or renamed.

## Editorial standards (apply to every new article)

- Answer the query in the first paragraph; add a “Quick answer” callout when a tool answers it.
- Cover the non-product method too (manual, X’s own features) — the article must help people who never install the extension.
- Explain limitations honestly (X limits, what data can’t show, no guarantees).
- Verify every product claim against the extension source or changelog; verify every X claim against help.x.com and link it.
- One `[[cta]]` install box per article, placed after the main how-to — not at the top.
- End with a short “bottom line” and links to 1–2 related guides.
- Update `updatedAt` in `lib/blog.js` only for material changes.
- Avoid: “In today’s digital landscape”, “unlock the power”, “game-changing”, “revolutionize”, padded intros, keyword stuffing.

## Next candidates (validate in Search Console first)

| Candidate | Why | Pre-requisite |
| --- | --- | --- |
| Mute vs unfollow vs block on X | Common confusion; no product dependency | Verify current X mute/block behaviour |
| X follow limits explained (deep dive) | Frequent question | Only if X publishes clearer unfollow guidance |
| Twitter lists vs following | Alternative to unfollowing | Verify list features on current X |
| Localised versions of top 3 articles (es, pt-BR) | Extension supports 7 languages | Add i18n routing + hreflang |
| Case study: cleaning up a brand account | Real experience content | Needs a real, consented example — do not fabricate |

## Maintenance cadence

- **Monthly:** check GSC queries per article; fix any cannibalisation; refresh facts if X changes rules or UI.
- **Every extension release:** update feature descriptions, screenshots and the privacy policy if data handling changes (`lib/site.js` → `EXTENSION.version`).
- **Quarterly:** review the 5 lowest-CTR pages’ titles and descriptions.
