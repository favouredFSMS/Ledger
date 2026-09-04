# Favoured Ledgal

**Favoured Ledgal** is a mobile-first, offline-first Progressive Web App for private educators. It keeps lessons, recurring schedules, payments, records, and printable ledger statements on the device.

## What this update includes

- **Favoured branding** — the app name, PWA name, statement name, and app icons now use **Favoured Ledgal** and the supplied Favoured gold logo.
- **Reliable rescheduling** — choosing **RESCHEDULE** marks the original entry as rescheduled and creates one linked **one-time** lesson on the selected new date. The app opens that destination date immediately. A rescheduled lesson does not become a repeating rule and will not create duplicate moved entries.
- **Recurring edits apply now** — editing a recurring rule updates its current and future *unconfirmed auto-generated* lessons immediately. Completed, cancelled, rescheduled, and individually edited lesson history stays intact.
- **Working one-time schedule tab** — Schedule → One-time lists current and upcoming individual lessons, including moved appointments. Tap ✏️ to edit or delete one immediately.
- **Save fixes** — the hidden date field no longer blocks the Save button when editing a recurring rule. Organisation and class selectors now cascade correctly and retain existing values.
- **Button audit fixes** — Smart Alerts / Confirm All, Mark as Paid, copy controls, payment controls, and guest-mode protection have been checked and repaired.
- **Offline install** — the Service Worker caches the self-contained app and Favoured icons after the first online visit.

## How schedules behave

1. Create a recurring timetable in **Schedule → Recurring**.
2. On any matching date, the lesson appears automatically when that date is opened.
3. Edit the rule to change its days, time, class, organisation, or rate. Existing scheduled instances for **today and future dates** update at once. Dates removed from the rule no longer show an unconfirmed auto-generated instance.
4. Edit a single lesson when only that occurrence needs a change. That entry becomes an individual override; the main recurring rule continues unchanged.
5. Use **RESCHEDULE** to move one occurrence. The original stays in Records as *Rescheduled* and the new date gets exactly one separate appointment.

## Deploy to `favouredFSMS/Ledger` on GitHub Pages

Upload/replace these items in the repository root:

```text
index.html
manifest.json
sw.js
.nojekyll
icons/                 ← upload the whole folder, including favoured-logo.png
.github/workflows/     ← optional if Pages is configured to use GitHub Actions
README.md              ← optional documentation update
```

Do **not** upload `cloud_backups/`, `uploads/`, or the old `js/` folder. `index.html` is self-contained and does not need external JavaScript or CSS files.

In GitHub, open **Settings → Pages** and select:

```text
Source: Deploy from a branch
Branch: main
Folder: / (root)
```

After the deployment succeeds, open `https://favouredfsms.github.io/Ledger/` while online once. For an update, refresh twice or fully close and reopen the installed app so the new Service Worker (`favoured-ledgal-offline-v6`) can activate.

## Install as an offline app

- **iPhone / iPad:** Open the deployed site in Safari → Share → **Add to Home Screen** → Add.
- **Android:** Open the deployed site in Chrome/Brave → menu ⋮ → **Install app** or **Add to Home screen**.

The first successful visit needs a network connection to cache the app. After that, Favoured Ledgal opens and works offline. Data is stored locally on the device. Use the in-app Backup / Restore controls regularly before changing phones or clearing browser data.

## Technical notes

- Pure vanilla HTML, CSS, and JavaScript — no build process and no CDN dependency.
- The app deliberately retains its original local-storage key during upgrades so existing user records remain available.
- Statements, CSV exports, backup JSON files, and print/PDF receipts are generated locally.
