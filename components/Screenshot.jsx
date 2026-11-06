import Image from 'next/image';

// Real UnfollowX Pro screenshots, captured at 2× (device scale factor 2)
// from the actual extension UI using its own capture tool
// (fr-ost/UNFOLLOWX → design/store-assets.mjs) with fictional sample
// accounts. Intrinsic sizes are the 2× pixel sizes; `sizes` tells the
// browser the CSS display width so it picks a sharp variant for the
// screen's pixel density. Dimensions are always set, so nothing shifts.
export const SHOTS = {
  popup: { src: '/images/screenshots/unfollowx-pro-popup-scan-results-light.webp', width: 760, height: 960, alt: 'UnfollowX Pro popup after a scan: 1.8K following, 432 who don’t follow back, 1.4K mutuals, “23 people unfollowed you”, and Unfollow non-followers, Review & pick and Unfollow all buttons' },
  popupDark: { src: '/images/screenshots/unfollowx-pro-popup-scan-results-dark.webp', width: 760, height: 960, alt: 'UnfollowX Pro popup in dark mode showing scan results and “23 people unfollowed you · See who”' },
  run: { src: '/images/screenshots/unfollowx-pro-popup-paced-run-light.webp', width: 760, height: 1002, alt: 'UnfollowX Pro popup during a paced run: 127 of 408 unfollowed, next account in 12 seconds, with Pause and Stop buttons' },
  followers: { src: '/images/screenshots/unfollowx-pro-dashboard-followers-unfollowed-you.webp', width: 2720, height: 1360, alt: 'UnfollowX Pro dashboard Followers page with tabs for Unfollowed you (23), New followers (12) and You don’t follow back (48), three accounts selected' },
  inactive: { src: '/images/screenshots/unfollowx-pro-dashboard-inactive-accounts-dark.webp', width: 2720, height: 1360, alt: 'UnfollowX Pro dashboard in dark mode: Following → Inactive tab with the last-active check, 30d+, 90d+, 180d+ and 1y+ filters, and accounts sorted by days since their last post' },
  following: { src: '/images/screenshots/unfollowx-pro-dashboard-following-review.webp', width: 2720, height: 1480, alt: 'UnfollowX Pro dashboard Following page: Don’t follow back tab, quick filters, account list with followers, posts and join date, whitelist shields and a bar to save, keep, export or unfollow selected accounts' },
  overview: { src: '/images/screenshots/unfollowx-pro-dashboard-overview-light.webp', width: 2720, height: 1720, alt: 'UnfollowX Pro dashboard Overview: following, followers, don’t follow back and actions today, a running unfollow run with progress, and recent activity' },
  settingsSpeed: { src: '/images/screenshots/unfollowx-pro-settings-speed-presets.webp', width: 2200, height: 1000, alt: 'UnfollowX Pro Settings: Safe, Balanced and Fast speed presets with minimum and maximum delay, breaks, break length and daily limit' },
  settingsKeep: { src: '/images/screenshots/unfollowx-pro-settings-keep-rules.webp', width: 2200, height: 820, alt: 'UnfollowX Pro Settings: Keep rules for verified accounts, private accounts, a minimum follower count, recently followed accounts and keywords' }
};

export default function Screenshot({ shot, caption = 'Real extension interface · sample accounts', preload = false, sizes = '(max-width: 768px) 100vw, 640px', className = '' }) {
  const s = SHOTS[shot];
  return (
    <figure className={`shot ${className}`.trim()}>
      <div className="shot-frame">
        <Image src={s.src} width={s.width} height={s.height} alt={s.alt} sizes={sizes} preload={preload} quality={90} />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
