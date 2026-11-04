import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import RevealOnView from '@/components/RevealOnView';
import { Analytics } from '@vercel/analytics/next';

export const dynamic = 'force-dynamic';

export const metadata = {
  metadataBase: new URL('https://www.unfollowx.com'),
  title: { default: 'UnfollowX Pro — A clearer view of your X following', template: '%s | UnfollowX Pro' },
  description: 'Review your X following list with UnfollowX Pro. Find non-followers, track follower changes and choose who stays with a free Chrome extension.',
  applicationName: 'UnfollowX Pro',
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

export default function RootLayout({ children }) {
  return <html lang="en" data-theme="light"><body><SiteHeader /><main>{children}</main><SiteFooter /><RevealOnView /><Analytics /></body></html>;
}
