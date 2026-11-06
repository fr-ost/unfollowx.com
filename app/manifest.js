export default function manifest() {
  return {
    name: 'UnfollowX Pro',
    short_name: 'UnfollowX',
    description: 'Free forever X (Twitter) following manager for Chrome: find non-followers, track unfollowers and clean up your following list.',
    start_url: '/',
    display: 'browser',
    background_color: '#f7f8fc',
    theme_color: '#5046e5',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/assets/icon128.png', sizes: '128x128', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  };
}
