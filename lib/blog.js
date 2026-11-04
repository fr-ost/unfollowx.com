export const articles = [
  {
    slug: 'how-to-see-who-doesnt-follow-you-back-on-x',
    title: 'How to see who doesn’t follow you back on X',
    description: 'A simple, careful way to review your X following list, spot non-followers and decide what — if anything — you want to change.',
    category: 'HOW-TO', readingTime: '5 MIN READ',
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
    description: 'Understand how to track follower changes on X, why you need a first snapshot and how to read the results responsibly.',
    category: 'HOW-TO', readingTime: '4 MIN READ',
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
    description: 'A practical review process for making your timeline more useful without turning cleanup into a numbers game.',
    category: 'FIELD GUIDE', readingTime: '6 MIN READ',
    sections: [
      ['Decide what you want your timeline to do', 'Before changing your following list, think about what you want to see when you open X: updates from friends, specialist insight, local news, creative work, or something else. A clear goal makes it easier to decide whether an account still belongs in your feed.'],
      ['Review in manageable groups', 'A long list is easier to assess when you use a few categories. Start with accounts you recognize, then review inactive profiles, accounts with little profile information, or accounts that no longer match your interests. Filters can make the review faster, but use them to find candidates rather than make the decision for you.'],
      ['Consider context beyond the follow-back', 'Whether someone follows you back is not a measure of whether their posts are useful to you. An account may be worth keeping for its work, expertise, community role or occasional updates. Use non-follower status as one signal among many.'],
      ['Set aside accounts you want to protect', 'A whitelist is useful for people and organizations you never want included in a bulk cleanup. Keep rules can also protect groups such as private or verified accounts, profiles with a minimum follower count, recently followed accounts or accounts that match keywords.'],
      ['Take action slowly and review the outcome', 'If you choose to unfollow, select a small group first and use a measured pace. Review the selection before starting. Keep a history so you can see what changed, and remember that X may enforce its own activity limits regardless of the tool you use.'],
      ['Make the review a habit, not a rush', 'A periodic check can help your list reflect your current interests. You do not need to optimize a ratio or remove every non-mutual. The useful list is the one that serves you.']
    ]
  }
];
