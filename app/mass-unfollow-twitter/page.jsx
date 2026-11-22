import Link from 'next/link';
import '../styles/pages.css';
import ArticleCard from '@/components/ArticleCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import CtaBand from '@/components/CtaBand';
import FaqAccordion from '@/components/FaqAccordion';
import Icon from '@/components/Icon';
import InstallLink from '@/components/InstallLink';
import JsonLd from '@/components/JsonLd';
import Screenshot from '@/components/Screenshot';
import StoreRating from '@/components/StoreRating';
import { TrackEvent } from '@/components/Analytics';
import { getArticle } from '@/lib/blog';
import { faqPageSchema } from '@/lib/faq';
import { SOFTWARE_ID, buildMetadata, softwareSchemaWithRating } from '@/lib/seo';
import { EXTENSION, absoluteUrl } from '@/lib/site';

const PATH = '/mass-unfollow-twitter';
const TITLE = 'Mass Unfollow on Twitter (X) – Free Bulk Unfollow Tool | UnfollowX Pro';

export const metadata = buildMetadata({
  title: TITLE,
  absoluteTitle: true,
  description: 'Mass unfollow on Twitter (X) for free: filter non-followers and inactive accounts, bulk unfollow at a safe pace with breaks and a daily limit. No password.',
  path: PATH
});

// Visible steps and the HowTo structured data come from the same array.
const steps = [
  {
    name: 'Install UnfollowX Pro and open X',
    text: 'Add the free extension from the Chrome Web Store, then open x.com (or twitter.com) in Chrome while signed in to the account you want to clean up. No password is shared and there is no sign-up.'
  },
  {
    name: 'Scan and filter who to unfollow',
    text: 'Click the extension icon and press “Scan my following”. The scan only reads. Open Review & pick to filter the list — non-followers, inactive accounts, no profile photo, not blue, few posts — and protect anyone with the whitelist shield.'
  },
  {
    name: 'Start a paced bulk unfollow run',
    text: 'Press “Unfollow N non-followers” or unfollow your selection. The run works in the background with random delays, breaks and your daily limit, skips whitelisted accounts, and can be paused or stopped at any time.'
  }
];

const filters = [
  { icon: 'userMinus', tone: 'red', title: 'Non-followers', text: 'The Don’t follow back tab lists every account that doesn’t follow you, using X’s own “follows you” flag. Mutuals sit in their own tab.' },
  { icon: 'moonZ', tone: 'amber', title: 'Inactive: 30, 90, 180 days or 1 year', text: 'Filter by the newest post, reply or repost the extension can read. Accounts whose date can’t be read are listed as Unavailable — never guessed.' },
  { icon: 'users', tone: '', title: 'No profile photo', text: 'One quick filter finds accounts still using the default avatar — often abandoned or throwaway profiles.' },
  { icon: 'badgeOff', tone: 'violet', title: 'Not blue (unverified)', text: 'The Not blue tab shows accounts without X Premium’s blue check. Legacy and organisation checks are tagged, not hidden.' },
  { icon: 'file', tone: '', title: 'Few posts', text: 'Under 10 posts, under 50 followers, or following 10× more accounts than follow them — quick filters for low-activity accounts.' },
  { icon: 'filter', tone: '', title: 'And more', text: 'Followers range, follow ratio, join date, bio contains / doesn’t contain, writing system, search by name or handle, and saved groups.' }
];

const comparison = [
  ['Seeing who follows back', 'Open each profile and look for “Follows you”', 'Every account marked after one read-only scan'],
  ['Finding inactive accounts', 'Open each profile and check the last post', '30 / 90 / 180 / 365-day filters'],
  ['Unfollowing 300 accounts', '300 separate clicks (and confirmations)', 'Select a group, press start once'],
  ['Protecting important accounts', 'You have to remember them', 'Whitelist and Keep rules, checked before every unfollow'],
  ['Pace', 'However fast you click', 'Random delays, breaks and a daily limit'],
  ['Record of what changed', 'None', 'History with dates, CSV export and Follow again'],
  ['Works on phone', 'Yes', 'No — desktop Chrome 116+ only'],
  ['Cost', 'Free', 'Free — no subscription or premium tier']
];

const faqs = [
  { id: 'free', q: 'Is UnfollowX Pro free?', a: ['Yes. Every feature, including bulk unfollow, filters, whitelist, Keep rules, history and CSV, is free. There is no trial, no subscription, no premium tier and no payment details to enter.'] },
  { id: 'allowed', q: 'Is mass unfollowing allowed on Twitter / X?', a: ['Unfollowing accounts is a normal part of using X, and tidying your following list is allowed. X’s rules do target aggressive, bulk or indiscriminate following and unfollowing and “follow churn” (following and unfollowing to gain followers), and X decides what counts as aggressive. Read [X’s automation rules](https://help.x.com/en/rules-and-policies/x-automation) and run cleanups at a measured pace.'] },
  { id: 'safe', q: 'Is it safe to mass unfollow on X?', a: ['UnfollowX Pro is built to keep you measured: random gaps between actions, regular breaks, a rolling daily limit, a rest when X asks it to slow down and a full stop when X asks you to verify your account. No tool can guarantee X will never limit an account, so start with the Safe or Balanced preset and stop if X shows a warning.'] },
  { id: 'per-day', q: 'How many accounts can I unfollow per day?', a: [`UnfollowX Pro sets no cap of its own. The daily limit in Settings is a pacing control you own: ${EXTENSION.presets.map((p) => `${p.name} ${p.daily.toLocaleString('en-US')}`).join(', ')} per rolling 24 hours (Balanced, ${EXTENSION.defaultDailyLimit}, is the default), adjustable or switchable off. When the limit is reached the run waits and continues automatically. X doesn’t publish a fixed daily unfollow number; its help center describes a [technical limit of 400 follows per day](https://help.x.com/en/using-x/x-follow-limit) and says limits can change.`] },
  { id: 'password', q: 'Does it need my Twitter / X password?', a: ['No. The extension works inside the X session you are already signed in to in Chrome. It never asks for, stores or sends your password, and it has no account system of its own.'] },
  { id: 'domains', q: 'Does it work on twitter.com and x.com?', a: ['Yes. UnfollowX Pro works on both x.com and twitter.com, on X’s new web layout and the classic one. It runs in desktop Chrome 116 or newer; Chrome on phones doesn’t support extensions.'] },
  { id: 'undo', q: 'Can I undo a mass unfollow?', a: ['You can re-follow. History keeps every account the extension unfollowed, with dates; select the ones you want back and press Follow again. Re-following restores the follow itself, not anything else about the old connection, and private accounts receive a new follow request.'] },
  { id: 'stop', q: 'Can I pause or stop a run halfway?', a: ['Yes. Pause, resume or stop from the popup or dashboard, or press Alt + Shift + S for an emergency stop. Runs continue in the background if you switch tabs or close the popup.'] }
];

const pace = EXTENSION.presets;

export default function MassUnfollowTwitterPage() {
  const url = absoluteUrl(PATH);
  const guides = ['how-to-mass-unfollow-accounts-on-x', 'how-to-unfollow-on-twitter', 'how-to-whitelist-accounts-before-unfollowing-on-x'].map(getArticle).filter(Boolean);

  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${url}#howto`,
    name: 'How to mass unfollow on Twitter (X) with UnfollowX Pro',
    description: 'Scan your following list, filter who to unfollow, protect accounts with a whitelist and run a paced bulk unfollow on Twitter (X).',
    totalTime: 'PT10M',
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
    tool: [{ '@type': 'HowToTool', name: 'Google Chrome 116 or newer (desktop)' }, { '@type': 'HowToTool', name: 'UnfollowX Pro Chrome extension' }],
    step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.name, text: s.text, url: `${url}#step-${i + 1}` })),
    about: { '@id': SOFTWARE_ID }
  };

  return (
    <>
      <JsonLd data={[softwareSchemaWithRating, howTo, faqPageSchema(faqs, url)]} />
      <TrackEvent name="feature_page_view" params={{ feature_name: 'mass_unfollow' }} withPath />

      <section className="container lp-hero">
        <div className="page-hero">
          <Breadcrumbs items={[{ name: 'Mass unfollow on Twitter', path: PATH }]} />
          <div className="eyebrow" style={{ marginTop: 28 }}>Free bulk unfollow tool for Chrome</div>
          <h1>Mass Unfollow on <span className="gradient-text">Twitter (X)</span></h1>
          <p className="lead">UnfollowX Pro lets you mass unfollow on Twitter (X) for free. Scan the accounts you follow, filter non-followers and inactive profiles, protect the people who matter, then bulk unfollow at a safe, human pace — without sharing your password.</p>
          <div className="cta-row"><InstallLink location="mass_hero" size="lg" /></div>
          <StoreRating location="mass_hero" className="lp-rating" />
          <ul className="lp-points" role="list">
            <li><Icon name="check" />Free forever — no subscription, no premium tier</li>
            <li><Icon name="check" />Random delays, breaks and a daily limit on every run</li>
            <li><Icon name="check" />Whitelisted accounts are never unfollowed, in any mode</li>
          </ul>
        </div>
        <Screenshot shot="run" preload alt="Mass unfollow on Twitter (X) in progress: the UnfollowX Pro popup during a paced run, 127 of 408 unfollowed, next account in 12 seconds, with Pause and Stop buttons" caption="A paced bulk unfollow run (real interface, sample account)" sizes="(max-width: 960px) 360px, 420px" className="lp-shot" />
      </section>

      <section className="container lp-section" aria-labelledby="what">
        <div className="lp-split">
          <div data-reveal="">
            <div className="eyebrow">What it does</div>
            <h2 id="what">A Twitter mass unfollow tool that shows you everything first</h2>
            <div className="prose">
              <p>X’s own website only lets you unfollow one account at a time. That’s fine for a handful of profiles, but cleaning up hundreds of follows by hand means opening profiles, checking whether they follow you back and clicking Unfollow again and again.</p>
              <p>UnfollowX Pro is a free Chrome extension that does the reading for you. One read-only scan goes through your whole following list and marks every account as a mutual or a non-follower. You then filter the list, protect anyone you want to keep and start a bulk unfollow run that works through your selection on its own — while you do something else.</p>
              <p>Nothing changes on your account until you choose an action, and every run uses pacing controls you can see and adjust. If you only want to know who doesn’t follow you back, start with the <Link href="/twitter-non-followers-checker">free non-followers checker</Link>.</p>
            </div>
          </div>
          <Screenshot shot="following" alt="Bulk unfollow Twitter accounts: UnfollowX Pro Following page with the Don’t follow back tab, quick filters, whitelist shields and a bar to keep, export or unfollow the selected accounts" caption="Following page: filter, select and protect before a bulk unfollow (sample accounts)" sizes="(max-width: 960px) 100vw, 580px" />
        </div>
      </section>

      <section className="container lp-section" aria-labelledby="steps">
        <div className="section-head" data-reveal="">
          <div className="eyebrow">How it works</div>
          <h2 id="steps">How to mass unfollow on Twitter (X) in 3 steps</h2>
          <p>Most lists take about a minute to scan. The unfollow run itself is deliberately slower — that’s the point.</p>
        </div>
        <ol className="lp-steps lp-steps-wide" role="list">
          {steps.map((s, i) => (
            <li key={s.name} id={`step-${i + 1}`}><div><b>{s.name}</b><span>{s.text}</span></div></li>
          ))}
        </ol>
        <p className="lp-note">Prefer a full walkthrough with every button and setting? Read the step-by-step <Link href="/setup">UnfollowX Pro setup guide</Link>.</p>
      </section>

      <section className="container lp-section" aria-labelledby="filters">
        <div className="section-head" data-reveal="">
          <div className="eyebrow">Filters</div>
          <h2 id="filters">Choose exactly who to bulk unfollow</h2>
          <p>Most people don’t want to unfollow every non-follower — news sites, experts and creators rarely follow back. Filters turn a long list into a short, deliberate one.</p>
        </div>
        <div className="lp-cards" data-stagger="60">
          {filters.map((f) => (
            <div className="card" key={f.title}><span className={`icon-tile ${f.tone}`.trim()}><Icon name={f.icon} /></span><h3>{f.title}</h3><p>{f.text}</p></div>
          ))}
        </div>
      </section>

      <section className="container lp-section" aria-labelledby="pace">
        <div className="lp-split">
          <div data-reveal="">
            <div className="eyebrow">Safe pace</div>
            <h2 id="pace">Built-in pacing on every bulk unfollow</h2>
            <div className="prose">
              <ul>
                <li><strong>Random gaps</strong> between actions, so a run never fires at a fixed rhythm.</li>
                <li><strong>Breaks</strong> after a set number of actions.</li>
                <li><strong>A daily limit</strong> per rolling 24 hours — {EXTENSION.defaultDailyLimit} by default — that continues automatically once there’s room.</li>
                <li><strong>Rests</strong> when X asks the extension to slow down, and <strong>stops</strong> when X asks you to verify your account.</li>
                <li><strong>Emergency stop</strong> with <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd>.</li>
              </ul>
            </div>
          </div>
          <div className="table-wrap" data-reveal="">
            <table>
              <caption className="visually-hidden">UnfollowX Pro speed presets</caption>
              <thead><tr><th scope="col">Preset</th><th scope="col">Between actions</th><th scope="col">Break</th><th scope="col">Daily limit</th></tr></thead>
              <tbody>
                {pace.map((p) => (
                  <tr key={p.name}><th scope="row">{p.name}{p.daily === EXTENSION.defaultDailyLimit ? ' (default)' : ''}</th><td>{p.delay}</td><td>{p.rest} every {p.restEvery}</td><td>{p.daily.toLocaleString('en-US')}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="callout warn" data-reveal="" style={{ marginTop: 'var(--space-8)' }}>
          <Icon name="alert" />
          <p><strong>Honest note:</strong> X applies its own limits and rules to every account, whatever tool you use, and no tool can guarantee X will never limit an account. Start with Safe or Balanced, avoid unfollowing thousands of accounts in one go, and stop if X shows a warning. More in <Link href="/faq#faq-rate-limits">how X limits work</Link>.</p>
        </div>
      </section>

      <section className="container lp-section" aria-labelledby="compare">
        <div className="section-head" data-reveal="">
          <div className="eyebrow">Comparison</div>
          <h2 id="compare">Manual unfollowing vs UnfollowX Pro</h2>
          <p>Unfollowing by hand is free and fine for a few accounts. Past a few dozen, a mass unfollow tool saves real time.</p>
        </div>
        <div className="table-wrap" data-reveal="">
          <table>
            <caption className="visually-hidden">Unfollowing manually on X compared with UnfollowX Pro</caption>
            <thead><tr><th scope="col">Task</th><th scope="col">By hand on X</th><th scope="col">With UnfollowX Pro</th></tr></thead>
            <tbody>
              {comparison.map(([task, manual, tool]) => <tr key={task}><th scope="row">{task}</th><td>{manual}</td><td>{tool}</td></tr>)}
            </tbody>
          </table>
        </div>
        <p className="lp-note">Comparing tools? See <Link href="/blog/best-free-x-unfollow-tools-what-to-look-for">the best mass unfollow tools for Twitter (X)</Link> or our <Link href="/alternatives/circleboom">free Circleboom alternative</Link> page.</p>
      </section>

      <section className="container lp-section" aria-labelledby="protect">
        <div className="lp-split">
          <Screenshot shot="settingsKeep" alt="Twitter unfollow tool Keep rules in UnfollowX Pro Settings: keep verified accounts, private accounts, accounts above a follower count, recent follows and keyword matches" caption="Keep rules in Settings (real interface)" sizes="(max-width: 960px) 100vw, 580px" />
          <div data-reveal="">
            <div className="eyebrow">Protection</div>
            <h2 id="protect">Whitelist and Keep rules</h2>
            <div className="prose">
              <p>Tap the shield on any account to add it to your <strong>whitelist</strong>. Whitelisted accounts can’t be selected and are never unfollowed — in any mode, including “Unfollow all”. You can paste several handles or profile links at once.</p>
              <p><strong>Keep rules</strong> protect whole groups: verified accounts, private accounts, accounts above a follower threshold, anyone whose name, handle or bio matches a keyword, and accounts you followed in the last N days. Both are checked again before every single unfollow, even in the middle of a run. Guide: <Link href="/blog/how-to-whitelist-accounts-before-unfollowing-on-x">how to whitelist accounts before unfollowing</Link>.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container lp-section" aria-labelledby="privacy">
        <div className="section-head" data-reveal="">
          <div className="eyebrow">Privacy</div>
          <h2 id="privacy">No password. Your lists stay on your computer.</h2>
        </div>
        <div className="prose lp-prose">
          <p>UnfollowX Pro works inside the X session you already use in Chrome, so it never asks for your password and never signs in for you. Scans, follower snapshots, your whitelist, settings and history are kept in Chrome extension storage on your device, not uploaded to the developer. Anonymous usage statistics can be switched off in Settings, and one button deletes all extension data. Full details are in the <Link href="/privacy">privacy policy</Link>.</p>
        </div>
      </section>

      <section className="container lp-section" aria-labelledby="mass-faq">
        <div className="section-head" data-reveal=""><div className="eyebrow">Questions</div><h2 id="mass-faq">Mass unfollow on Twitter: FAQ</h2></div>
        <FaqAccordion items={faqs} idPrefix="mass-faq" />
      </section>

      <section className="container lp-section" aria-labelledby="mass-guides">
        <div className="section-head" data-reveal=""><div className="eyebrow">Related guides</div><h2 id="mass-guides">Learn more before a big cleanup</h2></div>
        <div className="article-grid">{guides.map((a) => <ArticleCard key={a.slug} article={a} location="mass_guides" />)}</div>
        <p className="lp-note">Also useful: <Link href="/blog/how-to-unfollow-everyone-on-x">unfollow everyone at once</Link>, <Link href="/blog/how-to-find-inactive-accounts-on-x">find inactive accounts</Link> and <Link href="/x-follower-tracker">see who unfollowed you</Link>.</p>
      </section>

      <CtaBand location="mass_cta" title="Bulk unfollow on Twitter (X), at your pace." text="Free forever. Read-only scan first, whitelist always respected, no password required." secondary={{ label: 'See all features', href: '/features' }} />
    </>
  );
}
