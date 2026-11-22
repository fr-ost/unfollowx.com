import { DEVELOPER, EXTENSION, PUBLISHER, SITE_NAME, SITE_URL, STORE_RATING, STORE_REVIEWS_URL, STORE_URL, TELEGRAM_URL, absoluteUrl } from '@/lib/site';

/**
 * Builds a complete, unique metadata object for a page: title, description,
 * self-canonical, hreflang (+ x-default), robots, Open Graph and Twitter card.
 *
 * - English-only pages get a self-referencing `en` + `x-default` pair.
 *   Pages with translations (the homepage and /es, /pt-br…) pass `languages`.
 * - Open Graph / Twitter images (1200×630 PNG) come from the nearest
 *   opengraph-image.jsx file convention; pass `image` only for routes that
 *   reuse another route's card.
 * - `noindex` is for utility pages (404 etc.); real pages are index, follow.
 */
export function buildMetadata({
  title, description, path, locale = 'en_US', languages, type = 'website',
  absoluteTitle = false, noindex = false, image, extra = {}
}) {
  const url = absoluteUrl(path);
  const images = image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      languages: languages || { en: path, 'x-default': path },
      types: FEED_ALTERNATE
    },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
    openGraph: { type, url, siteName: SITE_NAME, title, description, locale, ...(images ? { images } : {}), ...(extra.openGraph || {}) },
    twitter: { card: 'summary_large_image', title, description, ...(images ? { images: [image] } : {}) },
    ...Object.fromEntries(Object.entries(extra).filter(([key]) => key !== 'openGraph'))
  };
}

export const FEED_ALTERNATE = { 'application/rss+xml': [{ url: '/feed.xml', title: 'UnfollowX Pro Blog' }] };
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SOFTWARE_ID = `${SITE_URL}/#software`;
export const AUTHOR_ID = `${SITE_URL}/#author`;

export function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  alternateName: ['UnfollowX'],
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/icon128.png`, width: 128, height: 128 },
  // Profiles that belong to this product, so search engines connect the
  // brand to this site rather than to unrelated "UnfollowX" projects.
  sameAs: [STORE_URL, TELEGRAM_URL],
  parentOrganization: { '@type': 'Organization', name: PUBLISHER },
  founder: { '@id': AUTHOR_ID },
  description: 'Makers of UnfollowX Pro, a free Chrome extension to mass unfollow on Twitter (X). Independent; not affiliated with X Corp.'
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE_NAME,
  alternateName: ['UnfollowX', 'unfollowx.com'],
  url: `${SITE_URL}/`,
  inLanguage: ['en', 'es', 'pt-BR', 'hi', 'id', 'tr', 'ar'],
  publisher: { '@id': ORGANIZATION_ID }
};

export const authorSchema = {
  '@type': 'Person',
  '@id': AUTHOR_ID,
  name: DEVELOPER.name,
  url: DEVELOPER.url,
  sameAs: [DEVELOPER.url],
  jobTitle: 'Developer of UnfollowX Pro'
};

// Only verifiable facts: free (price 0), Chrome, the real store URL.
// No user or download counts are claimed.
export const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': SOFTWARE_ID,
  name: SITE_NAME,
  alternateName: ['UnfollowX', 'UnfollowX Pro – Free & Unlimited Mass Unfollow on X (Twitter)'],
  applicationCategory: 'BrowserApplication',
  applicationSubCategory: 'Chrome extension',
  operatingSystem: 'Chrome',
  url: `${SITE_URL}/`,
  downloadUrl: STORE_URL,
  installUrl: STORE_URL,
  softwareVersion: EXTENSION.version,
  isAccessibleForFree: true,
  inLanguage: ['en', 'es', 'pt-BR', 'hi', 'id', 'tr', 'ar'],
  description: 'A free Chrome extension for X (Twitter): find accounts that don’t follow you back, see who unfollowed you, filter inactive accounts, protect accounts with a whitelist and manage follows and unfollows at your own pace.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: STORE_URL },
  sameAs: [STORE_URL],
  featureList: [
    'Find accounts that don’t follow you back on X (Twitter)',
    'See who unfollowed you with follower snapshots',
    'Find inactive accounts by their newest post',
    'Identify accounts without a blue check',
    'Search and filter your following list',
    'Whitelist and Keep rules to protect accounts',
    'Bulk unfollow with delays, breaks and a daily limit',
    'Follow back and follow again from history',
    'CSV import and export',
    'Multiple X accounts, light and dark themes, 7 languages'
  ],
  screenshot: [
    { '@type': 'ImageObject', url: `${SITE_URL}/images/screenshots/unfollowx-pro-popup-scan-results-light.webp`, width: 760, height: 960, caption: 'UnfollowX Pro popup after a scan' },
    { '@type': 'ImageObject', url: `${SITE_URL}/images/screenshots/unfollowx-pro-dashboard-following-review.webp`, width: 2720, height: 1480, caption: 'Following review with filters and selection' },
    { '@type': 'ImageObject', url: `${SITE_URL}/images/screenshots/unfollowx-pro-dashboard-followers-unfollowed-you.webp`, width: 2720, height: 1360, caption: 'Followers page: who unfollowed you' }
  ],
  publisher: { '@id': ORGANIZATION_ID },
  author: { '@id': AUTHOR_ID }
};

/**
 * SoftwareApplication + the Chrome Web Store rating (STORE_RATING). Use ONLY on
 * pages that also show <StoreRating /> visibly — Google requires the rating in
 * structured data to be visible on the same page.
 */
export const softwareSchemaWithRating = STORE_RATING
  ? {
      ...softwareSchema,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: STORE_RATING.value,
        ratingCount: STORE_RATING.count,
        bestRating: STORE_RATING.best,
        worstRating: 1,
        url: STORE_REVIEWS_URL
      }
    }
  : softwareSchema;
