A whitelist is a list of accounts a tool must never unfollow. It’s the single most useful safeguard before any bulk cleanup on X, because filters are blunt: “doesn’t follow back” catches your favourite journalist, and “inactive for 90 days” catches the friend who only posts on holiday. Whitelisting first means the cleanup can’t touch the people who matter.

This guide uses [UnfollowX Pro](/features), where the whitelist and Keep rules work together.

## Whitelist vs Keep rules

- **The whitelist** protects specific accounts you name, one by one.
- **Keep rules** protect whole groups automatically, based on account details.

Both are checked before *every* unfollow, including in the middle of a run. If you whitelist someone while a run is going, they’re still protected when the run reaches them. Whitelisted accounts are never unfollowed in any mode — including “Unfollow all”.

## How to whitelist accounts

1. [Install UnfollowX Pro](/setup), open x.com signed in, and press **Scan my following**.
2. Open the dashboard and go to **Following**.
3. Search for a name or handle, or browse a tab such as **Mutuals**.
4. Tap the **shield** in the account’s row. It turns green and the account moves into your protected set.

You can also manage the list directly on the **Whitelist** page: paste several handles or profile links at once (separated by commas or spaces), and export the list to CSV with each handle and profile link. If you use several X accounts, each account has its own whitelist.

### Who to whitelist first

- Friends, family and people you’ve met in person
- Colleagues, clients, partners and your own other accounts
- Sources you rely on that will never follow back — newsrooms, researchers, official accounts
- Small accounts you follow on purpose, which filters may mistake for spam

## How to set up Keep rules

Keep rules live in **Settings**. Each one is optional:

| Keep rule | What it protects | Example use |
| --- | --- | --- |
| Verified accounts | Accounts with a verified badge | Keep official and Premium accounts |
| Private accounts | Accounts with protected posts | Keep people who approved your follow request |
| Big accounts | Accounts with at least N followers | Keep accounts above 50,000 followers |
| Keywords | Name, handle or bio contains a word | Keep anyone mentioning your company or city |
| Followed recently | Accounts you followed in the last N days | A 14-day grace period for new follows |

Keywords are comma-separated and matched against the name, handle and bio, so a short word can match more than you expect — “art” also matches “startup”. Prefer distinctive words.

The **followed recently** rule counts from the scan in which an account first appeared in your following list, which gives new connections time to follow you back before they show up as non-followers.

## Check that protection actually applied

Rules are only useful if they match what you meant. Before starting a run:

1. Open the **Kept** tab on the Following page. It lists everything currently protected, by the whitelist or by a rule.
2. Scan it for surprises in both directions — accounts you expected to see, and accounts a broad rule caught by accident.
3. In the review table, protected accounts can’t be selected, so a quick look at your selection confirms nobody important is in it.

> [!TIP] If a keyword rule protects too much, tighten the word or remove the rule and whitelist the specific accounts instead. Specific beats clever.

## Keep the whitelist current

People change handles and new connections arrive. A whitelist entry follows the handle, so if someone you protect changes their handle, add the new one. When you follow someone important, whitelist them straight away rather than waiting for the next cleanup.

If you do remove someone by mistake, it’s recoverable: **History → Follow again**. See [recovering from an accidental unfollow](/blog/how-to-recover-from-an-accidental-unfollow-on-x).

[[cta]]

## Frequently asked questions

### Does the whitelist work with “Unfollow non-followers” and “Unfollow all”?

Yes. Whitelisted accounts are skipped in every mode, and the skip is recorded so you can see it happened.

### Can I export my whitelist?

Yes, as a CSV with each handle and its profile link — handy as a backup or for moving between computers.

### Do Keep rules change anything on X?

No. They only decide what UnfollowX Pro is allowed to select and unfollow. Nothing is changed on your X account until you start an action.

## The bottom line

Whitelist the people, add Keep rules for the groups, check the Kept tab, and only then select accounts to remove. Five minutes of protection up front is what makes a fast cleanup a safe one. Next step: [how to mass unfollow on X](/blog/how-to-mass-unfollow-accounts-on-x).
