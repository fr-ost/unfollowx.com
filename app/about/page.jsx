import Link from 'next/link';
import '../styles/pages.css';
import Breadcrumbs from '@/components/Breadcrumbs';
import CtaBand from '@/components/CtaBand';
import Icon from '@/components/Icon';
import JsonLd from '@/components/JsonLd';
import SupportBox from '@/components/SupportBox';
import { AUTHOR_ID, ORGANIZATION_ID, SOFTWARE_ID, WEBSITE_ID, buildMetadata } from '@/lib/seo';
import { DEVELOPER, EXTENSION, PUBLISHER, STORE_URL, absoluteUrl } from '@/lib/site';

const PATH = '/about';

export const metadata = buildMetadata({
  title: 'About UnfollowX Pro – Who Makes It',
  description: 'Who makes UnfollowX Pro: an independent, free Chrome extension for Twitter (X), built by Shahriar Ahmed and published by Unique Labs. Not affiliated with X.',
  path: PATH
});

export default function AboutPage() {
  const url = absoluteUrl(PATH);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${url}#webpage`,
    url,
    name: 'About UnfollowX Pro',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANIZATION_ID },
    mainEntity: { '@id': SOFTWARE_ID },
    author: { '@id': AUTHOR_ID },
    inLanguage: 'en'
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className="page-hero">
        <div className="container-narrow">
          <Breadcrumbs items={[{ name: 'About', path: PATH }]} />
          <div className="eyebrow" style={{ marginTop: 28 }}>About</div>
          <h1>Who makes <span className="gradient-text">UnfollowX Pro</span></h1>
          <p className="lead">UnfollowX Pro is a free Chrome extension for Twitter (X) that helps you see who doesn’t follow you back, track follower changes and mass unfollow at a safe pace. It is an independent product, built and supported by one developer.</p>
        </div>
      </section>

      <section className="container-narrow prose">
        <h2>The developer</h2>
        <p>UnfollowX Pro is built and maintained by <a href={DEVELOPER.url} target="_blank" rel="noopener author">{DEVELOPER.name}</a> and published by {PUBLISHER}. The same person answers support messages, so bug reports and feature ideas reach the person who writes the code.</p>

        <h2>What UnfollowX Pro is</h2>
        <ul>
          <li><strong>A Chrome extension</strong> for x.com and twitter.com (desktop Chrome {EXTENSION.minChrome}+), currently version {EXTENSION.version}, available on the <a href={STORE_URL} target="_blank" rel="noopener" data-install="" data-location="about">Chrome Web Store</a>.</li>
          <li><strong>Free forever:</strong> no subscription, no premium tier and no paywalled features. An optional donation page inside the extension supports development.</li>
          <li><strong>Private by design:</strong> it works in your existing X session, never asks for your password, and keeps your lists in Chrome storage on your computer. See the <Link href="/privacy">privacy policy</Link>.</li>
          <li><strong>Seven languages:</strong> {EXTENSION.languages.join(', ')}.</li>
        </ul>

        <h2>What it helps you do</h2>
        <p>Find <Link href="/twitter-non-followers-checker">who doesn’t follow you back</Link>, see <Link href="/x-follower-tracker">who unfollowed you</Link>, filter inactive accounts, protect important accounts with a whitelist and Keep rules, and <Link href="/mass-unfollow-twitter">mass unfollow on Twitter (X)</Link> with delays, breaks and a daily limit. Every feature is listed on the <Link href="/features">features page</Link>.</p>

        <h2>Independence</h2>
        <p className="callout"><Icon name="info" /><span>UnfollowX Pro is independent and not affiliated with, endorsed by or sponsored by X Corp. X and Twitter are trademarks of their owners. X applies its own rules and limits to every account, whatever tool you use.</span></p>
      </section>

      <div className="container lp-section">
        <SupportBox id="support" />
      </div>

      <CtaBand location="about_cta" title="Try UnfollowX Pro — it’s free." text="No sign-up, no password, no subscription." secondary={{ label: 'How mass unfollow works', href: '/mass-unfollow-twitter' }} />
    </>
  );
}
