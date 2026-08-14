# 📱 FSMS Ledgal — Favoured Teacher Ledger System
### 🚀 Step-by-Step Implementation & Deployment Guide

**FSMS Ledgal** (Favoured Student Management System — Teacher Ledger) is a mobile-first Progressive Web Application (PWA) designed to solve the core problem of private educators and tutors:

> **"You finish a lesson → rush to the next place → don't have time to record it → later have to reconstruct the month from memory."**
> 
> **Solution:** The app remembers your recurring teaching schedule. You only tap **`[ DONE ]`**, **`[ CANCEL ]`**, or **`[ RESCHEDULE ]`** in 2 seconds. Everything else — monthly totals, organisation breakdowns, client ledgers, and payment balances — happens automatically.

---

## 🎨 Visual Design & Palette

- **Primary Colour**: Deep Dark Navy Blue (`#0B192C`, `#102A45`)
- **Secondary / Accent Colour**: Classic Warm Gold (`#D4AF37`, `#E5C158`)
- **Status Accents**: Emerald Green (Done/Paid), Crimson Red (Cancelled/Due), Amber (Rescheduled)
- **Zero-Dependency Single-File PWA**: 100% self-contained with pure inline CSS, HTML5 canvas charts, and vanilla JS. Works offline anywhere.

---

## 🌟 The 8 Core Screens Built (Matching Your Mockup `1.png`)

1. **🏠 TODAY (Screen 1)**:
   - Header greeting: `Good morning, Favour! 👋` + current date.
   - 4 Today Lesson cards (*Kindergarten Smile Fish ₽750, ABC Centre Group A ₽1,300, Individual Oksana ₽1,500, School XYZ Grade 5 ₽1,300*).
   - Three 1-tap quick actions on each card: **`[ ✓ DONE ]`**, **`[ ✕ CANCEL ]`**, **`[ ⟳ RESCHEDULE ]`**.
   - Today Summary card: *4 Lessons*, *₽4,850 Expected*, *₽0 Completed* (updates live as you tap Done).
   - Central floating action button (**`＋` FAB**).

2. **📅 SCHEDULE (Screen 2)**:
   - **`[ Recurring ]`** vs **`[ One-time ]`** segment tabs.
   - Recurring rules with initials avatars (**SF** Smile Fish, **GA** Group A, **OK** Oksana, **G5** Grade 5), repeat days, time slots, rates, and delete actions.
   - **`+ Add Recurring Schedule`** button.

3. **➕ ADD LESSON (Screen 3)**:
   - One-time vs Recurring toggle.
   - Date picker, Time slot pickers, Organisation selector with inline `+`, Class selector with inline `+`, Amount, Notes, and Status selector (`Completed`, `Cancelled`, `Rescheduled`).
   - Big dark navy button: **`[ SAVE LESSON ]`**.

4. **📋 RECORDS (Screen 4)**:
   - Search bar and filters for Month (`August 2026`) and Organisation (`All Organisations`).
   - Total header: `2026: August — ₽62,450`.
   - Chronological history cards grouped by date badges (`FRI 28 AUG`, `WED 26 AUG`, `TUE 25 AUG`, `MON 24 AUG`, etc.).

5. **🧾 LEDGER & STATEMENT GENERATOR (Screen 5 & 6)**:
   - Select Organisation, Class, Month, and Output Language (**🇷🇺 Русский / 🇬🇧 English**).
   - Tap **`[ GENERATE LEDGER ]`** to get an itemized statement (*4 Lessons, ₽3,000 Earned, ₽0 Paid, ₽3,000 Due*).
   - **`[ MARK AS PAID ]`**: Instantly records payment receipts and clears debt.
   - **`[ SHARE LEDGER ]`**: 
     - **📋 1-Click WhatsApp / Telegram Copy**: Copies clean, emoji-formatted text statements ready to paste into chat.
     - **🖨️ Print / PDF**: Clean printable invoice statement.
     - **📊 CSV Export**: Spreadsheet download.

6. **💰 OVERVIEW & PAYMENTS (Screen 7)**:
   - Month financial metrics: **47 Lessons**, **₽62,450 Earned**, **₽42,000 Paid**, **₽20,450 Outstanding**.
   - By Organisation breakdown (*Kindergarten, ABC Centre, School XYZ, Individuals*) showing lessons, earnings, payments received, and balance due.

7. **📊 STATISTICS & ANALYTICS (Screen 8)**:
   - Interactive 12-month Income Bar Chart (*Jan–Aug trend*).
   - Revenue Distribution Donut Chart (*School XYZ 35.9%, Individuals 28.7%, ABC Centre 20.8%, Kindergarten 14.5%*).
   - Outstanding Payments Banner: `₽20,450 (From 2 organisations)`.

8. **☁️ TELEGRAM & GOOGLE DRIVE SYNC**:
   - 1-Tap sync to **Telegram Saved Messages** (*Избранное*) for unlimited free backup.
   - 1-Tap sync to **Google Drive** or **iCloud**.
   - Cloud Sync with private secret key.

---

## 🛠️ Step-by-Step Guide: How to Implement & Deploy (100% Free)

### Option 1: Deploy on GitHub Pages (Recommended — Free Forever)
1. Go to [GitHub.com](https://github.com) and create a new free repository named `fsms-ledgal`.
2. Upload these files from your workspace:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `server.py`
   - `README.md`
   - `icons/` folder (`icon-192.png`, `icon-512.png`, `favicon.png`)
3. In your GitHub repository, go to **Settings** → **Pages** → Source: `Deploy from a branch` → Select `main` branch `/root` → Click **Save**.
4. Your app is live at `https://<your-username>.github.io/fsms-ledgal/` in 30 seconds!

---

### Option 2: Deploy on Netlify or Vercel (1-Click Drag & Drop)
1. Go to [Netlify Drop](https://app.netlify.com/drop) or [Vercel](https://vercel.com).
2. Drag and drop the folder containing `index.html`.
3. Your app is live instantly with free SSL!

---

## 📱 How to Install FSMS Ledgal on Your Phone (PWA)

No App Store or Play Store fees needed.

### On iPhone / iPad (iOS Safari):
1. Open your deployed URL in **Safari**.
2. Tap the **Share** button (square with arrow pointing up).
3. Scroll down and tap **Add to Home Screen** (*На экран «Домой»*).
4. Tap **Add**. The app icon appears on your home screen and launches full-screen!

### On Android (Chrome / Brave):
1. Open the URL in **Google Chrome**.
2. Tap the **Three Dots (⋮)** → Tap **Install app** (*Установить приложение*).
3. The app is installed onto your home screen and works 100% offline.

---

## 📋 Recommended Workflow to Make the Project Successful

| Frequency | Action | Duration | Steps |
| :--- | :--- | :--- | :--- |
| **Initial Setup** | Setup Timetable | ~2 minutes | Open **Schedule** → Tap **+ Add Recurring Schedule** → Enter your weekly classes (e.g. *Smile Fish, Fridays 09:00, ₽750*). |
| **Daily Routine** | 1-Tap Confirmation | ~2 seconds | When you finish a class, open **Today** → Tap **`✓ DONE`**. Daily earnings recalculate live! |
| **When Rescheduled** | Move Class | ~5 seconds | Tap **`⟳ RESCHEDULE`** → Pick the new date. The old class is archived and the new date receives the booking. |
| **End of Month** | Send Statements | ~20 seconds | Open **Ledger** → Choose organisation & language (**🇷🇺 RU** or **🇬🇧 EN**) → Tap **GENERATE LEDGER** → Tap **SHARE LEDGER** → Tap **📋 COPY TEXT** and paste into WhatsApp/Telegram. |
| **When Paid** | Record Payment | ~5 seconds | Tap **MARK AS PAID** to clear the balance. |
| **Cloud Sync** | Backup Data | ~2 seconds | Open side menu → **Cloud Sync** → Tap **Telegram Sync** or **Google Drive Sync**. |

---

*FSMS Ledgal — Built with precision for Favoured FSMS.*
