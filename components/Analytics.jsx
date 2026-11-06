'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getConsent, hasStoredChoice, initAnalytics, MANUAL_PAGE_VIEWS, onConsentChange, pagePath, sendPageView, setConsent, track } from '@/lib/analytics';

const STORE_HOST = 'chromewebstore.google.com';

function linkText(el) {
  let text = '';
  el.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) text += node.textContent;
    else if (node.nodeType === Node.ELEMENT_NODE && !node.classList.contains('visually-hidden')) text += node.textContent;
  });
  return (text.trim() ? text : el.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim().slice(0, 100);
}

function handleClick(event) {
  if (getConsent() !== 'granted') return;
  const el = event.target instanceof Element ? event.target.closest('a[href], button[data-cta]') : null;
  if (!el) return;
  const path = pagePath();

  if (el.tagName === 'BUTTON') {
    track('cta_click', { cta_name: el.dataset.cta, cta_location: el.dataset.ctaLocation || 'unknown', page_path: path });
    return;
  }

  let url;
  try { url = new URL(el.href, window.location.href); } catch { return; }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return; // skip mailto:, tel: (no emails in events)

  // One event per interaction: install clicks are never also counted as outbound/nav.
  if (url.hostname === STORE_HOST || el.dataset.install !== undefined) {
    track('chrome_install_click', {
      page_location: window.location.href,
      page_path: path,
      button_location: el.dataset.location || 'unknown',
      button_text: linkText(el)
    });
    return;
  }
  if (el.dataset.nav) {
    track('navigation_click', { navigation_item: el.dataset.navItem || linkText(el), navigation_location: el.dataset.nav });
    return;
  }
  if (el.dataset.cta) {
    track('cta_click', { cta_name: el.dataset.cta, cta_location: el.dataset.ctaLocation || 'unknown', page_path: path });
    return;
  }
  if (url.hostname !== window.location.hostname) {
    track('outbound_link_click', { link_url: url.origin + url.pathname, link_text: linkText(el), page_path: path });
  }
}

export default function Analytics() {
  const pathname = usePathname();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (getConsent() === 'granted') initAnalytics();
    setShowBanner(!hasStoredChoice() && getConsent() === 'unknown');
    const openSettings = () => setShowBanner(true);
    window.addEventListener('ux:consent-settings', openSettings);
    document.addEventListener('click', handleClick, { capture: true });
    return () => {
      window.removeEventListener('ux:consent-settings', openSettings);
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, []);

  useEffect(() => {
    if (MANUAL_PAGE_VIEWS) sendPageView(pathname);
  }, [pathname]);

  if (!showBanner) return null;

  const choose = (value) => {
    setConsent(value);
    setShowBanner(false);
  };

  return (
    <section className="consent" role="region" aria-labelledby="consent-title">
      <h2 id="consent-title">Help improve this website?</h2>
      <p>
        With your OK, we use Google Analytics (via Google’s tags) to count visits and clicks on “Add to Chrome”. Nothing loads unless you accept, and you can change your
        mind any time from the footer. This choice is about the website, not the extension. <Link href="/privacy#website">Details</Link>
      </p>
      <div className="cta-row">
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => choose('denied')}>Decline</button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => choose('granted')}>Accept analytics</button>
      </div>
    </section>
  );
}

export function ConsentSettingsButton({ className }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event('ux:consent-settings'))}>
      Analytics settings
    </button>
  );
}

/** Fires one GA4 event per page view once consent is (or becomes) granted. */
export function TrackEvent({ name, params, withPath = false }) {
  const serialized = JSON.stringify(params || {});
  useEffect(() => {
    let sent = false;
    const send = () => {
      if (sent || getConsent() !== 'granted') return;
      const payload = JSON.parse(serialized);
      if (withPath) payload.page_path = pagePath();
      sent = track(name, payload);
    };
    send();
    return onConsentChange(send);
  }, [name, serialized, withPath]);
  return null;
}

export { onConsentChange };
