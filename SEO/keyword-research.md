# Keyword research — UnfollowX Pro

_Last updated: 2026-11-06_

## Method and evidence

- **No paid keyword tool was available** for this project, so this document contains **no search-volume, keyword-difficulty or traffic numbers**. Priorities are editorial judgements, labelled with a confidence level.
- **Search intent** was assessed from live Google-style web searches run on 2026-11-06 for each seed cluster: which page types rank (how-to articles, tool landing pages, Chrome Web Store listings, vendor blogs), and what those pages answer.
- **Product facts** come from the extension source (`fr-ost/UNFOLLOWX`, v7.3.4: README, CHANGELOG, `STORE_LISTING.md`, `shared/config.js`, `shared/telemetry.js`, `dashboard.js`).
- **X platform facts** (follow limits, archive, multiple accounts) come from X Help Center pages as surfaced in search results. The help.x.com pages themselves could not be fetched from the build environment (network policy), so quotes were taken from search snippets; re-verify before quoting verbatim.

### What the SERPs showed (2026-11-06)

| Query family | What ranks | Implication |
| --- | --- | --- |
| how to see who doesn’t follow you back on X | Vendor blogs (Circleboom, Unfollr, Postory, SuperX) with 2–3 methods: manual “Follows you” check, third-party tool | Informational how-to with a tool CTA. Must answer the manual method too. |
| how to see who unfollowed you on Twitter/X | Vendor blogs + Chrome/Firefox extension listings; all state X has no unfollow notification; snapshot comparison is the only method | Informational + tool intent. Honesty about “no history before first snapshot” differentiates. |
| free X/Twitter mass unfollow tool | Chrome Web Store listings, Product Hunt, comparison blogs; many “free” tools have caps (e.g. 10/day free) or trials | Commercial/transactional. Homepage + “what to look for” guide. Free-forever positioning is a real differentiator. |
| unfollow everyone on X | Console scripts (GitHub), extensions, vendor guides | Informational/transactional. Safety + backup angle is under-served. |
| export X following list CSV | Extensions with free-tier caps, scraping services; X archive rarely explained well | Informational. Two-method guide (archive + CSV) fills a gap. |
| find inactive accounts on X | Vendor blogs (Fedica, Circleboom, TweetEraser) | Informational. Explaining what “inactive” can’t measure is a differentiator. |

Confidence legend: **High** = intent clearly visible in SERPs and product fully supports it. **Medium** = intent visible, product partially or indirectly relevant. **Low** = speculative or thin.

## Primary keyword per page (no cannibalisation)

Each indexable URL owns **one** primary intent. Secondary keywords support the same intent.

| URL | Primary keyword | Secondary keywords | Intent | Content type | Audience | Priority | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | free X unfollow tool | free Twitter unfollow tool, X unfollow tool, unlimited Twitter unfollow tool, X unfollower extension, Twitter unfollow Chrome extension | Commercial / transactional | Product landing page | Anyone cleaning up an X following list | P0 | High |
| `/features` | Twitter following list manager | X unfollow extension features, whitelist before unfollowing, Twitter unfollow history | Commercial investigation | Feature hub | Evaluators comparing tools | P1 | Medium |
| `/twitter-non-followers-checker` | Twitter non-followers checker | free X non-followers checker, find non-followers on X, who doesn’t follow me back on Twitter (tool) | Transactional (tool) | Tool landing page | People wanting a tool, not a tutorial | P0 | High |
| `/x-follower-tracker` | X follower tracker | Twitter unfollower tracker, see lost followers on X, track Twitter followers | Transactional (tool) | Tool landing page | People who want ongoing tracking | P0 | High |
| `/setup` | how to use UnfollowX Pro | UnfollowX Pro setup, install Chrome extension for X | Navigational | Setup guide | New users | P1 | High |
| `/guides` | X following management guides | how-to X unfollow guides | Navigational / hub | Task hub | Visitors browsing by task | P2 | Medium |
| `/faq` | UnfollowX Pro FAQ | is UnfollowX Pro free, does X rate limit unfollows | Navigational / informational | FAQ | Evaluators, users | P1 | High |
| `/blog/how-to-see-who-doesnt-follow-you-back-on-x` | how to see who doesn’t follow you back on X | who doesn’t follow me back on Twitter, find accounts that don’t follow you back on Twitter, Follows you label | Informational | How-to (3 methods) | Casual and power users | P0 | High |
| `/blog/how-to-find-out-who-unfollowed-you-on-x` | how to see who unfollowed you on X | can you see who unfollowed you on Twitter, who unfollowed me on Twitter | Informational | How-to | Curious users | P0 | High |
| `/blog/what-an-x-follower-tracker-can-and-cannot-tell-you` | track new and lost followers on X | how follower trackers work, lost followers X | Informational (explainer) | Explainer | Users reading tracker results | P1 | Medium |
| `/blog/how-to-mass-unfollow-accounts-on-x` | how to mass unfollow on X | Twitter mass unfollow, bulk unfollow X safely, X unfollow limit | Informational → transactional | Step-by-step guide | Bulk cleaners | P0 | High |
| `/blog/how-to-unfollow-everyone-on-x` | how to unfollow everyone on X | unfollow all Twitter, reset X following list | Informational | Guide | Account resetters, brand handovers | P1 | High |
| `/blog/how-to-find-inactive-accounts-on-x` | find inactive accounts on X | find inactive Twitter accounts, remove inactive accounts on X, identify inactive Twitter accounts | Informational | Guide | Cleaners | P1 | High |
| `/blog/a-thoughtful-guide-to-cleaning-up-your-x-following-list` | clean up Twitter following list | clean up X following, manage X following list efficiently | Informational | Process guide | Everyone | P1 | Medium |
| `/blog/how-to-whitelist-accounts-before-unfollowing-on-x` | whitelist before unfollowing | protect accounts when mass unfollowing, keep list | Informational | Tutorial | Bulk cleaners | P2 | Medium |
| `/blog/how-to-export-your-x-following-list-to-csv` | export X following list to CSV | Twitter following list exporter, download following list X | Informational | Tutorial (2 methods) | Analysts, brand teams | P1 | High |
| `/blog/how-to-recover-from-an-accidental-unfollow-on-x` | accidentally unfollowed someone on X | refollow after unfollow, undo unfollow Twitter | Informational | Short how-to | Anyone | P2 | Medium |
| `/blog/best-free-x-unfollow-tools-what-to-look-for` | best free X unfollow tools | free Twitter unfollow tool comparison, safe unfollow tool | Commercial investigation | Checklist guide | Evaluators | P1 | Medium |
| `/blog/x-following-vs-followers-explained` | X following vs followers | difference between following and followers on Twitter, X follow limit, follow ratio | Informational | Explainer | Beginners | P2 | Medium |
| `/blog/how-to-manage-multiple-x-accounts-in-chrome` | manage multiple X accounts in Chrome | multiple Twitter accounts Chrome, X account switcher | Informational | Guide | Social managers | P2 | Medium |

### Deliberate cannibalisation decisions

- **“X follower tracker”** belongs to `/x-follower-tracker` (tool intent). The older article at `/blog/what-an-x-follower-tracker-can-and-cannot-tell-you` was retitled to target the informational query “track new and lost followers on X” and links to the tool page. Its URL was kept to preserve existing links.
- **“Non-followers checker”** (tool) vs **“how to see who doesn’t follow you back”** (how-to): separate pages, cross-linked.
- **“Mass unfollow”** vs **“unfollow everyone”**: selective bulk cleanup vs full reset are different intents with different risks.
- **“Unfollow non-followers”** (proposed topic 13) and **“find accounts that don’t follow you back on Twitter”** (topic 14) were **not** given separate pages — they duplicate the non-follower how-to and the mass-unfollow guide. They are covered as sections.
- **`/free-x-unfollow-tool`**, **`/twitter-following-list-manager`** and **`/how-to-mass-unfollow-on-x`** landing pages were **not created**: they would duplicate the homepage, `/features` and the existing mass-unfollow article respectively (doorway-page risk).

## Cluster map

| Cluster | Pillar | Supporting pages |
| --- | --- | --- |
| A — X unfollow tools | `/` | `/features`, `/blog/best-free-x-unfollow-tools-what-to-look-for`, `/blog/how-to-mass-unfollow-accounts-on-x` |
| B — Non-followers | `/twitter-non-followers-checker` | `/blog/how-to-see-who-doesnt-follow-you-back-on-x`, `/blog/x-following-vs-followers-explained` |
| C — Follower tracking | `/x-follower-tracker` | `/blog/how-to-find-out-who-unfollowed-you-on-x`, `/blog/what-an-x-follower-tracker-can-and-cannot-tell-you` |
| D — Following cleanup | `/blog/a-thoughtful-guide-to-cleaning-up-your-x-following-list` | mass unfollow, unfollow everyone, inactive accounts, whitelist, accidental unfollow |
| E — Product features | `/features` | CSV export, whitelist, multiple accounts, setup |

## Related topics and future keyword ideas (unvalidated)

These surfaced in SERPs or the product but need validation before writing:

- “X unfollow limit per day” — partially answered in the mass-unfollow guide and FAQ; a dedicated page risks thin content unless X publishes clearer numbers.
- “Twitter follow ratio” — covered in the following-vs-followers explainer.
- “Ghost followers on X” / “fake followers check” — the extension tracks *your following*, not follower quality; **do not target** unless the product adds it.
- “Mute vs unfollow on X” — reasonable future explainer (no product feature needed).
- “Twitter lists vs following” — future explainer.
- Localised content (es, pt-BR, hi, id, tr, ar) — the extension ships in 7 languages; the website is English-only. A future opportunity with hreflang.

## Re-validation plan

After launch, replace judgement with data:

1. Google Search Console → Performance → Queries, filtered per page, after 4–8 weeks.
2. Check for two URLs ranking for the same query (cannibalisation) and merge or re-scope.
3. Use a keyword tool (e.g. Google Keyword Planner) for relative volume before writing new articles.
