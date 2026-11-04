import Link from 'next/link';

export const metadata = {
  title: 'How to set up UnfollowX Pro for Chrome',
  description: 'Install UnfollowX Pro, connect it to your existing X session, run your first scan, set Keep rules and manage actions at your pace.',
  alternates: { canonical: '/setup' },
  openGraph: {
    type: 'website',
    title: 'How to set up UnfollowX Pro for Chrome',
    description: 'A clear, step-by-step guide to installing UnfollowX Pro and running your first X following scan.',
    url: 'https://www.unfollowx.com/setup'
  }
};

const STORE = 'https://chromewebstore.google.com/detail/x-twitter-mass-unfollow-t/igpjmagghnibmjkkdcgpjgpkfkpiglnl';
const steps = [
  {
    title: 'Add UnfollowX Pro to Chrome',
    body: <>Open the <a href={STORE} target="_blank" rel="noopener">UnfollowX Pro listing in the Chrome Web Store</a> and choose <strong>Add to Chrome</strong>. Follow Chrome’s confirmation prompt to install it. There is no separate UnfollowX account to create.</>,
    note: 'The extension is built for Google Chrome and supports x.com and twitter.com.'
  },
  {
    title: 'Sign in to X in your own browser',
    body: <>Open <a href="https://x.com" target="_blank" rel="noopener">x.com</a> or <a href="https://twitter.com" target="_blank" rel="noopener">twitter.com</a> in Chrome and sign in directly with X. UnfollowX Pro uses that existing browser session. It does not ask you to enter, save or share your X password.</>,
    note: 'If you use multiple X accounts, the extension keeps their scan and history data separately on your device.'
  },
  {
    title: 'Open the dashboard and start a scan',
    body: <>Select the UnfollowX Pro icon in Chrome’s toolbar to open its dashboard, then choose <strong>Scan following</strong>. Keep the X tab open and visible while the scan runs; X does not render the account rows in a hidden tab. The scan can identify mutuals and accounts that do not follow you back.</>,
    note: 'The scan reads information available to your signed-in X session. Results can be affected by X availability and profile visibility.'
  },
  {
    title: 'Review the results before choosing an action',
    body: <>Use the Following view to search, filter and inspect the accounts in your scan. Treat “Don’t follow back” as one signal, not an automatic reason to unfollow. Open profiles when you need context and select only accounts you have decided to change.</>,
    note: 'Last-active results refer to the newest readable post, reply or repost—not the last time someone logged in.'
  },
  {
    title: 'Protect people and groups you want to keep',
    body: <>Add specific handles to your whitelist or use Keep rules for groups such as verified or private accounts, profiles above a follower threshold, matching keywords, or accounts you followed recently. Check which accounts are protected before starting a bulk run.</>,
    note: 'Keep rules reduce the selectable set in supported bulk-cleanup views. Review the final selection yourself.'
  },
  {
    title: 'Set a pace, then start a selected run',
    body: <>In Settings, choose an action pace, delays, breaks and a daily limit that fit your use. Return to the account list, review the selection, and start only when it looks right. You can pause, resume or stop a run from the dashboard.</>,
    note: 'These controls do not guarantee that X will allow every action or prevent rate limits. Stop if X asks you to slow down or verify your account.'
  },
  {
    title: 'Save a follower baseline and revisit later',
    body: <>A first complete followers check creates the baseline for future comparisons. Check again later to see accounts that are newly present or missing from a later complete snapshot. The extension cannot identify changes from before your first snapshot.</>,
    note: 'Follower lists, scan results and action history are stored in Chrome extension storage on your device.'
  }
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.unfollowx.com/' },
    { '@type': 'ListItem', position: 2, name: 'Setup guide', item: 'https://www.unfollowx.com/setup' }
  ]
};

export default function SetupPage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
    <section className="page-hero setup-hero">
      <div className="eyebrow">A CLEAR START, STEP BY STEP</div>
      <h1>Set up UnfollowX Pro <em>for Chrome.</em></h1>
      <p>Install the extension, connect it to the X session you already use, and make your first review with the choices in your hands.</p>
      <div className="setup-hero-actions">
        <a className="button button-primary button-large" href={STORE} target="_blank" rel="noopener">Add to Chrome <span>↗</span></a>
        <span>Free to install · No separate sign-up</span>
      </div>
    </section>

    <nav className="breadcrumbs wrap" aria-label="Breadcrumb">
      <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Setup guide</span>
    </nav>

    <section className="content-section setup-content">
      <div className="setup-layout wrap">
        <ol className="setup-steps">
          {steps.map((step, index) => <li className="setup-step" key={step.title}>
            <span className="setup-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <div><h2>{step.title}</h2><p>{step.body}</p><div className="setup-note"><span aria-hidden="true">✳</span>{step.note}</div></div>
          </li>)}
        </ol>

        <aside className="setup-aside">
          <div className="setup-aside-card">
            <div className="eyebrow">QUICK CHECK</div>
            <h2>Before a bulk action</h2>
            <ul>
              <li>Review the scan and selected accounts.</li>
              <li>Check your whitelist and Keep rules.</li>
              <li>Set delays, breaks and a daily limit.</li>
              <li>Stop if X shows a warning or asks for verification.</li>
            </ul>
            <Link className="text-link" href="/features">Explore all features <span>→</span></Link>
          </div>
          <div className="setup-aside-card setup-privacy-card">
            <div className="eyebrow">YOUR DATA</div>
            <h2>Know what stays local.</h2>
            <p>Lists, scans, settings and action history stay in Chrome extension storage on your device. Anonymous usage statistics are enabled by default and can be turned off in Settings.</p>
            <Link className="text-link" href="/privacy">Read the privacy policy <span>→</span></Link>
          </div>
        </aside>
      </div>
    </section>

    <section className="setup-faq wrap" aria-labelledby="setup-faq-heading">
      <div className="eyebrow">A FEW THINGS PEOPLE ASK</div>
      <h2 id="setup-faq-heading">Setup questions.</h2>
      <details><summary>Why does my X tab need to stay visible while scanning?</summary><p>X does not render account rows in hidden tabs. Keep the X tab open and visible while a following scan runs.</p></details>
      <details><summary>Can UnfollowX Pro show who unfollowed me before I installed it?</summary><p>No. A first complete followers snapshot creates a baseline. A later complete snapshot can show changes since that baseline.</p></details>
      <details><summary>Does UnfollowX Pro need my X password?</summary><p>No. It works with the X session already signed in to Chrome and does not ask for your X password.</p></details>
    </section>

    <section className="setup-troubleshoot wrap">
      <div className="eyebrow">IF SOMETHING DOESN’T WORK</div>
      <h2>A few quick things to check.</h2>
      <div className="troubleshoot-grid">
        <article><h3>The scan does not start</h3><p>Make sure you are signed in to X in Chrome and that an x.com or twitter.com tab is open and visible. Then try starting the scan again.</p></article>
        <article><h3>The scan stops or looks incomplete</h3><p>X may not return every account on the first attempt. Wait a little, reopen the dashboard and rescan. Do not treat a partial followers check as a complete comparison.</p></article>
        <article><h3>You want desktop notifications</h3><p>Notifications are optional. Enable them in extension Settings if you want local alerts; Chrome requests the permission at that point.</p></article>
        <article><h3>You want to remove extension data</h3><p>Use Dashboard → Settings → Delete all extension data. See the <Link href="/privacy">privacy policy</Link> for more on storage and controls.</p></article>
      </div>
      <div className="setup-bottom-links">Need more help? Read the <Link href="/faq">FAQ</Link>, browse <Link href="/blog">all field notes</Link>, or <a href="mailto:shahriar.bmb@gmail.com">contact support</a>.</div>
    </section>
  </>;
}
