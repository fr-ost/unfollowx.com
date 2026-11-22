import Link from 'next/link';
import '@/app/styles/pages.css';
import ArticleCard from '@/components/ArticleCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import CtaBand from '@/components/CtaBand';
import FaqAccordion from '@/components/FaqAccordion';
import Icon from '@/components/Icon';
import InstallLink from '@/components/InstallLink';
import JsonLd from '@/components/JsonLd';
import Screenshot from '@/components/Screenshot';
import { getArticle } from '@/lib/blog';
import { faqPageSchema } from '@/lib/faq';
import { SOFTWARE_ID, WEBSITE_ID, buildMetadata } from '@/lib/seo';
import { EXTENSION, absoluteUrl } from '@/lib/site';

const PATH = '/alternatives/circleboom';
const TITLE = 'Free Circleboom Alternative for Mass Unfollow on Twitter (X)';

export const metadata = buildMetadata({
  title: TITLE,
  absoluteTitle: true,
  description: 'Looking for a free Circleboom alternative to mass unfollow on Twitter (X)? Compare UnfollowX Pro: free Chrome extension, no password, whitelist, safe pace.',
  path: PATH
});

// ---------------------------------------------------------------------------
// Competitor facts. TODO(owner): re-verify every Circleboom cell on
// circleboom.com before each update and change `checked` below.
// Checked 2026-11-22 from search results only (circleboom.com could not be
// opened from the build environment):
//   - Pricing page: a free plan with limits and several paid plans. Prices are
//     deliberately NOT quoted (they change and differ between sources).
//   - Help center, "What are the limitations of your app": the freemium plan
//     excludes some modules including Whitelist/Blacklist; unfollows are
//     limited to 50 per 15 minutes and 800 per 24 hours (corrected 2026-11-22).
//   - Account connection: assumed to be X's official app authorisation
//     (OAuth) — TODO confirm.
// Unverified cells say "check Circleboom’s site" instead of guessing.
// ---------------------------------------------------------------------------
const checked = 'November 2026';

const rows = [
  ['What it is', 'A Chrome extension focused on your following list', 'A web-based social media management tool (Twitter/X and other networks)'],
  ['Price', 'Free forever — no paid tier, no trial', 'Free plan with limits; paid plans for more (see Circleboom’s pricing page)'],
  ['How it reaches your account', 'Inside the X session already signed in to Chrome; never asks for your password', 'You connect your X account to Circleboom’s web app (check the permissions it requests)'],
  ['Find non-followers and inactive accounts', 'Yes — Don’t follow back, Mutuals, Inactive 30d / 90d / 180d / 1y, Not blue', 'Yes (check Circleboom’s site for current filters)'],
  ['Whitelist', 'Included, respected in every mode, plus Keep rules', 'Listed by Circleboom’s help center as not included in the free plan'],
  ['Pacing', `Random delays, breaks and a daily limit you set (${EXTENSION.defaultDailyLimit} by default); rests or stops when X asks`, 'Up to 800 unfollows per 24 hours (50 per 15 minutes), per its help center (checked Nov 2026)'],
  ['Where your lists are kept', 'Chrome extension storage on your computer', 'Processed by Circleboom’s online service (see its privacy policy)'],
  ['Undo', 'History with Follow again', 'Check Circleboom’s site'],
  ['Posting, scheduling, analytics', 'No — following management only', 'Yes — part of its wider toolset'],
  ['Works on phone', 'No — desktop Chrome 116+', 'In a browser (check Circleboom’s site for mobile apps)']
];

const switchSteps = [
  { name: 'Install UnfollowX Pro', text: 'Add the free extension from the Chrome Web Store and open x.com in Chrome while signed in. There is no account to create.' },
  { name: 'Scan and protect', text: 'Press “Scan my following”, then whitelist the accounts you always want to keep and turn on any Keep rules you need.' },
  { name: 'Review and unfollow at a safe pace', text: 'Filter the list, select the accounts to remove and start a paced run. If you no longer use another tool, remove its access in X’s settings under connected apps.' }
];

const faqs = [
  { id: 'free', q: 'Is UnfollowX Pro really a free Circleboom alternative?', a: ['For following management, yes. UnfollowX Pro is free forever with no paid tier: non-follower and inactive filters, whitelist, Keep rules, CSV, history and paced bulk unfollow are all included. It doesn’t replace Circleboom’s posting, scheduling or analytics tools.'] },
  { id: 'password', q: 'Do I have to connect my X account or share my password?', a: ['No. UnfollowX Pro runs inside the X session you are already signed in to in Chrome. It never asks for your password and has no account system of its own.'] },
  { id: 'both', q: 'Can I use UnfollowX Pro and Circleboom together?', a: ['Yes, they don’t conflict. Avoid running bulk actions in both at the same time, though: X counts every action on your account, whichever tool makes it.'] },
  { id: 'limits', q: 'Will switching tools change X’s limits?', a: ['No. X applies the same limits and rules to every account whatever tool you use, and no tool can guarantee X will never limit an account. UnfollowX Pro paces runs with delays, breaks and a daily limit, rests when X asks it to slow down and stops if X asks you to verify.'] },
  { id: 'accurate', q: 'How accurate is this comparison?', a: [`We make UnfollowX Pro, so we are not neutral. Circleboom details come from its public pricing and help pages as of ${checked} and may have changed. We don’t quote prices; check Circleboom’s own pricing page.`] }
];

export default function CircleboomAlternativePage() {
  const url = absoluteUrl(PATH);
  const guides = ['best-free-x-unfollow-tools-what-to-look-for', 'how-to-mass-unfollow-accounts-on-x', 'how-to-see-who-doesnt-follow-you-back-on-x'].map(getArticle).filter(Boolean);

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: TITLE,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': SOFTWARE_ID },
    inLanguage: 'en'
  };
  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${url}#howto`,
    name: 'How to switch to UnfollowX Pro for mass unfollowing on Twitter (X)',
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
    step: switchSteps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.name, text: s.text }))
  };

  return (
    <>
      <JsonLd data={[webPage, howTo, faqPageSchema(faqs, url)]} />

      <section className="container lp-hero">
        <div className="page-hero">
          <Breadcrumbs items={[{ name: 'Circleboom alternative', path: PATH }]} />
          <div className="eyebrow" style={{ marginTop: 28 }}>Circleboom alternative</div>
          <h1>Free Circleboom Alternative for Mass Unfollow on <span className="gradient-text">Twitter (X)</span></h1>
          <p className="lead">If all you need from Circleboom is cleaning up who you follow, UnfollowX Pro does that job for free: a Chrome extension that finds non-followers and inactive accounts and lets you mass unfollow on Twitter (X) at a safe pace — no password, no subscription.</p>
          <div className="cta-row">
            <InstallLink location="circleboom_hero" size="lg" />
            <Link className="btn btn-secondary btn-lg" href="/mass-unfollow-twitter" data-cta="How mass unfollow works" data-cta-location="circleboom_hero">How it works <Icon name="arrowRight" className="btn-arrow" /></Link>
          </div>
        </div>
        <Screenshot shot="following" preload alt="Circleboom alternative for Twitter unfollow: the UnfollowX Pro Following page with the Don’t follow back tab, filters, whitelist shields and bulk actions" caption="UnfollowX Pro’s Following page (real interface, sample accounts)" sizes="(max-width: 960px) 100vw, 580px" className="lp-shot" />
      </section>

      <section className="container lp-section" aria-labelledby="compare">
        <div className="section-head" data-reveal="">
          <div className="eyebrow">Side by side</div>
          <h2 id="compare">UnfollowX Pro vs Circleboom for unfollowing</h2>
          <p>A factual comparison for one job: managing who you follow on X. Circleboom details come from its public pricing and help pages as of {checked} and may have changed; anything we couldn’t confirm says so.</p>
        </div>
        <div className="table-wrap" data-reveal="">
          <table>
            <caption className="visually-hidden">UnfollowX Pro compared with Circleboom for managing an X following list</caption>
            <thead><tr><th scope="col">Feature</th><th scope="col">UnfollowX Pro</th><th scope="col">Circleboom</th></tr></thead>
            <tbody>{rows.map(([k, us, them]) => <tr key={k}><th scope="row">{k}</th><td>{us}</td><td>{them}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="lp-note">Circleboom is a trademark of its owner. UnfollowX Pro is not affiliated with Circleboom or X Corp.</p>
      </section>

      <section className="container lp-section" aria-labelledby="choose">
        <div className="lp-cards lp-cards-two" data-stagger="70">
          <div className="card">
            <span className="icon-tile green"><Icon name="check" /></span>
            <h2 id="choose" className="lp-card-title">Choose UnfollowX Pro if…</h2>
            <ul className="lp-points" role="list">
              <li><Icon name="check" />You mainly want to unfollow non-followers, inactive or low-quality accounts</li>
              <li><Icon name="check" />You want every feature free, with no plan limits</li>
              <li><Icon name="check" />You’d rather not connect your account to an online service</li>
              <li><Icon name="check" />You want a whitelist and Keep rules protecting every run</li>
            </ul>
          </div>
          <div className="card">
            <span className="icon-tile"><Icon name="layers" /></span>
            <h2 className="lp-card-title">Circleboom may suit you better if…</h2>
            <ul className="lp-points" role="list">
              <li><Icon name="check" />You also want post scheduling and analytics in the same tool</li>
              <li><Icon name="check" />You manage several social networks, not only X</li>
              <li><Icon name="check" />You need to work from a browser where you can’t install extensions</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container lp-section" aria-labelledby="switch">
        <div className="lp-split">
          <div data-reveal="">
            <div className="eyebrow">Switching</div>
            <h2 id="switch">Switch in three steps</h2>
            <ol className="lp-steps" role="list" style={{ marginTop: 'var(--space-6)' }}>
              {switchSteps.map((s) => <li key={s.name}><div><b>{s.name}</b><span>{s.text}</span></div></li>)}
            </ol>
          </div>
          <Screenshot shot="settingsSpeed" alt="Twitter unfollow tool speed presets in UnfollowX Pro: Safe, Balanced and Fast, with delay, break and daily limit settings" caption="Speed presets: Safe, Balanced and Fast (real interface)" sizes="(max-width: 960px) 100vw, 580px" />
        </div>
      </section>

      <section className="container lp-section" aria-labelledby="cb-faq">
        <div className="section-head" data-reveal=""><div className="eyebrow">Questions</div><h2 id="cb-faq">Circleboom alternative FAQ</h2></div>
        <FaqAccordion items={faqs} idPrefix="cb-faq" />
      </section>

      <section className="container lp-section" aria-labelledby="cb-guides">
        <div className="section-head" data-reveal=""><div className="eyebrow">Related</div><h2 id="cb-guides">Compare and learn more</h2></div>
        <div className="article-grid">{guides.map((a) => <ArticleCard key={a.slug} article={a} location="circleboom_guides" />)}</div>
        <p className="lp-note">Also see the <Link href="/mass-unfollow-twitter">mass unfollow tool</Link>, the <Link href="/twitter-non-followers-checker">non-followers checker</Link> and <Link href="/features">all features</Link>.</p>
      </section>

      <CtaBand location="circleboom_cta" title="Clean up who you follow — free." text="A focused, free alternative for unfollowing on Twitter (X). No password, no subscription, whitelist always respected." secondary={{ label: 'How mass unfollow works', href: '/mass-unfollow-twitter' }} />
    </>
  );
}
