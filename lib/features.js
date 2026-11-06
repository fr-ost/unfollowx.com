// Every capability listed here was checked against the extension source
// (v7.3.4: README, CHANGELOG, shared/config.js, shared/telemetry.js).
// `guide` links each feature to the article that explains it in depth.

export const features = [
  {
    id: 'non-followers', icon: 'userMinus', tone: 'red', group: 'find',
    title: 'Find accounts that don’t follow you back',
    short: 'One read-only scan marks every account you follow as mutual or non-follower.',
    body: 'The scan reads your whole following list through X’s own Following timeline, using X’s per-account “follows you” flag, and changes nothing while it runs. Results open in the popup and the full dashboard, split into Don’t follow back and Mutuals.',
    guide: 'how-to-see-who-doesnt-follow-you-back-on-x'
  },
  {
    id: 'follower-changes', icon: 'arrowsSwap', tone: 'blue', group: 'find',
    title: 'Track new and lost followers with snapshots',
    short: 'Each followers check is compared with the last complete one: who left, who’s new.',
    body: 'After a scan the extension reads your followers and compares them with the previous complete read. The Followers page lists who unfollowed you (with the dates between the two checks), new followers and people you don’t follow back. A partial read from X is never compared, so nobody is listed by mistake. Accounts with more than 20,000 followers are checked when you press Check now.',
    guide: 'how-to-find-out-who-unfollowed-you-on-x'
  },
  {
    id: 'inactive', icon: 'moonZ', tone: 'amber', group: 'find',
    title: 'Find inactive accounts by their newest readable post',
    short: 'Filter by 30, 90, 180 days or a year since an account last posted, replied or reposted.',
    body: '“Last active” means the date of the newest post, reply or repost the extension can read. X doesn’t expose logins or likes, so those aren’t used. Accounts whose date can’t be read are listed separately as Unavailable — never guessed as inactive.',
    guide: 'how-to-find-inactive-accounts-on-x'
  },
  {
    id: 'not-blue', icon: 'badgeOff', tone: 'violet', group: 'find',
    title: 'Identify accounts without a blue check',
    short: 'A Not blue tab lists accounts you follow that don’t have X Premium’s blue check.',
    body: 'Legacy and organization checks are not blue, so those accounts appear here too, tagged “Verified (not blue)”. Accounts for which X didn’t report the flag are left out and flagged instead of guessed.',
    guide: 'a-thoughtful-guide-to-cleaning-up-your-x-following-list'
  },
  {
    id: 'filters', icon: 'filter', tone: 'blue', group: 'review',
    title: 'Search and filter by account details',
    short: 'Search name, handle or bio. Filter by photo, posts, followers, ratio, age and more.',
    body: 'Narrow the list with quick filters (no profile photo, few posts, few followers, follows far more than followed, verified, private) and advanced ones: followers range, follow ratio, when the account joined X, bio contains / doesn’t contain, and writing system. Sort and multi-select from there.',
    guide: 'a-thoughtful-guide-to-cleaning-up-your-x-following-list'
  },
  {
    id: 'whitelist', icon: 'shield', tone: 'green', group: 'protect',
    title: 'Whitelist important accounts',
    short: 'Whitelisted accounts are never unfollowed, in any mode. One tap on the shield.',
    body: 'Add friends, clients and anyone you never want removed. The whitelist is checked before every unfollow, even in the middle of a run. Paste several handles or profile links at once, and export the list as CSV.',
    guide: 'how-to-whitelist-accounts-before-unfollowing-on-x'
  },
  {
    id: 'keep-rules', icon: 'sparkle', tone: 'green', group: 'protect',
    title: 'Create Keep rules',
    short: 'Automatically keep verified, private or big accounts, keyword matches and recent follows.',
    body: 'Keep rules protect whole groups: verified accounts, private accounts, accounts above a follower threshold, anyone whose name, handle or bio matches a keyword, and accounts you followed in the last N days (a grace period so new follows have time to follow back).',
    guide: 'how-to-whitelist-accounts-before-unfollowing-on-x'
  },
  {
    id: 'groups', icon: 'layers', tone: 'violet', group: 'review',
    title: 'Save account groups',
    short: 'Save any selection as a named group and pick it again from the Group menu.',
    body: 'Build a selection with filters and search, save it with a name, and come back to it later — useful when you review in batches over several days.',
    guide: 'a-thoughtful-guide-to-cleaning-up-your-x-following-list'
  },
  {
    id: 'csv', icon: 'file', tone: 'blue', group: 'review',
    title: 'Import and export CSV',
    short: 'Export lists, selections and history. Import a CSV or pasted list of handles.',
    body: 'Download the current list, a selection or your action history as CSV. Import works the other way: paste handles or upload a CSV, and only those accounts are targeted.',
    guide: 'how-to-export-your-x-following-list-to-csv'
  },
  {
    id: 'history', icon: 'history', tone: 'blue', group: 'act',
    title: 'View follow and unfollow history',
    short: 'Everyone the extension unfollowed or followed, with dates, in separate tabs.',
    body: 'History keeps Unfollowed and Followed tabs on your device, with timestamps and CSV export, so you always know what changed and when.',
    guide: 'how-to-recover-from-an-accidental-unfollow-on-x'
  },
  {
    id: 'follow-back', icon: 'userPlus', tone: 'green', group: 'act',
    title: 'Follow accounts back',
    short: 'Select new followers or people you don’t follow back and follow them back.',
    body: 'From the Followers page, pick accounts to follow back. Follows use the same pacing, breaks and daily limit as unfollows, and follow requests to private accounts are recognised.',
    guide: 'what-an-x-follower-tracker-can-and-cannot-tell-you'
  },
  {
    id: 'follow-again', icon: 'refresh', tone: 'amber', group: 'act',
    title: 'Follow again after accidental unfollows',
    short: 'Unfollowed someone by mistake? Select them in History and press Follow again.',
    body: 'Re-following restores the follow relationship through your own X session. It can’t restore anything else about the previous connection, so check the profile before you reconnect.',
    guide: 'how-to-recover-from-an-accidental-unfollow-on-x'
  },
  {
    id: 'multiple-accounts', icon: 'users', tone: 'violet', group: 'control',
    title: 'Manage multiple X accounts',
    short: 'Each X account keeps its own scan, whitelist, history, groups and daily count.',
    body: 'Sign in to X as another account and its data loads automatically — never in the middle of a run. Settings lists the saved accounts and can delete one account’s data.',
    guide: 'how-to-manage-multiple-x-accounts-in-chrome'
  },
  {
    id: 'pacing', icon: 'sliders', tone: 'blue', group: 'control',
    title: 'Customize delays, breaks and daily limits',
    short: 'Safe, Balanced or Fast presets — or your own numbers.',
    body: 'Random gaps between actions, a break every N actions and a rolling 24-hour limit you set (400 by default) that continues automatically. If X asks to slow down, the run rests; if X asks you to verify your account, it stops and waits for you. These controls can’t guarantee X won’t limit an account.',
    guide: 'how-to-mass-unfollow-accounts-on-x'
  },
  {
    id: 'run-controls', icon: 'pause', tone: 'amber', group: 'control',
    title: 'Pause, resume and stop runs',
    short: 'Runs keep going in the background. Pause or stop any time — or press Alt+Shift+S.',
    body: 'The engine runs in the extension’s background worker, so you can switch tabs or close the popup. Pause, resume or stop from the popup or dashboard; the Alt+Shift+S shortcut is an emergency stop.',
    guide: 'how-to-mass-unfollow-accounts-on-x'
  },
  {
    id: 'themes', icon: 'sun', tone: 'violet', group: 'comfort',
    title: 'Light and dark themes',
    short: 'Follows your system theme, or flip it with the sun/moon button.',
    body: 'Both the popup and the dashboard have light and dark modes, and the extension also includes a growth chart of following and followers over time.',
    guide: null
  },
  {
    id: 'languages', icon: 'globe', tone: 'blue', group: 'comfort',
    title: 'Seven interface languages',
    short: 'English, Español, Português (Brasil), हिन्दी, Bahasa Indonesia, Türkçe and العربية.',
    body: 'The extension follows your browser language or the choice in Settings. Arabic is laid out right to left, and numbers and dates follow the language.',
    guide: null
  }
];

export const featureGroups = [
  { id: 'find', title: 'Find', text: 'See your list clearly: mutuals, non-followers, changes and quiet accounts.' },
  { id: 'review', title: 'Review', text: 'Search, filter, group and export before you decide anything.' },
  { id: 'protect', title: 'Protect', text: 'Make sure the people who matter are never touched.' },
  { id: 'act', title: 'Act & undo', text: 'Unfollow, follow back and re-follow — with a full history.' },
  { id: 'control', title: 'Control', text: 'Pacing, accounts and run controls stay in your hands.' },
  { id: 'comfort', title: 'Comfort', text: 'Themes and languages that fit the way you work.' }
];

export const featureById = Object.fromEntries(features.map((f) => [f.id, f]));
