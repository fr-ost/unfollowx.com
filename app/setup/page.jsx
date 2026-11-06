import Link from 'next/link';
import '../styles/pages.css';
import Breadcrumbs from '@/components/Breadcrumbs';
import CtaBand from '@/components/CtaBand';
import FaqAccordion from '@/components/FaqAccordion';
import Icon from '@/components/Icon';
import InstallLink from '@/components/InstallLink';
import JsonLd from '@/components/JsonLd';
import Screenshot from '@/components/Screenshot';
import SupportBox from '@/components/SupportBox';
import { pageMetadata } from '@/lib/seo';
import { STORE_URL, absoluteUrl } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'How to Set Up UnfollowX Pro in Chrome (Step-by-Step)',
  description: 'Install UnfollowX Pro, run your first read-only scan of your X following list, protect accounts with a whitelist and Keep rules, choose a pace and start safely.',
  path: '/setup'
});

const steps = [
  {
    title: 'Add UnfollowX Pro to Chrome',
    body: <>Open the <a href={STORE_URL} target="_blank" rel="noopener" data-install="" data-location="setup_step">UnfollowX Pro listing in the Chrome Web Store</a> and choose <strong>Add to Chrome</strong>, then confirm Chrome’s prompt. There is no UnfollowX account to create and nothing to pay. Pin the extension from Chrome’s puzzle-piece menu so its icon stays in the toolbar.</>,
    note: 'Desktop Chrome 116 or newer. Chrome on phones and tablets doesn’t run extensions.'
  },
  {
    title: 'Sign in to X as usual',
    body: <>Open <a href="https://x.com" target="_blank" rel="noopener">x.com</a> (or twitter.com) in Chrome and sign in to the account you want to manage. UnfollowX Pro works inside that existing session — it never asks for, stores or sends your X password.</>,
    note: 'Using several X accounts? Each one gets its own scan, whitelist, history and daily count, and data switches automatically when you switch accounts on X.'
  },
  {
    title: 'Run your first scan',
    body: <>Click the UnfollowX Pro icon and press <strong>Scan my following</strong>. The scan is read-only and usually takes about a minute. It reads your list in the background through an x.com tab (the extension opens one if needed), so you can keep using other tabs.</>,
    note: 'If X blocks direct reading, the extension may fall back to scrolling your Following page. In that case it asks you to keep that X tab in front until the scan finishes.',
    shot: 'popup'
  },
  {
    title: 'Review the results',
    body: <>The popup shows <strong>Following</strong>, <strong>Don’t follow back</strong> and <strong>Mutuals</strong>. Choose <strong>Review &amp; pick</strong> to open the dashboard, where the Following page has tabs for Don’t follow back, Mutuals, Not blue, Inactive, All, Kept and Unfollowed, plus search, filters and sorting. See <Link href="/blog/how-to-see-who-doesnt-follow-you-back-on-x">how to read non-follower results</Link>.</>,
    note: 'After the scan, the extension also reads your followers to build a baseline for “who unfollowed you”. The first check has nothing to compare against yet.'
  },
  {
    title: 'Protect the accounts you want to keep',
    body: <>Tap the shield next to anyone you never want unfollowed to add them to your whitelist. In <strong>Settings</strong>, Keep rules can protect verified accounts, private accounts, accounts above a follower count, keyword matches and accounts you followed recently. Check the <strong>Kept</strong> tab to confirm. Guide: <Link href="/blog/how-to-whitelist-accounts-before-unfollowing-on-x">whitelisting before unfollowing</Link>.</>,
    note: 'Whitelisted accounts are never unfollowed, in any mode — including “Unfollow all”.',
    shot: 'settingsKeep', wide: true
  },
  {
    title: 'Choose a pace',
    body: <>In <strong>Settings</strong>, pick <strong>Safe</strong> (15–35 s between actions, 10-minute break every 30, 250 a day), <strong>Balanced</strong> (8–20 s, 6 minutes every 50, 400 a day — the default) or <strong>Fast</strong> (4–10 s, 5 minutes every 80, 1,000 a day), or set your own numbers. New to bulk actions? Start with Safe.</>,
    note: 'X applies its own limits and rules to every account. Pacing helps, but no tool can guarantee X will allow every action.',
    shot: 'settingsSpeed', wide: true
  },
  {
    title: 'Start, then pause or stop whenever you like',
    body: <>Select accounts and choose <strong>Unfollow selected</strong>, or use <strong>Unfollow non-followers</strong> in the popup. The run continues in the background; you can switch tabs or close the popup. Pause, resume or stop at any time, or press <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd> for an emergency stop.</>,
    note: 'If X asks the extension to slow down, the run rests and continues. If X asks you to verify your account, it stops and waits for you.',
    shot: 'run'
  },
  {
    title: 'Check History and come back later',
    body: <>History lists everything the extension unfollowed or followed, with <strong>Follow again</strong> for mistakes. Next time, rescan or press <strong>Check now</strong> on the Followers page to see who unfollowed you since the last check. Guide: <Link href="/blog/how-to-find-out-who-unfollowed-you-on-x">finding out who unfollowed you</Link>.</>,
    note: 'Scans, snapshots, settings and history stay in Chrome extension storage on your computer.'
  }
];

const setupFaqs = [
  { id: 'tab', q: 'Do I need to keep the X tab open while scanning?', a: ['Normally no. Scans read your list in the background through an x.com tab, and the extension opens one itself if needed. Only the fallback page-scrolling scan (used if X blocks direct reading) asks you to keep the X tab in front.'] },
  { id: 'before', q: 'Can UnfollowX Pro show who unfollowed me before I installed it?', a: ['No. X doesn’t keep an unfollow history. Your first followers check creates a baseline, and later checks show changes since then.'] },
  { id: 'password', q: 'Does setup need my X password?', a: ['No. UnfollowX Pro uses the X session already signed in to Chrome and never asks for your password.'] },
  { id: 'cost', q: 'Is anything paid during or after setup?', a: ['No. There is no trial, subscription or premium plan. Every feature is free.'] }
];

export default function SetupPage() {
  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to set up UnfollowX Pro in Chrome',
    description: 'Install UnfollowX Pro, run a read-only scan of your X following list, protect accounts and start a paced run.',
    totalTime: 'PT5M',
    tool: [{ '@type': 'HowToTool', name: 'Google Chrome (desktop, version 116 or newer)' }],
    step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, url: `${absoluteUrl('/setup')}#step-${i + 1}`, text: s.note }))
  };

  return (
    <>
      <JsonLd data={howTo} />
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ name: 'How-to Guides', path: '/guides' }, { name: 'Setup guide', path: '/setup' }]} />
          <div className="eyebrow" style={{ marginTop: 28 }}>Setup guide · about 5 minutes</div>
          <h1>Set up UnfollowX Pro <span className="gradient-text">in Chrome.</span></h1>
          <p className="lead">Install the extension, run a read-only scan, protect the people who matter and choose a pace — with every decision left to you.</p>
          <div className="cta-row">
            <InstallLink location="setup_hero" size="lg" />
          </div>
          <p className="hero-note"><span><Icon name="check" />Free forever</span><span><Icon name="check" />No sign-up</span><span><Icon name="check" />No X password</span></p>
        </div>
      </section>

      <section className="container">
        <div className="setup-layout">
          <ol className="setup-steps" role="list">
            {steps.map((step, index) => (
              <li className="card setup-step" id={`step-${index + 1}`} key={step.title} data-reveal="">
                <span className="setup-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2><span className="visually-hidden">Step {index + 1}: </span>{step.title}</h2>
                  <p>{step.body}</p>
                  <div className="setup-note"><Icon name="info" /><span>{step.note}</span></div>
                  {step.shot ? <Screenshot shot={step.shot} className={`shot-sm${step.wide ? ' shot-wide-step' : ''}`} caption="Real extension interface · sample account" sizes={step.wide ? '(max-width: 960px) 90vw, 720px' : '360px'} /> : null}
                </div>
              </li>
            ))}
          </ol>

          <aside className="setup-aside" aria-label="Setup checklist">
            <div className="card">
              <div className="eyebrow">Before a bulk action</div>
              <h2>Quick checklist</h2>
              <ul>
                {['Rescan so the list is current', 'Whitelist friends and must-follow accounts', 'Check the Kept tab', 'Pick Safe or Balanced pace', 'Stop if X shows a warning'].map((item) => <li key={item}><Icon name="checkCircle" />{item}</li>)}
              </ul>
              <Link className="text-link" href="/blog/how-to-mass-unfollow-accounts-on-x" data-cta="Mass unfollow guide" data-cta-location="setup_aside">Read the mass unfollow guide <Icon name="arrowRight" className="arrow" size={15} /></Link>
            </div>
            <div className="card">
              <div className="eyebrow">Your data</div>
              <h2>What stays local</h2>
              <p>Lists, scans, settings and history stay in Chrome extension storage. Anonymous usage statistics are on by default and can be turned off in Settings → Privacy.</p>
              <Link className="text-link" href="/privacy" data-cta="Privacy policy" data-cta-location="setup_aside">Privacy policy <Icon name="arrowRight" className="arrow" size={15} /></Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="container lp-section" aria-labelledby="trouble-title">
        <div className="section-head" data-reveal="">
          <div className="eyebrow">Troubleshooting</div>
          <h2 id="trouble-title">If something doesn’t work</h2>
        </div>
        <div className="troubleshoot" data-stagger="60">
          <div className="card"><h3>The scan doesn’t start</h3><p>Make sure you’re signed in on x.com in the same Chrome profile, then try again. Help → Connection check in the dashboard shows what the extension can reach.</p></div>
          <div className="card"><h3>The scan stops early or looks incomplete</h3><p>X sometimes returns partial data. Wait a little and rescan. Incomplete followers reads are never compared, so they can’t create false “unfollowed you” results.</p></div>
          <div className="card"><h3>A run is resting</h3><p>Either your daily limit was reached (the run continues automatically when there’s room) or X asked it to slow down. Both are expected; leave it be.</p></div>
          <div className="card"><h3>X asked to verify your account</h3><p>The run stops and waits. Complete X’s check yourself on x.com, consider a slower pace, then resume.</p></div>
          <div className="card"><h3>You want notifications</h3><p>Turn them on in Settings; Chrome then asks for permission. They’re off by default and shown only on your computer.</p></div>
          <div className="card"><h3>You want to remove extension data</h3><p>Settings → Delete all extension data, or delete one account’s data. See the <Link href="/privacy">privacy policy</Link>.</p></div>
        </div>
      </section>

      <section className="container lp-section" aria-labelledby="setup-faq-title">
        <div className="section-head" data-reveal="">
          <div className="eyebrow">Setup questions</div>
          <h2 id="setup-faq-title">Quick answers</h2>
        </div>
        <FaqAccordion items={setupFaqs} idPrefix="setup-faq" />
      </section>

      <div className="container lp-section">
        <SupportBox id="support" />
      </div>

      <CtaBand location="setup_cta" title="Ready when you are." text="Install UnfollowX Pro and run a read-only scan. Nothing changes on X until you choose." secondary={{ label: 'Browse how-to guides', href: '/guides' }} />
    </>
  );
}
