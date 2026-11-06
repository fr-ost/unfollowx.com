import fs from 'node:fs';
import path from 'node:path';
import { headingsOf, parseMarkdown, wordCount } from '@/lib/markdown';

// Blog registry. Article bodies live in content/articles/<slug>.md and are
// read at build time (every article page is statically generated).
// Keyword targeting per article is documented in SEO/keyword-research.md.

export const categories = [
  { id: 'unfollow-guides', name: 'X Unfollow Guides', description: 'Bulk and selective unfollowing on X, done carefully: pacing, protection and recovery.' },
  { id: 'followers', name: 'Followers & Non-Followers', description: 'Who follows you back, who left, and how follower tracking actually works.' },
  { id: 'account-management', name: 'X Account Management', description: 'Keeping your following list, data and multiple accounts organised.' },
  { id: 'tutorials', name: 'Tutorials', description: 'Step-by-step walkthroughs for specific UnfollowX Pro tasks.' },
  { id: 'tips', name: 'Tips & Best Practices', description: 'How to choose tools and make good decisions about your X network.' }
];

const ORIGINAL = '2026-11-04';
const REVISED = '2026-11-06';

const registry = [
  {
    slug: 'how-to-see-who-doesnt-follow-you-back-on-x',
    title: 'How to See Who Doesn’t Follow You Back on X (Twitter)',
    seoTitle: 'How to See Who Doesn’t Follow You Back on X (Twitter)',
    description: 'Three ways to find accounts that don’t follow you back on X — manually, with X’s own data, or with a free Chrome extension — plus what to do with the list.',
    category: 'followers', icon: 'userMinus', cover: 'red', coverChips: ['Mutual', 'Not following back'],
    publishedAt: ORIGINAL, updatedAt: REVISED,
    related: ['how-to-mass-unfollow-accounts-on-x', 'how-to-whitelist-accounts-before-unfollowing-on-x', 'x-following-vs-followers-explained']
  },
  {
    slug: 'how-to-find-out-who-unfollowed-you-on-x',
    title: 'How to Find Out Who Unfollowed You on X',
    seoTitle: 'How to Find Out Who Unfollowed You on X (Twitter)',
    description: 'X doesn’t notify you about unfollows. Here’s how snapshot comparison works, how to set it up, and why no tool can show unfollows from before you started.',
    category: 'followers', icon: 'arrowsSwap', cover: 'blue', coverChips: ['−23 left', '+12 new'],
    publishedAt: ORIGINAL, updatedAt: REVISED,
    related: ['what-an-x-follower-tracker-can-and-cannot-tell-you', 'how-to-see-who-doesnt-follow-you-back-on-x', 'x-following-vs-followers-explained']
  },
  {
    slug: 'how-to-mass-unfollow-accounts-on-x',
    title: 'How to Mass Unfollow on X (Twitter) Without Losing the Accounts You Value',
    seoTitle: 'How to Mass Unfollow on X (Twitter) Safely',
    description: 'A review-first way to bulk unfollow on X: pick the right group, protect important accounts, set a sensible pace and stay within X’s limits.',
    category: 'unfollow-guides', icon: 'users', cover: 'violet', coverChips: ['Selected · 128', 'Paced'],
    publishedAt: ORIGINAL, updatedAt: REVISED,
    related: ['how-to-whitelist-accounts-before-unfollowing-on-x', 'how-to-unfollow-everyone-on-x', 'how-to-recover-from-an-accidental-unfollow-on-x']
  },
  {
    slug: 'how-to-unfollow-everyone-on-x',
    title: 'How to Unfollow Everyone on X: A Complete Reset Guide',
    seoTitle: 'How to Unfollow Everyone on X (Twitter): Full Reset Guide',
    description: 'Want a clean slate on X? What “unfollow everyone” really involves, how long it takes under X’s limits, what to back up first and how to do it in stages.',
    category: 'unfollow-guides', icon: 'refresh', cover: 'amber', coverChips: ['Following · 0', 'Fresh start'],
    publishedAt: REVISED, updatedAt: REVISED,
    related: ['how-to-mass-unfollow-accounts-on-x', 'how-to-export-your-x-following-list-to-csv', 'how-to-whitelist-accounts-before-unfollowing-on-x']
  },
  {
    slug: 'how-to-find-inactive-accounts-on-x',
    title: 'How to Find Inactive Accounts on X',
    seoTitle: 'How to Find Inactive Accounts on X (Twitter) You Follow',
    description: 'Find accounts you follow that have gone quiet on X, understand what “last active” can and can’t measure, and decide which quiet accounts to keep.',
    category: 'account-management', icon: 'moonZ', cover: 'amber', coverChips: ['Last post · 1y+', '90d+'],
    publishedAt: ORIGINAL, updatedAt: REVISED,
    related: ['a-thoughtful-guide-to-cleaning-up-your-x-following-list', 'how-to-mass-unfollow-accounts-on-x', 'how-to-whitelist-accounts-before-unfollowing-on-x']
  },
  {
    slug: 'a-thoughtful-guide-to-cleaning-up-your-x-following-list',
    title: 'How to Clean Up Your X Following List (Without Regretting It)',
    seoTitle: 'How to Clean Up Your Twitter / X Following List',
    description: 'A practical, repeatable process for cleaning up your X following list: decide what your feed is for, review in batches and remove accounts without second-guessing.',
    category: 'tips', icon: 'sparkle', cover: 'green', coverChips: ['Keep', 'Review'],
    publishedAt: ORIGINAL, updatedAt: REVISED,
    related: ['how-to-find-inactive-accounts-on-x', 'how-to-see-who-doesnt-follow-you-back-on-x', 'how-to-mass-unfollow-accounts-on-x']
  },
  {
    slug: 'how-to-whitelist-accounts-before-unfollowing-on-x',
    title: 'How to Whitelist Accounts Before Unfollowing on X',
    seoTitle: 'How to Whitelist Accounts Before Unfollowing on X',
    description: 'Protect friends, clients and must-follow accounts before any bulk cleanup on X, using a whitelist and Keep rules — and check that protection actually applied.',
    category: 'tutorials', icon: 'shield', cover: 'green', coverChips: ['Whitelisted', 'Keep rule'],
    publishedAt: ORIGINAL, updatedAt: REVISED,
    related: ['how-to-mass-unfollow-accounts-on-x', 'how-to-recover-from-an-accidental-unfollow-on-x', 'a-thoughtful-guide-to-cleaning-up-your-x-following-list']
  },
  {
    slug: 'how-to-export-your-x-following-list-to-csv',
    title: 'How to Export Your X Following List to CSV',
    seoTitle: 'How to Export Your X (Twitter) Following List to CSV',
    description: 'Two ways to get your X following list into a spreadsheet: X’s own data archive and a CSV export from UnfollowX Pro — what each contains and when to use it.',
    category: 'tutorials', icon: 'download', cover: 'blue', coverChips: ['following.csv', 'Spreadsheet'],
    publishedAt: ORIGINAL, updatedAt: REVISED,
    related: ['how-to-unfollow-everyone-on-x', 'how-to-whitelist-accounts-before-unfollowing-on-x', 'how-to-see-who-doesnt-follow-you-back-on-x']
  },
  {
    slug: 'what-an-x-follower-tracker-can-and-cannot-tell-you',
    title: 'How to Track New and Lost Followers on X (and Read the Results Right)',
    seoTitle: 'How to Track New and Lost Followers on X',
    description: 'How follower tracking on X works, how to read new and lost follower results correctly, and the limits every tracker shares — including why some “unfollows” aren’t what they seem.',
    category: 'followers', icon: 'chart', cover: 'violet', coverChips: ['Snapshot', 'Compare'],
    publishedAt: ORIGINAL, updatedAt: REVISED,
    related: ['how-to-find-out-who-unfollowed-you-on-x', 'x-following-vs-followers-explained', 'how-to-export-your-x-following-list-to-csv']
  },
  {
    slug: 'how-to-recover-from-an-accidental-unfollow-on-x',
    title: 'How to Recover From an Accidental Unfollow on X',
    seoTitle: 'Accidentally Unfollowed Someone on X? How to Fix It',
    description: 'Unfollowed someone by mistake on X? How to find them again, re-follow quickly, what the other person sees, and how to stop it happening during bulk cleanups.',
    category: 'unfollow-guides', icon: 'history', cover: 'red', coverChips: ['History', 'Follow again'],
    publishedAt: ORIGINAL, updatedAt: REVISED,
    related: ['how-to-whitelist-accounts-before-unfollowing-on-x', 'how-to-mass-unfollow-accounts-on-x', 'what-an-x-follower-tracker-can-and-cannot-tell-you']
  },
  {
    slug: 'best-free-x-unfollow-tools-what-to-look-for',
    title: 'Best Free X Unfollow Tools: What to Look For',
    seoTitle: 'Best Free X (Twitter) Unfollow Tools: A Checklist',
    description: 'How to judge any free X unfollow tool: what “free” really covers, how it accesses your account, pacing, protection features, data handling and red flags.',
    category: 'tips', icon: 'compass', cover: 'blue', coverChips: ['Free?', 'Private?'],
    publishedAt: REVISED, updatedAt: REVISED,
    related: ['how-to-mass-unfollow-accounts-on-x', 'how-to-see-who-doesnt-follow-you-back-on-x', 'how-to-whitelist-accounts-before-unfollowing-on-x']
  },
  {
    slug: 'x-following-vs-followers-explained',
    title: 'X Following vs Followers: Understanding the Difference',
    seoTitle: 'X Following vs Followers: What’s the Difference?',
    description: 'What “following” and “followers” mean on X, how they shape your feed and reach, what the follow ratio tells you, and the follow limits X applies.',
    category: 'account-management', icon: 'arrowsSwap', cover: 'violet', coverChips: ['Following', 'Followers'],
    publishedAt: REVISED, updatedAt: REVISED,
    related: ['how-to-see-who-doesnt-follow-you-back-on-x', 'how-to-find-out-who-unfollowed-you-on-x', 'a-thoughtful-guide-to-cleaning-up-your-x-following-list']
  },
  {
    slug: 'how-to-manage-multiple-x-accounts-in-chrome',
    title: 'How to Manage Multiple X Accounts in Chrome',
    seoTitle: 'How to Manage Multiple X (Twitter) Accounts in Chrome',
    description: 'Run several X accounts from one computer: X’s account switcher, Chrome profiles, and how to keep scans, whitelists and history separate per account.',
    category: 'account-management', icon: 'users', cover: 'green', coverChips: ['@brand', '@personal'],
    publishedAt: REVISED, updatedAt: REVISED,
    related: ['a-thoughtful-guide-to-cleaning-up-your-x-following-list', 'how-to-export-your-x-following-list-to-csv', 'how-to-whitelist-accounts-before-unfollowing-on-x']
  }
];

const CONTENT_DIR = path.join(process.cwd(), 'content', 'articles');
const categoryById = Object.fromEntries(categories.map((c) => [c.id, c]));

function load(meta) {
  const source = fs.readFileSync(path.join(CONTENT_DIR, `${meta.slug}.md`), 'utf8');
  const blocks = parseMarkdown(source);
  const words = wordCount(source);
  return {
    ...meta,
    categoryName: categoryById[meta.category].name,
    words,
    readingTime: Math.max(2, Math.ceil(words / 230)),
    blocks,
    headings: headingsOf(blocks)
  };
}

let cache = null;
export function getArticles() {
  if (!cache) cache = registry.map(load).sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0));
  return cache;
}

export function getArticle(slug) {
  return getArticles().find((a) => a.slug === slug) || null;
}

export function getRelated(article, limit = 3) {
  const all = getArticles();
  const picked = article.related.map((slug) => all.find((a) => a.slug === slug)).filter(Boolean);
  const sameCategory = all.filter((a) => a.slug !== article.slug && a.category === article.category && !picked.includes(a));
  return [...picked, ...sameCategory].slice(0, limit);
}

export const articleSlugs = registry.map((a) => a.slug);
