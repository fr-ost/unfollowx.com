import Icon from '@/components/Icon';
import CopyButton from '@/components/CopyButton';
import { CONTACT_EMAIL, DEVELOPER, STORE_REVIEWS_URL, TELEGRAM_HANDLE, TELEGRAM_URL } from '@/lib/site';

// Dedicated contact & support box. Used on the homepage, FAQ, setup guide
// and at the end of articles. `id="support"` is the target of footer links.
export default function SupportBox({ id = 'support', headingLevel = 2, compact = false }) {
  const Heading = `h${headingLevel}`;
  return (
    <section className={`support-box${compact ? ' is-compact' : ''}`} id={id} aria-labelledby={`${id}-title`}>
      <div className="support-intro">
        <div className="eyebrow">Contact &amp; support</div>
        <Heading id={`${id}-title`}>Questions or problems? Talk to the developer.</Heading>
        <p>UnfollowX Pro is built and supported by {DEVELOPER.name}. For bug reports, include your extension version (bottom of the dashboard sidebar), your Chrome version and what happened — a screenshot helps.</p>
      </div>
      <ul className="support-channels" role="list">
        <li className="support-channel primary">
          <span className="icon-tile"><Icon name="send" /></span>
          <div className="support-text">
            <b>Telegram</b>
            <span className="support-value">{TELEGRAM_HANDLE}</span>
            <small>Message the developer directly</small>
          </div>
          <div className="support-actions">
            <a className="btn btn-primary btn-sm" href={TELEGRAM_URL} target="_blank" rel="noopener" data-cta="support_telegram" data-cta-location="support_box">Open chat</a>
            <CopyButton value={TELEGRAM_HANDLE} label="Telegram username" name="copy_telegram" />
          </div>
        </li>
        <li className="support-channel">
          <span className="icon-tile"><Icon name="mail" /></span>
          <div className="support-text">
            <b>Email</b>
            <span className="support-value">{CONTACT_EMAIL}</span>
            <small>Support, privacy questions and feedback</small>
          </div>
          <div className="support-actions">
            <a className="btn btn-secondary btn-sm" href={`mailto:${CONTACT_EMAIL}?subject=UnfollowX%20Pro%20support`}>Send email</a>
            <CopyButton value={CONTACT_EMAIL} label="email address" name="copy_email" />
          </div>
        </li>
        <li className="support-channel">
          <span className="icon-tile red"><Icon name="alert" /></span>
          <div className="support-text">
            <b>Report a bug in the extension</b>
            <small>Use <strong>Report a bug</strong> at the bottom of the UnfollowX Pro popup or dashboard. Help → Connection check shows what the extension can reach.</small>
          </div>
        </li>
        <li className="support-channel">
          <span className="icon-tile amber"><Icon name="heart" /></span>
          <div className="support-text">
            <b>Chrome Web Store reviews</b>
            <small>Liked it, or something’s missing? A review helps other people find a free tool.</small>
          </div>
          <div className="support-actions">
            <a className="btn btn-secondary btn-sm" href={STORE_REVIEWS_URL} target="_blank" rel="noopener" data-cta="store_review" data-cta-location="support_box">Write a review</a>
          </div>
        </li>
        <li className="support-channel">
          <span className="icon-tile green"><Icon name="globe" /></span>
          <div className="support-text">
            <b>Developer website</b>
            <span className="support-value">shahriarahmed.net</span>
            <small>{DEVELOPER.name} · Unique Labs</small>
          </div>
          <div className="support-actions">
            <a className="btn btn-secondary btn-sm" href={DEVELOPER.url} target="_blank" rel="noopener">Visit</a>
          </div>
        </li>
      </ul>
    </section>
  );
}
