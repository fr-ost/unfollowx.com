'use client';

// Google Tag Manager + Google Analytics 4, loaded only after the visitor opts in.
// Documented in docs/google-analytics-setup.md.
//
// Rules this module enforces:
// - Nothing from Google is requested before consent is "granted".
// - gtm.js and gtag.js are each injected at most once per page lifetime.
// - Events are dropped (not queued) while consent is unknown or denied.
// - Parameters are limited to page/UI context; never X usernames, lists,
//   emails or anything typed into the demo.

export const GA_MEASUREMENT_ID = 'G-DEEP3H3Q83';
export const GTM_CONTAINER_ID = 'GTM-M4QHPXQV';

// Who sends GA4 hits — exactly one path, never both (that would double-count):
// - 'gtag' (default): gtag.js sends GA4 page views and events directly.
//   GTM still loads for any other tags; the container must NOT contain a
//   Google tag / GA4 tags for G-DEEP3H3Q83.
// - 'gtm': gtag.js is not loaded. Configure the Google tag (G-DEEP3H3Q83)
//   and GA4 event tags inside GTM; this module only pushes dataLayer events.
// See docs/google-analytics-setup.md before changing this.
export const GA4_DELIVERY = 'gtag';

// Page views: GA4 sends the first page_view from `config`. For client-side
// navigation we rely on GA4 Enhanced measurement ("Page changes based on
// browser history events"), which is on by default for new web streams.
// If that setting is turned off in GA4 Admin, set this to true so the app
// sends page_view itself on every route change (never both — duplicates).
export const MANUAL_PAGE_VIEWS = false;

const STORAGE_KEY = 'unfollowx-analytics-consent';
const CONSENT_VERSION = 1;
const listeners = new Set();

function readStored() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.v === CONSENT_VERSION && (parsed.analytics === 'granted' || parsed.analytics === 'denied')) return parsed.analytics;
  } catch {}
  return null;
}

/** 'granted' | 'denied' | 'unknown' */
export function getConsent() {
  if (typeof window === 'undefined') return 'unknown';
  const stored = readStored();
  if (stored) return stored;
  // Global Privacy Control is treated as a decline until the visitor chooses otherwise.
  if (navigator.globalPrivacyControl === true) return 'denied';
  return 'unknown';
}

export function hasStoredChoice() {
  return typeof window !== 'undefined' && readStored() !== null;
}

export function onConsentChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function setConsent(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: CONSENT_VERSION, analytics: value, at: new Date().toISOString() }));
  } catch {}
  if (value === 'granted') {
    initAnalytics();
  } else if (window.__uxGaReady && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', { analytics_storage: 'denied' });
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
    clearGaCookies();
  }
  listeners.forEach((fn) => fn(value));
}

function clearGaCookies() {
  const host = window.location.hostname;
  const domains = ['', host, '.' + host, '.' + host.replace(/^www\./, '')];
  document.cookie.split(';').map((c) => c.split('=')[0].trim()).filter((name) => name === '_ga' || name.startsWith('_ga_')).forEach((name) => {
    domains.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? '; domain=' + domain : ''}`;
    });
  });
}

/** Loads gtag.js and configures GA4. Safe to call repeatedly. */
export function initAnalytics() {
  if (typeof window === 'undefined' || getConsent() !== 'granted') return false;
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
  if (window.__uxGaReady) {
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    return true;
  }
  window.__uxGaReady = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  // Consent Mode defaults come first so GTM tags and GA4 both inherit them.
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });
  window.gtag('js', new Date());

  if (GA4_DELIVERY === 'gtag') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: !MANUAL_PAGE_VIEWS,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`, 'uxGtag');
  }

  // Standard GTM bootstrap: the gtm.js event is what fires the container's
  // Initialization / All Pages triggers. (No <noscript> iframe: it would load
  // GTM for visitors who cannot give consent.)
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  injectScript(`https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`, 'uxGtm');

  if (MANUAL_PAGE_VIEWS) sendPageView(window.location.pathname);
  return true;
}

function injectScript(src, flag) {
  if (document.querySelector(`script[data-${flag.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())}]`)) return;
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  script.dataset[flag] = '';
  document.head.appendChild(script);
}

let lastPageView = null;
export function sendPageView(path) {
  if (!MANUAL_PAGE_VIEWS || !window.__uxGaReady || getConsent() !== 'granted') return;
  if (lastPageView === path) return;
  lastPageView = path;
  const params = { page_path: path, page_location: window.location.href, page_title: document.title };
  if (GA4_DELIVERY === 'gtag') window.gtag('event', 'page_view', params);
  else window.dataLayer.push({ event: 'virtual_page_view', ...params });
}

const clean = (value, max = 100) => String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);

/** Sends a GA4 event if (and only if) analytics consent is granted. */
export function track(name, params = {}) {
  if (typeof window === 'undefined' || getConsent() !== 'granted') return false;
  if (!window.__uxGaReady) initAnalytics();
  const safe = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue;
    safe[key] = typeof value === 'number' ? value : clean(value, key === 'page_location' || key === 'link_url' ? 300 : 100);
  }
  if (GA4_DELIVERY === 'gtag') window.gtag('event', name, safe);
  // Same event as a GTM dataLayer event, so container triggers can use it
  // (e.g. a custom-event trigger on chrome_install_click). In 'gtag' mode,
  // do not forward these to GA4 from GTM — gtag.js already sent them.
  window.dataLayer.push({ event: name, ...safe });
  return true;
}

export const pagePath = () => (typeof window === 'undefined' ? '' : window.location.pathname);
