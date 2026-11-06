X tells you when someone follows you, but not when someone leaves. There is no unfollow notification and no unfollow history in the app. The only reliable way to find out who unfollowed you is to **save your followers list, check it again later, and compare the two**. Tools automate that comparison; none of them can see unfollows from before you started tracking.

> [!TIP] **Quick answer:** with [UnfollowX Pro](/x-follower-tracker), run a scan to save your first followers snapshot. Next time you scan (or press **Check now** on the Followers page), it compares the new complete list with the previous one and shows **Unfollowed you**, **New followers** and **You don’t follow back**.

## Why X doesn’t show unfollowers

Your follower count is the only native hint. If it drops from 1,438 to 1,427, you know you’re down eleven — but not who left, and the number also moves when accounts are suspended, deactivated or locked. X doesn’t provide a list of former followers, so every unfollower tracker works the same way underneath: it compares saved lists.

## How unfollower tracking works

Think of each followers check as a photograph:

1. **Snapshot A** records every account that follows you today.
2. Some time later, **Snapshot B** records the list again.
3. Accounts in A but not in B appear as **unfollowed you**. Accounts in B but not in A are **new followers**.

That’s why the first check never shows unfollowers: it’s the baseline everything else is compared against. It also means a tracker can only say that an account left *between* two checks, not the exact moment it happened.

## Option 1: Compare lists yourself

You can approximate this manually by requesting [X’s data archive](https://help.x.com/en/managing-your-account/accessing-your-x-data) now and again in a few weeks, then comparing the follower files in a spreadsheet. It works, but archives can take days to prepare and the comparison is entirely manual. Most people do it once and never again.

## Option 2: Track unfollowers with UnfollowX Pro

UnfollowX Pro makes the comparison automatic and keeps every snapshot in Chrome extension storage on your computer.

1. [Install UnfollowX Pro](/setup) and open x.com in Chrome, signed in to your account.
2. Click the extension and press **Scan my following**. After the scan, the extension reads your followers in the background. Following tracking is on by default; you can turn it off in Settings.
3. That first followers read becomes your baseline. Nothing is listed as “unfollowed” yet.
4. Come back in a few days and scan again — or open the dashboard’s **Followers** page and press **Check now**.
5. The Followers page now shows three tabs: **Unfollowed you** (with the dates between the two checks), **New followers** and **You don’t follow back**.

The popup also shows a line such as “23 people unfollowed you · See who” after a check finds changes. If you want to be told without opening the extension, you can switch on optional desktop notifications in Settings; Chrome asks for permission first.

> [!NOTE] For accounts with more than 20,000 followers, the followers check runs when you press **Check now** rather than automatically after every scan, because reading a very large list takes a while.

## Reading the “Unfollowed you” list correctly

A name in this list means the account was in your previous complete followers snapshot and isn’t in the new one. That usually means they unfollowed you, but not always:

- **Suspended, deactivated or deleted accounts** disappear from follower lists too, so they look like unfollows.
- **An account that blocked you** also removes itself from your followers.
- **Partial reads are not compared.** If X returns an incomplete list, UnfollowX Pro doesn’t run the comparison at all, so nobody is listed by mistake. Try again later.

If a particular change matters to you, open the profile on X before drawing conclusions. The tracker reports *what* changed, never *why*.

## What to do with the results

Two common next steps, both optional:

- **Unfollow people who left.** On the Unfollowed you tab, accounts you still follow are marked, so you can select them and unfollow if you want a mutual-only list.
- **Follow back new followers.** Select accounts on the New followers or You don’t follow back tabs and follow them back. Follows use the same pacing and daily limit as unfollows.

Before any bulk action, add the people you want to keep to your [whitelist](/blog/how-to-whitelist-accounts-before-unfollowing-on-x).

[[cta]]

## Frequently asked questions

### Can I see who unfollowed me before I installed a tracker?

No. Because X doesn’t keep an unfollow history, every tracker needs a starting snapshot. Changes before that snapshot can’t be recovered by any tool.

### Does X notify someone when I unfollow them?

X doesn’t send notifications for unfollows. The other person would only notice by checking their own list or using a tracker.

### How often should I check?

Weekly or monthly is enough for most people. Checking more often doesn’t reveal more — it just splits the same changes across more snapshots.

### Is my follower data uploaded anywhere?

Not by UnfollowX Pro. Follower snapshots and change records stay in Chrome extension storage on your computer. The [privacy policy](/privacy) explains the separate, optional anonymous usage statistics.

## The bottom line

You can’t see past unfollows on X, but you can start tracking today and see every change from now on. Save a baseline, check again later, and read the results with a little scepticism — suspended accounts and blocks look like unfollows too. For a deeper look at what trackers can and can’t measure, see [how to track new and lost followers on X](/blog/what-an-x-follower-tracker-can-and-cannot-tell-you).
