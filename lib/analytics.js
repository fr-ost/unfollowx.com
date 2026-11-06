'use client';

// Google Analytics 4 (gtag.js), loaded only after the visitor opts in.
// Documented in docs/google-analytics-setup.md.
//
// Rules this module enforces:
// - Nothing from Google is requested before consent is "granted".
// - gtag.js is injected once per page lifetime (guarded by a window flag).
// - Events are dropped (not queued) while consent is unknown or denied.
// - Parameters are limited to page/UI context; never X usernames, lists,
//   emails or anything typed into the demo.

export const GA_MEASUREMENT_ID = 'G-DEEP3H3Q83';

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
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: !MANUAL_PAGE_VIEWS,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
  if (MANUAL_PAGE_VIEWS) sendPageView(window.location.pathname);

  if (!document.querySelector('script[data-ux-gtag]')) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.dataset.uxGtag = '';
    document.head.appendChild(script);
  }
  return true;
}

let lastPageView = null;
export function sendPageView(path) {
  if (!MANUAL_PAGE_VIEWS || !window.__uxGaReady || getConsent() !== 'granted') return;
  if (lastPageView === path) return;
  lastPageView = path;
  window.gtag('event', 'page_view', { page_path: path, page_location: window.location.href, page_title: document.title });
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
  window.gtag('event', name, safe);
  return true;
}

export const pagePath = () => (typeof window === 'undefined' ? '' : window.location.pathname);
