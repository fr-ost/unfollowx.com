import Link from 'next/link';
import './styles/home.css';
import HeroDashboard from '@/components/HeroDashboard';
import ProductDemo from '@/components/ProductDemo';
import FaqAccordion from '@/components/FaqAccordion';
import ArticleCard from '@/components/ArticleCard';
import CtaBand from '@/components/CtaBand';
import Icon from '@/components/Icon';
import InstallLink from '@/components/InstallLink';
import JsonLd from '@/components/JsonLd';
import Screenshot from '@/components/Screenshot';
import SupportBox from '@/components/SupportBox';
import { features } from '@/lib/features';
import { homeFaqs } from '@/lib/faq';
import { getArticle } from '@/lib/blog';
import { pageMetadata, softwareSchema } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'UnfollowX Pro — Free & Unlimited X Unfollow Tool',
  absoluteTitle: true,
  description: 'Clean up your X following list with UnfollowX Pro. Find non-followers, track unfollowers and filter inactive accounts. Free forever, unlimited, no subscription.',
  path: '/'
});

const trust = [
  'No sign-up required',
  'No X password requested',
  'No subscription',
  'No premium unlocks',
  'Your lists stay in Chrome storage'
];

const freeCards = [
  { icon: 'wallet', title: '$0 forever', text: 'No price today, no price later. Installing and using every feature costs nothing.' },
  { icon: 'infinity', title: 'Unlimited product access', text: 'No caps set by UnfollowX Pro on scans, reviews or actions — and nothing reserved for “Pro” users.' },
  { icon: 'card', title: 'No subscription', text: 'Nothing to subscribe to, nothing to cancel. The extension never asks for payment details.' },
  { icon: 'unlock', title: 'No premium unlocks', text: 'Whitelist, Keep rules, CSV, history, snapshots — every feature is available from the first minute.' }
];

const receipt = [
  ['Non-follower scan', 'Unlimited'],
  ['Unfollower tracker', 'Unlimited'],
  ['Inactive & not-blue filters', 'Included'],
  ['Whitelist & Keep rules', 'Included'],
  ['CSV import & export', 'Included'],
  ['History & follow again', 'Included'],
  ['Multiple X accounts', 'Included']
];

const highlightIds = ['non-followers', 'follower-changes', 'inactive', 'keep-rules', 'pacing'];

const comparison = [
  ['Price', '$0, forever', 'Monthly or yearly fee for full access'],
  ['Subscription required', 'Never', 'Yes, for paid plans'],
  ['Premium tier', 'None — one free product', 'Features split across plans'],
  ['Usage caps set by the tool', 'None', 'Often tied to the plan'],
  ['Non-follower detection', 'Included', 'Depends on the tool and plan'],
  ['Smart filters (inactive, not blue, ratio…)', 'Included', 'Depends on the tool and plan'],
  ['Whitelist & Keep rules', 'Included', 'Depends on the tool and plan'],
  ['CSV export & import', 'Included', 'Depends on the tool and plan'],
  ['Action history & follow again', 'Included', 'Depends on the tool and plan'],
  ['Follower snapshots (who unfollowed you)', 'Included', 'Depends on the tool and plan'],
  ['X’s own rate limits still apply', 'Yes', 'Yes — for every tool']
];

const blogSlugs = [
  'how-to-see-who-doesnt-follow-you-back-on-x',
  'how-to-find-out-who-unfollowed-you-on-x',
  'how-to-mass-unfollow-accounts-on-x',
  'how-to-find-inactive-accounts-on-x'
];

function FeatureVisual({ id }) {
  if (id === 'non-followers') {
    return (
      <div className="fv fv-ring" aria-hidden="true">
        <svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="46" className="ring-bg" /><circle cx="60" cy="60" r="46" className="ring-a" pathLength="100" /><circle cx="60" cy="60" r="46" className="ring-b" pathLength="100" /></svg>
        <div className="fv-ring-legend"><span><i className="mut" />1,410 mutuals</span><span><i className="non" />432 don’t follow back</span></div>
      </div>
    );
  }
  if (id === 'follower-changes') {
    return (
      <div className="fv fv-snap" aria-hidden="true">
        <div className="snap back"><small>Snapshot · Oct 30</small><b>1,438</b></div>
        <div className="snap front"><small>Snapshot · Nov 3</small><b>1,427</b><span className="pills"><em className="minus">−23 left</em><em className="plus">+12 new</em></span></div>
      </div>
    );
  }
  if (id === 'inactive') {
    const bars = [['30d+', 280, 100], ['90d+', 240, 86], ['180d+', 217, 77], ['1y+', 173, 62]];
    return (
      <div className="fv fv-bars" aria-hidden="true">
        {bars.map(([label, n, h]) => <div key={label} className="bar"><span style={{ '--h': `${h}%` }}><b>{n}</b></span><small>{label}</small></div>)}
      </div>
    );
  }
  if (id === 'keep-rules') {
    return (
      <div className="fv fv-rules" aria-hidden="true">
        {[['Whitelisted accounts', true], ['Verified accounts', true], ['Followed in last 14 days', true], ['Bio mentions “studio”', false]].map(([label, on]) => (
          <div key={label} className="rule"><span>{label}</span><i className={on ? 'on' : ''} /></div>
        ))}
      </div>
    );
  }
  if (id === 'pacing') {
    return (
      <div className="fv fv-pace" aria-hidden="true">
        <div className="presets"><span>Safe</span><span className="on">Balanced</span><span>Fast</span></div>
        <div className="pace-grid"><span><small>Between actions</small><b>8–20 s</b></span><span><small>Break</small><b>6 min / 50</b></span><span><small>Daily limit</small><b>400</b></span></div>
      </div>
    );
  }
  return null;
}

export default function HomePage() {
  const highlights = highlightIds.map((id) => features.find((f) => f.id === id));
  const rest = features.filter((f) => !highlightIds.includes(f.id));
  const posts = blogSlugs.map(getArticle).filter(Boolean);

  return (
    <>
      <JsonLd data={softwareSchema} />

      {/* ---------- Hero ---------- */}
      <section className="home-hero">
        <div className="hero-bg" aria-hidden="true"><span className="aurora a" /><span className="aurora b" /><span className="hero-grid" /></div>
        <div className="container hero-layout">
          <div className="hero-copy">
            <span className="badge hero-badge"><span className="badge-dot"><Icon name="check" strokeWidth={3} /></span>Free forever · Unlimited</span>
            <h1>The Ultimate X Unfollow Tool. <span className="gradient-text">Free Forever.</span></h1>
            <p className="hero-lede">Find non-followers, track follower changes, filter inactive accounts and manage your X following list with powerful tools. No subscriptions, no premium plans, no artificial usage limits. Just free.</p>
            <div className="cta-row hero-ctas">
              <InstallLink location="hero" size="lg">Add to Chrome — It’s Free</InstallLink>
              <Link className="btn btn-secondary btn-lg" href="/features" data-cta="Explore Features" data-cta-location="hero">Explore Features <Icon name="arrowRight" className="btn-arrow" /></Link>
            </div>
            <ul className="hero-trust" role="list">
              {trust.map((item) => <li key={item}><Icon name="check" strokeWidth={2.4} />{item}</li>)}
            </ul>
          </div>
          <HeroDashboard />
        </div>
        <div className="container">
          <p className="hero-caption">Dashboard above uses fictional sample accounts. UnfollowX Pro is an independent Chrome extension for x.com and twitter.com.</p>
        </div>
      </section>

      <div className="fact-strip">
        <div className="container fact-inner">
          <span><Icon name="globe" />Works on x.com &amp; twitter.com</span>
          <span><Icon name="refresh" />New and classic X layouts</span>
          <span><Icon name="monitor" />Chrome 116+ on desktop</span>
          <span><Icon name="book" />7 interface languages</span>
          <span><Icon name="moon" />Light &amp; dark themes</span>
        </div>
      </div>

      {/* ---------- Free forever ---------- */}
      <section className="section free-section" id="free-forever" aria-labelledby="free-title">
        <div className="container free-layout">
          <div className="free-copy">
            <div className="eyebrow">The free-forever promise</div>
            <h2 id="free-title">Everything. Free. <span className="free-word">Forever.</span></h2>
            <p className="free-lede">Not a free trial. Not a limited free plan. Not a product that asks you to upgrade later. UnfollowX Pro is free to use, with no subscription and no premium paywall.</p>
            <div className="free-cards" data-stagger="80">
              {freeCards.map((card) => (
                <div className="free-card" key={card.title}>
                  <span className="free-icon"><Icon name={card.icon} /></span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              ))}
            </div>
            <blockquote className="free-promise">
              <p>“We believe useful tools should be accessible to everyone. That’s why UnfollowX Pro is free, and will remain free.”</p>
            </blockquote>
          </div>
          <div className="receipt-wrap" data-reveal="scale">
            <div className="receipt" aria-label="Your UnfollowX Pro bill: every feature included, total $0.00">
              <div className="receipt-head"><img src="/assets/logo.svg" alt="" width="28" height="28" /><span><b>UnfollowX Pro</b><small>Your bill, today and every day</small></span></div>
              <ul role="list">
                {receipt.map(([item, value]) => <li key={item}><span>{item}</span><em>{value}</em><b className="tabular">$0.00</b></li>)}
              </ul>
              <div className="receipt-total"><span>Total</span><b className="tabular">$0.00</b></div>
              <div className="receipt-foot"><span>Billing period</span><b>Forever</b></div>
              <div className="receipt-stamp" aria-hidden="true">PAID<br /><small>by nobody</small></div>
            </div>
          </div>
        </div>
        <div className="container">
          <p className="free-footnote"><Icon name="info" /> <span><b>Unlimited product access ≠ unlimited platform actions.</b> UnfollowX Pro sets no usage quotas, but X applies its own rate limits and rules to every account. Pacing controls help you stay measured; no tool can guarantee X will permit every action. <Link href="/faq#faq-rate-limits">How X limits work</Link></span></p>
        </div>
      </section>

      {/* ---------- Interactive demo ---------- */}
      <section className="section demo-section" id="demo" aria-labelledby="demo-title">
        <div className="container">
          <div className="section-head center" data-reveal="">
            <div className="eyebrow">Try it here</div>
            <h2 id="demo-title">See how a review feels — <span className="gradient-text">before you install.</span></h2>
            <p>Switch views, filter, search, protect and select. Everything below uses fictional sample accounts and runs in this page only. It never touches your X account.</p>
          </div>
          <ProductDemo />
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <section className="section features-section" id="features" aria-labelledby="features-title">
        <div className="container">
          <div className="section-head" data-reveal="">
            <div className="eyebrow">Features</div>
            <h2 id="features-title">Every tool for a cleaner following list. <span className="gradient-text">All included.</span></h2>
            <p>Find who doesn’t follow back, see who left, spot quiet accounts and act with care. Each feature below is in the extension today — none of them cost anything.</p>
          </div>
          <div className="bento" data-stagger="60">
            {highlights.map((f, index) => (
              <article className={`card card-hover bento-card bento-${index}`} key={f.id} data-spotlight="">
                <div className="bento-text">
                  <span className={`icon-tile ${f.tone === 'blue' || f.tone === 'violet' ? '' : f.tone}`}><Icon name={f.icon} /></span>
                  <h3>{f.title}</h3>
                  <p>{f.short}</p>
                  <Link className="text-link" href={`/features#${f.id}`} data-cta="feature_detail" data-cta-location="home_features">How it works <Icon name="arrowRight" className="arrow" size={15} /></Link>
                </div>
                <FeatureVisual id={f.id} />
              </article>
            ))}
          </div>
          <div className="mini-features" data-stagger="40">
            {rest.map((f) => (
              <Link className="mini-feature" key={f.id} href={`/features#${f.id}`} data-cta="feature_detail" data-cta-location="home_features_grid">
                <span className={`icon-tile ${f.tone === 'blue' || f.tone === 'violet' ? '' : f.tone}`}><Icon name={f.icon} /></span>
                <span><b>{f.title}</b><small>{f.short}</small></span>
              </Link>
            ))}
          </div>
          <div className="section-cta" data-reveal="">
            <Link className="btn btn-secondary" href="/features" data-cta="Explore all features" data-cta-location="home_features">Explore all features <Icon name="arrowRight" className="btn-arrow" /></Link>
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="section how-section" id="how-it-works" aria-labelledby="how-title">
        <div className="container">
          <div className="section-head center" data-reveal="">
            <div className="eyebrow">How it works</div>
            <h2 id="how-title">Three steps. <span className="gradient-text">You decide every one.</span></h2>
            <p>Scanning is read-only. Nothing changes on your account until you review the results and choose an action.</p>
          </div>
          <ol className="steps" data-stagger="90" role="list">
            <li className="card step">
              <span className="step-num">01</span>
              <h3>Install UnfollowX Pro</h3>
              <p>Add it from the Chrome Web Store. No account to create, no password to share.</p>
              <div className="step-visual sv-install" aria-hidden="true"><span className="sv-btn"><Icon name="install" />Add to Chrome</span><span className="sv-ok"><Icon name="checkCircle" />Added</span></div>
            </li>
            <li className="card step">
              <span className="step-num">02</span>
              <h3>Open X and scan your following list</h3>
              <p>Sign in to x.com as usual, click the extension and press “Scan my following”. It reads — it doesn’t change anything.</p>
              <div className="step-visual sv-scan" aria-hidden="true"><span className="sv-bar"><i /></span><span className="sv-text tabular">Reading 1,284 / 1,842</span></div>
            </li>
            <li className="card step">
              <span className="step-num">03</span>
              <h3>Review, filter and choose what to do</h3>
              <p>Protect who matters, select who goes, and start a paced run you can pause or stop — or simply close the tab.</p>
              <div className="step-visual sv-choose" aria-hidden="true"><span className="on"><Icon name="shield" />Keep</span><span><Icon name="userMinus" />Unfollow</span><span><Icon name="download" />Export</span></div>
            </li>
          </ol>
          <div className="how-foot" data-reveal="">
            <p><Icon name="shield" /> <span>You stay in control: whitelisted accounts are never unfollowed, runs can be paused or stopped anytime (<kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd>), and History lets you follow again.</span></p>
            <div className="cta-row">
              <InstallLink location="how_it_works" />
              <Link className="text-link" href="/setup" data-cta="Read the setup guide" data-cta-location="how_it_works">Read the full setup guide <Icon name="arrowRight" className="arrow" size={15} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Real screenshots ---------- */}
      <section className="section-tight shots-section" aria-labelledby="shots-title">
        <div className="container">
          <div className="section-head" data-reveal="">
            <div className="eyebrow">The real extension</div>
            <h2 id="shots-title">Not a mockup. This is UnfollowX Pro.</h2>
            <p>Screenshots of the actual popup and dashboard, shown with fictional sample accounts.</p>
          </div>
          <div className="shots-grid" data-stagger="90">
            <Screenshot shot="popup" className="shot-popup" caption="Popup after a scan" sizes="(max-width: 860px) 340px, 340px" />
            <Screenshot shot="overview" className="shot-wide" caption="Dashboard overview with a paced run in progress" sizes="(max-width: 860px) 100vw, 780px" />
            <Screenshot shot="inactive" className="shot-wide2" caption="Following → Inactive, in dark mode" sizes="(max-width: 860px) 100vw, 780px" />
          </div>
        </div>
      </section>

      {/* ---------- Privacy ---------- */}
      <section className="section privacy-section" id="privacy" aria-labelledby="privacy-title">
        <div className="container privacy-layout">
          <div className="privacy-copy" data-reveal="">
            <div className="eyebrow">Privacy &amp; trust</div>
            <h2 id="privacy-title">Your account. Your browser. <span className="gradient-text">Your control.</span></h2>
            <p className="lead">UnfollowX Pro works inside the X session you already use in Chrome. Here is exactly what that means — including the small amount of data that does leave your browser.</p>
            <Link className="text-link" href="/privacy" data-cta="Read the privacy policy" data-cta-location="home_privacy">Read the full privacy policy <Icon name="arrowRight" className="arrow" size={15} /></Link>
          </div>
          <ul className="privacy-list" role="list" data-stagger="60">
            <li><span className="icon-tile green"><Icon name="key" /></span><div><h3>Uses your existing X session</h3><p>Requests go to X itself (x.com, twitter.com and X’s app files on abs.twimg.com), the same way X’s website talks to X.</p></div></li>
            <li><span className="icon-tile green"><Icon name="lock" /></span><div><h3>Never asks for your X password</h3><p>It doesn’t sign in for you and has no account system of its own.</p></div></li>
            <li><span className="icon-tile"><Icon name="database" /></span><div><h3>Lists stay in Chrome extension storage</h3><p>Scans, follower snapshots, whitelist, settings and action history are saved on your device — not uploaded to the developer.</p></div></li>
            <li><span className="icon-tile amber"><Icon name="chart" /></span><div><h3>Anonymous usage stats — on by default, easy to turn off</h3><p>A random install ID, extension version, install / daily-active / uninstall events and a daily count of follow and unfollow actions. Country is derived on the server. Never your X account, lists or history. Off switch: Settings → Privacy.</p></div></li>
            <li><span className="icon-tile red"><Icon name="trash" /></span><div><h3>Delete everything in one click</h3><p>Settings → Delete all extension data, or delete one X account’s data. Removing the extension clears it too.</p></div></li>
            <li><span className="icon-tile"><Icon name="bell" /></span><div><h3>Notifications are optional</h3><p>Off by default. Chrome asks for permission only if you switch them on.</p></div></li>
          </ul>
        </div>
      </section>

      {/* ---------- Comparison ---------- */}
      <section className="section compare-section" aria-labelledby="compare-title">
        <div className="container">
          <div className="section-head center" data-reveal="">
            <div className="eyebrow">Comparison</div>
            <h2 id="compare-title">Why choose UnfollowX Pro?</h2>
            <p>How a free-forever tool compares with the general model of subscription and freemium unfollow tools. Every tool differs — check any tool’s current pricing page before you decide.</p>
          </div>
          <div className="table-wrap compare-table" data-reveal="">
            <table>
              <caption className="visually-hidden">UnfollowX Pro compared with subscription or freemium unfollow tools in general</caption>
              <thead><tr><th scope="col">What you get</th><th scope="col" className="col-us">UnfollowX Pro</th><th scope="col">Subscription &amp; freemium tools</th></tr></thead>
              <tbody>
                {comparison.map(([label, us, them]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td className="col-us"><span className="yes"><Icon name="check" strokeWidth={2.6} />{us}</span></td>
                    <td className="them">{them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="compare-note">Read our guide to <Link href="/blog/best-free-x-unfollow-tools-what-to-look-for">choosing a free X unfollow tool</Link> for a checklist you can apply to any option.</p>
        </div>
      </section>

      {/* ---------- Blog ---------- */}
      <section className="section-tight blog-preview" aria-labelledby="blog-title">
        <div className="container">
          <div className="section-head-row" data-reveal="">
            <div className="section-head">
              <div className="eyebrow">Guides</div>
              <h2 id="blog-title">Learn the smart way to manage X.</h2>
            </div>
            <Link className="btn btn-secondary btn-sm" href="/blog" data-cta="All articles" data-cta-location="home_blog">All articles <Icon name="arrowRight" className="btn-arrow" /></Link>
          </div>
          <div className="article-grid four" data-stagger="70">
            {posts.map((post) => <ArticleCard key={post.slug} article={post} location="home_blog" />)}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section faq-section" id="faq" aria-labelledby="faq-title">
        <div className="container faq-layout">
          <div className="faq-intro" data-reveal="">
            <div className="eyebrow">FAQ</div>
            <h2 id="faq-title">Questions, answered honestly.</h2>
            <p>Including the fine print: what “free” and “unlimited” mean, and what X controls.</p>
            <Link className="text-link" href="/faq" data-cta="See all questions" data-cta-location="home_faq">See all questions <Icon name="arrowRight" className="arrow" size={15} /></Link>
          </div>
          <FaqAccordion items={homeFaqs} idPrefix="home-faq" />
        </div>
      </section>

      <div className="container section-tight">
        <SupportBox id="support" />
      </div>

      <CtaBand
        location="final_cta"
        title="Your X following list. Your rules."
        text="Get powerful following-management tools without paying a subscription."
        secondary={null}
        ctaLabel="Add UnfollowX Pro to Chrome — Free Forever"
      />
    </>
  );
}
