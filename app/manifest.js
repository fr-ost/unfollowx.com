export default function manifest() {
  return {
    name: 'UnfollowX Pro',
    short_name: 'UnfollowX Pro',
    description: 'UnfollowX Pro: a free Chrome extension to mass unfollow on Twitter (X), find non-followers and track unfollowers at a safe pace.',
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
