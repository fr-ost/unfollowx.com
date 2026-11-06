X has no bulk-unfollow button. Mass unfollowing means removing many accounts in one session, either by hand or with a tool that works through a list for you. The method that causes the fewest regrets — and the fewest problems with X — is always the same: **decide which group to remove, protect the accounts you value, review the selection, then unfollow at a measured pace.**

This guide walks through that process with [UnfollowX Pro](/features), a free Chrome extension, but the principles apply whatever tool you use.

## Before you start: what X allows

X applies its own limits to every account, whatever app or extension is involved. Its help center describes a [technical limit of 400 follows per day](https://help.x.com/en/using-x/x-follow-limit), extra ratio-based limits once you follow 5,000 accounts, and limits that can be reduced temporarily during busy periods. X doesn’t publish a specific number for unfollows, but its [rules on follow behaviour](https://help.x.com/en/rules-and-policies/x-rules-and-best-practices) target aggressive following and “follow churn”, and its [automation rules](https://help.x.com/en/rules-and-policies/x-automation) restrict automated bulk actions.

> [!WARNING] No tool can guarantee that X won’t rate-limit, lock or restrict an account. Read X’s rules, start conservatively, and stop if X shows a warning or asks you to verify your account. You are responsible for how you use any bulk tool on your account.

## Step 1: Decide which group you’re removing

“Mass unfollow” is vague; a good cleanup has a specific target. Common choices:

- **Non-followers** — accounts that don’t follow you back. See [how to see who doesn’t follow you back](/blog/how-to-see-who-doesnt-follow-you-back-on-x).
- **Inactive accounts** — accounts that haven’t posted in months. See [how to find inactive accounts](/blog/how-to-find-inactive-accounts-on-x).
- **A filtered slice** — for example, no profile photo and fewer than 10 posts, or accounts that follow ten times more people than follow them.
- **A specific list** — handles you’ve collected in a spreadsheet, imported as CSV or pasted text.
- **Everyone** — a complete reset, covered in its own guide: [how to unfollow everyone on X](/blog/how-to-unfollow-everyone-on-x).

## Step 2: Scan your following list

[Install UnfollowX Pro](/setup), open x.com in Chrome while signed in, click the extension and press **Scan my following**. The scan is read-only and usually takes about a minute. It reads your list through X’s own Following timeline, so it works in the background while you use other tabs.

## Step 3: Protect the accounts you want to keep

Do this *before* selecting anything. In UnfollowX Pro:

- **Whitelist** individual accounts with one tap on the shield in the review table. Whitelisted accounts are never unfollowed, in any mode.
- **Keep rules** in Settings protect groups automatically: verified accounts, private accounts, accounts above a follower count, accounts whose name, handle or bio matches a keyword, and accounts you followed in the last N days.

Protection is checked before every single unfollow, even in the middle of a run, so adding someone to the whitelist mid-run still protects them. The [whitelist guide](/blog/how-to-whitelist-accounts-before-unfollowing-on-x) has practical rule examples.

## Step 4: Review and select

Open the dashboard (**Review & pick** in the popup) and go to **Following**. Use the tabs — **Don’t follow back**, **Mutuals**, **Not blue**, **Inactive**, **All** — then narrow down with search and filters. The **Kept** tab shows everything currently protected, which is the quickest way to confirm your rules did what you meant.

Select accounts individually or in bulk. You can save a selection as a named group if you want to work through it over several days.

## Step 5: Choose a pace

In **Settings**, pick a speed preset or set your own numbers. The presets are:

| Preset | Gap between actions | Break | Daily limit |
| --- | --- | --- | --- |
| Safe | 15–35 seconds, random | 10 minutes every 30 actions | 250 |
| Balanced (default) | 8–20 seconds, random | 6 minutes every 50 actions | 400 |
| Fast | 4–10 seconds, random | 5 minutes every 80 actions | 1,000 |

The daily limit is a rolling 24-hour window. When it’s reached, the run rests and continues automatically once there’s room again. If you’re cleaning up for the first time, or your account is new, start with Safe.

## Step 6: Start, monitor, pause or stop

Choose **Unfollow selected** (or **Unfollow non-followers** in the popup) and confirm. The run happens in the extension’s background worker: you can switch tabs, close the popup or keep browsing. The popup shows progress, the next account and a countdown.

- If X asks the extension to slow down, the run rests and then continues.
- If X asks you to verify your account, the run stops and waits for you.
- You can pause, resume or stop at any time, and **Alt + Shift + S** is an emergency stop.

## Step 7: Check your history

**History** lists every account the extension unfollowed or followed, with timestamps and CSV export. If you removed someone by mistake, select them and press **Follow again** — see [recovering from an accidental unfollow](/blog/how-to-recover-from-an-accidental-unfollow-on-x).

## How long does a mass unfollow take?

Mostly, it depends on your daily limit. A rough guide for the Balanced preset (around 14 seconds per action on average plus a 6-minute break every 50):

| Accounts to remove | At 250 per day | At 400 per day |
| --- | --- | --- |
| 300 | about 2 days | 1 day |
| 1,200 | about 5 days | about 3 days |
| 3,000 | about 12 days | about 8 days |

Within a day, 400 actions at the Balanced pace take a little over two hours of background time (about 93 minutes of gaps plus seven breaks). Slower is fine — the run continues by itself.

## Mistakes to avoid

- **Skipping the review.** Filters find candidates; they don’t know who your friends are.
- **Starting at Fast on a new account.** Build up gradually instead.
- **Running two tools at once.** Two tools acting on the same account double your real pace.
- **Pasting console scripts from the internet.** They usually have no pacing or protection, and you can’t easily see what they do.
- **Handing over your password.** A well-designed tool works within your existing session.

[[cta]]

## Frequently asked questions

### Is mass unfollowing against X’s rules?

X’s rules target aggressive, indiscriminate and automated follow behaviour, and X applies limits to everyone. Read [X’s rules](https://help.x.com/en/rules-and-policies/x-rules-and-best-practices) and [automation rules](https://help.x.com/en/rules-and-policies/x-automation) and decide what you’re comfortable with. Careful selection and a slow pace are the reasonable defaults.

### How many accounts can I unfollow per day?

X doesn’t publish an exact unfollow number. UnfollowX Pro defaults to 400 actions per rolling 24 hours, and you can set a lower limit. Treat X’s warnings as the real limit for your account.

### Will people be notified when I unfollow them?

X doesn’t send notifications for unfollows.

### Does UnfollowX Pro limit how many accounts I can remove?

No. There are no product quotas or paid tiers — the only limits are the pacing settings you choose and the ones X applies.

## The bottom line

A good mass unfollow is mostly preparation: a clear target, a whitelist, a reviewed selection and a pace you’re comfortable with. Get those right and the run itself is the easy part — it happens in the background while you get on with your day.
