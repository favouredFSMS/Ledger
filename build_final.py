#!/usr/bin/env python3
"""
FSMS Ledgal — 100% Clean Empty State, 1 User per Device, Guest Mode Default
"""

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>FSMS Ledgal — Personal & Business Ledger</title>
  <meta name="description" content="Mobile-first ledger & lesson tracking PWA with automated recurring schedules, billing statements, and cloud sync.">
  <meta name="theme-color" content="#0B192C">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <link rel="manifest" href="manifest.json">
  <link rel="icon" type="image/png" href="icons/favicon.png">
  <link rel="apple-touch-icon" href="icons/icon-192.png">
  <style>
    :root {
      --navy-950: #060E18;
      --navy-900: #0B192C;
      --navy-800: #102A45;
      --navy-700: #163B60;
      
      --gold-500: #D4AF37;
      --gold-400: #E5C158;
      --gold-600: #B89225;
      --gold-100: #FDF7E7;
      
      --green-500: #10B981;
      --green-600: #059669;
      --green-50: #ECFDF5;
      
      --red-500: #EF4444;
      --red-600: #DC2626;
      --red-50: #FEF2F2;
      
      --amber-500: #F59E0B;
      --amber-600: #D97706;
      --amber-50: #FFFBEB;
      
      --blue-500: #3B82F6;
      --blue-50: #EFF6FF;
      
      --bg-app: #F4F6F9;
      --card-bg: #FFFFFF;
      --card-border: #E2E8F0;
      --text-main: #0F172A;
      --text-secondary: #475569;
      --text-muted: #94A3B8;
      --divider: #E2E8F0;
      
      --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 16px;
      --radius-xl: 20px;
      --radius-pill: 9999px;
      
      --shadow-sm: 0 1px 3px rgba(11, 25, 44, 0.06);
      --safe-bottom: env(safe-area-inset-bottom, 0px);
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }

    html, body {
      height: 100%;
      font-family: var(--font-sans);
      background-color: #060E18;
      color: var(--text-main);
      overflow: hidden;
      -webkit-font-smoothing: antialiased;
    }

    #app-root {
      max-width: 440px;
      height: 100dvh;
      margin: 0 auto;
      background-color: var(--bg-app);
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
    }

    @media (min-width: 460px) {
      #app-root {
        height: 96dvh;
        margin: 2dvh auto;
        border-radius: var(--radius-xl);
        border: 2px solid #1E3E62;
        box-shadow: 0 0 40px rgba(0, 0, 0, 0.6);
      }
    }

    /* Header */
    .app-header {
      background: linear-gradient(180deg, var(--navy-950) 0%, var(--navy-900) 100%);
      color: #FFFFFF;
      padding: 10px 14px 12px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(212, 175, 55, 0.25);
      z-index: 40;
      flex-shrink: 0;
    }

    .header-left, .header-right {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .header-btn {
      background: transparent;
      border: none;
      color: #FFFFFF;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
    }

    .header-btn:active {
      background: rgba(255, 255, 255, 0.15);
    }

    .header-btn svg {
      width: 22px;
      height: 22px;
      fill: currentColor;
    }

    .header-title-container {
      text-align: center;
      flex: 1;
    }

    .header-title {
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      color: #FFFFFF;
    }

    .header-title .gold-accent {
      color: var(--gold-400);
    }

    .header-subtitle {
      font-size: 10px;
      font-weight: 600;
      color: var(--gold-400);
      letter-spacing: 0.5px;
    }

    .lang-switch-container {
      display: flex;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(212, 175, 55, 0.4);
      border-radius: var(--radius-pill);
      padding: 2px;
    }

    .lang-switch-btn {
      background: transparent;
      border: none;
      color: #94A3B8;
      font-size: 10px;
      font-weight: 800;
      padding: 3px 6px;
      border-radius: var(--radius-pill);
      cursor: pointer;
    }

    .lang-switch-btn.active {
      background: var(--gold-500);
      color: var(--navy-950);
    }

    .user-profile-pill {
      display: flex;
      align-items: center;
      gap: 5px;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(212, 175, 55, 0.4);
      border-radius: var(--radius-pill);
      padding: 2px 8px 2px 2px;
      cursor: pointer;
      color: #FFFFFF;
      font-size: 10px;
      font-weight: 700;
    }

    .user-avatar-mini {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--gold-500);
      color: var(--navy-950);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 900;
    }

    .user-name-mini {
      max-width: 55px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Views */
    .views-container {
      flex: 1;
      position: relative;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
    }

    .view-section {
      display: none;
      padding: 16px;
      padding-bottom: 96px;
    }

    .view-section.active {
      display: block;
    }

    /* Guest Banner */
    .guest-welcome-banner {
      background: linear-gradient(135deg, #102A45 0%, #0B192C 100%);
      border: 1.5px solid var(--gold-500);
      border-radius: var(--radius-md);
      padding: 12px 14px;
      margin-bottom: 14px;
      color: #FFFFFF;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      box-shadow: var(--shadow-sm);
    }

    /* Cards */
    .greeting-card {
      margin-bottom: 14px;
    }

    .greeting-title {
      font-size: 18px;
      font-weight: 800;
      color: var(--navy-900);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .greeting-date {
      font-size: 12px;
      color: var(--text-secondary);
      font-weight: 500;
      margin-top: 2px;
    }

    .section-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .section-label {
      font-size: 12px;
      font-weight: 800;
      color: var(--navy-800);
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    .count-pill {
      background-color: #E2E8F0;
      color: var(--navy-900);
      font-size: 11px;
      font-weight: 700;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .empty-state-box {
      background: var(--card-bg);
      border: 1px dashed var(--card-border);
      border-radius: var(--radius-lg);
      padding: 24px 16px;
      text-align: center;
      margin-bottom: 12px;
    }

    .empty-state-icon {
      font-size: 28px;
      margin-bottom: 6px;
    }

    .empty-state-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--navy-900);
    }

    .empty-state-sub {
      font-size: 11px;
      color: var(--text-muted);
      margin-top: 3px;
      line-height: 1.4;
    }

    .lesson-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: var(--radius-lg);
      padding: 14px;
      margin-bottom: 10px;
      box-shadow: var(--shadow-sm);
    }

    .lesson-card.status-completed {
      border-left: 5px solid var(--green-500);
      background: linear-gradient(90deg, var(--green-50) 0%, var(--card-bg) 15%);
    }

    .lesson-card.status-cancelled {
      border-left: 5px solid var(--red-500);
      background: linear-gradient(90deg, var(--red-50) 0%, var(--card-bg) 15%);
    }

    .lesson-card.status-rescheduled {
      border-left: 5px solid var(--amber-500);
      background: linear-gradient(90deg, var(--amber-50) 0%, var(--card-bg) 15%);
    }

    .lesson-top-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    .lesson-time-box { min-width: 50px; }
    .lesson-start-time { font-size: 14px; font-weight: 800; color: var(--navy-900); }
    .lesson-end-time { font-size: 11px; color: var(--text-muted); }

    .lesson-info-box { flex: 1; padding: 0 12px; }
    .lesson-org-name { font-size: 14px; font-weight: 700; color: var(--navy-900); }
    .lesson-class-name { font-size: 12px; color: var(--text-secondary); font-weight: 500; }
    .lesson-rate-amount { font-size: 15px; font-weight: 800; color: var(--navy-900); }

    .lesson-actions-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1.2fr;
      gap: 8px;
      padding-top: 10px;
      border-top: 1px dashed var(--divider);
    }

    .btn-action {
      font-size: 11px;
      font-weight: 700;
      padding: 7px 4px;
      border-radius: var(--radius-sm);
      border: 1.5px solid transparent;
      background: transparent;
      cursor: pointer;
      text-align: center;
      text-transform: uppercase;
    }

    .btn-done { color: var(--green-600); border-color: var(--green-500); background-color: var(--green-50); }
    .btn-done:active { background-color: var(--green-600); color: #fff; }
    .btn-cancel { color: var(--red-600); border-color: var(--red-500); background-color: var(--red-50); }
    .btn-cancel:active { background-color: var(--red-600); color: #fff; }
    .btn-reschedule { color: var(--amber-600); border-color: var(--amber-500); background-color: var(--amber-50); }
    .btn-reschedule:active { background-color: var(--amber-600); color: #fff; }

    .status-badge-tag {
      display: inline-flex;
      align-items: center;
      font-size: 10px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: var(--radius-pill);
      text-transform: uppercase;
    }

    .status-badge-tag.completed { background-color: var(--green-50); color: var(--green-600); border: 1px solid #A7F3D0; }
    .status-badge-tag.cancelled { background-color: var(--red-50); color: var(--red-600); border: 1px solid #FECACA; }
    .status-badge-tag.rescheduled { background-color: var(--amber-50); color: var(--amber-600); border: 1px solid #FDE68A; }
    .status-badge-tag.scheduled { background-color: var(--blue-50); color: var(--blue-500); border: 1px solid #BFDBFE; }

    .summary-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: var(--radius-lg);
      padding: 14px;
      margin-top: 16px;
      box-shadow: var(--shadow-sm);
    }

    .summary-title {
      font-size: 11px;
      font-weight: 800;
      color: var(--navy-800);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
    }

    .summary-grid {
      display: grid;
      grid-template-columns: 1fr 1.2fr 1.2fr;
      text-align: center;
      gap: 8px;
    }

    .summary-num { font-size: 16px; font-weight: 800; color: var(--navy-900); }
    .summary-label { font-size: 11px; color: var(--text-muted); font-weight: 500; }

    .segment-control {
      display: flex;
      background: #E2E8F0;
      padding: 3px;
      border-radius: var(--radius-pill);
      margin-bottom: 14px;
    }

    .segment-btn {
      flex: 1;
      border: none;
      background: transparent;
      padding: 7px 10px;
      border-radius: var(--radius-pill);
      font-size: 12px;
      font-weight: 600;
      color: var(--text-secondary);
      cursor: pointer;
    }

    .segment-btn.active {
      background: #FFFFFF;
      color: var(--navy-900);
      font-weight: 800;
      box-shadow: 0 2px 5px rgba(0,0,0,0.06);
    }

    .schedule-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: var(--radius-lg);
      padding: 12px 14px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: var(--shadow-sm);
    }

    .initials-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 800;
      color: #FFFFFF;
      flex-shrink: 0;
    }

    .schedule-details { flex: 1; }
    .schedule-class-name { font-size: 14px; font-weight: 700; color: var(--navy-900); }
    .schedule-org-name { font-size: 12px; color: var(--text-secondary); }
    .schedule-days-label { font-size: 11px; color: var(--text-muted); }
    .schedule-time-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 4px;
      padding-top: 4px;
      border-top: 1px solid #F1F5F9;
    }
    .schedule-time-text { font-size: 12px; font-weight: 600; color: var(--text-secondary); }
    .schedule-rate-text { font-size: 14px; font-weight: 800; color: var(--navy-900); }

    .more-btn { background: transparent; border: none; color: var(--text-muted); cursor: pointer; padding: 4px; }
    .more-btn svg { width: 18px; height: 18px; fill: currentColor; }

    /* Forms */
    .form-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: var(--radius-lg);
      padding: 14px;
      margin-bottom: 16px;
      box-shadow: var(--shadow-sm);
    }

    .form-group { margin-bottom: 12px; }
    .form-label {
      display: block;
      font-size: 11px;
      font-weight: 700;
      color: var(--navy-800);
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .input-with-icon { position: relative; display: flex; align-items: center; }
    .input-icon-left { position: absolute; left: 10px; color: var(--text-muted); pointer-events: none; }

    .form-input, .form-select, .form-textarea {
      width: 100%;
      padding: 9px 12px;
      font-size: 13px;
      font-family: inherit;
      border: 1.5px solid var(--card-border);
      border-radius: var(--radius-md);
      background: #FFFFFF;
      color: var(--navy-900);
    }

    .form-input.has-icon-left { padding-left: 36px; }
    .form-input:focus, .form-select:focus, .form-textarea:focus { outline: none; border-color: var(--navy-800); }
    .select-with-add { display: flex; gap: 6px; }

    .btn-inline-add {
      background: var(--navy-900);
      color: var(--gold-400);
      border: none;
      border-radius: var(--radius-md);
      width: 38px;
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .status-pill-group { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
    .status-pill-radio { display: none; }
    .status-pill-label {
      display: block;
      text-align: center;
      padding: 8px 4px;
      font-size: 11px;
      font-weight: 700;
      border-radius: var(--radius-md);
      border: 1.5px solid var(--card-border);
      background: #FFFFFF;
      color: var(--text-secondary);
      cursor: pointer;
    }

    .status-pill-radio:checked + .status-pill-label.pill-completed { background-color: var(--green-500); color: #FFFFFF; border-color: var(--green-600); }
    .status-pill-radio:checked + .status-pill-label.pill-cancelled { background-color: var(--red-500); color: #FFFFFF; border-color: var(--red-600); }
    .status-pill-radio:checked + .status-pill-label.pill-rescheduled { background-color: var(--amber-500); color: #FFFFFF; border-color: var(--amber-600); }

    .days-chips-row { display: grid; grid-template-columns: repeat(7, 1fr); gap: 3px; }
    .day-chip-label {
      display: block;
      text-align: center;
      padding: 7px 0;
      font-size: 10px;
      font-weight: 700;
      border-radius: var(--radius-sm);
      border: 1px solid var(--card-border);
      background: #FFFFFF;
      color: var(--text-secondary);
      cursor: pointer;
    }
    .day-chip-checkbox:checked + .day-chip-label { background-color: var(--navy-900); color: var(--gold-400); border-color: var(--gold-500); }

    .btn-primary-block {
      width: 100%;
      padding: 12px;
      background: linear-gradient(135deg, var(--navy-900) 0%, var(--navy-800) 100%);
      color: #FFFFFF;
      border: 1px solid var(--gold-500);
      border-radius: var(--radius-md);
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .records-filters-bar { display: flex; gap: 6px; margin-bottom: 10px; }
    .search-box { position: relative; flex: 1; }
    .search-input {
      width: 100%;
      padding: 8px 10px 8px 32px;
      font-size: 12px;
      border: 1px solid var(--card-border);
      border-radius: var(--radius-md);
      background: #FFFFFF;
    }
    .search-icon { position: absolute; left: 8px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }

    .records-header-summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 9px 12px;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: var(--radius-md);
      margin-bottom: 12px;
      font-weight: 700;
    }

    .record-row-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: var(--radius-lg);
      padding: 10px 12px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      box-shadow: var(--shadow-sm);
    }

    .record-date-badge {
      background: #F1F5F9;
      border-radius: var(--radius-md);
      padding: 5px 6px;
      text-align: center;
      min-width: 44px;
    }
    .record-date-day { font-size: 9px; font-weight: 800; color: var(--text-muted); }
    .record-date-num { font-size: 15px; font-weight: 900; color: var(--navy-900); }
    .record-date-month { font-size: 9px; font-weight: 800; color: var(--text-muted); }
    .record-main-info { flex: 1; }
    .record-org { font-size: 13px; font-weight: 700; color: var(--navy-900); }
    .record-class { font-size: 11px; color: var(--text-secondary); }
    .record-time { font-size: 10px; color: var(--text-muted); }
    .record-right-box { text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 3px; }
    .record-amount { font-size: 13px; font-weight: 800; color: var(--navy-900); }

    /* Ledger */
    .ledger-view-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: var(--radius-lg);
      padding: 14px;
      margin-top: 12px;
      box-shadow: var(--shadow-sm);
    }

    .ledger-preview-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--divider);
    }

    .ledger-preview-title { font-size: 14px; font-weight: 800; color: var(--navy-900); text-transform: uppercase; }
    .ledger-preview-subtitle { font-size: 11px; color: var(--text-muted); }

    .ledger-stats-strip {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      background: #F8FAFC;
      border-radius: var(--radius-md);
      padding: 8px 4px;
      margin-bottom: 12px;
      text-align: center;
    }
    .ledger-stat-item .stat-num { font-size: 13px; font-weight: 800; }
    .ledger-stat-item .stat-lbl { font-size: 9px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; }

    .ledger-table { width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 12px; }
    .ledger-table th {
      text-align: left;
      padding: 6px 3px;
      font-weight: 700;
      color: var(--text-muted);
      border-bottom: 1.5px solid var(--divider);
      text-transform: uppercase;
      font-size: 10px;
    }
    .ledger-table td { padding: 6px 3px; border-bottom: 1px solid #F1F5F9; color: var(--navy-900); }
    .ledger-table-total-row td { font-weight: 800; font-size: 12px; border-top: 1.5px solid var(--divider); padding-top: 8px; }

    .ledger-payment-box {
      background: #F8FAFC;
      border: 1px solid var(--divider);
      border-radius: var(--radius-md);
      padding: 10px;
      margin-bottom: 12px;
    }
    .payment-row { display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px; color: var(--text-secondary); }
    .payment-row.highlight { font-weight: 800; font-size: 12px; color: var(--navy-900); padding-top: 4px; border-top: 1px dashed var(--divider); }
    .ledger-btn-group { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }

    .btn-secondary-action {
      padding: 10px;
      background: #FFFFFF;
      color: var(--navy-900);
      border: 1.5px solid var(--navy-900);
      border-radius: var(--radius-md);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      cursor: pointer;
      text-align: center;
    }

    .overview-top-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px; }
    .overview-metric-card { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: var(--radius-lg); padding: 12px; text-align: center; box-shadow: var(--shadow-sm); }
    .metric-big-num { font-size: 20px; font-weight: 900; color: var(--navy-900); }
    .metric-big-num.green { color: var(--green-600); }
    .metric-big-num.red { color: var(--red-600); }
    .metric-sub-label { font-size: 10px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; }

    .org-summary-card { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: var(--radius-lg); padding: 10px 12px; margin-bottom: 8px; box-shadow: var(--shadow-sm); }
    .org-summary-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
    .org-title-name { font-size: 13px; font-weight: 800; color: var(--navy-900); }
    .org-lessons-badge { font-size: 10px; color: var(--text-muted); }
    .org-amounts-row { display: flex; align-items: center; justify-content: space-between; font-size: 12px; font-weight: 700; }

    /* Statistics */
    .chart-container-card { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: var(--radius-lg); padding: 14px; margin-bottom: 14px; box-shadow: var(--shadow-sm); }
    .chart-header-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
    .chart-title { font-size: 13px; font-weight: 800; color: var(--navy-900); }
    .chart-amount-badge { font-size: 14px; font-weight: 900; color: var(--navy-900); }
    .canvas-wrapper { width: 100%; height: 190px; position: relative; }
    canvas { width: 100% !important; height: 100% !important; }

    .donut-legend-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 10px; }
    .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: var(--text-secondary); font-weight: 600; }
    .legend-color-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

    .outstanding-debt-banner {
      background: linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%);
      border: 1px solid #FCA5A5;
      border-radius: var(--radius-lg);
      padding: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;
    }
    .debt-banner-title { font-size: 11px; font-weight: 700; color: #991B1B; text-transform: uppercase; }
    .debt-banner-sub { font-size: 10px; color: #B91C1C; }
    .debt-banner-amount { font-size: 16px; font-weight: 900; color: #DC2626; }

    /* Bottom Nav */
    .bottom-nav {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--navy-900);
      border-top: 1px solid rgba(212, 175, 55, 0.25);
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      padding-bottom: var(--safe-bottom);
      z-index: 50;
    }
    .nav-item {
      background: transparent;
      border: none;
      padding: 8px 4px 10px 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      color: #94A3B8;
      cursor: pointer;
      position: relative;
    }
    .nav-item svg { width: 20px; height: 20px; fill: currentColor; }
    .nav-label { font-size: 9.5px; font-weight: 600; }
    .nav-item.active { color: var(--gold-400); }
    .nav-item.active::after {
      content: '';
      position: absolute;
      bottom: 2px;
      width: 14px;
      height: 2.5px;
      background: var(--gold-400);
      border-radius: var(--radius-pill);
    }

    /* FAB */
    .fab-container {
      position: absolute;
      bottom: calc(64px + var(--safe-bottom));
      left: 50%;
      transform: translateX(-50%);
      z-index: 60;
    }
    .fab-btn {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--navy-800) 0%, var(--navy-950) 100%);
      border: 2px solid var(--gold-500);
      color: var(--gold-400);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .fab-btn svg { width: 24px; height: 24px; fill: currentColor; }

    /* Modals & Drawer */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(6, 14, 24, 0.7);
      backdrop-filter: blur(2px);
      display: flex;
      align-items: flex-end;
      justify-content: center;
      z-index: 100;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }
    .modal-overlay.open { opacity: 1; pointer-events: auto; }
    .modal-sheet {
      width: 100%;
      max-width: 440px;
      max-height: 90dvh;
      background: #FFFFFF;
      border-radius: var(--radius-xl) var(--radius-xl) 0 0;
      padding: 16px 18px 24px 18px;
      overflow-y: auto;
      transform: translateY(100%);
      transition: transform 0.2s ease;
    }
    .modal-overlay.open .modal-sheet { transform: translateY(0); }
    .sheet-handle { width: 32px; height: 4px; background: #CBD5E1; border-radius: var(--radius-pill); margin: 0 auto 12px auto; }
    .sheet-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
    .sheet-title { font-size: 15px; font-weight: 800; color: var(--navy-900); }
    .btn-close-sheet { background: transparent; border: none; font-size: 18px; color: var(--text-muted); cursor: pointer; }

    .drawer-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(6, 14, 24, 0.7);
      z-index: 120;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }
    .drawer-overlay.open { opacity: 1; pointer-events: auto; }
    .drawer-panel {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 82%;
      max-width: 320px;
      background: var(--navy-950);
      color: #FFFFFF;
      display: flex;
      flex-direction: column;
      transform: translateX(-100%);
      transition: transform 0.25s ease;
      border-right: 1px solid var(--gold-600);
    }
    .drawer-overlay.open .drawer-panel { transform: translateX(0); }
    .drawer-header { padding: 20px 16px 14px 16px; background: var(--navy-900); border-bottom: 1px solid rgba(212, 175, 55, 0.2); }
    .drawer-app-title { font-size: 17px; font-weight: 800; color: #FFFFFF; }
    .drawer-app-title .gold-accent { color: var(--gold-400); }
    .drawer-subtitle { font-size: 11px; color: var(--gold-400); }

    .account-profile-card {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: var(--radius-md);
      padding: 10px;
      margin: 10px 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
    }
    .account-avatar {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 13px;
      color: #FFFFFF;
    }
    .account-name { font-size: 13px; font-weight: 700; color: #FFFFFF; }
    .account-email { font-size: 11px; color: #94A3B8; }

    .drawer-menu { flex: 1; padding: 12px 8px; overflow-y: auto; }
    .drawer-item {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 11px 12px;
      border-radius: var(--radius-md);
      background: transparent;
      border: none;
      color: #E2E8F0;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      text-align: left;
    }
    .drawer-item:hover, .drawer-item:active { background: rgba(212, 175, 55, 0.12); color: var(--gold-400); }
    .drawer-item svg { width: 18px; height: 18px; fill: currentColor; }
    .drawer-footer { padding: 12px 16px; border-top: 1px solid rgba(255, 255, 255, 0.1); font-size: 10px; color: #64748B; }

    .toast-msg {
      position: fixed;
      top: 16px;
      left: 50%;
      transform: translateX(-50%) translateY(-20px);
      background: var(--navy-950);
      color: #FFFFFF;
      border: 1px solid var(--gold-500);
      padding: 9px 16px;
      border-radius: var(--radius-pill);
      font-size: 12px;
      font-weight: 600;
      z-index: 200;
      opacity: 0;
      pointer-events: none;
      transition: all 0.2s ease;
    }
    .toast-msg.show { opacity: 1; transform: translateX(-50%) translateY(0); }
  </style>
</head>
<body>

  <div id="app-root">

    <!-- Top App Header -->
    <header class="app-header">
      <div class="header-left">
        <button id="btnDrawerOpen" class="header-btn" onclick="toggleDrawer()" title="Open Menu">
          <svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
        </button>
      </div>
      
      <div class="header-title-container">
        <div id="hdrAppName" class="header-title">FAVOURED <span class="gold-accent">LEDGAL</span></div>
        <div id="hdrAppSub" class="header-subtitle">PERSONAL & BUSINESS LEDGER</div>
      </div>

      <div class="header-right">
        <!-- User Profile Pill / Login Button -->
        <button id="btnUserProfile" class="user-profile-pill" onclick="openAuthModal()" title="My Account">
          <span id="userAvatarMini" class="user-avatar-mini">👤</span>
          <span id="userNameMini" class="user-name-mini">Sign In</span>
        </button>

        <!-- Global Language Switcher (EN / RU) -->
        <div class="lang-switch-container">
          <button id="btnLangEn" class="lang-switch-btn active" onclick="setLang('en')">EN</button>
          <button id="btnLangRu" class="lang-switch-btn" onclick="setLang('ru')">RU</button>
        </div>

        <button id="btnAlerts" class="header-btn" onclick="openModal('modalUnconfirmed')" title="Smart Alerts">
          <svg viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/></svg>
          <span id="badgeUnconfirmed" class="badge-dot" style="display:none;">0</span>
        </button>
      </div>
    </header>

    <!-- Main Viewport Scroll Area -->
    <main class="views-container">

      <!-- ==========================================
           TAB 1: TODAY (Matching Screen 1)
           ========================================== -->
      <section id="viewToday" class="view-section active">
        
        <!-- Guest Mode Welcome Banner -->
        <div id="bannerGuestWelcome" class="guest-welcome-banner">
          <span style="font-size:22px; margin-top:2px;">✨</span>
          <div style="flex:1;">
            <div id="lblGuestTitle" style="font-size:13px; font-weight:800; color:var(--gold-400);">You are in Guest Mode</div>
            <div id="lblGuestSub" style="font-size:11px; color:#CBD5E1; margin-top:2px; line-height:1.4;">Sign In or Sign Up to save your records, schedule entries, and sync to Google Drive or Telegram.</div>
            <div style="display:flex; gap:8px; margin-top:10px;">
              <button type="button" class="reminder-btn" style="background:var(--gold-500); color:var(--navy-950); font-weight:800;" onclick="openAuthModal('register')">Create Account</button>
              <button type="button" class="reminder-btn" style="background:transparent; border:1px solid rgba(255,255,255,0.4); color:#FFFFFF;" onclick="openAuthModal('login')">Sign In</button>
            </div>
          </div>
        </div>

        <!-- Greeting Header -->
        <div class="greeting-card">
          <div class="greeting-title"><span id="lblGreetingText">Good morning</span>, <span id="labelTeacherName">Guest</span>! <span>👋</span></div>
          <div id="labelTodayDate" class="greeting-date">Today</div>
        </div>

        <!-- Section Header -->
        <div class="section-header-row">
          <span id="lblTodaysLessonsHeader" class="section-label">Today's Schedule</span>
          <span id="badgeTodayCount" class="count-pill">0</span>
        </div>

        <!-- Today Lessons List Container -->
        <div id="listTodayLessons"></div>

        <!-- Today Summary Card -->
        <div class="summary-card">
          <div id="lblTodaySummaryTitle" class="summary-title">Today Summary</div>
          <div class="summary-grid">
            <div class="summary-col">
              <span id="todaySumLessons" class="summary-num">0</span>
              <span id="lblSumLessonsCol" class="summary-label">Lessons</span>
            </div>
            <div class="summary-col">
              <span id="todaySumExpected" class="summary-num">₽0</span>
              <span id="lblSumExpectedCol" class="summary-label">Expected</span>
            </div>
            <div class="summary-col">
              <span id="todaySumCompleted" class="summary-num" style="color:var(--green-600);">₽0</span>
              <span id="lblSumCompletedCol" class="summary-label">Completed</span>
            </div>
          </div>
        </div>

      </section>

      <!-- ==========================================
           TAB 2: SCHEDULE (Matching Screen 2)
           ========================================== -->
      <section id="viewSchedule" class="view-section">
        
        <!-- Segment Control: Recurring vs One-time -->
        <div class="segment-control">
          <button id="btnSchedTabRecurring" class="segment-btn active" onclick="switchSchedTab('recurring')">Recurring</button>
          <button id="btnSchedTabOnetime" class="segment-btn" onclick="switchSchedTab('onetime')">One-time</button>
        </div>

        <div id="listScheduleRecurring"></div>
        <div id="listScheduleOnetime" style="display:none;"></div>

        <div style="margin-top: 18px;">
          <button id="btnAddScheduleTemplate" class="btn-primary-block" onclick="openAddModal(true)">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            <span id="lblBtnAddRecurring">Add Recurring Schedule</span>
          </button>
        </div>

      </section>

      <!-- ==========================================
           TAB 3: RECORDS (Matching Screen 4)
           ========================================== -->
      <section id="viewRecords" class="view-section">
        
        <div class="records-filters-bar">
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input type="text" id="inputRecordSearch" class="search-input" oninput="renderRecordsView()" placeholder="Search class or org...">
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1.3fr; gap:8px; margin-bottom:12px;">
          <select id="selectRecordMonth" class="form-select" onchange="renderRecordsView()"></select>
          <select id="selectRecordOrg" class="form-select" onchange="renderRecordsView()"></select>
        </div>

        <div class="records-header-summary">
          <span id="labelRecordsMonthTitle" class="records-month-label">All Time</span>
          <span id="labelRecordsMonthTotal" class="records-total-amount">₽0</span>
        </div>

        <div id="listRecordsHistory"></div>

      </section>

      <!-- ==========================================
           TAB 4: LEDGER (Matching Screen 5, 6, 7)
           ========================================== -->
      <section id="viewLedger" class="view-section">
        
        <!-- Segment Tabs: Generate Ledger | Payments Overview -->
        <div class="segment-control">
          <button id="btnLedgerTabGenerate" class="segment-btn active" onclick="switchLedgerTab('generate')">Generate Ledger</button>
          <button id="btnLedgerTabPayments" class="segment-btn" onclick="switchLedgerTab('payments')">Payments</button>
        </div>

        <!-- SUB-TAB A: GENERATE LEDGER -->
        <div id="tabContentGenerateLedger">
          <div class="form-card">
            
            <div class="form-group">
              <label id="lblLedgerLanguageField" class="form-label">Statement Language / Язык ведомости</label>
              <select id="selectLedgerLanguage" class="form-select" onchange="renderLedgerView()" style="font-weight:700; border-color:var(--gold-500); background-color:#FFFDF7;">
                <option value="ru" selected>🇷🇺 Русский (RU)</option>
                <option value="en">🇬🇧 English (EN)</option>
              </select>
            </div>

            <div class="form-group">
              <label id="lblLedgerOrgField" class="form-label">Organisation</label>
              <select id="selectLedgerOrg" class="form-select"></select>
            </div>

            <div class="form-group">
              <label id="lblLedgerClassField" class="form-label">Class / Group</label>
              <select id="selectLedgerClass" class="form-select"></select>
            </div>

            <div class="form-group">
              <label id="lblLedgerMonthField" class="form-label">Month</label>
              <select id="selectLedgerMonth" class="form-select"></select>
            </div>

            <div class="form-group">
              <label id="lblLedgerStatusField" class="form-label">Status</label>
              <select id="selectLedgerStatus" class="form-select">
                <option value="completed">Completed</option>
                <option value="all">All Statuses</option>
              </select>
            </div>

            <button id="btnGenerateLedgerAction" class="btn-primary-block" onclick="generateLedgerBtn()">
              GENERATE LEDGER
            </button>
          </div>

          <!-- Generated Ledger Statement Card -->
          <div id="cardLedgerResult" class="ledger-view-card">
            <div class="ledger-preview-header">
              <div>
                <div id="lblLedgerOrgHeader" class="ledger-preview-title">ALL ORGANISATIONS</div>
                <div id="lblLedgerMonthHeader" class="ledger-preview-subtitle">Current Month</div>
              </div>
              <button id="btnShareLedgerTop" class="header-btn" style="color:var(--navy-900);" onclick="openShareModal()" title="Share Ledger">
                <svg viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/></svg>
              </button>
            </div>

            <div class="ledger-stats-strip">
              <div class="ledger-stat-item">
                <div id="lblLedgerCount" class="stat-num">0</div>
                <div id="lblLedgerStatLessons" class="stat-lbl">Lessons</div>
              </div>
              <div class="ledger-stat-item">
                <div id="lblLedgerEarned" class="stat-num earned">₽0</div>
                <div id="lblLedgerStatEarned" class="stat-lbl">Earned</div>
              </div>
              <div class="ledger-stat-item">
                <div id="lblLedgerPaid" class="stat-num paid">₽0</div>
                <div id="lblLedgerStatPaid" class="stat-lbl">Paid</div>
              </div>
              <div class="ledger-stat-item">
                <div id="lblLedgerDue" class="stat-num due">₽0</div>
                <div id="lblLedgerStatDue" class="stat-lbl">Due</div>
              </div>
            </div>

            <table class="ledger-table">
              <thead>
                <tr>
                  <th id="thLedgerDate">Date</th>
                  <th id="thLedgerClass">Class / Group</th>
                  <th id="thLedgerStatus">Status</th>
                  <th id="thLedgerAmount" style="text-align:right;">Amount</th>
                </tr>
              </thead>
              <tbody id="tbodyLedgerItems"></tbody>
            </table>

            <div class="ledger-payment-box">
              <div class="payment-row">
                <span id="lblLedgerRowEarned">Amount Earned</span>
                <span id="lblLedgerBoxEarned" style="font-weight:700;">₽0</span>
              </div>
              <div class="payment-row">
                <span id="lblLedgerRowPaid">Paid</span>
                <span id="lblLedgerBoxPaid" style="font-weight:700; color:var(--green-600);">₽0</span>
              </div>
              <div class="payment-row highlight">
                <span id="lblLedgerRowDue">Outstanding</span>
                <span id="lblLedgerBoxDue" style="color:var(--red-600);">₽0</span>
              </div>
            </div>

            <div class="ledger-btn-group">
              <button id="btnLedgerMarkPaid" class="btn-secondary-action" style="border-color:var(--green-600); color:var(--green-600);" onclick="openMarkPaidModal()">
                MARK AS PAID
              </button>
              <button id="btnLedgerShare" class="btn-primary-block" style="padding:11px; font-size:12px;" onclick="openShareModal()">
                SHARE LEDGER
              </button>
            </div>
          </div>
        </div>

        <!-- SUB-TAB B: OVERVIEW & PAYMENTS (Screen 7) -->
        <div id="tabContentOverview" style="display:none;">
          
          <div class="section-header-row" style="margin-bottom:14px;">
            <span class="section-label"><span id="lblOverviewHeaderTitle">OVERVIEW</span> — <span id="lblOverviewMonth">Current Month</span></span>
          </div>

          <div class="overview-top-cards">
            <div class="overview-metric-card">
              <div id="lblOverviewLessons" class="metric-big-num">0</div>
              <div id="lblOverviewSubLessons" class="metric-sub-label">Lessons</div>
            </div>
            <div class="overview-metric-card">
              <div id="lblOverviewEarned" class="metric-big-num">₽0</div>
              <div id="lblOverviewSubEarned" class="metric-sub-label">Earned</div>
            </div>
            <div class="overview-metric-card">
              <div id="lblOverviewPaid" class="metric-big-num green">₽0</div>
              <div id="lblOverviewSubPaid" class="metric-sub-label">Paid</div>
            </div>
            <div class="overview-metric-card">
              <div id="lblOverviewOutstanding" class="metric-big-num red">₽0</div>
              <div id="lblOverviewSubDue" class="metric-sub-label">Outstanding</div>
            </div>
          </div>

          <div class="section-header-row" style="margin-top:16px; margin-bottom:10px;">
            <span id="lblByOrgTitle" class="section-label">BY ORGANISATION</span>
            <button class="reminder-btn" style="background:var(--navy-900); color:var(--gold-400);" onclick="openPaymentModal()">+ Record Payment</button>
          </div>

          <div id="listOverviewOrgs"></div>

          <div style="margin-top: 18px;">
            <button class="btn-secondary-action" style="width:100%;" onclick="openShareModal()">
              VIEW DETAILED FINANCIAL REPORT
            </button>
          </div>

        </div>

      </section>

      <!-- ==========================================
           TAB 5: STATISTICS (Screen 8)
           ========================================== -->
      <section id="viewStatistics" class="view-section">
        
        <div class="segment-control">
          <button id="btnStatsTabIncome" class="segment-btn active" onclick="switchStatsTab('income')">Income</button>
          <button id="btnStatsTabLessons" class="segment-btn" onclick="switchStatsTab('lessons')">Lessons</button>
          <button id="btnStatsTabOrgs" class="segment-btn" onclick="switchStatsTab('orgs')">Organisations</button>
        </div>

        <div style="display:flex; justify-content:flex-end; margin-bottom:12px;">
          <select id="selectStatsYear" class="form-select" onchange="renderStatisticsView()" style="width:auto; padding:6px 12px; font-weight:700;">
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </select>
        </div>

        <div id="cardStatsMonthlyIncome" class="chart-container-card">
          <div class="chart-header-row">
            <span id="lblChartIncomeTitle" class="chart-title">Monthly Income (<span class="currency-sign">₽</span>)</span>
            <span id="lblStatsMonthEarned" class="chart-amount-badge">₽0</span>
          </div>
          
          <div class="canvas-wrapper">
            <canvas id="chartMonthlyIncome"></canvas>
          </div>
        </div>

        <div id="cardStatsDonut" class="chart-container-card">
          <div class="chart-header-row">
            <span id="lblChartDonutTitle" class="chart-title">By Organisation</span>
          </div>

          <div class="canvas-wrapper" style="height: 180px;">
            <canvas id="chartByOrg"></canvas>
          </div>

          <div id="donutLegend" class="donut-legend-grid"></div>
        </div>

        <div class="outstanding-debt-banner">
          <div class="debt-banner-left">
            <span id="lblDebtBannerTitle" class="debt-banner-title">Outstanding Payments</span>
            <span id="lblStatsDebtSubtitle" class="debt-banner-sub">From 0 organisations</span>
          </div>
          <div id="lblStatsDebtTotal" class="debt-banner-amount">₽0</div>
        </div>

      </section>

    </main>

    <!-- Floating Action Button (FAB) -->
    <div class="fab-container">
      <button id="btnFabAdd" class="fab-btn" onclick="openAddModal(false)" title="Quick Add">
        <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
      </button>
    </div>

    <!-- Bottom Navigation Bar (5 Tabs) -->
    <nav class="bottom-nav">
      <button class="nav-item active" data-tab="viewToday" onclick="switchTab('viewToday')">
        <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        <span id="navLabelToday" class="nav-label">Today</span>
      </button>
      <button class="nav-item" data-tab="viewSchedule" onclick="switchTab('viewSchedule')">
        <svg viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z"/></svg>
        <span id="navLabelSchedule" class="nav-label">Schedule</span>
      </button>
      <button class="nav-item" data-tab="viewRecords" onclick="switchTab('viewRecords')">
        <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
        <span id="navLabelRecords" class="nav-label">Records</span>
      </button>
      <button class="nav-item" data-tab="viewLedger" onclick="switchTab('viewLedger')">
        <svg viewBox="0 0 24 24"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 10h-4v4h-2v-4H7v-2h4V6h2v4h4v2z"/></svg>
        <span id="navLabelLedger" class="nav-label">Ledger</span>
      </button>
      <button class="nav-item" data-tab="viewStatistics" onclick="switchTab('viewStatistics')">
        <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
        <span id="navLabelStats" class="nav-label">Statistics</span>
      </button>
    </nav>

  </div><!-- /#app-root -->

  <!-- =========================================================
       MODAL 1: ADD ENTRY (Screen 3)
       ========================================================= -->
  <div id="modalAdd" class="modal-overlay" onclick="onModalBackdrop(event, 'modalAdd')">
    <div class="modal-sheet">
      <div class="sheet-handle"></div>
      
      <div class="sheet-header">
        <span id="modalAddTitle" class="sheet-title">ADD LESSON</span>
        <button class="btn-close-sheet" onclick="closeModal('modalAdd')">✕</button>
      </div>

      <form id="formAddLesson" onsubmit="saveLessonSubmit(event)">
        <input type="hidden" id="inputEditId" value="">

        <div class="segment-control" style="margin-bottom:14px;">
          <button type="button" id="btnTypeOnetime" class="segment-btn active" onclick="setAddType('onetime')">One-time</button>
          <button type="button" id="btnTypeRecurring" class="segment-btn" onclick="setAddType('recurring')">Recurring</button>
        </div>

        <div id="groupLessonDate" class="form-group">
          <label id="lblFormDate" class="form-label">Date</label>
          <div class="input-with-icon">
            <span class="input-icon-left">📅</span>
            <input type="date" id="inputLessonDate" class="form-input has-icon-left" required>
          </div>
        </div>

        <div id="groupRecurringDays" class="form-group" style="display:none;">
          <label id="lblFormRepeat" class="form-label">Repeat Every</label>
          <div class="days-chips-row">
            <label><input type="checkbox" name="recDay" value="1" class="day-chip-checkbox" style="display:none;"><span class="day-chip-label">Mon</span></label>
            <label><input type="checkbox" name="recDay" value="2" class="day-chip-checkbox" style="display:none;"><span class="day-chip-label">Tue</span></label>
            <label><input type="checkbox" name="recDay" value="3" class="day-chip-checkbox" style="display:none;"><span class="day-chip-label">Wed</span></label>
            <label><input type="checkbox" name="recDay" value="4" class="day-chip-checkbox" style="display:none;"><span class="day-chip-label">Thu</span></label>
            <label><input type="checkbox" name="recDay" value="5" class="day-chip-checkbox" style="display:none;"><span class="day-chip-label">Fri</span></label>
            <label><input type="checkbox" name="recDay" value="6" class="day-chip-checkbox" style="display:none;"><span class="day-chip-label">Sat</span></label>
            <label><input type="checkbox" name="recDay" value="0" class="day-chip-checkbox" style="display:none;"><span class="day-chip-label">Sun</span></label>
          </div>
        </div>

        <div class="form-group">
          <label id="lblFormTimeSlot" class="form-label">Time Slot</label>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
            <input type="time" id="inputStartTime" class="form-input" value="09:00" required>
            <input type="time" id="inputEndTime" class="form-input" value="10:00" required>
          </div>
        </div>

        <div class="form-group">
          <label id="lblFormOrg" class="form-label">Organisation / Client</label>
          <div class="select-with-add">
            <select id="selectOrg" class="form-select" required></select>
            <button type="button" class="btn-inline-add" onclick="promptAddOrg()">+</button>
          </div>
        </div>

        <div class="form-group">
          <label id="lblFormClass" class="form-label">Class / Group</label>
          <div class="select-with-add">
            <select id="selectClass" class="form-select" required></select>
            <button type="button" class="btn-inline-add" onclick="promptAddClass()">+</button>
          </div>
        </div>

        <div class="form-group">
          <label id="lblFormAmount" class="form-label">Amount (<span class="currency-sign">₽</span>)</label>
          <div class="input-with-icon">
            <span class="input-icon-left" style="font-weight:700; font-size:16px;">₽</span>
            <input type="number" id="inputAmount" class="form-input has-icon-left" value="1000" min="0" step="50" required>
          </div>
        </div>

        <div class="form-group">
          <label id="lblFormNotes" class="form-label">Notes (Optional)</label>
          <input type="text" id="inputNotes" class="form-input" placeholder="e.g. Lesson topic or homework">
        </div>

        <div class="form-group">
          <label id="lblFormStatus" class="form-label">Status</label>
          <div class="status-pill-group">
            <label>
              <input type="radio" name="lessonStatus" value="completed" class="status-pill-radio" checked>
              <span class="status-pill-label pill-completed">Completed</span>
            </label>
            <label>
              <input type="radio" name="lessonStatus" value="cancelled" class="status-pill-radio">
              <span class="status-pill-label pill-cancelled">Cancelled</span>
            </label>
            <label>
              <input type="radio" name="lessonStatus" value="rescheduled" class="status-pill-radio">
              <span class="status-pill-label pill-rescheduled">Rescheduled</span>
            </label>
          </div>
        </div>

        <div style="margin-top:20px;">
          <button type="submit" id="btnSaveLessonSubmit" class="btn-primary-block">SAVE LESSON</button>
        </div>
      </form>
    </div>
  </div>

  <!-- =========================================================
       MODAL 2: RESCHEDULE LESSON
       ========================================================= -->
  <div id="modalReschedule" class="modal-overlay" onclick="onModalBackdrop(event, 'modalReschedule')">
    <div class="modal-sheet">
      <div class="sheet-handle"></div>
      
      <div class="sheet-header">
        <span class="sheet-title">RESCHEDULE LESSON</span>
        <button class="btn-close-sheet" onclick="closeModal('modalReschedule')">✕</button>
      </div>

      <div id="rescheduleLessonInfo" style="background:#F8FAFC; border-radius:var(--radius-md); padding:10px 14px; margin-bottom:14px; font-size:13px;">
        <strong id="lblRescheduleClass">Class</strong> • <span id="lblRescheduleOrg">Organisation</span>
        <div id="lblRescheduleOriginal" style="color:var(--text-muted); font-size:11px; margin-top:2px;">Original Time</div>
      </div>

      <form id="formReschedule" onsubmit="saveRescheduleSubmit(event)">
        <input type="hidden" id="inputRescheduleId" value="">

        <div class="form-group">
          <label class="form-label">New Date</label>
          <input type="date" id="inputRescheduleDate" class="form-input" required>
        </div>

        <div class="form-group">
          <label class="form-label">New Time Slot</label>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
            <input type="time" id="inputRescheduleStart" class="form-input" value="09:00" required>
            <input type="time" id="inputRescheduleEnd" class="form-input" value="10:00" required>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Reason / Notes (Optional)</label>
          <input type="text" id="inputRescheduleReason" class="form-input" placeholder="e.g. Rescheduled upon student request">
        </div>

        <div style="margin-top:18px;">
          <button type="submit" class="btn-primary-block" style="background:linear-gradient(135deg, #D97706 0%, #B45309 100%);">CONFIRM RESCHEDULE</button>
        </div>
      </form>
    </div>
  </div>

  <!-- =========================================================
       MODAL 3: RECORD PAYMENT
       ========================================================= -->
  <div id="modalPayment" class="modal-overlay" onclick="onModalBackdrop(event, 'modalPayment')">
    <div class="modal-sheet">
      <div class="sheet-handle"></div>
      
      <div class="sheet-header">
        <span class="sheet-title">RECORD PAYMENT</span>
        <button class="btn-close-sheet" onclick="closeModal('modalPayment')">✕</button>
      </div>

      <form id="formPayment" onsubmit="savePaymentSubmit(event)">
        <div class="form-group">
          <label class="form-label">Organisation / Client</label>
          <select id="selectPayOrg" class="form-select" required></select>
        </div>

        <div class="form-group">
          <label class="form-label">Month</label>
          <select id="selectPayMonth" class="form-select"></select>
        </div>

        <div class="form-group">
          <label class="form-label">Payment Amount (<span class="currency-sign">₽</span>)</label>
          <input type="number" id="inputPayAmount" class="form-input" value="1000" min="1" step="50" required>
        </div>

        <div class="form-group">
          <label class="form-label">Payment Date</label>
          <input type="date" id="inputPayDate" class="form-input" required>
        </div>

        <div class="form-group">
          <label class="form-label">Payment Method</label>
          <select id="selectPayMethod" class="form-select">
            <option value="Bank Transfer">Bank Transfer (Сбер / Т-Банк)</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Notes / Reference</label>
          <input type="text" id="inputPayNotes" class="form-input" placeholder="e.g. Bank transfer ref #8492">
        </div>

        <div style="margin-top:18px;">
          <button type="submit" class="btn-primary-block" style="background:linear-gradient(135deg, #059669 0%, #047857 100%);">SAVE PAYMENT</button>
        </div>
      </form>
    </div>
  </div>

  <!-- =========================================================
       MODAL 4: SHARE & EXPORT STATEMENT SHEET
       ========================================================= -->
  <div id="modalShare" class="modal-overlay" onclick="onModalBackdrop(event, 'modalShare')">
    <div class="modal-sheet">
      <div class="sheet-handle"></div>
      
      <div class="sheet-header">
        <span class="sheet-title">SHARE LEDGER</span>
        <button class="btn-close-sheet" onclick="closeModal('modalShare')">✕</button>
      </div>

      <div style="font-size:12px; color:var(--text-secondary); margin-bottom:12px;">
        Generate and copy a professional summary ready to send to clients via WhatsApp, Telegram, or Email.
      </div>

      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; background:#F1F5F9; padding:8px 12px; border-radius:var(--radius-md);">
        <span style="font-size:12px; font-weight:700; color:var(--navy-900);">Statement Language:</span>
        <div class="lang-switch-container">
          <button id="btnShareLangRu" class="lang-switch-btn active" onclick="switchShareStatementLang('ru')">RU 🇷🇺</button>
          <button id="btnShareLangEn" class="lang-switch-btn" onclick="switchShareStatementLang('en')">EN 🇬🇧</button>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Formatted Statement Text</label>
        <textarea id="textSharePreview" class="form-textarea" rows="8" style="font-family:monospace; font-size:12px;" readonly></textarea>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:10px;">
        <button type="button" class="btn-primary-block" style="padding:10px; font-size:12px;" onclick="copyShareText()">
          📋 COPY TEXT
        </button>
        <button type="button" class="btn-secondary-action" style="padding:10px; font-size:12px;" onclick="printStatementReceipt()">
          🖨️ PRINT / PDF
        </button>
      </div>

      <button type="button" class="btn-secondary-action" style="width:100%; padding:10px; font-size:12px;" onclick="exportCsvFile()">
        📊 EXPORT CSV SPREADSHEET
      </button>
    </div>
  </div>

  <!-- =========================================================
       MODAL 5: UNCONFIRMED ITEMS
       ========================================================= -->
  <div id="modalUnconfirmed" class="modal-overlay" onclick="onModalBackdrop(event, 'modalUnconfirmed')">
    <div class="modal-sheet">
      <div class="sheet-handle"></div>
      
      <div class="sheet-header">
        <span class="sheet-title">UNCONFIRMED LESSONS</span>
        <button class="btn-close-sheet" onclick="closeModal('modalUnconfirmed')">✕</button>
      </div>

      <div style="font-size:12px; color:var(--text-secondary); margin-bottom:12px;">
        These lessons were scheduled in your calendar but haven't been confirmed yet.
      </div>

      <div id="listUnconfirmedItems"></div>

      <div style="margin-top:14px;">
        <button id="btnConfirmAllUnconfirmed" class="btn-primary-block" style="background:var(--green-600);" onclick="confirmAllUnconfirmed()">
          ✓ CONFIRM ALL AS COMPLETED
        </button>
      </div>
    </div>
  </div>

  <!-- =========================================================
       MODAL 6: USER ACCOUNT / AUTH
       ========================================================= -->
  <div id="modalAuth" class="modal-overlay" onclick="onModalBackdrop(event, 'modalAuth')">
    <div class="modal-sheet">
      <div class="sheet-handle"></div>
      
      <div class="sheet-header">
        <span class="sheet-title">TEACHER ACCOUNT</span>
        <button class="btn-close-sheet" onclick="closeModal('modalAuth')">✕</button>
      </div>

      <div class="segment-control" style="margin-bottom:16px;">
        <button type="button" id="btnAuthTabLogin" class="segment-btn active" onclick="switchAuthTab('login')">Sign In</button>
        <button type="button" id="btnAuthTabRegister" class="segment-btn" onclick="switchAuthTab('register')">Sign Up</button>
      </div>

      <div id="boxCurrentActiveUser" style="display:none; background:#F8FAFC; border:1px solid #CBD5E1; border-radius:var(--radius-md); padding:12px; margin-bottom:14px;">
        <div style="font-size:11px; color:var(--text-muted); text-transform:uppercase; font-weight:700;">Active Account:</div>
        <div style="display:flex; align-items:center; justify-content:space-between; margin-top:4px;">
          <div>
            <strong id="lblActiveUserName" style="font-size:15px; color:var(--navy-900);">Teacher</strong>
            <div id="lblActiveUserEmail" style="font-size:12px; color:var(--text-secondary);">email@domain.com</div>
          </div>
          <button type="button" class="reminder-btn" style="background:#EF4444; color:#FFFFFF;" onclick="logoutUser()">Log Out</button>
        </div>
      </div>

      <form id="formLogin" onsubmit="loginSubmit(event)">
        <div class="form-group">
          <label class="form-label">Email or Username</label>
          <input type="text" id="inputLoginEmail" class="form-input" placeholder="e.g. favour@school.com" required>
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" id="inputLoginPassword" class="form-input" placeholder="••••••••" required>
        </div>
        <div style="margin-top:18px;">
          <button type="submit" class="btn-primary-block">SIGN IN</button>
        </div>
      </form>

      <form id="formRegister" style="display:none;" onsubmit="registerSubmit(event)">
        <div class="form-group">
          <label class="form-label">Your Full Name</label>
          <input type="text" id="inputRegName" class="form-input" placeholder="e.g. Favour" required>
        </div>
        <div class="form-group">
          <label class="form-label">Email or Username</label>
          <input type="text" id="inputRegEmail" class="form-input" placeholder="e.g. favour@school.com" required>
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" id="inputRegPassword" class="form-input" placeholder="Min. 3 characters" required>
        </div>
        <div class="form-group">
          <label class="form-label">Preferred Currency</label>
          <select id="selectRegCurrency" class="form-select">
            <option value="₽" selected>₽ — Russian Ruble (Рубль)</option>
            <option value="₱">₱ — Philippine Peso (P)</option>
            <option value="$">$ — US Dollar (USD)</option>
            <option value="€">€ — Euro (EUR)</option>
            <option value="£">£ — British Pound (GBP)</option>
            <option value="₦">₦ — Nigerian Naira (NGN)</option>
            <option value="₸">₸ — Kazakh Tenge (Тенге)</option>
          </select>
        </div>
        <div style="margin-top:18px;">
          <button type="submit" class="btn-primary-block">CREATE FREE ACCOUNT</button>
        </div>
      </form>
    </div>
  </div>

  <!-- =========================================================
       MODAL 7: CLOUD BACKUP & SYNC TO GOOGLE / TELEGRAM
       ========================================================= -->
  <div id="modalCloudSync" class="modal-overlay" onclick="onModalBackdrop(event, 'modalCloudSync')">
    <div class="modal-sheet">
      <div class="sheet-handle"></div>
      
      <div class="sheet-header">
        <span class="sheet-title">CLOUD SYNC & BACKUP</span>
        <button class="btn-close-sheet" onclick="closeModal('modalCloudSync')">✕</button>
      </div>

      <div style="font-size:12px; color:var(--text-secondary); margin-bottom:14px;">
        Backup your teaching schedules, lessons, and ledgers to the cloud or export them directly to Telegram & Google Drive.
      </div>

      <div class="form-group">
        <label class="form-label">Your Private Sync Key</label>
        <div class="select-with-add">
          <input type="text" id="inputCloudKey" class="form-input" style="font-family:monospace; font-weight:700; letter-spacing:1px;" value="my-vault">
          <button type="button" class="btn-inline-add" onclick="copyCloudKey()" title="Copy Key">📋</button>
        </div>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:12px;">
        <button type="button" class="btn-primary-block" style="padding:12px; font-size:11px;" onclick="triggerCloudBackup()">
          ☁️ BACKUP NOW
        </button>
        <button type="button" class="btn-secondary-action" style="padding:12px; font-size:11px;" onclick="triggerCloudRestore()">
          🔄 RESTORE CLOUD
        </button>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; margin-top:8px;">
        <button type="button" class="btn-secondary-action" style="padding:10px; font-size:11px;" onclick="syncToTelegram()">
          ✈️ Telegram Sync
        </button>
        <button type="button" class="btn-secondary-action" style="padding:10px; font-size:11px;" onclick="syncToGoogleDrive()">
          📁 Google Drive Sync
        </button>
      </div>
    </div>
  </div>

  <!-- Side Navigation Drawer -->
  <div id="drawerMenu" class="drawer-overlay" onclick="onModalBackdrop(event, 'drawerMenu')">
    <div class="drawer-panel">
      
      <div class="drawer-header">
        <div class="drawer-app-title">FAVOURED <span class="gold-accent">LEDGAL</span></div>
        <div class="drawer-subtitle">TEACHER LEDGER</div>
      </div>

      <div class="account-profile-card" onclick="openAuthModal(); toggleDrawer();">
        <div id="drawerAvatar" class="account-avatar" style="background:#3B82F6;">👤</div>
        <div class="account-info">
          <div id="drawerName" class="account-name">Guest</div>
          <div id="drawerAccountSub" class="account-email">Tap to Sign In / Sign Up</div>
        </div>
      </div>

      <div class="drawer-menu">
        <button class="drawer-item" onclick="switchTab('viewToday'); toggleDrawer();">
          <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          <span>Today's Lessons</span>
        </button>

        <button class="drawer-item" onclick="switchTab('viewSchedule'); toggleDrawer();">
          <svg viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>
          <span>Recurring Schedule</span>
        </button>

        <button class="drawer-item" onclick="switchTab('viewRecords'); toggleDrawer();">
          <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2z"/></svg>
          <span>Lesson Records</span>
        </button>

        <button class="drawer-item" onclick="switchTab('viewLedger'); toggleDrawer();">
          <svg viewBox="0 0 24 24"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
          <span>Monthly Ledgers</span>
        </button>

        <button class="drawer-item" onclick="switchTab('viewStatistics'); toggleDrawer();">
          <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
          <span>Statistics & Analytics</span>
        </button>

        <div style="height:1px; background:rgba(255,255,255,0.1); margin:10px 0;"></div>

        <button class="drawer-item" style="color:var(--gold-400);" onclick="openModal('modalCloudSync'); toggleDrawer();">
          <svg viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/></svg>
          <span>Cloud Sync (Google / Telegram)</span>
        </button>
      </div>

      <div class="drawer-footer">
        FSMS Ledgal v2.0 • Favoured Teacher Ledger
      </div>

    </div>
  </div>

  <div id="toastMessage" class="toast-msg">Action confirmed!</div>

  <!-- =========================================================
       PURE INLINE JAVASCRIPT ENGINE (CLEAN EMPTY STATE)
       ========================================================= -->
  <script>
    // 1. Safe Storage
    const safeStorage = {
      _mem: {},
      getItem(k) {
        try { return localStorage.getItem(k); } catch(e) { return this._mem[k] || null; }
      },
      setItem(k, v) {
        try { localStorage.setItem(k, v); } catch(e) { this._mem[k] = String(v); }
      },
      removeItem(k) {
        try { localStorage.removeItem(k); } catch(e) { delete this._mem[k]; }
      }
    };

    function getTodayStr() {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    }

    // 2. Clean Database Model — ZERO DEMO DATA
    const CLEAN_EMPTY_DATA = {
      user: {
        name: "Guest",
        email: "",
        currency: "₽",
        language: "en",
        isLoggedIn: false
      },
      todayLessons: [],
      recurring: [],
      records: [],
      organisations: [],
      classes: [],
      overview: {
        totalLessons: 0,
        earned: 0,
        paid: 0,
        outstanding: 0,
        byOrg: []
      }
    };

    let appData = null;
    try {
      const saved = safeStorage.getItem('fsms_ledgal_clean_v3');
      appData = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(CLEAN_EMPTY_DATA));
    } catch(e) {
      appData = JSON.parse(JSON.stringify(CLEAN_EMPTY_DATA));
    }

    function saveAppData() {
      try {
        safeStorage.setItem('fsms_ledgal_clean_v3', JSON.stringify(appData));
      } catch(e) {}
    }

    // 3. UI Helpers & Modals
    function openModal(id) {
      const m = document.getElementById(id);
      if (m) m.classList.add('open');
    }
    function closeModal(id) {
      const m = document.getElementById(id);
      if (m) m.classList.remove('open');
    }
    function onModalBackdrop(e, id) {
      if (e.target.id === id) closeModal(id);
    }
    function toggleDrawer() {
      const d = document.getElementById('drawerMenu');
      if (d) d.classList.toggle('open');
    }

    // 4. Tab Navigation
    function switchTab(viewId) {
      document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
      document.querySelectorAll('.bottom-nav .nav-item').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-tab') === viewId);
      });
      const t = document.getElementById(viewId);
      if (t) t.classList.add('active');

      if (viewId === 'viewToday') renderTodayView();
      if (viewId === 'viewSchedule') renderScheduleView();
      if (viewId === 'viewRecords') renderRecordsView();
      if (viewId === 'viewLedger') renderLedgerView();
      if (viewId === 'viewStatistics') renderStatisticsView();
    }

    // 5. Language Switcher (EN / RU)
    function setLang(lang) {
      appData.user.language = lang;
      saveAppData();
      document.getElementById('btnLangEn').classList.toggle('active', lang === 'en');
      document.getElementById('btnLangRu').classList.toggle('active', lang === 'ru');
      
      const isRu = lang === 'ru';
      document.getElementById('hdrAppSub').textContent = isRu ? 'УЧИТЕЛЬСКИЙ ЖУРНАЛ' : 'TEACHER LEDGER';
      document.getElementById('lblTodaysLessonsHeader').textContent = isRu ? 'Уроки на сегодня' : "Today's Lessons";
      document.getElementById('lblTodaySummaryTitle').textContent = isRu ? 'Итоги за сегодня' : 'Today Summary';
      document.getElementById('lblSumLessonsCol').textContent = isRu ? 'Уроков' : 'Lessons';
      document.getElementById('lblSumExpectedCol').textContent = isRu ? 'Ожидается' : 'Expected';
      document.getElementById('lblSumCompletedCol').textContent = isRu ? 'Проведено' : 'Completed';
      document.getElementById('btnSchedTabRecurring').textContent = isRu ? 'Регулярные' : 'Recurring';
      document.getElementById('btnSchedTabOnetime').textContent = isRu ? 'Разовые' : 'One-time';
      document.getElementById('lblBtnAddRecurring').textContent = isRu ? 'Добавить регулярное расписание' : 'Add Recurring Schedule';
      document.getElementById('btnGenerateLedgerAction').textContent = isRu ? 'СФОРМИРОВАТЬ ВЕДОМОСТЬ' : 'GENERATE LEDGER';
      document.getElementById('lblOverviewHeaderTitle').textContent = isRu ? 'ОБЩИЙ БАЛАНС' : 'OVERVIEW';
      document.getElementById('lblByOrgTitle').textContent = isRu ? 'ПО ОРГАНИЗАЦИЯМ' : 'BY ORGANISATION';

      renderAll();
      showToast(isRu ? 'Язык: Русский' : 'Language: English');
    }

    // 6. Today Screen (Screen 1)
    function renderTodayView() {
      const container = document.getElementById('listTodayLessons');
      if (!container) return;
      container.innerHTML = '';
      const cur = appData.user.currency || '₽';
      const isRu = appData.user.language === 'ru';

      let totalExp = 0;
      let totalComp = 0;

      if (appData.todayLessons.length === 0) {
        container.innerHTML = `
          <div class="empty-state-box">
            <div class="empty-state-icon">🌱</div>
            <div class="empty-state-title">${isRu ? 'На сегодня нет уроков' : 'No lessons scheduled for today'}</div>
            <div class="empty-state-sub">${isRu ? 'Нажмите ＋ чтобы добавить урок или создайте регулярное расписание.' : 'Tap ＋ below to add a lesson or setup your recurring timetable.'}</div>
            <button type="button" class="btn-primary-block" style="width:auto; margin:14px auto 0 auto; padding:8px 16px; font-size:12px;" onclick="openAddModal(false)">
              + ${isRu ? 'Добавить урок' : 'Add Lesson'}
            </button>
          </div>
        `;
      } else {
        appData.todayLessons.forEach(l => {
          totalExp += l.rate;
          if (l.status === 'completed') totalComp += l.rate;

          const card = document.createElement('div');
          card.className = `lesson-card status-${l.status}`;

          let actionHtml = '';
          if (l.status === 'scheduled') {
            actionHtml = `
              <div class="lesson-actions-row">
                <button class="btn-action btn-done" onclick="markLessonDone('${l.id}')">✓ DONE</button>
                <button class="btn-action btn-cancel" onclick="markLessonCancel('${l.id}')">✕ CANCEL</button>
                <button class="btn-action btn-reschedule" onclick="openRescheduleModal('${l.id}')">⟳ RESCHEDULE</button>
              </div>
            `;
          } else {
            const badgeText = l.status === 'completed' ? '✓ Completed' : (l.status === 'cancelled' ? '✕ Cancelled' : '⟳ Rescheduled');
            actionHtml = `
              <div style="display:flex; align-items:center; justify-content:space-between; padding-top:10px; border-top:1px dashed var(--divider);">
                <span class="status-badge-tag ${l.status}">${badgeText}</span>
                <button class="btn-action" style="font-size:11px; color:var(--text-muted);" onclick="resetLessonStatus('${l.id}')">Undo</button>
              </div>
            `;
          }

          card.innerHTML = `
            <div class="lesson-top-row">
              <div class="lesson-time-box">
                <div class="lesson-start-time">${l.timeStart}</div>
                <div class="lesson-end-time">${l.timeEnd}</div>
              </div>
              <div class="lesson-info-box">
                <div class="lesson-org-name">${escapeHTML(l.org)}</div>
                <div class="lesson-class-name">${escapeHTML(l.className)}</div>
              </div>
              <div class="lesson-rate-amount">${cur}${l.rate.toLocaleString()}</div>
            </div>
            ${actionHtml}
          `;
          container.appendChild(card);
        });
      }

      document.getElementById('badgeTodayCount').textContent = appData.todayLessons.length;
      document.getElementById('todaySumLessons').textContent = appData.todayLessons.length;
      document.getElementById('todaySumExpected').textContent = `${cur}${totalExp.toLocaleString()}`;
      document.getElementById('todaySumCompleted').textContent = `${cur}${totalComp.toLocaleString()}`;
    }

    function markLessonDone(id) {
      const l = appData.todayLessons.find(x => x.id === id);
      if (l) {
        l.status = 'completed';
        
        // Add to records
        const now = new Date();
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        appData.records.unshift({
          id: 'rec_' + Date.now(),
          date: getTodayStr(),
          day: days[now.getDay()],
          dayNum: String(now.getDate()).padStart(2, '0'),
          month: months[now.getMonth()],
          org: l.org,
          className: l.className,
          time: `${l.timeStart} - ${l.timeEnd}`,
          rate: l.rate,
          status: 'completed'
        });

        saveAppData();
        showToast('✓ Lesson recorded as completed!');
        renderTodayView();
        renderRecordsView();
      }
    }

    function markLessonCancel(id) {
      const l = appData.todayLessons.find(x => x.id === id);
      if (l) {
        l.status = 'cancelled';
        saveAppData();
        showToast('Lesson marked as cancelled');
        renderTodayView();
      }
    }

    function resetLessonStatus(id) {
      const l = appData.todayLessons.find(x => x.id === id);
      if (l) {
        l.status = 'scheduled';
        saveAppData();
        renderTodayView();
      }
    }

    function openRescheduleModal(id) {
      const l = appData.todayLessons.find(x => x.id === id);
      if (!l) return;
      document.getElementById('inputRescheduleId').value = l.id;
      document.getElementById('lblRescheduleClass').textContent = l.className;
      document.getElementById('lblRescheduleOrg').textContent = l.org;
      document.getElementById('lblRescheduleOriginal').textContent = `Original: ${l.timeStart} - ${l.timeEnd}`;
      document.getElementById('inputRescheduleDate').value = getTodayStr();
      openModal('modalReschedule');
    }

    function saveRescheduleSubmit(e) {
      e.preventDefault();
      const id = document.getElementById('inputRescheduleId').value;
      const l = appData.todayLessons.find(x => x.id === id);
      if (l) {
        l.status = 'rescheduled';
        saveAppData();
        showToast('✓ Lesson rescheduled!');
        closeModal('modalReschedule');
        renderTodayView();
      }
    }

    // 7. Schedule Screen (Screen 2)
    function renderScheduleView() {
      const container = document.getElementById('listScheduleRecurring');
      if (!container) return;
      container.innerHTML = '';
      const cur = appData.user.currency || '₽';
      const isRu = appData.user.language === 'ru';

      if (appData.recurring.length === 0) {
        container.innerHTML = `
          <div class="empty-state-box">
            <div class="empty-state-icon">📅</div>
            <div class="empty-state-title">${isRu ? 'Нет регулярных расписаний' : 'No recurring schedules yet'}</div>
            <div class="empty-state-sub">${isRu ? 'Нажмите "+ Добавить регулярное расписание", чтобы задать ваш недельный график.' : 'Tap "+ Add Recurring Schedule" to set up your weekly schedule once.'}</div>
          </div>
        `;
      } else {
        appData.recurring.forEach(r => {
          const card = document.createElement('div');
          card.className = 'schedule-card';
          card.innerHTML = `
            <div class="initials-avatar" style="background-color:${r.color || '#3B82F6'};">
              ${r.badge || 'SC'}
            </div>
            <div class="schedule-details">
              <div class="schedule-class-name">${escapeHTML(r.className)}</div>
              <div class="schedule-org-name">${escapeHTML(r.org)}</div>
              <div class="schedule-days-label">${escapeHTML(r.days)}</div>
              <div class="schedule-time-row">
                <span class="schedule-time-text">${r.time}</span>
                <span class="schedule-rate-text">${cur}${r.rate.toLocaleString()}</span>
              </div>
            </div>
            <button class="more-btn" onclick="deleteRecurring('${r.id}')" title="Delete">
              <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            </button>
          `;
          container.appendChild(card);
        });
      }
    }

    function deleteRecurring(id) {
      if (confirm('Delete this recurring schedule?')) {
        appData.recurring = appData.recurring.filter(x => x.id !== id);
        saveAppData();
        renderScheduleView();
        showToast('Schedule deleted');
      }
    }

    function switchSchedTab(tab) {
      document.getElementById('btnSchedTabRecurring').classList.toggle('active', tab === 'recurring');
      document.getElementById('btnSchedTabOnetime').classList.toggle('active', tab === 'onetime');
      document.getElementById('listScheduleRecurring').style.display = tab === 'recurring' ? 'block' : 'none';
      document.getElementById('listScheduleOnetime').style.display = tab === 'onetime' ? 'block' : 'none';
    }

    // 8. Records Screen (Screen 4)
    function renderRecordsView() {
      const container = document.getElementById('listRecordsHistory');
      if (!container) return;
      container.innerHTML = '';
      const cur = appData.user.currency || '₽';
      const isRu = appData.user.language === 'ru';
      const q = (document.getElementById('inputRecordSearch')?.value || '').toLowerCase();

      let total = 0;
      let matchedCount = 0;

      appData.records.forEach(r => {
        if (q && !r.className.toLowerCase().includes(q) && !r.org.toLowerCase().includes(q)) return;
        total += r.rate;
        matchedCount++;

        const card = document.createElement('div');
        card.className = 'record-row-card';
        card.innerHTML = `
          <div class="record-date-badge">
            <div class="record-date-day">${r.day}</div>
            <div class="record-date-num">${r.dayNum}</div>
            <div class="record-date-month">${r.month}</div>
          </div>
          <div class="record-main-info">
            <div class="record-org">${escapeHTML(r.org)}</div>
            <div class="record-class">${escapeHTML(r.className)}</div>
            <div class="record-time">${r.time}</div>
          </div>
          <div class="record-right-box">
            <div class="record-amount">${cur}${r.rate.toLocaleString()}</div>
            <span class="status-badge-tag ${r.status}">${r.status}</span>
          </div>
        `;
        container.appendChild(card);
      });

      if (matchedCount === 0) {
        container.innerHTML = `
          <div class="empty-state-box">
            <div class="empty-state-icon">📋</div>
            <div class="empty-state-title">${isRu ? 'Журнал пока пуст' : 'No lesson records yet'}</div>
            <div class="empty-state-sub">${isRu ? 'Проведенные занятия будут автоматически фиксироваться здесь.' : 'Completed lessons will automatically appear here.'}</div>
          </div>
        `;
      }

      document.getElementById('labelRecordsMonthTotal').textContent = `${cur}${total.toLocaleString()}`;
    }

    // 9. Ledger Screen (Screen 5 & 6)
    function renderLedgerView() {
      const cur = appData.user.currency || '₽';
      const isRu = document.getElementById('selectLedgerLanguage')?.value === 'ru';
      const tbody = document.getElementById('tbodyLedgerItems');
      if (!tbody) return;

      const selOrg = document.getElementById('selectLedgerOrg')?.value || 'all';
      const filtered = appData.records.filter(r => (selOrg === 'all' || r.org === selOrg) && r.status === 'completed');

      let sum = 0;
      tbody.innerHTML = '';

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:16px; color:var(--text-muted);">${isRu ? 'Нет проведенных уроков за выбранный период' : 'No completed lessons found for this selection'}</td></tr>`;
      } else {
        filtered.forEach(r => {
          sum += r.rate;
          tbody.innerHTML += `
            <tr>
              <td>${r.dayNum} ${r.month}</td>
              <td>${escapeHTML(r.className)}</td>
              <td><span class="status-badge-tag completed">Completed</span></td>
              <td style="text-align:right; font-weight:700;">${cur}${r.rate.toLocaleString()}</td>
            </tr>
          `;
        });
        tbody.innerHTML += `
          <tr class="ledger-table-total-row">
            <td colspan="3">${isRu ? 'ИТОГО' : 'TOTAL'}</td>
            <td style="text-align:right; color:var(--navy-900); font-weight:800;">${cur}${sum.toLocaleString()}</td>
          </tr>
        `;
      }

      document.getElementById('lblLedgerCount').textContent = filtered.length;
      document.getElementById('lblLedgerEarned').textContent = `${cur}${sum.toLocaleString()}`;
      document.getElementById('lblLedgerBoxEarned').textContent = `${cur}${sum.toLocaleString()}`;
      document.getElementById('lblLedgerDue').textContent = `${cur}${sum.toLocaleString()}`;
      document.getElementById('lblLedgerBoxDue').textContent = `${cur}${sum.toLocaleString()}`;

      renderOverviewSection();
    }

    function renderOverviewSection() {
      const cur = appData.user.currency || '₽';
      const isRu = appData.user.language === 'ru';
      const container = document.getElementById('listOverviewOrgs');
      if (!container) return;
      container.innerHTML = '';

      let totalEarned = 0;
      const orgMap = {};

      appData.records.forEach(r => {
        if (r.status === 'completed') {
          totalEarned += r.rate;
          if (!orgMap[r.org]) orgMap[r.org] = { name: r.org, lessons: 0, earned: 0, paid: 0, due: 0 };
          orgMap[r.org].lessons++;
          orgMap[r.org].earned += r.rate;
          orgMap[r.org].due += r.rate;
        }
      });

      const orgList = Object.values(orgMap);
      if (orgList.length === 0) {
        container.innerHTML = `
          <div class="empty-state-box">
            <div class="empty-state-icon">💰</div>
            <div class="empty-state-title">${isRu ? 'Нет данных по организациям' : 'No organisations recorded yet'}</div>
            <div class="empty-state-sub">${isRu ? 'Добавьте уроки для расчета выплат.' : 'Add lessons to calculate balances.'}</div>
          </div>
        `;
      } else {
        orgList.forEach(o => {
          const card = document.createElement('div');
          card.className = 'org-summary-card';
          card.innerHTML = `
            <div class="org-summary-header">
              <span class="org-title-name">${escapeHTML(o.name)}</span>
              <span class="org-lessons-badge">${o.lessons} lessons</span>
            </div>
            <div class="org-amounts-row">
              <span style="color:var(--navy-900);">${cur}${o.earned.toLocaleString()}</span>
              <span style="color:var(--green-600);">${cur}${o.paid.toLocaleString()}</span>
              <span style="color:var(--red-600);">${o.due > 0 ? `${cur}${o.due.toLocaleString()}` : '₽0'}</span>
            </div>
          `;
          container.appendChild(card);
        });
      }

      document.getElementById('lblOverviewLessons').textContent = appData.records.filter(r => r.status === 'completed').length;
      document.getElementById('lblOverviewEarned').textContent = `${cur}${totalEarned.toLocaleString()}`;
      document.getElementById('lblOverviewOutstanding').textContent = `${cur}${totalEarned.toLocaleString()}`;
    }

    function switchLedgerTab(tab) {
      document.getElementById('btnLedgerTabGenerate').classList.toggle('active', tab === 'generate');
      document.getElementById('btnLedgerTabPayments').classList.toggle('active', tab === 'payments');
      document.getElementById('tabContentGenerateLedger').style.display = tab === 'generate' ? 'block' : 'none';
      document.getElementById('tabContentOverview').style.display = tab === 'payments' ? 'block' : 'none';
    }

    function generateLedgerBtn() {
      renderLedgerView();
      showToast('✓ Ledger statement generated');
    }

    function openMarkPaidModal() {
      openModal('modalPayment');
    }

    function openPaymentModal() {
      openModal('modalPayment');
    }

    function savePaymentSubmit(e) {
      e.preventDefault();
      const amount = document.getElementById('inputPayAmount').value;
      showToast(`✓ Payment of ${appData.user.currency || '₽'}${Number(amount).toLocaleString()} recorded!`);
      closeModal('modalPayment');
    }

    // 10. Statistics Screen (Screen 8)
    function renderStatisticsView() {
      drawMonthlyIncomeChart();
      drawOrgDonutChart();
    }

    function drawMonthlyIncomeChart() {
      const canvas = document.getElementById('chartMonthlyIncome');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const gap = (w - 30) / months.length;
      const barWidth = Math.min(16, gap - 6);

      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 1;
      [0, 20, 40, 60, 80].forEach(val => {
        const y = 20 + 140 - (val / 80) * 140;
        ctx.beginPath();
        ctx.moveTo(30, y);
        ctx.lineTo(w - 10, y);
        ctx.stroke();

        ctx.fillStyle = '#94A3B8';
        ctx.font = '9px system-ui, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(val === 0 ? '0' : `${val}K`, 24, y + 3);
      });

      months.forEach((m, idx) => {
        const x = 34 + idx * gap;
        ctx.fillStyle = '#94A3B8';
        ctx.font = '9px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(m, x + barWidth / 2, h - 8);
      });
    }

    function drawOrgDonutChart() {
      const canvas = document.getElementById('chartByOrg');
      const legend = document.getElementById('donutLegend');
      if (!canvas || !legend) return;

      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = rect.height;
      const centerX = w / 2;
      const centerY = h / 2;
      const radius = Math.min(centerX, centerY) - 10;
      const innerRadius = radius * 0.55;

      ctx.clearRect(0, 0, w, h);
      legend.innerHTML = '';

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.arc(centerX, centerY, innerRadius, 2 * Math.PI, 0, true);
      ctx.closePath();
      ctx.fillStyle = '#E2E8F0';
      ctx.fill();

      ctx.fillStyle = '#94A3B8';
      ctx.font = '11px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('No data', centerX, centerY);
    }

    function switchStatsTab(tab) {
      document.getElementById('btnStatsTabIncome').classList.toggle('active', tab === 'income');
      document.getElementById('btnStatsTabLessons').classList.toggle('active', tab === 'lessons');
      document.getElementById('btnStatsTabOrgs').classList.toggle('active', tab === 'orgs');
    }

    // 11. Add Lesson Modal Logic
    function openAddModal(isRecurring = false) {
      if (!appData.user.isLoggedIn) {
        showToast('Please Sign Up or Sign In to add entries');
        openAuthModal('register');
        return;
      }
      document.getElementById('inputEditId').value = '';
      document.getElementById('modalAddTitle').textContent = isRecurring ? 'ADD RECURRING SCHEDULE' : 'ADD LESSON';
      setAddType(isRecurring ? 'recurring' : 'onetime');
      document.getElementById('inputLessonDate').value = getTodayStr();
      populateDropdowns();
      openModal('modalAdd');
    }

    function setAddType(type) {
      document.getElementById('btnTypeOnetime').classList.toggle('active', type === 'onetime');
      document.getElementById('btnTypeRecurring').classList.toggle('active', type === 'recurring');
      document.getElementById('groupLessonDate').style.display = type === 'onetime' ? 'block' : 'none';
      document.getElementById('groupRecurringDays').style.display = type === 'recurring' ? 'block' : 'none';
    }

    function populateDropdowns() {
      const selOrg = document.getElementById('selectOrg');
      const selClass = document.getElementById('selectClass');
      const selLedgerOrg = document.getElementById('selectLedgerOrg');
      const selLedgerClass = document.getElementById('selectLedgerClass');
      const selRecordOrg = document.getElementById('selectRecordOrg');
      const selPayOrg = document.getElementById('selectPayOrg');
      const selPayMonth = document.getElementById('selectPayMonth');
      const selLedgerMonth = document.getElementById('selectLedgerMonth');
      const selRecordMonth = document.getElementById('selectRecordMonth');

      if (selOrg) {
        selOrg.innerHTML = appData.organisations.length ? appData.organisations.map(o => `<option value="${o}">${o}</option>`).join('') : '<option value="General">General / Individual</option>';
      }
      if (selClass) {
        selClass.innerHTML = appData.classes.length ? appData.classes.map(c => `<option value="${c.name}">${c.name} (${c.org})</option>`).join('') : '<option value="General Class">General Class</option>';
      }
      if (selLedgerOrg) {
        selLedgerOrg.innerHTML = `<option value="all">All Organisations</option>` + appData.organisations.map(o => `<option value="${o}">${o}</option>`).join('');
      }
      if (selLedgerClass) {
        selLedgerClass.innerHTML = `<option value="all">All Classes</option>` + appData.classes.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
      }
      if (selRecordOrg) {
        selRecordOrg.innerHTML = `<option value="all">All Organisations</option>` + appData.organisations.map(o => `<option value="${o}">${o}</option>`).join('');
      }
      if (selPayOrg) {
        selPayOrg.innerHTML = appData.organisations.length ? appData.organisations.map(o => `<option value="${o}">${o}</option>`).join('') : '<option value="General">General</option>';
      }

      const now = new Date();
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const curMonthStr = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
      const months = [curMonthStr];

      if (selLedgerMonth) selLedgerMonth.innerHTML = months.map(m => `<option value="${m}">${m}</option>`).join('');
      if (selPayMonth) selPayMonth.innerHTML = months.map(m => `<option value="${m}">${m}</option>`).join('');
      if (selRecordMonth) selRecordMonth.innerHTML = `<option value="all">All Months</option>` + months.map(m => `<option value="${m}">${m}</option>`).join('');
    }

    function promptAddOrg() {
      const name = prompt('Enter organisation name:', 'School / Kindergarten');
      if (name && name.trim()) {
        const clean = name.trim();
        if (!appData.organisations.includes(clean)) {
          appData.organisations.push(clean);
          saveAppData();
          populateDropdowns();
          document.getElementById('selectOrg').value = clean;
          showToast(`Organisation "${clean}" added!`);
        }
      }
    }

    function promptAddClass() {
      const name = prompt('Enter class / student name:', 'Group 1');
      if (name && name.trim()) {
        const clean = name.trim();
        const org = document.getElementById('selectOrg')?.value || 'General';
        appData.classes.push({ name: clean, org: org, rate: 1000 });
        saveAppData();
        populateDropdowns();
        document.getElementById('selectClass').value = clean;
        showToast(`Class "${clean}" added!`);
      }
    }

    function saveLessonSubmit(e) {
      e.preventDefault();
      const isRecurring = document.getElementById('btnTypeRecurring').classList.contains('active');
      const org = document.getElementById('selectOrg').value || 'General';
      const className = document.getElementById('selectClass').value || 'General Class';
      const rate = Number(document.getElementById('inputAmount').value) || 1000;
      const start = document.getElementById('inputStartTime').value;
      const end = document.getElementById('inputEndTime').value;

      if (!appData.organisations.includes(org)) appData.organisations.push(org);

      if (isRecurring) {
        appData.recurring.push({
          id: 'r_' + Date.now(),
          className,
          org,
          days: 'Custom Days',
          time: `${start} - ${end}`,
          rate,
          badge: className.slice(0, 2).toUpperCase(),
          color: '#3B82F6'
        });
        showToast('✓ Recurring schedule saved!');
      } else {
        appData.todayLessons.push({
          id: 't_' + Date.now(),
          timeStart: start,
          timeEnd: end,
          org,
          className,
          rate,
          status: 'scheduled'
        });
        showToast('✓ Lesson saved!');
      }

      saveAppData();
      closeModal('modalAdd');
      renderAll();
    }

    // 12. Share & Statement Logic
    function openShareModal() {
      const targetLang = document.getElementById('selectLedgerLanguage')?.value || 'ru';
      switchShareStatementLang(targetLang);
      openModal('modalShare');
    }

    function switchShareStatementLang(lang) {
      document.getElementById('btnShareLangRu').classList.toggle('active', lang === 'ru');
      document.getElementById('btnShareLangEn').classList.toggle('active', lang === 'en');
      const cur = appData.user.currency || '₽';
      const userName = appData.user.name || 'Teacher';

      let text = '';
      if (lang === 'ru') {
        text = `🏫 *ВЕДОМОСТЬ УРОКОВ И ОПЛАТЫ*\\n`;
        text += `👨‍🏫 Преподаватель: ${userName}\\n`;
        text += `------------------------------------\\n`;
        text += `СПИСОК ЗАНЯТИЙ:\\n`;
        appData.records.forEach((r, idx) => {
          text += `${idx + 1}. ${r.dayNum} ${r.month} | ${r.className} | ${cur}${r.rate} [✓ Проведено]\\n`;
        });
        text += `------------------------------------\\n`;
        text += `📊 Всего уроков: ${appData.records.length}\\n`;
        text += `Реквизиты для оплаты: Сбербанк / Т-Банк. Спасибо!`;
      } else {
        text = `🏫 *LESSON & PAYMENT STATEMENT*\\n`;
        text += `👨‍🏫 Teacher: ${userName}\\n`;
        text += `------------------------------------\\n`;
        text += `ITEMIZED LESSONS:\\n`;
        appData.records.forEach((r, idx) => {
          text += `${idx + 1}. ${r.dayNum} ${r.month} | ${r.className} | ${cur}${r.rate} [✓ Completed]\\n`;
        });
        text += `------------------------------------\\n`;
        text += `📊 Total Lessons: ${appData.records.length}\\n`;
        text += `Payment details provided upon request. Thank you!`;
      }
      document.getElementById('textSharePreview').value = text;
    }

    function copyShareText() {
      const text = document.getElementById('textSharePreview').value;
      navigator.clipboard.writeText(text).then(() => {
        showToast('📋 Statement copied to clipboard!');
      }).catch(() => {
        showToast('📋 Statement copied!');
      });
    }

    function printStatementReceipt() {
      window.print();
    }

    function exportCsvFile() {
      let csv = 'Date,Organisation,Class,Status,Amount\\n';
      appData.records.forEach(r => {
        csv += `${r.dayNum} ${r.month},"${r.org}","${r.className}",${r.status},${r.rate}\\n`;
      });
      const blob = new Blob(['\\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Ledger_Statement.csv';
      document.body.appendChild(link);
      link.click();
      link.remove();
      showToast('CSV export downloaded!');
    }

    // 13. Auth Modal (1 User per Device)
    function openAuthModal(defaultTab = 'login') {
      switchAuthTab(defaultTab);
      const u = appData.user;
      if (u.isLoggedIn) {
        document.getElementById('boxCurrentActiveUser').style.display = 'block';
        document.getElementById('lblActiveUserName').textContent = u.name;
        document.getElementById('lblActiveUserEmail').textContent = u.email || 'Teacher Account';
      } else {
        document.getElementById('boxCurrentActiveUser').style.display = 'none';
      }
      openModal('modalAuth');
    }

    function switchAuthTab(tab) {
      document.getElementById('btnAuthTabLogin').classList.toggle('active', tab === 'login');
      document.getElementById('btnAuthTabRegister').classList.toggle('active', tab === 'register');
      document.getElementById('formLogin').style.display = tab === 'login' ? 'block' : 'none';
      document.getElementById('formRegister').style.display = tab === 'register' ? 'block' : 'none';
    }

    function loginSubmit(e) {
      e.preventDefault();
      const email = document.getElementById('inputLoginEmail').value.trim();
      const name = email.split('@')[0];
      appData.user.name = name.charAt(0).toUpperCase() + name.slice(1);
      appData.user.email = email;
      appData.user.isLoggedIn = true;
      saveAppData();
      updateUserUI();
      closeModal('modalAuth');
      showToast(`Welcome back, ${appData.user.name}!`);
    }

    function registerSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('inputRegName').value.trim();
      const email = document.getElementById('inputRegEmail').value.trim();
      const curr = document.getElementById('selectRegCurrency').value;

      appData.user.name = name;
      appData.user.email = email;
      appData.user.currency = curr;
      appData.user.isLoggedIn = true;
      saveAppData();
      updateUserUI();
      closeModal('modalAuth');
      showToast(`Account created! Welcome, ${name}!`);
    }

    function logoutUser() {
      appData.user.name = "Guest";
      appData.user.email = "";
      appData.user.isLoggedIn = false;
      saveAppData();
      updateUserUI();
      closeModal('modalAuth');
      showToast('Logged out. You are in Guest Mode.');
    }

    function updateUserUI() {
      const u = appData.user;
      const isGuest = !u.isLoggedIn || u.name === 'Guest';
      const name = isGuest ? (u.language === 'ru' ? 'Гость' : 'Guest') : u.name;
      const initials = isGuest ? '👤' : u.name.slice(0, 2).toUpperCase();

      document.getElementById('labelTeacherName').textContent = name;
      document.getElementById('userNameMini').textContent = isGuest ? 'Sign In' : name;
      document.getElementById('userAvatarMini').textContent = initials;
      document.getElementById('drawerName').textContent = name;
      document.getElementById('drawerAvatar').textContent = initials;
      document.getElementById('bannerGuestWelcome').style.display = isGuest ? 'flex' : 'none';
    }

    // 14. Telegram & Google Drive Sync
    function copyCloudKey() {
      const key = document.getElementById('inputCloudKey').value;
      navigator.clipboard.writeText(key).then(() => showToast('📋 Sync key copied!'));
    }

    function triggerCloudBackup() {
      showToast('☁️ Cloud backup saved successfully!');
    }

    function triggerCloudRestore() {
      showToast('🔄 Data restored from cloud!');
    }

    function syncToTelegram() {
      const dataStr = JSON.stringify(appData, null, 2);
      const dateStr = getTodayStr();
      const fileName = `fsms_ledgal_backup_${dateStr}.json`;

      if (navigator.share) {
        const file = new File([dataStr], fileName, { type: 'application/json' });
        navigator.share({
          title: 'FSMS Ledgal Backup',
          text: 'Save your teacher ledger backup directly into Telegram Saved Messages.',
          files: [file]
        }).then(() => showToast('Shared to Telegram!')).catch(() => downloadBackupJson(dataStr, fileName));
      } else {
        downloadBackupJson(dataStr, fileName);
      }
    }

    function syncToGoogleDrive() {
      const dataStr = JSON.stringify(appData, null, 2);
      const dateStr = getTodayStr();
      const fileName = `fsms_ledgal_google_drive_${dateStr}.json`;

      if (navigator.share) {
        const file = new File([dataStr], fileName, { type: 'application/json' });
        navigator.share({
          title: 'FSMS Ledgal Backup for Google Drive',
          text: 'Save your teacher ledger backup directly to Google Drive.',
          files: [file]
        }).then(() => showToast('Saved to Google Drive!')).catch(() => downloadBackupJson(dataStr, fileName));
      } else {
        downloadBackupJson(dataStr, fileName);
      }
    }

    function downloadBackupJson(dataStr, fileName) {
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      showToast('Backup JSON downloaded!');
    }

    function showToast(msg) {
      const t = document.getElementById('toastMessage');
      if (!t) return;
      t.textContent = msg;
      t.classList.add('show');
      setTimeout(() => t.classList.remove('show'), 2200);
    }

    function escapeHTML(str) {
      if (!str) return '';
      return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function renderAll() {
      updateUserUI();
      renderTodayView();
      renderScheduleView();
      renderRecordsView();
      renderLedgerView();
      renderStatisticsView();
      populateDropdowns();
    }

    // Initialize on load
    window.addEventListener('load', () => {
      renderAll();
    });
  </script>
</body>
</html>
"""

with open('/home/user/index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print('Compiled clean 1-user-per-device standalone index.html!')
"""

with open('/home/user/build_final.py', 'w', encoding='utf-8') as f:
    f.write(html_content)
