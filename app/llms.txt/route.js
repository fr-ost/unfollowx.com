import { getArticles } from '@/lib/blog';
import { features } from '@/lib/features';
import { LOCALES } from '@/lib/i18n';
import { DEVELOPER, PUBLISHER, SITE_URL, STORE_RATING, STORE_URL } from '@/lib/site';

// llms.txt (https://llmstxt.org): a plain-text map of the site for AI
// assistants and AI search engines. Generated at build time from site data.
export const dynamic = 'force-static';

export function GET() {
  const body = `# UnfollowX Pro

> UnfollowX Pro is a free-forever Chrome extension to mass unfollow on Twitter (X). It finds accounts that don't follow you back, shows who unfollowed you (by comparing follower snapshots), finds inactive accounts, and bulk-unfollows the accounts you choose at a paced, configurable speed. No subscription, no premium tier, no sign-up and no X password. Lists, scans and history stay in Chrome extension storage. Independent product, not affiliated with X Corp.

Key facts:
- Price: free forever. No paid plan, trial or usage quota set by the extension.
- Platform: desktop Google Chrome 116+, on x.com and twitter.com (new and classic X layouts).
- Pacing: Safe / Balanced / Fast presets or custom delays, breaks and a rolling daily limit (400 by default). X still applies its own limits; no tool can guarantee X won't limit an account.
- Privacy: never asks for the X password; anonymous usage statistics and optional anonymous feature usage can be turned off in Settings.
- Languages: English, Español, Português (Brasil), हिन्दी, Bahasa Indonesia, Türkçe, العربية.
- Chrome Web Store rating: ${STORE_RATING ? `${STORE_RATING.value}/5 from ${STORE_RATING.count} ratings (checked ${STORE_RATING.checkedAt})` : 'see the listing'}.
- Made by: ${DEVELOPER.name} (${DEVELOPER.url}), published by ${PUBLISHER}. About: ${SITE_URL}/about
- Install: ${STORE_URL}

## Main pages
- [Home](${SITE_URL}/): mass unfollow on Twitter (X) — product overview and interactive demo
- [Mass unfollow on Twitter (X)](${SITE_URL}/mass-unfollow-twitter): the bulk unfollow tool — filters, pacing, whitelist, FAQ
- [Unfollow non-followers on Twitter (X)](${SITE_URL}/twitter-non-followers-checker): free non-followers checker
- [See who unfollowed you on Twitter (X)](${SITE_URL}/x-follower-tracker): follower tracker
- [Circleboom alternative](${SITE_URL}/alternatives/circleboom): factual comparison for unfollowing
- [Features](${SITE_URL}/features): every feature, each linked to a guide
- [About](${SITE_URL}/about): who makes UnfollowX Pro
- [Setup guide](${SITE_URL}/setup)
- [How-to guides](${SITE_URL}/guides)
- [FAQ](${SITE_URL}/faq)
- [Privacy policy](${SITE_URL}/privacy)

## Features
${features.map((f) => `- ${f.title}: ${f.short}`).join('\n')}

## Guides
${getArticles().map((a) => `- [${a.title}](${SITE_URL}/blog/${a.slug}): ${a.description}`).join('\n')}

## Other languages
${LOCALES.map((l) => `- [${l.name}](${SITE_URL}/${l.slug})`).join('\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
