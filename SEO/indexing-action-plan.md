# Why UnfollowX Pro isn’t on Google yet — and the fix

_Written 2026-11-18._

## Diagnosis

Searches run on 2026-11-18 returned **no pages from www.unfollowx.com**. What ranks instead for the brand and domain:

- the Chrome Web Store listing (good — it’s yours);
- the website’s own GitHub repository, `github.com/fr-ost/unfollowx.com`;
- unrelated projects with similar names (`nirholas/UnfollowX`, `ZXD44/UnfollowX`, “UnfollowX AI”, an Instagram “UnfollowX”, `unfollow-x.com`).

The site itself is technically clean (`npm run seo:check` passes: sitemap, robots, canonicals, structured data, hreflang, no `noindex`). The problem is **discovery and trust**, not markup:

1. **The domain is new and almost nothing links to it.** Google finds pages through links and submitted sitemaps. The Chrome Web Store listing and the extension point to `shahriarahmed.net`, not `unfollowx.com`.
2. **Search Console has (probably) never been set up**, so Google has no sitemap and no request to crawl.
3. **The public GitHub repo competes with the site** for the brand, and every article’s Markdown is publicly readable there (duplicate content).
4. **The brand name is crowded**, so Google needs strong signals about which “UnfollowX” is the real one.

## Do these first (in order) — about 30 minutes

### 1. Verify the site in Google Search Console

1. Open [search.google.com/search-console](https://search.google.com/search-console) → **Add property** → **Domain** → `unfollowx.com`.
2. Google shows a **TXT record**. Add it at your DNS provider. If Vercel manages DNS: Vercel → Domains → `unfollowx.com` → DNS Records → Add → Type TXT, Name `@`, Value = Google’s string.
   _Alternative (URL-prefix property):_ choose **HTML tag**, copy only the `content="…"` value, add it in Vercel → Project → Settings → Environment Variables as `GOOGLE_SITE_VERIFICATION`, redeploy, then click Verify. The site already outputs the tag when that variable is set.
3. **Sitemaps** → submit `https://www.unfollowx.com/sitemap.xml` (29 URLs).
4. **URL Inspection** → inspect and **Request indexing** for, in this order: `/`, `/twitter-non-followers-checker`, `/x-follower-tracker`, `/features`, `/blog/how-to-see-who-doesnt-follow-you-back-on-x`, `/blog/how-to-find-out-who-unfollowed-you-on-x`, `/es`, `/pt-br` (Google allows roughly 10 requests a day).

### 2. Point the Chrome Web Store listing at the site (strongest single signal)

The store listing already ranks for your brand. Linking it to the website tells Google which site is the official one.

1. Chrome Web Store **Developer Dashboard** → UnfollowX Pro → **Store listing** → **Official URL** → choose `https://www.unfollowx.com`. (The domain must be verified in Search Console with the same Google account — step 1.)
2. Also set **Homepage URL** / **Support URL** on the listing to `https://www.unfollowx.com` and `https://www.unfollowx.com/faq#support`.
3. In the next extension release, change `homepage_url` in `manifest.json` from `https://www.shahriarahmed.net` to `https://www.unfollowx.com`, and point the in-extension footer/help links to the website.

### 3. Stop the GitHub repo competing with the site

Make `fr-ost/unfollowx.com` **private** (GitHub → Settings → Danger Zone → Change visibility). Vercel keeps deploying from private repositories. This removes the duplicate article copies and the second “unfollowx.com” result. If you prefer to keep it public, at least set the repo’s **Website** field to `https://www.unfollowx.com`.

### 4. Bing Webmaster Tools + IndexNow

1. [bing.com/webmasters](https://www.bing.com/webmasters) → **Import from Google Search Console** (one click once step 1 is done). Bing also powers DuckDuckGo, Yahoo and ChatGPT search results.
2. After any deploy that adds or changes pages, run `npm run indexnow`. It notifies Bing, Yandex, Naver and Seznam instantly via the key file already served at `/316cf66fdb7c66a60d58667548972c1f.txt`.

## Then build links from places you already own

Each of these is a real, relevant link to `https://www.unfollowx.com`:

| Where | What to add |
| --- | --- |
| shahriarahmed.net | A project card linking to www.unfollowx.com |
| GrowX website / app | “Clean up first with UnfollowX Pro” link (the extension already links to GrowX) |
| YouTube showcase video | Website link in the first line of the description |
| LinkedIn project / profile | Project URL = www.unfollowx.com |
| Telegram channel/profile | Website link in the bio |
| GitHub profile README | Link under projects |

And a few reputable listings (one-time submissions): Product Hunt launch, AlternativeTo (as an alternative to paid unfollow tools), Indie Hackers product page, a dev.to or Medium post about how the extension’s pacing and snapshot comparison work. Avoid link farms and paid link schemes — they can get a new site demoted.

## What the website now does (shipped 2026-11-18)

- **Seven languages:** `/es`, `/pt-br`, `/hi`, `/id`, `/tr`, `/ar` landing pages built from the developer’s official store translations, with reciprocal `hreflang` (plus `x-default`) on every language version and in the sitemap, and footer links to each.
- **Entity signals:** Organization/WebSite/SoftwareApplication structured data with `alternateName` (“UnfollowX”), `sameAs` → the Chrome Web Store listing, `featureList` and real screenshots.
- **Correct store URL:** links use the listing’s current canonical URL (`/detail/unfollowx-pro-%E2%80%93-free-unli/igpjmagghnibmjkkdcgpjgpkfkpiglnl`).
- **Title includes “Twitter”:** “UnfollowX Pro – Free & Unlimited X (Twitter) Unfollow Tool”.
- **Image sitemap:** 26 screenshot entries for Google Images.
- **RSS feed** at `/feed.xml` (linked from every page) and **`/llms.txt`** for AI assistants and AI search.
- **Search-engine verification hooks:** `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, `YANDEX_VERIFICATION` environment variables.
- **IndexNow** key file + `npm run indexnow`.
- **New article:** “Mute vs Unfollow vs Block on X” (a large query family not covered before).

## What to expect

- **Days to 2 weeks** after Search Console submission: pages start appearing for exact brand searches (“UnfollowX Pro”, “unfollowx.com”).
- **Weeks to months:** long-tail queries (“unfollow everyone on x”, “dejar de seguir en masa twitter”) as Google gains trust.
- **Months, plus links:** competitive head terms (“twitter unfollow tool”, “who doesn’t follow me back twitter”), where established sites rank. No one can guarantee a position; links from relevant sites and steady, accurate content are what move this.

Track progress in Search Console → **Performance** (queries, clicks) and **Pages** (indexed vs not indexed, with reasons).
