import Link from 'next/link';
import Icon from '@/components/Icon';
import InstallLink from '@/components/InstallLink';
import { ConsentSettingsButton } from '@/components/Analytics';
import { CONTACT_EMAIL, PUBLISHER, STORE_URL, TELEGRAM_URL } from '@/lib/site';

const columns = [
  {
    title: 'Product',
    links: [
      ['Features', '/features'],
      ['How it works', '/#how-it-works'],
      ['Setup guide', '/setup'],
      ['Non-followers checker', '/twitter-non-followers-checker'],
      ['Follower tracker', '/x-follower-tracker'],
      ['Chrome Web Store', STORE_URL]
    ]
  },
  {
    title: 'Learn',
    links: [
      ['How-to guides', '/guides'],
      ['Blog', '/blog'],
      ['FAQ', '/faq'],
      ['Free forever promise', '/#free-forever']
    ]
  },
  {
    title: 'Company',
    links: [
      ['Privacy policy', '/privacy'],
      ['Contact & support', '/faq#support'],
      ['Telegram support', TELEGRAM_URL],
      ['Email support', `mailto:${CONTACT_EMAIL}`]
    ]
  }
];

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <Link className="brand" href="/" data-nav="footer" data-nav-item="Home">
            <img src="/assets/logo.svg" alt="" width="30" height="30" />
            <span>UnfollowX <span className="brand-pro">PRO</span></span>
          </Link>
          <p>A Chrome extension for reviewing who you follow on X. Find non-followers, track follower changes and choose who stays. Free forever, with no premium plan.</p>
          <InstallLink location="footer" size="sm" />
        </div>
        {columns.map((column) => (
          <div className="footer-col" key={column.title}>
            <h2>{column.title}</h2>
            <ul>
              {column.links.map(([label, href]) => {
                const external = href.startsWith('http') || href.startsWith('mailto:');
                return (
                  <li key={label}>
                    {external ? (
                      href === STORE_URL ? (
                        <a href={href} target="_blank" rel="noopener" data-install="" data-location="footer_links">{label}</a>
                      ) : (
                        <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>{label}</a>
                      )
                    ) : (
                      <Link href={href} data-nav="footer" data-nav-item={label}>{label}</Link>
                    )}
                  </li>
                );
              })}
              {column.title === 'Company' ? <li><ConsentSettingsButton /></li> : null}
            </ul>
          </div>
        ))}
      </div>
      <div className="container footer-bottom">
        <span>© {year} UnfollowX Pro · A product of {PUBLISHER}</span>
        <span className="footer-promise"><Icon name="infinity" /> Free forever. No subscription. No premium paywall.</span>
        <span>Independent product. Not affiliated with, endorsed by or sponsored by X Corp. X and Twitter are trademarks of their owners.</span>
      </div>
    </footer>
  );
}
