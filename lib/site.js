// Single source of truth for site-wide constants. Values here were verified
// against the existing site and the extension source (manifest v7.3.5+).

export const SITE_URL = 'https://www.unfollowx.com';
export const SITE_NAME = 'UnfollowX Pro';

// The Chrome Web Store listing (current canonical URL since the rename to
// "UnfollowX Pro – Free & Unlimited…"; the old x-twitter-mass-unfollow-t slug redirects).
export const STORE_ID = 'igpjmagghnibmjkkdcgpjgpkfkpiglnl';
export const STORE_URL = `https://chromewebstore.google.com/detail/unfollowx-pro-%E2%80%93-free-unli/${STORE_ID}`;

export const CONTACT_EMAIL = 'shahriar.bmb@gmail.com';
export const TELEGRAM_URL = 'https://t.me/igfrostt';
export const TELEGRAM_HANDLE = '@igfrostt';
export const STORE_REVIEWS_URL = `${STORE_URL}/reviews`;
// Chrome Web Store rating, shown in the homepage hero badge AND used for the
// SoftwareApplication aggregateRating (one constant, so the visible number and
// the structured data can never disagree).
// UPDATE BY HAND from the store listing (STORE_REVIEWS_URL) — last checked
// 2026-11-22: 4.9 stars from 54 ratings. Set to null to hide both.
export const STORE_RATING = { value: 4.9, count: 54, best: 5, checkedAt: '2026-11-22' };

export const DEVELOPER = { name: 'Shahriar Ahmed', url: 'https://www.shahriarahmed.net' };
export const PUBLISHER = 'Unique Labs';

// Extension facts used in copy. Update when a new extension version ships.
export const EXTENSION = {
  version: '7.3.5',
  minChrome: 116,
  languages: ['English', 'Español', 'Português (Brasil)', 'हिन्दी', 'Bahasa Indonesia', 'Türkçe', 'العربية'],
  defaultDailyLimit: 400,
  presets: [
    { name: 'Safe', delay: '15–35 s', restEvery: 30, rest: '10 min', daily: 250 },
    { name: 'Balanced', delay: '8–20 s', restEvery: 50, rest: '6 min', daily: 400 },
    { name: 'Fast', delay: '4–10 s', restEvery: 80, rest: '5 min', daily: 1000 }
  ]
};

export const PRIMARY_CTA = 'Add to Chrome — Free Forever';

export const NAV_ITEMS = [
  { label: 'Features', href: '/features', match: (p) => p === '/features' },
  { label: 'Mass Unfollow', href: '/mass-unfollow-twitter', match: (p) => p === '/mass-unfollow-twitter' },
  { label: 'How-to Guides', href: '/guides', match: (p) => p === '/guides' || p === '/setup' },
  { label: 'Blog', href: '/blog', match: (p) => p.startsWith('/blog') },
  { label: 'FAQ', href: '/faq', match: (p) => p === '/faq' },
  { label: 'Privacy', href: '/privacy', match: (p) => p === '/privacy' }
];

export const absoluteUrl = (path = '/') => SITE_URL + (path === '/' ? '/' : path);
