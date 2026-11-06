'use client';

// Google Tag Manager + Google Analytics 4 with Google Consent Mode v2.
// The tags themselves are rendered into every page's <head> by
// app/layout.jsx (see googleTagHeadScript in lib/analytics-config.js);
// this module only handles consent changes and custom events.
// Documented in docs/google-analytics-setup.md.
//
// States:
// - 'unknown'  (no choice yet): consent "denied" → no cookies; tags may send
//              cookieless pings, custom events are sent cookieless.
// - 'granted'  (Accept): analytics cookies allowed; events sent normally.
// - 'denied'   (Decline or Global Privacy Control): GA4 disabled for this
//              site (ga-disable-<ID>), no custom events, GTM tags see denied.
// Parameters are limited to page/UI context; never X usernames, lists,
// emails or anything typed into the demo.

import { CONSENT_STORAGE_KEY, CONSENT_VERSION, EVENT_PARAMS, GA_MEASUREMENT_ID, GA4_DELIVERY, MANUAL_PAGE_VIEWS } from '@/lib/analytics-config';

export { GA_MEASUREMENT_ID, GTM_CONTAINER_ID, GA4_DELIVERY, MANUAL_PAGE_VIEWS } from '@/lib/analytics-config';

const listeners = new Set();

function readStored() {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
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

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') window.gtag = function gtag() { window.dataLayer.push(arguments); };
}

export function setConsent(value) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ v: CONSENT_VERSION, analytics: value, at: new Date().toISOString() }));
  } catch {}
  ensureGtag();
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = value === 'denied';
  window.gtag('consent', 'update', { analytics_storage: value === 'granted' ? 'granted' : 'denied' });
  if (value === 'denied') clearGaCookies();
  window.__uxConsent = value;
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

/** Custom events are allowed unless the visitor declined (or sent GPC). */
export const canTrack = () => typeof window !== 'undefined' && getConsent() !== 'denied';

let lastPageView = null;
export function sendPageView(path) {
  if (!MANUAL_PAGE_VIEWS || !canTrack()) return;
  if (lastPageView === path) return;
  lastPageView = path;
  ensureGtag();
  const params = { page_path: path, page_location: window.location.href, page_title: document.title };
  if (GA4_DELIVERY === 'gtag') window.gtag('event', 'page_view', params);
  else window.dataLayer.push({ event: 'virtual_page_view', ...params });
}

const clean = (value, max = 100) => String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);

/** Sends a GA4 event (cookieless until the visitor accepts); no-op if declined. */
export function track(name, params = {}) {
  if (!canTrack()) return false;
  ensureGtag();
  const safe = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue;
    safe[key] = typeof value === 'number' ? value : clean(value, key === 'page_location' || key === 'link_url' ? 300 : 100);
  }
  if (GA4_DELIVERY === 'gtag') window.gtag('event', name, safe);
  // GTM dataLayer event (this is what feeds GA4 in 'gtm' mode). GTM's data
  // model keeps keys between pushes, so every known parameter not used by
  // this event is reset to undefined — otherwise e.g. button_location from an
  // earlier install click would be attached to a later cta_click.
  const reset = Object.fromEntries(EVENT_PARAMS.map((key) => [key, undefined]));
  window.dataLayer.push({ ...reset, ...safe, event: name });
  return true;
}

export const pagePath = () => (typeof window === 'undefined' ? '' : window.location.pathname);
