import Image from 'next/image';

// Real UnfollowX Pro screenshots (from the extension's Chrome Web Store
// assets, rendered with fictional sample accounts). Dimensions are always set
// so the layout never shifts while images load.
export const SHOTS = {
  popup: { src: '/images/screenshots/unfollowx-pro-popup-scan-results.webp', width: 401, height: 506, alt: 'UnfollowX Pro popup after a scan: 1.8K following, 432 who don’t follow back, 1.4K mutuals, with Unfollow non-followers and Review & pick buttons' },
  run: { src: '/images/screenshots/unfollowx-pro-popup-run-progress.webp', width: 371, height: 489, alt: 'UnfollowX Pro popup during a run: 127 of 408 unfollowed, the next account in 12 seconds, with Pause and Stop buttons' },
  followers: { src: '/images/screenshots/unfollowx-pro-dashboard-followers-tracker.webp', width: 1061, height: 440, alt: 'UnfollowX Pro dashboard Followers page with tabs for Unfollowed you, New followers and You don’t follow back' },
  inactive: { src: '/images/screenshots/unfollowx-pro-dashboard-inactive-filter-dark.webp', width: 1061, height: 564, alt: 'UnfollowX Pro dashboard in dark mode showing the Inactive tab, last-active check and 30d+, 90d+, 180d+ and 1y+ filters' },
  storeNonFollowers: { src: '/images/screenshots/unfollowx-pro-store-non-followers-scan.webp', width: 1280, height: 800, alt: 'Chrome Web Store screenshot: see who doesn’t follow you back and unfollow them in one click' },
  storeTracker: { src: '/images/screenshots/unfollowx-pro-store-who-unfollowed-you.webp', width: 1280, height: 800, alt: 'Chrome Web Store screenshot: see who unfollowed you on X since your last check' },
  storeInactive: { src: '/images/screenshots/unfollowx-pro-store-inactive-accounts.webp', width: 1280, height: 800, alt: 'Chrome Web Store screenshot: find inactive and non-verified accounts' },
  storePacing: { src: '/images/screenshots/unfollowx-pro-store-background-pacing.webp', width: 1280, height: 800, alt: 'Chrome Web Store screenshot: runs in the background with random delays, breaks and a daily limit' },
  storeFree: { src: '/images/screenshots/unfollowx-pro-store-free-features.webp', width: 1280, height: 800, alt: 'Chrome Web Store screenshot: free, unlimited and private, with whitelist, follow back, saved groups, growth chart, CSV and 7 languages' }
};

export default function Screenshot({ shot, caption = 'Real extension interface · sample accounts', priority = false, sizes = '(max-width: 768px) 100vw, 640px', className = '' }) {
  const s = SHOTS[shot];
  return (
    <figure className={`shot ${className}`.trim()}>
      <div className="shot-frame">
        <Image src={s.src} width={s.width} height={s.height} alt={s.alt} sizes={sizes} priority={priority} quality={80} />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
