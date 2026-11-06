import localFont from 'next/font/local';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import RevealOnView from '@/components/RevealOnView';
import Analytics from '@/components/Analytics';
import JsonLd from '@/components/JsonLd';
import { authorSchema, organizationSchema, websiteSchema } from '@/lib/seo';
import { googleTagHeadScript } from '@/lib/analytics-config';
import { SITE_NAME, SITE_URL } from '@/lib/site';

const inter = localFont({
  src: './fonts/inter-latin-variable.woff2',
  variable: '--font-inter',
  weight: '100 900',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial']
});

const bricolage = localFont({
  src: './fonts/bricolage-grotesque-latin-variable.woff2',
  variable: '--font-bricolage',
  weight: '200 800',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial']
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'UnfollowX Pro — Free & Unlimited X Unfollow Tool', template: '%s | UnfollowX Pro' },
  description: 'Clean up your X following list with UnfollowX Pro. Find non-followers, track unfollowers, filter inactive accounts and manage your connections. Free forever, no subscription.',
  applicationName: SITE_NAME,
  category: 'technology',
  creator: 'Shahriar Ahmed',
  publisher: 'Unique Labs',
  formatDetection: { telephone: false, email: false, address: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  openGraph: { type: 'website', siteName: SITE_NAME, locale: 'en_US', url: `${SITE_URL}/` },
  twitter: { card: 'summary_large_image' }
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f8fc' },
    { media: '(prefers-color-scheme: dark)', color: '#07090f' }
  ],
  colorScheme: 'light dark'
};

// Runs before first paint so the saved or system theme never flashes.
const themeScript = `(function(){try{var t=localStorage.getItem('unfollowx-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}var d=document.documentElement;d.dataset.theme=t;d.style.colorScheme=t}catch(e){}})();`;

const siteGraph = {
  '@context': 'https://schema.org',
  '@graph': [organizationSchema, websiteSchema, authorSchema].map(({ '@context': _, ...node }) => node)
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" data-scroll-behavior="smooth" className={`${inter.variable} ${bricolage.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Google tag (GTM-M4QHPXQV + GA4) with Consent Mode v2 defaults — see lib/analytics-config.js */}
        <script dangerouslySetInnerHTML={{ __html: googleTagHeadScript() }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <JsonLd data={siteGraph} />
        <SiteHeader />
        <main id="main" tabIndex={-1}>{children}</main>
        <SiteFooter />
        <RevealOnView />
        <Analytics />
      </body>
    </html>
  );
}
