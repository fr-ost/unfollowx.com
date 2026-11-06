import { DEVELOPER, PUBLISHER, SITE_NAME, SITE_URL, STORE_URL, absoluteUrl } from '@/lib/site';

/**
 * Builds a complete, unique metadata object for a page.
 * Open Graph / Twitter images come from the nearest opengraph-image file
 * convention (opengraph-image.jsx in a route folder), so they are not set here.
 */
export function pageMetadata({ title, description, path, type = 'website', absoluteTitle = false, extra = {} }) {
  const url = absoluteUrl(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type, url, siteName: SITE_NAME, title, description, locale: 'en_US', ...(extra.openGraph || {}) },
    twitter: { card: 'summary_large_image', title, description },
    ...Object.fromEntries(Object.entries(extra).filter(([key]) => key !== 'openGraph'))
  };
}

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
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/icon128.png`, width: 128, height: 128 },
  parentOrganization: { '@type': 'Organization', name: PUBLISHER }
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  inLanguage: 'en',
  publisher: { '@id': ORGANIZATION_ID }
};

export const authorSchema = {
  '@type': 'Person',
  '@id': AUTHOR_ID,
  name: DEVELOPER.name,
  url: DEVELOPER.url,
  jobTitle: 'Developer of UnfollowX Pro'
};

// Only verifiable facts: free (price 0), Chrome, the real store URL.
// No ratings, review counts or download numbers are claimed.
export const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': SOFTWARE_ID,
  name: SITE_NAME,
  applicationCategory: 'BrowserApplication',
  applicationSubCategory: 'Chrome extension',
  operatingSystem: 'Google Chrome (desktop)',
  url: `${SITE_URL}/`,
  downloadUrl: STORE_URL,
  installUrl: STORE_URL,
  softwareVersion: '7.3.4',
  isAccessibleForFree: true,
  inLanguage: ['en', 'es', 'pt-BR', 'hi', 'id', 'tr', 'ar'],
  description: 'A free Chrome extension for X (Twitter): find accounts that don’t follow you back, see who unfollowed you, filter inactive accounts, protect accounts with a whitelist and manage follows and unfollows at your own pace.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@id': ORGANIZATION_ID },
  author: { '@id': AUTHOR_ID }
};
