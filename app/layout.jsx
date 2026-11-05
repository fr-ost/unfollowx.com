import './globals.css';
import './performance.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import RevealOnView from '@/components/RevealOnView';

export const metadata = {
  metadataBase: new URL('https://www.unfollowx.com'),
  title: { default: 'UnfollowX Pro — A clearer view of your X following', template: '%s | UnfollowX Pro' },
  description: 'Review your X following list with UnfollowX Pro. Find non-followers, track follower changes and choose who stays with a free Chrome extension.',
  applicationName: 'UnfollowX Pro',
  category: 'software',
  referrer: 'strict-origin-when-cross-origin',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  openGraph: {
    type: 'website', siteName: 'UnfollowX Pro', url: 'https://www.unfollowx.com',
    title: 'UnfollowX Pro — A clearer view of your X following',
    description: 'Find non-followers. Track changes. Choose who stays — at your pace.',
    images: [{ url: '/assets/social-card.svg', width: 1200, height: 630, alt: 'UnfollowX Pro — a clearer view of your X following' }]
  },
  twitter: { card: 'summary_large_image', title: 'UnfollowX Pro', description: 'A thoughtful way to review your X following.', images: ['/assets/social-card.svg'] },
  icons: { icon: '/assets/icon128.png' },
  alternates: { canonical: '/' }
};

const siteStructuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.unfollowx.com/#organization',
    name: 'UnfollowX Pro',
    url: 'https://www.unfollowx.com/',
    logo: { '@type': 'ImageObject', url: 'https://www.unfollowx.com/assets/icon128.png' },
    email: 'shahriar.bmb@gmail.com'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.unfollowx.com/#website',
    name: 'UnfollowX Pro',
    url: 'https://www.unfollowx.com/',
    publisher: { '@id': 'https://www.unfollowx.com/#organization' },
    inLanguage: 'en'
  }
];

export default function RootLayout({ children }) {
  return <html lang="en" data-theme="light"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData).replace(/</g, '\\u003c') }} /><SiteHeader /><main>{children}</main><SiteFooter /><RevealOnView /></body></html>;
}
