// Shared Google tag configuration. Imported by the server layout (to render
// the tag into every page's <head>) and by lib/analytics.js (client).
// Documented in docs/google-analytics-setup.md.

export const GA_MEASUREMENT_ID = 'G-DEEP3H3Q83';
export const GTM_CONTAINER_ID = 'GTM-M4QHPXQV';

// Who sends GA4 hits — exactly one path, never both (that would double-count):
// - 'gtag' (default): gtag.js sends GA4 page views and events directly.
//   GTM loads too, for any other tags; the container must NOT contain a
//   Google tag / GA4 tags for G-DEEP3H3Q83.
// - 'gtm': gtag.js is not loaded. Configure the Google tag (G-DEEP3H3Q83)
//   and GA4 event tags inside GTM; the site only pushes dataLayer events.
export const GA4_DELIVERY = 'gtag';

// Client-side route changes are counted by GA4 Enhanced measurement
// ("Page changes based on browser history events", on by default). Set to
// true only if that setting is turned off in GA4 (never both).
export const MANUAL_PAGE_VIEWS = false;

export const CONSENT_STORAGE_KEY = 'unfollowx-analytics-consent';
export const CONSENT_VERSION = 1;

/**
 * Inline <head> script, rendered on every page before anything else from
 * Google runs. Google Consent Mode v2:
 * - no choice yet  → analytics_storage + all ad types "denied": no cookies;
 *                    Google tags may send cookieless pings.
 * - accepted       → analytics_storage "granted" (ads stay denied).
 * - declined / GPC → also sets ga-disable-<ID>, so GA4 sends nothing at all.
 * Then the Google tag snippet itself: gtag('js'), the GTM container and
 * (in 'gtag' mode) gtag.js for GA4. The tags are injected from this same
 * script so the consent defaults are guaranteed to be queued first.
 */
export function googleTagHeadScript() {
  const ga = GA4_DELIVERY === 'gtag';
  return `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
(function(){
  var c = null;
  try { var s = JSON.parse(localStorage.getItem('${CONSENT_STORAGE_KEY}') || 'null'); if (s && s.v === ${CONSENT_VERSION} && (s.analytics === 'granted' || s.analytics === 'denied')) c = s.analytics; } catch (e) {}
  if (!c && navigator.globalPrivacyControl === true) c = 'denied';
  window.__uxConsent = c || 'unknown';
  if (c === 'denied') window['ga-disable-${GA_MEASUREMENT_ID}'] = true;
  gtag('consent', 'default', { analytics_storage: c === 'granted' ? 'granted' : 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  gtag('set', 'ads_data_redaction', true);
})();
gtag('js', new Date());${ga ? `
gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: ${!MANUAL_PAGE_VIEWS}, allow_google_signals: false, allow_ad_personalization_signals: false });` : ''}
dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
(function(d){
  function add(src){ var j = d.createElement('script'); j.async = true; j.src = src; d.head.appendChild(j); }
  add('https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}');${ga ? `
  add('https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}');` : ''}
})(document);`;
}
