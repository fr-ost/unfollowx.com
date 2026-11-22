import Link from 'next/link';
import '@/app/styles/pages.css';
import Breadcrumbs from '@/components/Breadcrumbs';
import Icon from '@/components/Icon';
import { ConsentSettingsButton } from '@/components/Analytics';
import { buildMetadata } from '@/lib/seo';
import { CONTACT_EMAIL, DEVELOPER, EXTENSION, PUBLISHER, TELEGRAM_URL } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Privacy Policy – Extension & Website Data',
  description: 'How UnfollowX Pro handles data: X lists stay in Chrome storage, two anonymous statistics switches, permissions, and Google Analytics on this site.',
  path: '/privacy'
});

const toc = [
  ['summary', 'Summary'],
  ['extension', 'What the extension does'],
  ['local', 'Data stored on your device'],
  ['stats', 'Anonymous usage statistics'],
  ['permissions', 'Permissions'],
  ['control', 'Your choices'],
  ['website', 'This website & Google Analytics'],
  ['children', 'Children'],
  ['changes', 'Changes'],
  ['contact', 'Contact']
];

export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ name: 'Privacy policy', path: '/privacy' }]} />
          <div className="eyebrow" style={{ marginTop: 28 }}>Last updated · November 18, 2026</div>
          <h1>Your data, <span className="gradient-text">clearly explained.</span></h1>
          <p className="lead">This policy covers the UnfollowX Pro Chrome extension (version {EXTENSION.privacyPolicyFrom} and later) and this website, www.unfollowx.com.</p>
        </div>
      </section>

      <div className="container doc-layout">
        <nav className="toc" aria-label="In this policy">
          <b>In this policy</b>
          <ol>{toc.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ol>
        </nav>

        <article className="prose">
          <h2 id="summary">Summary</h2>
          <div className="summary-grid">
            <div><b><Icon name="lock" />No X password</b>The extension uses the X session you’re already signed in to and never asks for your password.</div>
            <div><b><Icon name="database" />Your lists stay local</b>Scans, follower snapshots, whitelist, settings and history are stored in Chrome extension storage on your device.</div>
            <div><b><Icon name="chart" />Anonymous statistics, two switches</b>Basic usage stats and anonymous feature usage (counts and fixed values only). Never your X account, lists or IP address. Both can be turned off.</div>
            <div><b><Icon name="eye" />Analytics cookies need consent</b>This website uses Google Analytics with Google Consent Mode: no analytics cookies until you accept, and Decline turns it off. You can change your choice any time.</div>
          </div>

          <h2 id="extension">What the extension does</h2>
          <p>UnfollowX Pro helps you review your X following and followers lists and, when you choose, follow or unfollow accounts. It works in your browser with the X session you are already signed in to. It does not request your X password, sign in for you, or have an account system of its own.</p>
          <p>To read your lists and perform the actions you start, the extension sends requests to X itself — x.com and twitter.com — and may read X’s own app files from abs.twimg.com to understand how X’s website talks to X. Your X lists and action history are not sent to the developer.</p>

          <h2 id="local">Data stored on your device</h2>
          <p>The extension uses Chrome’s extension storage to keep what its features need. This can include:</p>
          <ul>
            <li><strong>Settings</strong> — speed, daily limit, Keep rules, language, notification and statistics preferences.</li>
            <li><strong>Your whitelist</strong> — handles you never want unfollowed.</li>
            <li><strong>Your last scan</strong> — the accounts you follow and whether they follow you back.</li>
            <li><strong>Followers snapshots</strong> — your followers from the last complete check, and changes found between checks (who unfollowed you, new followers, with dates).</li>
            <li><strong>First-seen dates</strong> — when each account first appeared in a scan, for the “followed recently” Keep rule.</li>
            <li><strong>Scan totals over time</strong> — following and follower counts, for the growth chart.</li>
            <li><strong>Saved groups</strong> and <strong>last-active results</strong> for accounts you follow.</li>
            <li><strong>History</strong> — accounts the extension unfollowed or followed, and when — plus a counter of recent actions for your daily limit.</li>
            <li><strong>A random installation ID</strong>, your answer to the review prompt, and which “What’s new” page you’ve seen.</li>
            <li><strong>Statistics waiting to be sent</strong> — if statistics are on, up to 200 recent events (event names and counts only) are kept until the server confirms it received them, and for 72 hours at most.</li>
          </ul>
          <p>If you use more than one X account, each account’s scan, whitelist, history, groups and counters are kept separately.</p>

          <h2 id="stats">Anonymous usage statistics</h2>
          <p>To understand how many people use the extension, which features are used and whether they work, the extension can send <strong>anonymous</strong> statistics. There are two separate switches in <strong>Dashboard → Settings → Privacy</strong>.</p>

          <h3 id="stats-basic">1. Anonymous usage stats (on by default)</h3>
          <ul>
            <li>a <strong>random install ID</strong> generated on your device — not derived from you or your computer, and reset when you clear extension data;</li>
            <li>the <strong>extension version</strong> and how it was installed (for example, from the Chrome Web Store);</li>
            <li>an <strong>install</strong> event, an <strong>update</strong> event, at most one <strong>active</strong> event per day when you use the extension, and an <strong>uninstall</strong> signal;</li>
            <li>with the daily event, a single <strong>aggregate count</strong> of follow and unfollow actions in the previous 24 hours;</li>
            <li>a <strong>coarse country</strong>, derived on the server from the network request. The IP address itself is not stored and is not passed on.</li>
          </ul>

          <h3 id="stats-features">2. Share anonymous feature usage (separate switch)</h3>
          <p>Only if this switch is on, the extension also reports which screens and features are used and whether they work — for example “a scan finished: 230 accounts read, 26 don’t follow back”, “an unfollow run completed: 80 done, 2 failed”, “the followers check found 3 people who left”, or “the speed preset changed to Safe”. Every value is a <strong>count</strong>, a <strong>range</strong> (such as “51–200”) or a choice from a <strong>fixed list</strong> (such as a screen name or “success”/“failed”). The full list of events is published by the developer in the extension’s source (<code>ANALYTICS_EVENTS.md</code>).</p>
          <p>This switch is <strong>on for new installs</strong> (the welcome screen says so) and can be turned off at any time. If you installed the extension <strong>before version 7.3.5</strong>, it stays <strong>off</strong> until you choose — the dashboard asks you once.</p>

          <h3 id="stats-never">What is never sent</h3>
          <p>Neither switch ever sends your IP address, your X username, handle, display name or account ID, your profile picture, your following or followers lists, your whitelist, your history, your group names, your Keep-rule keywords, any post or message content, cookies or session tokens, or anything typed into the extension. The statistics are never sold and never used for advertising — advertising signals are explicitly marked as denied.</p>

          <h3 id="stats-where">Where statistics go</h3>
          <p>Statistics are sent, without browser credentials, to the developer’s own server (a Cloudflare Worker). The server keeps the basic counts, checks every event against the published list, drops anything else, and forwards the allowed events to <strong>Google Analytics 4</strong>, which the developer uses to see totals and trends such as active users, retention and feature use. Google receives the random install ID (as the analytics “client ID”), the event names and values above, the extension version and the coarse country — not your IP address.</p>
          <p>Google Analytics data is kept under the developer’s retention setting (14 months at most). The server’s own copy of events waiting to be forwarded is deleted after 4 days. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google’s privacy policy</a>. These statements describe the extension’s published code and the developer’s disclosure; server-side handling can’t be verified from the extension itself.</p>

          <h3 id="stats-off">Turning statistics off</h3>
          <ul>
            <li>When <strong>Anonymous usage stats</strong> is off, nothing at all is sent (not even that you switched it off), anything waiting to be sent is deleted from your browser, and the uninstall signal is removed.</li>
            <li>When only <strong>Share anonymous feature usage</strong> is off, only the basic events in section 1 are sent.</li>
            <li>The uninstall signal is best effort: it is sent only if Chrome opens the “sorry to see you go” page when you remove the extension.</li>
          </ul>

          <h2 id="permissions">Permissions and why they’re needed</h2>
          <ul>
            <li><strong>x.com and twitter.com</strong> — read your lists and perform follow and unfollow actions in your signed-in session.</li>
            <li><strong>abs.twimg.com</strong> — read X’s own app files.</li>
            <li><strong>storage, unlimitedStorage</strong> — keep settings, scans and history on your device; large lists need more than the default space.</li>
            <li><strong>alarms</strong> — schedule the next action, breaks and daily-limit pauses.</li>
            <li><strong>scripting</strong> — start working in an x.com tab that was already open, without making you reload it.</li>
            <li><strong>notifications (optional)</strong> — requested only if you turn on desktop notifications; shown on your computer, nothing is sent anywhere.</li>
          </ul>

          <h2 id="control">Your choices</h2>
          <ul>
            <li>Turn off anonymous usage stats, or only anonymous feature usage, in Settings → Privacy.</li>
            <li>Delete all extension data in Settings, or delete one X account’s saved data.</li>
            <li>Decline or turn off notifications.</li>
            <li>Pause or stop any run, or press Alt + Shift + S.</li>
            <li>Remove the extension; Chrome deletes its local storage.</li>
          </ul>

          <h2 id="website">This website and Google Analytics</h2>
          <p>This website doesn’t require an account and has no newsletter form or advertising trackers. It is hosted on Vercel, which processes standard request logs to serve and secure the site.</p>
          <h3>Google Analytics 4 and Google Tag Manager with Consent Mode</h3>
          <p>This website uses <strong>Google Analytics 4</strong> (measurement ID G-DEEP3H3Q83) to understand how visitors find and use the site — for example, which pages are visited, where visits come from, and how many people click “Add to Chrome”. It also uses <strong>Google Tag Manager</strong> (container GTM-M4QHPXQV), a Google tool for managing measurement tags, which loads on every page and runs Google Analytics. Both follow <a href="https://support.google.com/analytics/answer/9976101" target="_blank" rel="noopener">Google Consent Mode</a>:</p>
          <ul>
            <li><strong>Before you choose:</strong> analytics and all advertising consent types are set to “denied”. No Google Analytics cookies are set. Google’s tags may send <strong>cookieless pings</strong> — page and interaction information without cookies or identifiers — which Google may use to model aggregate statistics.</li>
            <li><strong>If you accept:</strong> analytics consent is “granted” and Google Analytics may set its cookies. Advertising consent stays “denied”.</li>
            <li><strong>If you decline</strong>, or your browser sends a <strong>Global Privacy Control</strong> signal and you haven’t chosen otherwise: Google Analytics is switched off for this site, so it sends nothing, and any Tag Manager tag sees analytics and advertising consent as “denied”. The Tag Manager script itself still loads.</li>
          </ul>
          <p>When it runs, Google Analytics may collect:</p>
          <ul>
            <li>pages viewed, the referring page or search source, and campaign parameters in the URL;</li>
            <li>device, browser, screen size, language and approximate location (city or region, derived by Google from your IP address);</li>
            <li>interactions on this site: clicks on Chrome Web Store links, call-to-action and navigation links, outbound links, FAQ questions opened, theme changes and use of the interactive demo.</li>
          </ul>
          <p>We don’t send names, email addresses, X usernames, X account data or anything you type into the demo. Google signals and ad personalization are disabled in our configuration, and advertising consent types are set to “denied”. Google states that <a href="https://support.google.com/analytics/answer/12017362" target="_blank" rel="noopener">Google Analytics 4 does not log or store IP addresses</a>.</p>
          <p>Google Analytics sets first-party cookies (<code>_ga</code> and <code>_ga_DEEP3H3Q83</code>) to distinguish visits, only after you accept. Loading Google’s scripts means your browser connects to Google’s servers, which receive your IP address as part of the request. Data is retained according to the setting chosen for our Analytics property (Google offers 2 or 14 months for standard properties). Google’s own practices are described in <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">How Google uses information from sites or apps that use its services</a> and <a href="https://support.google.com/analytics/answer/6004245" target="_blank" rel="noopener">Safeguarding your data</a>.</p>
          <p><strong>Changing your mind:</strong> use <ConsentSettingsButton className="link-btn" /> in the footer at any time. Declining after accepting switches Google Analytics off for this site, tells Google tags that analytics consent is withdrawn, and removes the Google Analytics cookies set for it. Google also offers a <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">browser add-on to opt out of Google Analytics</a>.</p>
          <h3>Small preferences stored in your browser</h3>
          <p>The site stores your theme choice (<code>unfollowx-theme</code>) and your analytics choice (<code>unfollowx-analytics-consent</code>) in your browser’s local storage. They never leave your device.</p>
          <p>Links to the Chrome Web Store, X, Telegram and other services take you to sites with their own privacy practices.</p>

          <h2 id="children">Children</h2>
          <p>The extension and website are not directed at children under 13, and the developer does not knowingly collect personal information from children.</p>

          <h2 id="changes">Changes</h2>
          <p>If what the extension stores or shares changes, or this website’s analytics change, this page and the Chrome Web Store listing will be updated. The date at the top shows the latest revision.</p>

          <h2 id="contact">Contact</h2>
          <p>For privacy questions, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or message <a href={TELEGRAM_URL} target="_blank" rel="noopener">@igfrostt on Telegram</a>. All support options are on the <Link href="/faq#support">contact &amp; support</Link> section. UnfollowX Pro is a product of {PUBLISHER}, developed by <a href={DEVELOPER.url} target="_blank" rel="noopener">{DEVELOPER.name}</a>.</p>
          <div className="callout"><Icon name="info" /><p>X, Twitter and related marks belong to their respective owners. UnfollowX Pro is independent and is not affiliated with, endorsed by or sponsored by X Corp.</p></div>
        </article>
      </div>
    </>
  );
}
