import { getArticles } from '@/lib/blog';
import { features } from '@/lib/features';
import { LOCALES } from '@/lib/i18n';
import { SITE_URL, STORE_URL } from '@/lib/site';

// llms.txt (https://llmstxt.org): a plain-text map of the site for AI
// assistants and AI search engines. Generated at build time from site data.
export const dynamic = 'force-static';

export function GET() {
  const body = `# UnfollowX Pro

> UnfollowX Pro is a free-forever Chrome extension for X (Twitter). It finds accounts that don't follow you back, shows who unfollowed you (by comparing follower snapshots), finds inactive accounts, and bulk-unfollows the accounts you choose at a paced, configurable speed. No subscription, no premium tier, no sign-up and no X password. Lists, scans and history stay in Chrome extension storage. Independent product, not affiliated with X Corp.

Key facts:
- Price: free forever. No paid plan, trial or usage quota set by the extension.
- Platform: desktop Google Chrome 116+, on x.com and twitter.com (new and classic X layouts).
- Pacing: Safe / Balanced / Fast presets or custom delays, breaks and a rolling daily limit (400 by default). X still applies its own limits; no tool can guarantee X won't limit an account.
- Privacy: never asks for the X password; anonymous usage statistics and optional anonymous feature usage can be turned off in Settings.
- Languages: English, Español, Português (Brasil), हिन्दी, Bahasa Indonesia, Türkçe, العربية.
- Install: ${STORE_URL}

## Main pages
- [Home](${SITE_URL}/): product overview and interactive demo
- [Features](${SITE_URL}/features): every feature, each linked to a guide
- [Twitter non-followers checker](${SITE_URL}/twitter-non-followers-checker)
- [X follower tracker](${SITE_URL}/x-follower-tracker): see who unfollowed you
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
