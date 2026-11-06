X doesn’t have an “export to CSV” button for your following list. There are two practical routes: **X’s own data archive**, which is official but slow and not spreadsheet-friendly, and **a CSV export from a tool** that reads your list, which is instant and comes with useful columns. Here’s how each works and when to use which.

## Why export your following list?

- **A backup before a big cleanup** — especially before [unfollowing everyone](/blog/how-to-unfollow-everyone-on-x).
- **Analysis** — sorting by follower count, join date or last post in a spreadsheet.
- **Sharing a list** with a teammate who manages the same brand account.
- **A record over time** — comparing exports months apart.

## Option 1: X’s data archive

X lets you [request an archive of your data](https://help.x.com/en/managing-your-account/accessing-your-x-data):

1. Go to **Settings and privacy → Your account → Download an archive of your data**.
2. Confirm your password (and a code, if asked), then request the archive. Your email address needs to be confirmed.
3. Wait for X’s email or notification — it can take a few days.
4. Download the .zip file while signed in to X and unzip it.

The archive is official and complete, but it’s built for machines: the following list is a data file of account IDs and profile links rather than a ready-made spreadsheet with names and stats. You’ll need to convert it yourself, and each new export means another request and another wait.

## Option 2: Export a CSV with UnfollowX Pro

[UnfollowX Pro](/features) reads your following list through your own X session and can save it as CSV immediately.

1. [Install the extension](/setup), open x.com signed in, and press **Scan my following**.
2. Open the dashboard and go to **Following**. Choose a tab — **All** for everything, or **Don’t follow back**, **Inactive** and so on — and add search or filters if you only want part of the list.
3. Press **Export** to download the current list, or select specific accounts and use **Export** in the selection bar.

The file is named after the list and date, for example `x-following-2026-11-06.csv`.

### What’s in the file

| Column | What it contains |
| --- | --- |
| handle, name, profile_url | Who the account is |
| follows_you | Whether they follow you back |
| followers, following, posts | Profile counts at the time of the scan |
| verified, premium_blue_check, private | Badge and privacy status |
| joined | When the account joined X |
| last_post_date, days_inactive, activity_note | Last-active results, if you ran that check |
| bio | The profile bio |

Columns are filled when X provides the information; last-active columns stay empty for accounts you haven’t checked.

### Other lists you can export

- **Followers changes** from the Followers page — who unfollowed you, new followers and people you don’t follow back, with when each change was noticed.
- **Whitelist** — handles and profile links.
- **History** — every follow and unfollow the extension made, with timestamps and the mode that made it.

## Opening the CSV

Any spreadsheet app opens CSV files — Excel, Google Sheets, Numbers, LibreOffice. The export is saved as UTF-8 with a byte-order mark, so accents and non-Latin scripts display correctly in most apps; if they don’t, use your app’s import option and choose UTF-8. Bios can contain commas and line breaks, which the export quotes so columns stay aligned.

> [!NOTE] An export is a snapshot of your last scan. If your list has changed, rescan before exporting. Before sharing a file, remember it contains public profile details of other people — share it only where that’s appropriate.

## Importing a list back

The reverse also works: on the Following page, **Import** accepts a CSV or a pasted list of handles and targets exactly those accounts for unfollowing. Handles on your whitelist are left out automatically. It’s useful when you’ve marked accounts to remove in a spreadsheet.

[[cta]]

## Frequently asked questions

### Can I export someone else’s following list?

UnfollowX Pro exports lists for the account you’re signed in to. It isn’t a scraping tool for other people’s accounts.

### Is the exported file uploaded anywhere?

No. The CSV is created in your browser and saved to your computer. Scan data stays in Chrome extension storage; see the [privacy policy](/privacy).

### Does exporting change anything on X?

No. Scanning and exporting are read-only.

## The bottom line

Use X’s archive when you want the official, complete record and don’t mind waiting. Use a CSV export when you want a spreadsheet you can sort and filter today. Many people do both before a big cleanup — one as a backup, one as a working file.
