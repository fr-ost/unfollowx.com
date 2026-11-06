import { getArticles } from '@/lib/blog';
import { SITE_URL } from '@/lib/site';

// Indexable pages only (no 404, no Open Graph image routes). lastModified
// reflects the last material content change, not the build time.
const SITE_UPDATED = new Date('2026-11-06T00:00:00.000Z');

const pages = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/features', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/twitter-non-followers-checker', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/x-follower-tracker', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/setup', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/guides', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/faq', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.4, changeFrequency: 'yearly' }
];

export default function sitemap() {
  return [
    ...pages.map((p) => ({ url: SITE_URL + (p.path === '/' ? '/' : p.path), lastModified: SITE_UPDATED, changeFrequency: p.changeFrequency, priority: p.priority })),
    ...getArticles().map((a) => ({ url: `${SITE_URL}/blog/${a.slug}`, lastModified: new Date(`${a.updatedAt}T00:00:00.000Z`), changeFrequency: 'monthly', priority: 0.7 }))
  ];
}
