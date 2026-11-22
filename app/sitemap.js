import { getArticles } from '@/lib/blog';
import { LANGUAGE_ALTERNATES, LOCALES } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';

// Indexable pages only. lastModified reflects the last material content
// change, not the build time. Localized pages carry hreflang alternates and
// pages with real screenshots list them for image search.
const SITE_UPDATED = new Date('2026-11-18T00:00:00.000Z');
const SEO_UPDATED = new Date('2026-11-22T00:00:00.000Z');
const abs = (p) => SITE_URL + (p === '/' ? '/' : p);
const languages = Object.fromEntries(Object.entries(LANGUAGE_ALTERNATES).map(([k, v]) => [k, abs(v)]));
const shot = (name) => `${SITE_URL}/images/screenshots/${name}.webp`;

const pages = [
  { path: '/', priority: 1, changeFrequency: 'weekly', languages: true, updated: SEO_UPDATED, images: [shot('unfollowx-pro-popup-scan-results-light'), shot('unfollowx-pro-dashboard-overview-light'), shot('unfollowx-pro-dashboard-inactive-accounts-dark')] },
  { path: '/features', priority: 0.9, changeFrequency: 'monthly', images: [shot('unfollowx-pro-dashboard-followers-unfollowed-you'), shot('unfollowx-pro-dashboard-following-review'), shot('unfollowx-pro-settings-keep-rules'), shot('unfollowx-pro-settings-speed-presets'), shot('unfollowx-pro-popup-paced-run-light')] },
  { path: '/mass-unfollow-twitter', priority: 0.9, changeFrequency: 'monthly', updated: SEO_UPDATED, images: [shot('unfollowx-pro-popup-paced-run-light'), shot('unfollowx-pro-dashboard-following-review'), shot('unfollowx-pro-settings-keep-rules')] },
  { path: '/twitter-non-followers-checker', priority: 0.8, changeFrequency: 'monthly', updated: SEO_UPDATED, images: [shot('unfollowx-pro-popup-scan-results-light'), shot('unfollowx-pro-dashboard-following-review')] },
  { path: '/x-follower-tracker', priority: 0.8, changeFrequency: 'monthly', updated: SEO_UPDATED, images: [shot('unfollowx-pro-dashboard-followers-unfollowed-you'), shot('unfollowx-pro-popup-scan-results-dark')] },
  { path: '/setup', priority: 0.8, changeFrequency: 'monthly', images: [shot('unfollowx-pro-settings-speed-presets'), shot('unfollowx-pro-settings-keep-rules')] },
  { path: '/guides', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/faq', priority: 0.7, changeFrequency: 'monthly', updated: SEO_UPDATED },
  { path: '/alternatives/circleboom', priority: 0.6, changeFrequency: 'monthly', updated: SEO_UPDATED, images: [shot('unfollowx-pro-dashboard-following-review'), shot('unfollowx-pro-settings-speed-presets')] },
  { path: '/about', priority: 0.4, changeFrequency: 'yearly', updated: SEO_UPDATED },
  { path: '/privacy', priority: 0.4, changeFrequency: 'yearly' }
];

export default function sitemap() {
  return [
    ...pages.map((p) => ({
      url: abs(p.path),
      lastModified: p.updated || SITE_UPDATED,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      ...(p.languages ? { alternates: { languages } } : {}),
      ...(p.images ? { images: p.images } : {})
    })),
    ...LOCALES.map((l) => ({
      url: abs(`/${l.slug}`),
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: { languages },
      images: [shot('unfollowx-pro-popup-scan-results-light'), shot('unfollowx-pro-dashboard-following-review')]
    })),
    ...getArticles().map((a) => ({ url: `${SITE_URL}/blog/${a.slug}`, lastModified: new Date(`${a.updatedAt}T00:00:00.000Z`), changeFrequency: 'monthly', priority: 0.7 }))
  ];
}
