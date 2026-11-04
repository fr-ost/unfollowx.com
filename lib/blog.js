const publishedAt = '2026-11-04';

export const articles = [
  {
    slug: 'how-to-see-who-doesnt-follow-you-back-on-x',
    title: 'How to see who doesn’t follow you back on X',
    description: 'Review your X following list, find accounts that do not follow you back, and decide what—if anything—you want to change.',
    category: 'HOW-TO',
    readingTime: '5 MIN READ',
    publishedAt,
    updatedAt: publishedAt,
    icon: '↔',
    relatedSlugs: ['how-to-mass-unfollow-accounts-on-x', 'how-to-whitelist-accounts-before-unfollowing-on-x'],
    sections: [
      ['Start with the question you want answered', 'If you follow a lot of accounts, it can be hard to remember which connections are mutual. A non-follower check compares the accounts you follow with your followers and marks accounts that do not appear in both lists.'],
      ['Use a browser tool that works in your signed-in session', 'UnfollowX Pro is a Chrome extension for x.com and twitter.com. It reads your following list from X in the browser session you already use. It does not ask you to enter your X password. Install it from the Chrome Web Store, open X in Chrome, and start a scan from the extension.'],
      ['Review the results before taking action', 'When the scan is ready, open the “Don’t follow back” list. Use search and filters to narrow the results, then review individual profiles or select only the accounts you actually want to unfollow. Follow-back status is one piece of context: someone may still be valuable to you even if they do not follow you.'],
      ['Protect accounts you want to keep', 'UnfollowX Pro includes a whitelist and Keep rules. You can protect selected accounts, verified or private accounts, accounts above a follower threshold, recently followed accounts, or profiles matching keywords. Check that your rules match your intentions before starting a bulk run.'],
      ['Set a measured pace', 'If you choose to unfollow, the extension supports delays, breaks and a rolling daily limit. You can pause, resume or stop. These controls do not guarantee that X will never limit or restrict activity. Stop if X asks you to slow down or verify your account, and make sure your use follows X’s current rules.'],
      ['A quick checklist', 'Open X in Chrome; scan your following list; review non-followers; protect accounts with Keep rules; select carefully; choose a conservative pace; and stop if X shows a warning.']
    ]
  },
  {
    slug: 'how-to-find-out-who-unfollowed-you-on-x',
    title: 'How to find out who unfollowed you on X',
    description: 'Learn how follower tracking works on X, why a first snapshot matters, and how to read changes without jumping to conclusions.',
    category: 'HOW-TO',
    readingTime: '4 MIN READ',
    publishedAt,
    updatedAt: publishedAt,
    icon: '◷',
    relatedSlugs: ['what-an-x-follower-tracker-can-and-cannot-tell-you', 'how-to-see-who-doesnt-follow-you-back-on-x'],
    sections: [
      ['Why a comparison is needed', 'A follower list is a snapshot in time. To identify changes, a tracker needs one complete snapshot to compare against a later one. That means a tool cannot tell you who unfollowed you before you started tracking.'],
      ['Save your first followers snapshot', 'With UnfollowX Pro, run a scan or followers check while signed in to X in Chrome. The extension reads your followers list and saves a snapshot in Chrome storage on your device. The first check creates your baseline; it does not reveal earlier changes.'],
      ['Check again later', 'Run another check when you want to compare. Accounts present in the prior complete snapshot and missing from the new complete snapshot can appear as “unfollowed you.” Accounts newly present can appear as new followers. You can also review followers you do not follow back.'],
      ['Treat incomplete results carefully', 'Social platforms can return partial or changing data. UnfollowX Pro avoids comparing an incomplete followers result as if it were complete. If a check cannot finish, try again later instead of drawing conclusions from a partial list.'],
      ['What the tracker does not tell you', 'A comparison shows that an account is absent from one saved list and present in an earlier one; it does not explain why the relationship changed. It cannot recover events before the first snapshot, and profile availability or platform changes can affect what a check returns.'],
      ['Keep your data under your control', 'The extension stores follower snapshots and change records locally in its Chrome extension data. Its optional anonymous usage statistics are separate from those lists and can be disabled in Settings.']
    ]
  },
  {
    slug: 'a-thoughtful-guide-to-cleaning-up-your-x-following-list',
    title: 'A thoughtful guide to cleaning up your X following list',
    description: 'A practical review process for making your X timeline more useful without turning cleanup into a numbers game.',
    category: 'FIELD GUIDE',
    readingTime: '6 MIN READ',
    publishedAt,
    updatedAt: publishedAt,
    icon: '✳',
    relatedSlugs: ['how-to-find-inactive-accounts-on-x', 'how-to-whitelist-accounts-before-unfollowing-on-x'],
    sections: [
      ['Decide what you want your timeline to do', 'Before changing your following list, think about what you want to see when you open X: updates from friends, specialist insight, local news, creative work, or something else. A clear goal makes it easier to decide whether an account still belongs in your feed.'],
      ['Review in manageable groups', 'A long list is easier to assess when you use a few categories. Start with accounts you recognize, then review inactive profiles, accounts with little profile information, or accounts that no longer match your interests. Filters can make the review faster, but use them to find candidates rather than make the decision for you.'],
      ['Consider context beyond the follow-back', 'Whether someone follows you back is not a measure of whether their posts are useful to you. An account may be worth keeping for its work, expertise, community role or occasional updates. Use non-follower status as one signal among many.'],
      ['Set aside accounts you want to protect', 'A whitelist is useful for people and organizations you never want included in a bulk cleanup. Keep rules can also protect groups such as private or verified accounts, profiles with a minimum follower count, recently followed accounts or accounts that match keywords.'],
      ['Take action slowly and review the outcome', 'If you choose to unfollow, select a small group first and use a measured pace. Review the selection before starting. Keep a history so you can see what changed, and remember that X may enforce its own activity limits regardless of the tool you use.'],
      ['Make the review a habit, not a rush', 'A periodic check can help your list reflect your current interests. You do not need to optimize a ratio or remove every non-mutual. The useful list is the one that serves you.']
    ]
  },
  {
    slug: 'how-to-mass-unfollow-accounts-on-x',
    title: 'How to mass unfollow accounts on X with a review-first workflow',
    description: 'A step-by-step way to review non-followers on X, protect accounts you value, and manage a selected unfollow run in Chrome.',
    category: 'HOW-TO',
    readingTime: '6 MIN READ',
    publishedAt,
    updatedAt: publishedAt,
    icon: '↘',
    relatedSlugs: ['how-to-see-who-doesnt-follow-you-back-on-x', 'how-to-whitelist-accounts-before-unfollowing-on-x'],
    sections: [
      ['What mass unfollow means', 'Mass unfollowing means reviewing and unfollowing several accounts in one session. The useful first step is deciding which accounts you want to review. A non-follower list can help you find candidates, but it does not decide whether someone belongs in your feed.'],
      ['Install the extension and scan your list', 'Install UnfollowX Pro from the Chrome Web Store, sign in to X in Chrome, then open the extension dashboard and start a following scan. Keep the X tab visible while it scans; X does not render the list in hidden tabs. The extension uses your existing X session and does not ask for your password.'],
      ['Protect accounts before selecting a group', 'Add people or organizations to your whitelist, or set Keep rules for accounts you want protected. Rules can cover verified or private accounts, a minimum follower count, profile keywords, or accounts followed recently. Check the protected count and review the list before acting.'],
      ['Select, inspect and start the run', 'Filter to a useful group, inspect the selected accounts, and remove anyone you want to keep. Choose action delays, breaks and a daily limit in Settings. Start the run only after checking the selection. You can pause, resume or stop it from the dashboard.'],
      ['Treat pacing as a control, not a guarantee', 'The extension’s delays and limits help you control how quickly it queues actions; they cannot guarantee that X will permit every action or prevent rate limits. Platform rules and limits can change. Stop if X shows a warning, verification request or other signal to slow down.'],
      ['Check your action history', 'After a run, review History to see which actions completed. If you change your mind, you can follow an account again from History. That does not restore the previous connection automatically in every respect, so review the account and X’s current behavior.']
    ]
  },
  {
    slug: 'how-to-export-your-x-following-list-to-csv',
    title: 'How to export your X following list to CSV',
    description: 'Use UnfollowX Pro to export a reviewed X following list, selected accounts, followers or action history as a CSV file.',
    category: 'HOW-TO',
    readingTime: '5 MIN READ',
    publishedAt,
    updatedAt: publishedAt,
    icon: '⇩',
    relatedSlugs: ['how-to-see-who-doesnt-follow-you-back-on-x', 'how-to-mass-unfollow-accounts-on-x'],
    sections: [
      ['Why export a following list?', 'A CSV gives you a portable copy of information from a scan. You might want to keep a personal review record, compare a list later, or move a chosen set of handles into a spreadsheet. An export is only as complete and current as the scan it came from.'],
      ['Scan before you export', 'Open X in Chrome and run a following scan in UnfollowX Pro. Keep the X tab visible until the scan finishes. Review the result and make sure it represents the accounts you meant to export; if X returns incomplete data, rerun the scan before relying on the file.'],
      ['Choose the list or selection', 'From the Following view, use Export for the current list, or select specific accounts and use the selected export action. The file includes profile fields available for the scanned accounts, such as handle, name, profile link, follow-back status and other profile information when X provides it.'],
      ['Open the CSV in your spreadsheet app', 'Save the downloaded CSV somewhere you can find it, then open it with a spreadsheet application or text editor. A CSV is plain tabular data, so column formatting may vary between apps. If you plan to share the file, check it first for profile details you do not want to disclose.'],
      ['Import a list when you need a focused run', 'UnfollowX Pro also accepts a CSV or pasted list of handles in its Import view. It can help you target accounts from a list you prepared or exported earlier. Review the imported handles and current follow status before starting an action.'],
      ['Remember where extension data lives', 'Exports are files you download. The scan results used to create them are stored in Chrome extension storage on your device, separately from the CSV. The privacy policy explains local storage, optional anonymous usage statistics and how to delete extension data.']
    ]
  },
  {
    slug: 'how-to-whitelist-accounts-before-unfollowing-on-x',
    title: 'How to whitelist accounts before unfollowing on X',
    description: 'Protect friends, clients and important accounts with a manual whitelist and Keep rules before you review a bulk unfollow on X.',
    category: 'HOW-TO',
    readingTime: '5 MIN READ',
    publishedAt,
    updatedAt: publishedAt,
    icon: '♡',
    relatedSlugs: ['how-to-mass-unfollow-accounts-on-x', 'a-thoughtful-guide-to-cleaning-up-your-x-following-list'],
    sections: [
      ['Why make a keep list first?', 'A filtered list can make review faster, but filters do not know your relationships or priorities. Whitelisting the accounts you never want included in cleanup gives you a deliberate protection step before selecting a larger group.'],
      ['Add accounts to your whitelist', 'Open the whitelist in the UnfollowX Pro dashboard and add the handles you want to protect. You can also export or import whitelist data using the extension’s CSV tools. Check spelling and handles carefully, especially if similar accounts use related names.'],
      ['Use Keep rules for broader groups', 'Keep rules can protect verified or private accounts, accounts above a follower threshold, accounts matching words in a profile, and accounts you followed within a chosen number of days. These rules are optional; review each one and set thresholds that reflect what you mean to keep.'],
      ['Review the protected set before a run', 'After scanning your following list, check which accounts are protected and which remain selectable. Rules apply to supported bulk cleanup modes. If an account is important, confirm it appears as protected before starting rather than assuming a rule matched.'],
      ['Keep a manual review in the loop', 'A whitelist is a guardrail, not a substitute for inspecting the final selection. Names and profiles can change, and a broad keyword or follower threshold can protect more accounts than expected. Review the selection and remove anyone you do not want to unfollow.'],
      ['Change your rules when your needs change', 'You can update the whitelist or turn off a Keep rule in Settings. Take care when editing rules before an action run, since a different setting can change which accounts are eligible for selection.']
    ]
  },
  {
    slug: 'how-to-find-inactive-accounts-on-x',
    title: 'How to find inactive accounts on X',
    description: 'Review accounts by the date of their newest readable X post, understand unavailable results, and decide whether each account still belongs in your feed.',
    category: 'HOW-TO',
    readingTime: '5 MIN READ',
    publishedAt,
    updatedAt: publishedAt,
    icon: '⌁',
    relatedSlugs: ['a-thoughtful-guide-to-cleaning-up-your-x-following-list', 'how-to-whitelist-accounts-before-unfollowing-on-x'],
    sections: [
      ['Decide what inactive means to you', 'An account that posts rarely may still share updates you value. Before filtering, choose a time window that makes sense for your interests. Activity is a clue for review, not a measure of an account’s worth.'],
      ['Run a last-active check', 'In UnfollowX Pro, the Inactive view can check the latest readable post for accounts you follow and sort them by how long ago that post appeared. The check reads account information available from X in your signed-in browser session.'],
      ['Understand what the date means', 'The last-active date refers to an account’s newest post, reply or repost that the extension can read. X does not expose login activity or likes here, so the result does not say when a person last signed in or saw your posts.'],
      ['Review unavailable profiles separately', 'Some profiles may have no readable post date, may never have posted, or may not return enough information to check. The extension lists these as unavailable instead of guessing that they are inactive. Do not treat an unavailable result as proof that an account is abandoned.'],
      ['Use activity alongside other context', 'Look at the profile and recent posts before changing your following list. You may want to keep an account for its archive, expertise, community role or occasional updates. If you choose to unfollow, whitelist accounts you want to protect and review the final selection first.'],
      ['Check X directly when something matters', 'Activity details can change as X changes what it makes available. Open the profile on X to verify anything important before taking action.']
    ]
  },
  {
    slug: 'what-an-x-follower-tracker-can-and-cannot-tell-you',
    title: 'What an X follower tracker can and cannot tell you',
    description: 'Understand follower snapshots, lost and new follower results, first-check limits, local storage and the context a tracker cannot provide.',
    category: 'FIELD GUIDE',
    readingTime: '5 MIN READ',
    publishedAt,
    updatedAt: publishedAt,
    icon: '⌕',
    relatedSlugs: ['how-to-find-out-who-unfollowed-you-on-x', 'how-to-export-your-x-following-list-to-csv'],
    sections: [
      ['A tracker compares saved lists', 'A follower tracker records a list at one point in time and compares it with a later list. It can show which accounts appear in one complete snapshot and not another. It does not observe every moment between checks.'],
      ['The first check creates a baseline', 'Until a first complete snapshot exists, there is nothing to compare against. After you save that baseline, a later complete check can identify accounts newly present or missing since that snapshot. No tracker can reconstruct follower changes from before you began recording.'],
      ['A change is not an explanation', 'A result can show that an account disappeared from a later list, but it cannot say why. The account may have deactivated, changed visibility or become unavailable; platform data can also change. Check the profile on X if you need context.'],
      ['Complete checks matter', 'If a scan stops early or returns partial data, treating it as a full comparison could create misleading results. UnfollowX Pro keeps incomplete follower reads separate and compares complete snapshots. If a check does not finish, wait and try again.'],
      ['Know where your records are stored', 'UnfollowX Pro saves follower snapshots and change records in Chrome extension storage on your device. Optional anonymous usage statistics are separate from those lists, enabled by default, and can be switched off in Settings. Read the privacy policy for the exact data categories and controls.'],
      ['Use results as a prompt to review', 'Follower counts and changes are context, not a measure of a person’s intent or your relationship. Take a look at the account and make your own decision before changing who you follow.']
    ]
  },
  {
    slug: 'how-to-recover-from-an-accidental-unfollow-on-x',
    title: 'How to recover from an accidental unfollow on X',
    description: 'Find an account in UnfollowX Pro action history, review its profile and follow it again if you decide to reconnect.',
    category: 'HOW-TO',
    readingTime: '4 MIN READ',
    publishedAt,
    updatedAt: publishedAt,
    icon: '↶',
    relatedSlugs: ['how-to-mass-unfollow-accounts-on-x', 'how-to-whitelist-accounts-before-unfollowing-on-x'],
    sections: [
      ['Find the action in History', 'Open the History view in the UnfollowX Pro dashboard and look for the account and unfollow action. The extension records follow and unfollow actions it performs locally, along with the account handle and time.'],
      ['Review the account before reconnecting', 'Open the profile on X to confirm you found the right person. Handles and display names can change, so verify the profile before you follow. The extension’s history is a useful record, but it is not a substitute for checking the current account.'],
      ['Follow again when you are ready', 'Select the account in History and use the follow-again action. The request is made through your existing signed-in X session. X may ask you to wait, verify your account or otherwise limit the action, so follow its prompts.'],
      ['Know what refollowing restores', 'Following the account again changes the current follow relationship. It does not reverse other events or guarantee that notifications, feed ordering or the other person’s experience return exactly as before.'],
      ['Prevent the same mistake next time', 'Use the whitelist for accounts you always want protected and Keep rules for broader groups. Before a bulk run, review the protected set and the accounts selected for action. You can also start with a smaller selection and check the outcome.'],
      ['Keep your history private', 'Action history stays in Chrome extension storage on your device. The extension’s privacy policy explains how to delete local data and how its optional anonymous usage statistics work.']
    ]
  }
];

export function getRelatedArticles(article, limit = 3) {
  const bySlug = new Map(articles.map((item) => [item.slug, item]));
  const selected = (article.relatedSlugs || []).map((slug) => bySlug.get(slug)).filter(Boolean);
  if (selected.length >= limit) return selected.slice(0, limit);
  return [...selected, ...articles.filter((item) => item.slug !== article.slug && !selected.includes(item))].slice(0, limit);
}
