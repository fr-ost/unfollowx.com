// FAQ content. Answers are short paragraphs; [text](/path) becomes a link.
// The same text feeds the visible accordion and the FAQPage JSON-LD on /faq,
// so structured data always matches what visitors can read.

export const faqCategories = [
  { id: 'pricing', label: 'Free & limits' },
  { id: 'start', label: 'Getting started' },
  { id: 'features', label: 'Features' },
  { id: 'safety', label: 'Pacing & X limits' },
  { id: 'privacy', label: 'Privacy & data' }
];

export const faqs = [
  {
    id: 'is-it-free', category: 'pricing', home: true,
    q: 'Is UnfollowX Pro completely free?',
    a: ['Yes. Every feature in UnfollowX Pro is free to use. There is no paid tier, no trial period, no credit card and no separate sign-up — you install it from the Chrome Web Store and start.']
  },
  {
    id: 'free-forever', category: 'pricing', home: true,
    q: 'Is UnfollowX Pro free forever?',
    a: ['Yes. Being free is a core promise of the product, not a launch offer. There is no premium plan to upgrade to, and features are not moved behind a paywall.']
  },
  {
    id: 'usage-quotas', category: 'pricing', home: true,
    q: 'Are there any daily usage quotas imposed by UnfollowX Pro?',
    a: [
      'No. UnfollowX Pro does not cap how many accounts you can scan, review or act on, and nothing is reserved for paying users.',
      'You will see a daily limit in Settings: that is a pacing control you own (400 actions per rolling 24 hours by default, adjustable or switchable off). X also applies its own limits to every account, whatever tool you use — see [Can X rate-limit actions?](/faq#faq-rate-limits).'
    ]
  },
  {
    id: 'subscription', category: 'pricing', home: true,
    q: 'Do I need a subscription?',
    a: ['No. There is nothing to subscribe to and nothing to cancel. UnfollowX Pro never asks for payment details.']
  },
  {
    id: 'why-free', category: 'pricing',
    q: 'Why is it free? Is there a catch?',
    a: [
      'There is no paid tier to push you towards. Inside the extension you will find an optional Donate page if you want to support development, and a link to GrowX, a separate product from the same developer. Neither is required for any feature.',
      'The extension also sends anonymous usage statistics, which you can turn off — the [privacy policy](/privacy#stats) lists exactly what they contain.'
    ]
  },
  {
    id: 'password', category: 'start', home: true,
    q: 'Do I need to give UnfollowX Pro my X password?',
    a: ['No. The extension works inside the X session you are already signed in to in Chrome. It never asks for, stores or sends your X password, and it never signs in for you.']
  },
  {
    id: 'see-non-followers', category: 'start', home: true,
    q: 'How do I see who doesn’t follow me back on X?',
    a: [
      'Install UnfollowX Pro, open x.com in Chrome while signed in, click the extension icon and press “Scan my following”. The scan is read-only and usually takes about a minute. Your results show how many accounts don’t follow you back, and the dashboard lets you search, filter and review them.',
      'Step-by-step: [How to see who doesn’t follow you back on X](/blog/how-to-see-who-doesnt-follow-you-back-on-x).'
    ]
  },
  {
    id: 'see-unfollowers', category: 'start', home: true,
    q: 'How do I see who unfollowed me?',
    a: [
      'After a scan, UnfollowX Pro reads your followers and saves a snapshot. On later checks it compares the new complete list with the previous one and shows who left, who is new and who you don’t follow back.',
      'X does not provide an unfollow history, so no tool can show changes from before your first snapshot. More detail: [How to find out who unfollowed you on X](/blog/how-to-find-out-who-unfollowed-you-on-x).'
    ]
  },
  {
    id: 'bulk', category: 'features', home: true,
    q: 'Can I unfollow multiple accounts at once?',
    a: ['Yes. You can unfollow all non-followers in one click, select specific accounts in the dashboard, import a list of handles, or — if you really want a fresh start — unfollow everyone. Every run is paced with random delays, breaks and your daily limit, and whitelisted accounts are always skipped.']
  },
  {
    id: 'protect', category: 'features', home: true,
    q: 'Can I protect important accounts?',
    a: ['Yes. Accounts on your whitelist are never unfollowed, in any mode. Keep rules can also protect verified accounts, private accounts, accounts above a follower count, accounts matching keywords in their name or bio, and accounts you followed in the last N days. Both are checked before every unfollow, even mid-run.']
  },
  {
    id: 'x-and-twitter', category: 'start', home: true,
    q: 'Does it work on X and Twitter?',
    a: ['Yes. UnfollowX Pro works on x.com and twitter.com, on both X’s new web layout and the classic one. Because X can change its website at any time, compatibility is maintained through extension updates.']
  },
  {
    id: 'mobile', category: 'start', home: true,
    q: 'Does it work on mobile?',
    a: ['No. UnfollowX Pro is a desktop Chrome extension (Chrome 116 or newer), and Chrome on phones and tablets does not run extensions. Use it on a Windows, macOS, Linux or ChromeOS computer; changes you make apply to your X account everywhere.']
  },
  {
    id: 'rate-limits', category: 'safety', home: true,
    q: 'Can X rate-limit actions?',
    a: [
      'Yes. X sets its own limits for every account. Its help center describes a technical limit of 400 follows per day, additional ratio-based limits once you follow 5,000 accounts, and rules against aggressive or automated following behaviour. Limits can also be reduced temporarily.',
      'UnfollowX Pro’s delays, breaks and daily limit help you work at a measured pace; if X asks it to slow down, the run rests, and if X asks you to verify your account, it stops and waits for you. No tool can guarantee X will allow every action, so start conservatively and stop if X shows a warning.'
    ]
  },
  {
    id: 'pause', category: 'safety',
    q: 'Can I pause or stop a run?',
    a: ['Yes. Pause, resume or stop from the popup or the dashboard, or press Alt + Shift + S for an emergency stop. Runs keep going in the background when you switch tabs or close the popup.']
  },
  {
    id: 'undo', category: 'features',
    q: 'Can I undo an unfollow?',
    a: ['You can re-follow. History keeps a record of every account the extension unfollowed; select one and press Follow again. Follows use the same pacing as unfollows. Re-following restores the follow, not anything else about the previous connection. Guide: [How to recover from an accidental unfollow](/blog/how-to-recover-from-an-accidental-unfollow-on-x).']
  },
  {
    id: 'data-stored', category: 'privacy', home: true,
    q: 'Where is my data stored?',
    a: ['Your scans, follower snapshots, whitelist, Keep rules, groups, settings and action history are stored in Chrome extension storage on your computer. They are not uploaded to the developer. If you use several X accounts, each account’s data is kept separately.']
  },
  {
    id: 'telemetry', category: 'privacy',
    q: 'What do the anonymous usage statistics include?',
    a: [
      'If left on, the extension sends an install event, at most one “active” event per UTC day, and an uninstall signal. They contain a random install ID created on your device, the extension version, the event type and time, and — with the daily event — a single number: how many follow and unfollow actions happened in the last 24 hours. The server derives a coarse country from the request and, per the extension’s disclosure, does not store the IP address.',
      'They never include your X username or account, your lists, whitelist or history. Turn them off in Dashboard → Settings → Privacy → Anonymous usage stats.'
    ]
  },
  {
    id: 'delete-data', category: 'privacy',
    q: 'How do I delete my extension data?',
    a: ['Open Dashboard → Settings and choose “Delete all extension data”, or delete a single X account’s saved data from the accounts list in Settings. Removing the extension from Chrome also removes its local storage. Deleting data never changes anything on X.']
  },
  {
    id: 'notifications', category: 'privacy',
    q: 'Does the extension send notifications?',
    a: ['Only if you turn them on. Desktop notifications are off by default; when you enable them in Settings, Chrome asks for permission. They can tell you when a run finishes, reaches the daily limit or needs you, and when people unfollow you. They are shown on your computer — nothing is sent anywhere.']
  },
  {
    id: 'website-analytics', category: 'privacy',
    q: 'Does this website use analytics?',
    a: ['Only with your consent. This website can use Google Analytics 4 to count visits and clicks on “Add to Chrome”, but the analytics script loads only after you accept it in the banner. You can change your choice any time from “Analytics settings” in the footer. Details are in the [privacy policy](/privacy#website).']
  },
  {
    id: 'export', category: 'features',
    q: 'Can I export my X following list?',
    a: ['Yes. After a scan you can export the current list, a selection, follower changes or your action history as CSV. You can also import a CSV or pasted list of handles to target specific accounts. Guide: [How to export your X following list to CSV](/blog/how-to-export-your-x-following-list-to-csv).']
  },
  {
    id: 'multi-account', category: 'features',
    q: 'Can I use it with more than one X account?',
    a: ['Yes. Each X account keeps its own scan, whitelist, history, groups and daily count. Switch accounts on X and that account’s data loads automatically — never in the middle of a run.']
  },
  {
    id: 'languages', category: 'features',
    q: 'Which languages does the extension support?',
    a: ['English, Español, Português (Brasil), हिन्दी, Bahasa Indonesia, Türkçe and العربية (right to left). It follows your browser language unless you choose one in Settings.']
  }
];

export const homeFaqs = faqs.filter((item) => item.home);

/** Strips the [text](url) markup for structured data. */
export const plainAnswer = (paragraphs) => paragraphs.map((p) => p.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')).join(' ');
