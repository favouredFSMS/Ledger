// =========================================================
// FSMS Ledgal — Application Controller & UI Logic
// 1 User Per Device & Clean Guest Mode
// =========================================================

function safeEl(id) {
  return document.getElementById(id);
}

function safeText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function safeHTML(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function safeVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val;
}

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  try {
    checkInitialUserSetup();
    applyLanguageUI();
    setupNavigation();
    setupEventHandlers();
    setupAuthHandlers();
    populateOrgAndClassDropdowns();
    renderAllViews();
  } catch (err) {
    console.error('Init error:', err);
  }
}

function checkInitialUserSetup() {
  const auth = window.authManager;
  if (!auth) return;
  updateUserProfileUI();
}

function updateUserProfileUI() {
  const auth = window.authManager;
  if (!auth) return;
  const user = auth.getCurrentUser();
  const i18n = window.i18n;

  const avatarMini = safeEl('userAvatarMini');
  const nameMini = safeEl('userNameMini');
  const labelTeacher = safeEl('labelTeacherName');
  
  const drawerAvatar = safeEl('drawerAccountAvatar');
  const drawerName = safeEl('drawerAccountName');
  const drawerEmail = safeEl('drawerAccountEmail');
  const guestBanner = safeEl('bannerGuestWelcome');

  if (user) {
    const initials = user.initials || user.name.slice(0, 2).toUpperCase();
    if (avatarMini) {
      avatarMini.textContent = initials;
      avatarMini.style.backgroundColor = user.avatarColor || '#D4AF37';
      avatarMini.style.color = '#FFFFFF';
    }
    if (nameMini) nameMini.textContent = user.name.split(' ')[0];
    if (labelTeacher) labelTeacher.textContent = user.name;

    if (drawerAvatar) {
      drawerAvatar.textContent = initials;
      drawerAvatar.style.backgroundColor = user.avatarColor || '#3B82F6';
    }
    if (drawerName) drawerName.textContent = user.name;
    if (drawerEmail) drawerEmail.textContent = user.email;
    if (guestBanner) guestBanner.style.display = 'none';
  } else {
    if (avatarMini) {
      avatarMini.textContent = '👤';
      avatarMini.style.backgroundColor = '#64748B';
    }
    if (nameMini) nameMini.textContent = i18n ? i18n.t('tabLogin') : 'Sign In';
    const guestWord = i18n ? (i18n.getLang() === 'ru' ? 'Гость' : 'Guest') : 'Guest';
    if (labelTeacher) labelTeacher.textContent = guestWord;

    if (drawerAvatar) drawerAvatar.textContent = '👤';
    if (drawerName) drawerName.textContent = guestWord;
    if (drawerEmail) drawerEmail.textContent = i18n ? i18n.t('lblNoUser') : 'Tap to sign up / sign in';
    if (guestBanner) guestBanner.style.display = 'flex';
  }
}

function requireAuth(callback) {
  const auth = window.authManager;
  if (!auth || auth.isGuest()) {
    showToast(window.i18n ? window.i18n.t('authGateMsg') : 'Please sign up or sign in to continue');
    openAuthModal('register');
    return false;
  }
  if (typeof callback === 'function') callback();
  return true;
}
window.requireAuth = requireAuth;

function setAppLanguage(lang) {
  if (!window.i18n) return;
  window.i18n.setLang(lang);
  applyLanguageUI();
  populateOrgAndClassDropdowns();
  renderAllViews();
  showToast(lang === 'ru' ? 'Язык интерфейса: Русский' : 'Interface language: English');
}
window.setAppLanguage = setAppLanguage;

function switchShareLang(lang) {
  if (!window.i18n) return;
  window.i18n.setLedgerLang(lang);
  safeEl('btnShareLangRu')?.classList.toggle('active', lang === 'ru');
  safeEl('btnShareLangEn')?.classList.toggle('active', lang === 'en');
  updateShareModalContent();
}
window.switchShareLang = switchShareLang;

function applyLanguageUI() {
  const i18n = window.i18n;
  if (!i18n) return;
  const lang = i18n.getLang();

  // Guest Banner
  safeText('lblGuestBannerTitle', i18n.t('guestBannerTitle'));
  safeText('lblGuestBannerSub', i18n.t('guestBannerSub'));
  safeText('btnBannerSignUp', i18n.t('btnGuestSignUp'));
  safeText('btnBannerSignIn', i18n.t('btnGuestSignIn'));

  // Header language buttons
  safeEl('btnLangEn')?.classList.toggle('active', lang === 'en');
  safeEl('btnLangRu')?.classList.toggle('active', lang === 'ru');
  safeEl('btnDrawerLangEn')?.classList.toggle('active', lang === 'en');
  safeEl('btnDrawerLangRu')?.classList.toggle('active', lang === 'ru');

  // Subtitle
  safeText('hdrAppSub', i18n.t('appSubtitle'));

  // Greeting
  const hour = new Date().getHours();
  let greetKey = 'goodMorning';
  if (hour >= 12 && hour < 18) greetKey = 'goodAfternoon';
  if (hour >= 18 || hour < 5) greetKey = 'goodEvening';
  safeText('lblGreetingText', i18n.t(greetKey));

  // Bottom Navigation
  safeText('navLabelToday', i18n.t('tabToday'));
  safeText('navLabelSchedule', i18n.t('tabSchedule'));
  safeText('navLabelRecords', i18n.t('tabRecords'));
  safeText('navLabelLedger', i18n.t('tabLedger'));
  safeText('navLabelStats', i18n.t('tabStatistics'));

  // Today View
  safeText('lblTodaysLessonsHeader', i18n.t('todaysLessons'));
  safeText('lblTodaySummaryTitle', i18n.t('todaySummary'));
  safeText('lblSumLessonsCol', i18n.t('lessons'));
  safeText('lblSumExpectedCol', i18n.t('expected'));
  safeText('lblSumCompletedCol', i18n.t('completed'));

  // Schedule Tab
  safeText('btnSchedTabRecurring', i18n.t('segRecurring'));
  safeText('btnSchedTabOnetime', i18n.t('segOnetime'));
  safeText('lblBtnAddRecurring', i18n.t('btnAddScheduleTemplate'));

  // Records Search Placeholder
  const inputSearch = safeEl('inputRecordSearch');
  if (inputSearch) inputSearch.placeholder = i18n.t('searchPlaceholder');

  // Ledger Sub-Tabs & Labels
  safeText('btnLedgerTabGenerate', i18n.t('tabGenLedger'));
  safeText('btnLedgerTabPayments', i18n.t('tabOverviewPayments'));
  safeText('btnGenerateLedgerAction', i18n.t('btnGenerateLedger'));

  safeText('lblLedgerLanguageField', i18n.t('lblLedgerLang'));
  safeText('lblLedgerOrgField', i18n.t('lblOrganisation'));
  safeText('lblLedgerClassField', i18n.t('lblClassGroup'));
  safeText('lblLedgerMonthField', i18n.t('lblMonth'));
  safeText('lblLedgerStatusField', i18n.t('lblStatus'));

  safeText('btnLedgerMarkPaid', i18n.t('btnMarkAsPaid'));
  safeText('btnLedgerShare', i18n.t('btnShareLedger'));

  // Overview Labels
  safeText('lblOverviewHeaderTitle', i18n.t('overviewTitle'));
  safeText('lblOverviewSubLessons', i18n.t('statLessons'));
  safeText('lblOverviewSubEarned', i18n.t('statEarned'));
  safeText('lblOverviewSubPaid', i18n.t('statPaid'));
  safeText('lblOverviewSubDue', i18n.t('statDue'));
  safeText('lblByOrgTitle', i18n.t('byOrganisation'));
  safeText('btnRecordPaymentQuick', i18n.t('btnRecordPayment'));
  safeText('btnViewDetailedReport', i18n.t('btnViewDetailedReport'));

  // Statistics Labels
  safeText('btnStatsTabIncome', i18n.t('statsIncome'));
  safeText('btnStatsTabLessons', i18n.t('statsLessons'));
  safeText('btnStatsTabOrgs', i18n.t('statsOrgs'));
  safeHTML('lblChartIncomeTitle', `${i18n.t('statsMonthlyIncome')} (<span class="currency-sign">₽</span>)`);
  safeText('lblChartDonutTitle', i18n.t('statsByOrgMonth'));
  safeText('lblDebtBannerTitle', i18n.t('statsOutstandingDebt'));

  // Modals & Form Labels
  safeText('modalAddLessonTitle', i18n.t('addLessonTitle'));
  safeText('lblFormDate', i18n.t('lblDate'));
  safeText('lblFormTimeSlot', i18n.t('lblTimeSlot'));
  safeText('lblFormOrg', i18n.t('lblOrganisation'));
  safeText('lblFormClass', i18n.t('lblClassGroup'));
  safeHTML('lblFormAmount', `${i18n.t('lblAmount')} (<span class="currency-sign">₽</span>)`);
  safeText('lblFormNotes', i18n.t('lblNotes'));
  safeText('lblFormStatus', i18n.t('lblStatus'));
  safeText('btnSaveLessonSubmit', i18n.t('btnSaveLesson'));

  safeText('pillLabelCompleted', i18n.t('completed'));
  safeText('pillLabelCancelled', i18n.t('cancelled'));
  safeText('pillLabelRescheduled', i18n.t('rescheduled'));

  // Drawer menu items
  safeText('drawerAppSub', i18n.t('drawerSubtitle'));
  safeText('drawerItemToday', i18n.t('drawerItemToday'));
  safeText('drawerItemSchedule', i18n.t('drawerItemSchedule'));
  safeText('drawerItemRecords', i18n.t('drawerItemRecords'));
  safeText('drawerItemLedger', i18n.t('drawerItemLedger'));
  safeText('drawerItemStats', i18n.t('drawerItemStats'));
  safeText('drawerItemBackup', i18n.t('drawerItemBackup'));
  safeText('drawerItemClearData', i18n.t('drawerItemClearData'));
  safeText('drawerLangLabel', i18n.t('drawerLangLabel'));

  // Cloud Sync Modal
  safeText('drawerItemCloud', i18n.t('drawerItemCloudSync'));
  safeText('lblCloudModalTitle', i18n.t('cloudModalTitle'));
  safeText('lblCloudModalDesc', i18n.t('cloudModalDesc'));
  safeText('lblCloudKeyField', i18n.t('cloudSyncKeyLabel'));
  safeText('lblCloudKeyHelp', i18n.t('cloudSyncKeyHelp'));
  safeText('btnTriggerCloudBackup', i18n.t('btnBackupNow'));
  safeText('btnTriggerCloudRestore', i18n.t('btnRestoreCloud'));
  safeText('lblAutoSyncToggle', i18n.t('lblAutoSyncToggle'));
  safeText('lblLastSyncedPrefix', i18n.t('lblLastSynced'));
  safeText('lblBtnShareMessenger', i18n.t('btnShareToMessenger'));
  safeText('btnSaveCloudConfig', i18n.t('btnSaveCloudConfig'));

  // Auth Modal
  safeText('lblAuthModalTitle', i18n.t('authModalTitle'));
  safeText('btnAuthTabLogin', i18n.t('tabLogin'));
  safeText('btnAuthTabRegister', i18n.t('tabRegister'));
  safeText('lblLoginEmail', i18n.t('lblEmail'));
  safeText('lblLoginPassword', i18n.t('lblPassword'));
  safeText('btnLoginSubmit', i18n.t('btnLogin'));

  safeText('lblRegName', i18n.t('lblName'));
  safeText('lblRegEmail', i18n.t('lblEmail'));
  safeText('lblRegPassword', i18n.t('lblPassword'));
  safeText('lblRegCurrency', i18n.t('lblPreferredCurrency'));
  safeText('btnRegisterSubmit', i18n.t('btnRegister'));

  // Share Modal
  safeText('lblShareModalTitle', i18n.t('shareTitle'));
  safeText('lblShareModalDesc', i18n.t('shareDesc'));
  safeText('lblShareTextPreviewField', i18n.t('lblFormattedText'));
  safeText('btnCopyShareText', i18n.t('btnCopyText'));
  safeText('btnPrintReceipt', i18n.t('btnPrintPdf'));
  safeText('btnExportCsv', i18n.t('btnExportCsv'));

  updateUserProfileUI();
  updateCloudSyncTimestampDisplay();
}

function setupAuthHandlers() {
  const auth = window.authManager;
  const i18n = window.i18n;

  // Open Auth Modal
  safeEl('btnUserProfile')?.addEventListener('click', () => {
    openAuthModal(auth.isGuest() ? 'register' : 'login');
  });

  safeEl('drawerAccountCard')?.addEventListener('click', () => {
    openAuthModal(auth.isGuest() ? 'register' : 'login');
    closeDrawer();
  });

  // Guest Banner Buttons
  safeEl('btnBannerSignUp')?.addEventListener('click', () => openAuthModal('register'));
  safeEl('btnBannerSignIn')?.addEventListener('click', () => openAuthModal('login'));

  // Auth Tabs (Sign In vs Sign Up)
  const tabLogin = safeEl('btnAuthTabLogin');
  const tabRegister = safeEl('btnAuthTabRegister');
  const formLogin = safeEl('formLogin');
  const formRegister = safeEl('formRegister');

  if (tabLogin && tabRegister && formLogin && formRegister) {
    tabLogin.addEventListener('click', () => {
      tabLogin.classList.add('active');
      tabRegister.classList.remove('active');
      formLogin.style.display = 'block';
      formRegister.style.display = 'none';
    });

    tabRegister.addEventListener('click', () => {
      tabRegister.classList.add('active');
      tabLogin.classList.remove('active');
      formLogin.style.display = 'none';
      formRegister.style.display = 'block';
    });
  }

  // Login Form Submission
  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = safeEl('inputLoginEmail')?.value || '';
      const pass = safeEl('inputLoginPassword')?.value || '';

      try {
        const user = auth.login(email, pass);
        showToast(i18n.t('toastLoginSuccess', { name: user.name }));
        closeModal('modalAuth');
        updateUserProfileUI();
        populateOrgAndClassDropdowns();
        renderAllViews();
      } catch (err) {
        alert(err.message);
      }
    });
  }

  // Register Form Submission
  if (formRegister) {
    formRegister.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = safeEl('inputRegName')?.value || '';
      const email = safeEl('inputRegEmail')?.value || '';
      const pass = safeEl('inputRegPassword')?.value || '';
      const currency = safeEl('selectRegCurrency')?.value || '₽';

      try {
        const user = auth.register(name, email, pass, currency, i18n ? i18n.getLang() : 'en');
        showToast(i18n.t('toastRegisterSuccess', { name: user.name }));
        closeModal('modalAuth');
        updateUserProfileUI();
        populateOrgAndClassDropdowns();
        renderAllViews();
      } catch (err) {
        alert(err.message);
      }
    });
  }

  // Logout CTA
  safeEl('btnLogoutUser')?.addEventListener('click', () => {
    auth.logout();
    showToast(i18n.t('toastLogout'));
    closeModal('modalAuth');
    updateUserProfileUI();
    populateOrgAndClassDropdowns();
    renderAllViews();
  });
}

function openAuthModal(defaultTab = 'login') {
  const auth = window.authManager;
  if (!auth) return;
  const user = auth.getCurrentUser();
  const boxActive = safeEl('boxCurrentActiveUser');

  if (user && boxActive) {
    boxActive.style.display = 'block';
    safeText('lblActiveUserName', user.name);
    safeText('lblActiveUserEmail', user.email);
  } else if (boxActive) {
    boxActive.style.display = 'none';
  }

  if (defaultTab === 'register') {
    safeEl('btnAuthTabRegister')?.click();
  } else {
    safeEl('btnAuthTabLogin')?.click();
  }

  openModal('modalAuth');
}

function setupNavigation() {
  const navItems = document.querySelectorAll('.bottom-nav .nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-tab');
      if (targetId) switchTab(targetId);
    });
  });

  safeEl('btnLangEn')?.addEventListener('click', () => setAppLanguage('en'));
  safeEl('btnLangRu')?.addEventListener('click', () => setAppLanguage('ru'));

  const btnDrawer = safeEl('btnDrawerOpen');
  const drawer = safeEl('drawerMenu');
  if (btnDrawer && drawer) {
    btnDrawer.addEventListener('click', () => {
      drawer.classList.add('open');
    });
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) {
        drawer.classList.remove('open');
      }
    });
  }

  safeEl('btnAlerts')?.addEventListener('click', () => openUnconfirmedReviewModal());
  safeEl('btnReviewReminder')?.addEventListener('click', () => openUnconfirmedReviewModal());

  // Schedule segment buttons
  const btnSchedRecurring = safeEl('btnSchedTabRecurring');
  const btnSchedOnetime = safeEl('btnSchedTabOnetime');
  if (btnSchedRecurring && btnSchedOnetime) {
    btnSchedRecurring.addEventListener('click', () => {
      btnSchedRecurring.classList.add('active');
      btnSchedOnetime.classList.remove('active');
      safeEl('listScheduleRecurring').style.display = 'block';
      safeEl('listScheduleOnetime').style.display = 'none';
    });
    btnSchedOnetime.addEventListener('click', () => {
      btnSchedOnetime.classList.add('active');
      btnSchedRecurring.classList.remove('active');
      safeEl('listScheduleRecurring').style.display = 'none';
      safeEl('listScheduleOnetime').style.display = 'block';
      renderScheduleOneTime();
    });
  }

  // Ledger segment buttons
  const btnLedgerTabGen = safeEl('btnLedgerTabGenerate');
  const btnLedgerTabPay = safeEl('btnLedgerTabPayments');
  if (btnLedgerTabGen && btnLedgerTabPay) {
    btnLedgerTabGen.addEventListener('click', () => {
      btnLedgerTabGen.classList.add('active');
      btnLedgerTabPay.classList.remove('active');
      safeEl('tabContentGenerateLedger').style.display = 'block';
      safeEl('tabContentOverview').style.display = 'none';
    });
    btnLedgerTabPay.addEventListener('click', () => {
      btnLedgerTabPay.classList.add('active');
      btnLedgerTabGen.classList.remove('active');
      safeEl('tabContentGenerateLedger').style.display = 'none';
      safeEl('tabContentOverview').style.display = 'block';
      renderOverviewView();
    });
  }

  // Stats segment buttons
  const btnStatsIncome = safeEl('btnStatsTabIncome');
  const btnStatsLessons = safeEl('btnStatsTabLessons');
  const btnStatsOrgs = safeEl('btnStatsTabOrgs');
  if (btnStatsIncome && btnStatsLessons && btnStatsOrgs) {
    [btnStatsIncome, btnStatsLessons, btnStatsOrgs].forEach(btn => {
      btn.addEventListener('click', () => {
        [btnStatsIncome, btnStatsLessons, btnStatsOrgs].forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderStatisticsView();
      });
    });
  }

  // Close modals on overlay backdrop click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
      }
    });
  });
}

function switchTab(viewId) {
  document.querySelectorAll('.view-section').forEach(sec => {
    sec.classList.remove('active');
  });
  const targetView = safeEl(viewId);
  if (targetView) {
    targetView.classList.add('active');
  }

  document.querySelectorAll('.bottom-nav .nav-item').forEach(item => {
    if (item.getAttribute('data-tab') === viewId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  if (viewId === 'viewToday') renderTodayView();
  if (viewId === 'viewSchedule') renderScheduleView();
  if (viewId === 'viewRecords') renderRecordsView();
  if (viewId === 'viewLedger') renderLedgerView();
  if (viewId === 'viewStatistics') renderStatisticsView();
}

function closeDrawer() {
  safeEl('drawerMenu')?.classList.remove('open');
}

function renderAllViews() {
  renderTodayView();
  renderScheduleView();
  renderRecordsView();
  renderLedgerView();
  renderOverviewView();
  renderStatisticsView();
  checkUnconfirmedAlerts();
}

// ---------------------------------------------------------
// TAB 1: TODAY'S VIEW
// ---------------------------------------------------------
function renderTodayView() {
  const store = window.fsmsStore;
  const i18n = window.i18n;
  if (!store || !i18n) return;

  const currency = store.getCurrency();
  const todayDateStr = store.getCurrentDate();

  const d = new Date(todayDateStr + 'T00:00:00');
  const dayName = i18n.getDayName(d.getDay(), true);
  const monthName = i18n.getMonthName(String(d.getMonth() + 1), true);
  const formattedDate = `${dayName}, ${d.getDate()} ${monthName} ${d.getFullYear()}`;
  
  safeText('labelTodayDate', formattedDate);

  const lessons = store.getTodayLessons(todayDateStr);
  const container = safeEl('listTodayLessons');
  if (!container) return;

  container.innerHTML = '';

  if (lessons.length === 0) {
    container.innerHTML = `
      <div style="background:var(--card-bg); border-radius:var(--radius-lg); padding:28px 16px; text-align:center; border:1px dashed var(--card-border);">
        <div style="font-size:28px; margin-bottom:8px;">☕</div>
        <div style="font-weight:700; color:var(--navy-900);">${i18n.t('noLessonsToday')}</div>
        <div style="font-size:12px; color:var(--text-muted); margin-top:4px;">${i18n.t('enjoyFreeTime')}</div>
        <button class="btn-primary-block" style="width:auto; margin:14px auto 0 auto; padding:8px 16px; font-size:12px;" onclick="openAddLessonModal()">+ ${i18n.t('addLessonTitle')}</button>
      </div>
    `;
  } else {
    lessons.forEach(l => {
      const card = document.createElement('div');
      card.className = `lesson-card status-${l.status}`;

      let actionContent = '';
      if (l.status === 'scheduled') {
        actionContent = `
          <div class="lesson-actions-row">
            <button class="btn-action btn-done" onclick="handleMarkDone('${l.id}')">${i18n.t('btnDone')}</button>
            <button class="btn-action btn-cancel" onclick="handleMarkCancel('${l.id}')">${i18n.t('btnCancel')}</button>
            <button class="btn-action btn-reschedule" onclick="handleOpenReschedule('${l.id}')">${i18n.t('btnReschedule')}</button>
          </div>
        `;
      } else {
        const badgeClass = l.status;
        const badgeLabel = i18n.getStatusLabel(l.status);
        actionContent = `
          <div style="display:flex; align-items:center; justify-content:space-between; padding-top:10px; border-top:1px dashed var(--divider);">
            <span class="status-badge-tag ${badgeClass}">✓ ${badgeLabel}</span>
            <button class="btn-action" style="font-size:11px; color:var(--text-muted);" onclick="handleResetStatus('${l.id}')">${i18n.t('btnUndoReset')}</button>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="lesson-top-row">
          <div class="lesson-time-box">
            <div class="lesson-start-time">${l.startTime}</div>
            <div class="lesson-end-time">${l.endTime}</div>
          </div>
          <div class="lesson-info-box">
            <div class="lesson-org-name">${escapeHTML(l.orgName)}</div>
            <div class="lesson-class-name">${escapeHTML(l.className)}</div>
            ${l.notes ? `<div style="font-size:11px; color:var(--text-muted); margin-top:2px;">📝 ${escapeHTML(l.notes)}</div>` : ''}
          </div>
          <div class="lesson-rate-box">
            <div class="lesson-rate-amount">${currency}${Number(l.rate).toLocaleString()}</div>
          </div>
        </div>
        ${actionContent}
      `;
      container.appendChild(card);
    });
  }

  const summary = store.getTodaySummary(todayDateStr);
  safeText('badgeTodayCount', summary.totalCount);
  safeText('todaySumLessons', summary.totalCount);
  safeText('todaySumExpected', `${currency}${summary.expectedSum.toLocaleString()}`);
  safeText('todaySumCompleted', `${currency}${summary.completedSum.toLocaleString()}`);
}

window.handleMarkDone = function(id) {
  if (!requireAuth(() => window.handleMarkDone(id))) return;
  window.fsmsStore.markLessonDone(id);
  showToast(window.i18n.t('toastDone'));
  renderTodayView();
  renderRecordsView();
  renderLedgerView();
  renderOverviewView();
  renderStatisticsView();
  window.cloudSync?.triggerAutoSync();
};

window.handleMarkCancel = function(id) {
  const promptText = window.i18n.getLang() === 'ru' ? 'Причина отмены (необязательно):' : 'Reason for cancellation (optional):';
  const defaultReason = window.i18n.getLang() === 'ru' ? 'Отменено клиентом' : 'Cancelled upon request';
  const reason = prompt(promptText, defaultReason);
  window.fsmsStore.markLessonCancelled(id, reason || 'Cancelled');
  showToast(window.i18n.t('toastCancelled'));
  renderTodayView();
  renderRecordsView();
  renderLedgerView();
  window.cloudSync?.triggerAutoSync();
};

window.handleResetStatus = function(id) {
  window.fsmsStore.markLessonStatus(id, 'scheduled');
  showToast(window.i18n.t('toastReset'));
  renderTodayView();
  renderRecordsView();
  renderLedgerView();
};

window.handleOpenReschedule = function(id) {
  if (!requireAuth(() => window.handleOpenReschedule(id))) return;
  const lesson = window.fsmsStore.getLessons().find(l => l.id === id);
  if (!lesson) return;

  safeVal('inputRescheduleLessonId', lesson.id);
  safeText('lblRescheduleClass', lesson.className);
  safeText('lblRescheduleOrg', lesson.orgName);
  safeText('lblRescheduleOriginal', `Original: ${lesson.date}, ${lesson.startTime} - ${lesson.endTime}`);
  
  const dateObj = new Date(lesson.date + 'T00:00:00');
  dateObj.setDate(dateObj.getDate() + 7);
  const nextWeekStr = dateObj.toISOString().split('T')[0];
  
  safeVal('inputRescheduleNewDate', nextWeekStr);
  safeVal('inputRescheduleNewStart', lesson.startTime);
  safeVal('inputRescheduleNewEnd', lesson.endTime);
  safeVal('inputRescheduleReason', '');

  openModal('modalReschedule');
};

// ---------------------------------------------------------
// TAB 2: SCHEDULE VIEW
// ---------------------------------------------------------
function renderScheduleView() {
  const store = window.fsmsStore;
  const i18n = window.i18n;
  if (!store || !i18n) return;

  const currency = store.getCurrency();
  const recurring = store.getRecurringSchedules();
  const container = safeEl('listScheduleRecurring');
  if (!container) return;

  container.innerHTML = '';

  if (recurring.length === 0) {
    container.innerHTML = `
      <div style="background:var(--card-bg); border-radius:var(--radius-lg); padding:28px 16px; text-align:center; border:1px dashed var(--card-border);">
        <div style="font-size:26px; margin-bottom:6px;">📅</div>
        <div style="font-weight:700; color:var(--navy-900);">${i18n.t('noRecurringSchedules')}</div>
        <div style="font-size:12px; color:var(--text-muted); margin-top:4px;">${i18n.t('noRecurringSub')}</div>
      </div>
    `;
    return;
  }

  recurring.forEach(item => {
    const card = document.createElement('div');
    card.className = 'schedule-card';

    let daysDisplay = item.daysLabel;
    if (item.days && item.days.length > 0) {
      const dayNames = item.days.map(d => i18n.getDayName(d, false)).join(', ');
      daysDisplay = i18n.getLang() === 'ru' ? `Каждый: ${dayNames}` : `Every: ${dayNames}`;
    }

    card.innerHTML = `
      <div class="initials-avatar" style="background-color:${item.badgeColor || '#3B82F6'};">
        ${escapeHTML(item.badge || 'SC')}
      </div>
      <div class="schedule-details">
        <div class="schedule-class-name">${escapeHTML(item.className)}</div>
        <div class="schedule-org-name">${escapeHTML(item.orgName)}</div>
        <div class="schedule-days-label">${escapeHTML(daysDisplay)}</div>
        <div class="schedule-time-row">
          <span class="schedule-time-text">${item.startTime} - ${item.endTime}</span>
          <span class="schedule-rate-text">${currency}${Number(item.rate).toLocaleString()}</span>
        </div>
      </div>
      <button class="more-btn" onclick="handleDeleteSchedule('${item.id}')" title="Delete Schedule">
        <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
      </button>
    `;
    container.appendChild(card);
  });
}

function renderScheduleOneTime() {
  const store = window.fsmsStore;
  const i18n = window.i18n;
  if (!store || !i18n) return;

  const currency = store.getCurrency();
  const today = store.getCurrentDate();
  const upcoming = store.getLessons().filter(l => l.date >= today && l.status === 'scheduled');
  const container = safeEl('listScheduleOnetime');
  if (!container) return;

  container.innerHTML = '';
  if (upcoming.length === 0) {
    container.innerHTML = `
      <div style="background:var(--card-bg); border-radius:var(--radius-lg); padding:24px 16px; text-align:center; border:1px dashed var(--card-border);">
        <div style="font-size:24px; margin-bottom:6px;">📅</div>
        <div style="font-weight:700; color:var(--navy-900);">${i18n.t('noOnetimeLessons')}</div>
        <div style="font-size:12px; color:var(--text-muted); margin-top:4px;">${i18n.t('onetimeSub')}</div>
      </div>
    `;
    return;
  }

  upcoming.forEach(l => {
    const card = document.createElement('div');
    card.className = 'record-row-card';
    card.innerHTML = `
      <div class="record-date-badge">
        <div class="record-date-num">${l.date.split('-')[2]}</div>
        <div class="record-date-month">${i18n.getMonthName(l.date.split('-')[1], false)}</div>
      </div>
      <div class="record-main-info">
        <div class="record-org">${escapeHTML(l.orgName)}</div>
        <div class="record-class">${escapeHTML(l.className)}</div>
        <div class="record-time">${l.startTime} - ${l.endTime}</div>
      </div>
      <div class="record-right-box">
        <div class="record-amount">${currency}${Number(l.rate).toLocaleString()}</div>
        <span class="status-badge-tag scheduled">${i18n.t('scheduled')}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

window.handleDeleteSchedule = function(id) {
  const confirmMsg = window.i18n.getLang() === 'ru' ? 'Удалить это регулярное расписание?' : 'Delete this recurring schedule rule?';
  if (confirm(confirmMsg)) {
    window.fsmsStore.deleteRecurringSchedule(id);
    showToast('Schedule deleted');
    renderScheduleView();
  }
};

// ---------------------------------------------------------
// TAB 3: RECORDS VIEW
// ---------------------------------------------------------
function renderRecordsView() {
  const store = window.fsmsStore;
  const i18n = window.i18n;
  if (!store || !i18n) return;

  const currency = store.getCurrency();
  const searchInput = safeEl('inputRecordSearch');
  const monthSelect = safeEl('selectRecordMonth');
  const orgSelect = safeEl('selectRecordOrg');
  
  const query = searchInput ? searchInput.value.trim() : '';
  const month = monthSelect ? monthSelect.value : 'all';
  const org = orgSelect ? orgSelect.value : 'all';

  const filter = {
    search: query,
    month: month === 'all' ? null : month,
    orgName: org
  };

  const records = store.getLessons(filter);
  const container = safeEl('listRecordsHistory');
  if (!container) return;

  container.innerHTML = '';

  let totalEarned = 0;
  records.forEach(r => {
    if (r.status === 'completed') {
      totalEarned += Number(r.rate) || 0;
    }
  });

  safeText('labelRecordsMonthTitle', (month === 'all' || !month) ? i18n.t('allTime') : `${month.split('-')[0]}: ${i18n.getMonthName(month.split('-')[1], true)}`);
  safeText('labelRecordsMonthTotal', `${currency}${totalEarned.toLocaleString()}`);

  if (records.length === 0) {
    container.innerHTML = `
      <div style="background:var(--card-bg); border-radius:var(--radius-lg); padding:30px 16px; text-align:center; border:1px dashed var(--card-border);">
        <div style="font-size:26px; margin-bottom:6px;">📋</div>
        <div style="font-weight:700; color:var(--navy-900);">${i18n.t('noRecordsMatch')}</div>
        <div style="font-size:12px; color:var(--text-muted); margin-top:4px;">${i18n.t('changeFilterTip')}</div>
      </div>
    `;
    return;
  }

  records.forEach(r => {
    const card = document.createElement('div');
    card.className = 'record-row-card';

    const d = new Date(r.date + 'T00:00:00');
    const dayOfWeek = i18n.getDayName(d.getDay(), false);
    const dayNum = String(d.getDate()).padStart(2, '0');
    const monthAbbr = i18n.getMonthName(String(d.getMonth() + 1).padStart(2, '0'), false);

    const statusBadgeClass = r.status;
    const statusLabel = i18n.getStatusLabel(r.status);

    card.innerHTML = `
      <div class="record-date-badge">
        <div class="record-date-day">${dayOfWeek}</div>
        <div class="record-date-num">${dayNum}</div>
        <div class="record-date-month">${monthAbbr}</div>
      </div>
      <div class="record-main-info">
        <div class="record-org">${escapeHTML(r.orgName)}</div>
        <div class="record-class">${escapeHTML(r.className)}</div>
        <div class="record-time">${r.startTime} - ${r.endTime}</div>
      </div>
      <div class="record-right-box">
        <div class="record-amount">${currency}${Number(r.rate).toLocaleString()}</div>
        <span class="status-badge-tag ${statusBadgeClass}">${statusLabel}</span>
      </div>
    `;

    card.addEventListener('click', () => {
      openEditLessonModal(r);
    });

    container.appendChild(card);
  });
}

// ---------------------------------------------------------
// TAB 4: LEDGER VIEW (GENERATOR & OVERVIEW)
// ---------------------------------------------------------
function renderLedgerView() {
  const store = window.fsmsStore;
  const i18n = window.i18n;
  if (!store || !i18n) return;

  const currency = store.getCurrency();
  const orgSelect = safeEl('selectLedgerOrg');
  const classSelect = safeEl('selectLedgerClass');
  const monthSelect = safeEl('selectLedgerMonth');
  const statusSelect = safeEl('selectLedgerStatus');
  const langSelect = safeEl('selectLedgerLanguage');

  const org = orgSelect ? orgSelect.value : 'all';
  const cls = classSelect ? classSelect.value : 'all';
  const month = monthSelect ? monthSelect.value : getTodayISODate().slice(0, 7);
  const status = statusSelect ? statusSelect.value : 'completed';
  const targetLedgerLang = langSelect ? langSelect.value : (i18n.getLedgerLang() || 'ru');

  i18n.setLedgerLang(targetLedgerLang);

  const report = store.getLedgerReport(month, org, cls, status);

  let orgDisplay = report.orgName;
  if (targetLedgerLang === 'ru' && (report.orgName === 'All Organisations' || report.orgName === 'all')) {
    orgDisplay = 'ВСЕ ОРГАНИЗАЦИИ';
  } else {
    orgDisplay = report.orgName.toUpperCase();
  }

  safeText('lblLedgerOrgHeader', orgDisplay);
  safeText('lblLedgerMonthHeader', `${i18n.getMonthName(month.split('-')[1], true, targetLedgerLang)} ${month.split('-')[0]}`);

  safeText('lblLedgerStatLessons', i18n.t('statLessons', {}, targetLedgerLang));
  safeText('lblLedgerStatEarned', i18n.t('statEarned', {}, targetLedgerLang));
  safeText('lblLedgerStatPaid', i18n.t('statPaid', {}, targetLedgerLang));
  safeText('lblLedgerStatDue', i18n.t('statDue', {}, targetLedgerLang));

  safeText('lblLedgerCount', report.lessonsCount);
  safeText('lblLedgerEarned', `${currency}${report.totalEarned.toLocaleString()}`);
  safeText('lblLedgerPaid', `${currency}${report.totalPaid.toLocaleString()}`);
  safeText('lblLedgerDue', `${currency}${report.outstanding.toLocaleString()}`);

  safeText('thLedgerDate', i18n.t('tableDate', {}, targetLedgerLang));
  safeText('thLedgerClass', i18n.t('tableClass', {}, targetLedgerLang));
  safeText('thLedgerStatus', i18n.t('tableStatus', {}, targetLedgerLang));
  safeText('thLedgerAmount', i18n.t('tableAmount', {}, targetLedgerLang));

  const tbody = safeEl('tbodyLedgerItems');
  if (tbody) {
    tbody.innerHTML = '';
    if (report.lessons.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted); padding:16px;">${i18n.t('noLessonsFound', {}, targetLedgerLang)}</td></tr>`;
    } else {
      report.lessons.forEach(l => {
        const tr = document.createElement('tr');
        const d = new Date(l.date + 'T00:00:00');
        const formattedDate = `${String(d.getDate()).padStart(2, '0')} ${i18n.getMonthName(String(d.getMonth()+1).padStart(2, '0'), false, targetLedgerLang)}`;
        const statusText = i18n.getStatusLabel(l.status, targetLedgerLang);

        tr.innerHTML = `
          <td>${formattedDate}</td>
          <td>${escapeHTML(l.className)}</td>
          <td><span class="status-badge-tag ${l.status}" style="font-size:10px; padding:2px 6px;">${statusText}</span></td>
          <td style="text-align:right; font-weight:700;">${currency}${Number(l.rate).toLocaleString()}</td>
        `;
        tbody.appendChild(tr);
      });

      const totalTr = document.createElement('tr');
      totalTr.className = 'ledger-table-total-row';
      totalTr.innerHTML = `
        <td colspan="3">${i18n.t('tableTotal', {}, targetLedgerLang)}</td>
        <td style="text-align:right; font-weight:800; color:var(--navy-900);">${currency}${report.totalEarned.toLocaleString()}</td>
      `;
      tbody.appendChild(totalTr);
    }
  }

  safeText('lblLedgerRowEarned', i18n.t('boxAmountEarned', {}, targetLedgerLang));
  safeText('lblLedgerRowPaid', i18n.t('boxPaid', {}, targetLedgerLang));
  safeText('lblLedgerRowDue', i18n.t('boxOutstanding', {}, targetLedgerLang));

  safeText('lblLedgerBoxEarned', `${currency}${report.totalEarned.toLocaleString()}`);
  safeText('lblLedgerBoxPaid', `${currency}${report.totalPaid.toLocaleString()}`);
  safeText('lblLedgerBoxDue', `${currency}${report.outstanding.toLocaleString()}`);
}

function renderOverviewView() {
  const store = window.fsmsStore;
  const i18n = window.i18n;
  if (!store || !i18n) return;

  const currency = store.getCurrency();
  const currentMonth = getTodayISODate().slice(0, 7);
  const overview = store.getMonthlyOverview(currentMonth);

  safeText('lblOverviewMonth', `${i18n.getMonthName(currentMonth.split('-')[1], true)} ${currentMonth.split('-')[0]}`);
  safeText('lblOverviewLessons', overview.totalLessons);
  safeText('lblOverviewEarned', `${currency}${overview.totalEarned.toLocaleString()}`);
  safeText('lblOverviewPaid', `${currency}${overview.totalPaid.toLocaleString()}`);
  safeText('lblOverviewOutstanding', `${currency}${overview.outstanding.toLocaleString()}`);

  const container = safeEl('listOverviewOrgs');
  if (!container) return;

  container.innerHTML = '';
  if (overview.byOrganisation.length === 0) {
    container.innerHTML = `
      <div style="background:var(--card-bg); border-radius:var(--radius-lg); padding:20px 14px; text-align:center; color:var(--text-muted); font-size:12px;">
        ${i18n.t('noOrgsYet')}
      </div>
    `;
    return;
  }

  overview.byOrganisation.forEach(org => {
    const card = document.createElement('div');
    card.className = 'org-summary-card';
    
    card.innerHTML = `
      <div class="org-summary-header">
        <span class="org-title-name">${escapeHTML(org.name)}</span>
        <span class="org-lessons-badge">${org.lessons} ${i18n.t('lessonsCountSuffix')}</span>
      </div>
      <div class="org-amounts-row">
        <span class="amount-earned-text">${currency}${org.earned.toLocaleString()}</span>
        <span class="amount-paid-text">${currency}${org.paid.toLocaleString()}</span>
        <span class="amount-due-text">${org.due > 0 ? `${currency}${org.due.toLocaleString()}` : '₽0'}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// ---------------------------------------------------------
// TAB 5: STATISTICS & CHARTS
// ---------------------------------------------------------
function renderStatisticsView() {
  const store = window.fsmsStore;
  const i18n = window.i18n;
  if (!store || !i18n) return;

  const currency = store.getCurrency();
  const year = safeEl('selectStatsYear')?.value || String(new Date().getFullYear());
  const stats = store.getStatistics(year);

  safeText('lblStatsMonthEarned', `${currency}${stats.currentMonthEarned.toLocaleString()}`);
  safeText('lblStatsDebtTotal', `${currency}${stats.currentMonthOutstanding.toLocaleString()}`);
  safeText('lblStatsDebtSubtitle', i18n.t('statsFromOrgs', { n: stats.debtorsCount, s: stats.debtorsCount === 1 ? '' : 's' }));

  drawMonthlyBarChart(stats.monthlyData, currency);
  drawDonutChart(stats.orgShares);
}

function drawMonthlyBarChart(data, currency) {
  const canvas = safeEl('chartMonthlyIncome');
  const i18n = window.i18n;
  if (!canvas || !canvas.parentElement) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;
  ctx.clearRect(0, 0, w, h);

  let maxVal = 5000;
  data.forEach(d => {
    if (d.earned > maxVal) maxVal = d.earned * 1.2;
  });

  const paddingBottom = 26;
  const paddingTop = 24;
  const chartHeight = h - paddingBottom - paddingTop;
  const barWidth = Math.min(16, (w - 40) / data.length - 8);
  const gap = (w - 30) / data.length;

  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1;
  [0, 0.25, 0.5, 0.75, 1].forEach(step => {
    const val = maxVal * step;
    const y = paddingTop + chartHeight - (val / maxVal) * chartHeight;
    ctx.beginPath();
    ctx.moveTo(30, y);
    ctx.lineTo(w - 10, y);
    ctx.stroke();

    ctx.fillStyle = '#94A3B8';
    ctx.font = '9px system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(val === 0 ? '0' : (val >= 1000 ? `${Math.round(val/1000)}K` : Math.round(val)), 24, y + 3);
  });

  const curMonthIdx = new Date().getMonth();

  data.forEach((item, index) => {
    const x = 36 + index * gap;
    const barHeight = (item.earned / maxVal) * chartHeight;
    const y = paddingTop + chartHeight - barHeight;
    const monthNum = String(index + 1).padStart(2, '0');
    const localizedMonthAbbr = i18n.getMonthName(monthNum, false);
    const isCurrent = index === curMonthIdx;

    if (item.earned > 0) {
      const gradient = ctx.createLinearGradient(0, y, 0, paddingTop + chartHeight);
      if (isCurrent) {
        gradient.addColorStop(0, '#D4AF37');
        gradient.addColorStop(1, '#102A45');
      } else {
        gradient.addColorStop(0, '#3B82F6');
        gradient.addColorStop(1, '#0B192C');
      }

      ctx.fillStyle = gradient;
      const radius = 3;
      ctx.beginPath();
      ctx.moveTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.lineTo(x + barWidth - radius, y);
      ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
      ctx.lineTo(x + barWidth, paddingTop + chartHeight);
      ctx.lineTo(x, paddingTop + chartHeight);
      ctx.closePath();
      ctx.fill();

      if (barHeight > 15) {
        ctx.fillStyle = isCurrent ? '#B89225' : '#475569';
        ctx.font = 'bold 8.5px system-ui, sans-serif';
        ctx.textAlign = 'center';
        const kVal = item.earned >= 1000 ? Math.round(item.earned / 1000) + 'K' : item.earned;
        ctx.fillText(kVal, x + barWidth / 2, y - 4);
      }
    }

    ctx.fillStyle = isCurrent ? '#0B192C' : '#94A3B8';
    ctx.font = isCurrent ? 'bold 10px system-ui, sans-serif' : '9px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(localizedMonthAbbr, x + barWidth / 2, h - 8);
  });
}

function drawDonutChart(orgShares) {
  const canvas = safeEl('chartByOrg');
  const legend = safeEl('donutLegend');
  if (!canvas || !canvas.parentElement || !legend) return;

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

  if (!orgShares || orgShares.length === 0) {
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
    return;
  }

  const colors = ['#0B2545', '#8B5CF6', '#D4AF37', '#10B981', '#EC4899', '#06B6D4'];
  let currentAngle = -Math.PI / 2;

  orgShares.forEach((item, i) => {
    const sliceAngle = (item.percentage / 100) * 2 * Math.PI;
    const color = colors[i % colors.length];

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
    ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();

    currentAngle += sliceAngle;

    const legendItem = document.createElement('div');
    legendItem.className = 'legend-item';
    legendItem.innerHTML = `
      <span class="legend-color-dot" style="background:${color}"></span>
      <span style="flex:1;">${escapeHTML(item.name)}</span>
      <span style="font-weight:700;">${item.percentage}%</span>
    `;
    legend.appendChild(legendItem);
  });
}

function checkUnconfirmedAlerts() {
  const store = window.fsmsStore;
  const i18n = window.i18n;
  if (!store || !i18n) return;

  const unconfirmed = store.getUnconfirmedLessons();
  const badge = safeEl('badgeUnconfirmed');
  const banner = safeEl('bannerReminder');
  const reminderText = safeEl('reminderText');

  if (unconfirmed.length > 0) {
    if (badge) {
      badge.textContent = unconfirmed.length;
      badge.style.display = 'flex';
    }
    if (banner) {
      banner.style.display = 'flex';
      if (reminderText) {
        reminderText.textContent = unconfirmed.length === 1
          ? i18n.t('unconfirmedAlertSingular')
          : i18n.t('unconfirmedAlertPlural', { n: unconfirmed.length });
      }
    }
  } else {
    if (badge) badge.style.display = 'none';
    if (banner) banner.style.display = 'none';
  }
}

function openUnconfirmedReviewModal() {
  const store = window.fsmsStore;
  const i18n = window.i18n;
  if (!store || !i18n) return;

  const currency = store.getCurrency();
  const unconfirmed = store.getUnconfirmedLessons();
  const container = safeEl('listUnconfirmedItems');
  if (!container) return;

  container.innerHTML = '';
  if (unconfirmed.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:20px; color:var(--text-muted);">
        ${i18n.t('allConfirmedMsg')}
      </div>
    `;
    const btnConfirm = safeEl('btnConfirmAllUnconfirmed');
    if (btnConfirm) btnConfirm.style.display = 'none';
  } else {
    const btnConfirm = safeEl('btnConfirmAllUnconfirmed');
    if (btnConfirm) btnConfirm.style.display = 'block';

    unconfirmed.forEach(l => {
      const item = document.createElement('div');
      item.style.cssText = 'background:#F8FAFC; border:1px solid var(--card-border); border-radius:var(--radius-md); padding:10px 12px; margin-bottom:8px; display:flex; align-items:center; justify-content:space-between;';
      
      item.innerHTML = `
        <div>
          <div style="font-weight:700; color:var(--navy-900); font-size:13px;">${escapeHTML(l.className)} • ${escapeHTML(l.orgName)}</div>
          <div style="font-size:11px; color:var(--text-muted);">${l.date}, ${l.startTime} - ${l.endTime} (${currency}${l.rate})</div>
        </div>
        <div style="display:flex; gap:6px;">
          <button class="btn-action btn-done" style="padding:4px 8px; font-size:10px;" onclick="handleConfirmSingle('${l.id}')">✓ Done</button>
          <button class="btn-action btn-cancel" style="padding:4px 8px; font-size:10px;" onclick="handleCancelSingle('${l.id}')">✕</button>
        </div>
      `;
      container.appendChild(item);
    });
  }

  openModal('modalUnconfirmedReview');
}

window.handleConfirmSingle = function(id) {
  window.fsmsStore.markLessonDone(id);
  showToast(window.i18n.t('toastDone'));
  openUnconfirmedReviewModal();
  renderAllViews();
};

window.handleCancelSingle = function(id) {
  window.fsmsStore.markLessonCancelled(id, 'Cancelled');
  showToast(window.i18n.t('toastCancelled'));
  openUnconfirmedReviewModal();
  renderAllViews();
};

function setupEventHandlers() {
  const store = window.fsmsStore;
  const i18n = window.i18n;

  // Floating Action Button (FAB)
  safeEl('btnFabAdd')?.addEventListener('click', () => {
    openAddLessonModal();
  });

  // Add Recurring Template CTA
  safeEl('btnAddScheduleTemplate')?.addEventListener('click', () => {
    openAddLessonModal(true);
  });

  // Segment toggle in Add Lesson form
  const btnLessonTypeOnetime = safeEl('btnLessonTypeOnetime');
  const btnLessonTypeRecurring = safeEl('btnLessonTypeRecurring');
  const groupLessonDate = safeEl('groupLessonDate');
  const groupRecurringDays = safeEl('groupRecurringDays');

  if (btnLessonTypeOnetime && btnLessonTypeRecurring) {
    btnLessonTypeOnetime.addEventListener('click', () => {
      btnLessonTypeOnetime.classList.add('active');
      btnLessonTypeRecurring.classList.remove('active');
      if (groupLessonDate) groupLessonDate.style.display = 'block';
      if (groupRecurringDays) groupRecurringDays.style.display = 'none';
    });

    btnLessonTypeRecurring.addEventListener('click', () => {
      btnLessonTypeRecurring.classList.add('active');
      btnLessonTypeOnetime.classList.remove('active');
      if (groupLessonDate) groupLessonDate.style.display = 'none';
      if (groupRecurringDays) groupRecurringDays.style.display = 'block';
    });
  }

  // Add / Edit Lesson Form Submission
  const formAddLesson = safeEl('formAddLesson');
  if (formAddLesson) {
    formAddLesson.addEventListener('submit', (e) => {
      e.preventDefault();
      const editId = safeEl('inputLessonEditId')?.value || '';
      const isRecurring = btnLessonTypeRecurring?.classList.contains('active');
      const startTime = safeEl('inputLessonStartTime')?.value || '09:00';
      const endTime = safeEl('inputLessonEndTime')?.value || '10:00';
      const orgName = safeEl('selectLessonOrg')?.value || 'General Organisation';
      const className = safeEl('selectLessonClass')?.value || 'General Class';
      const rate = Number(safeEl('inputLessonAmount')?.value) || 1000;
      const notes = safeEl('inputLessonNotes')?.value.trim() || '';
      const statusRadio = document.querySelector('input[name="lessonStatus"]:checked');
      const status = statusRadio ? statusRadio.value : 'scheduled';

      if (isRecurring) {
        const checkedBoxes = document.querySelectorAll('input[name="recDay"]:checked');
        const selectedDays = Array.from(checkedBoxes).map(cb => Number(cb.value));
        if (selectedDays.length === 0) {
          alert(i18n.getLang() === 'ru' ? 'Пожалуйста, выберите хотя бы один день недели' : 'Please select at least one repeat day for recurring schedule');
          return;
        }

        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const daysLabel = 'Every ' + selectedDays.map(d => dayNames[d]).join(', ');

        store.addRecurringSchedule({
          className,
          orgName,
          days: selectedDays,
          daysLabel,
          startTime,
          endTime,
          rate
        });

        const curMonth = getTodayISODate().slice(0, 7);
        store.generateRecurringLessonsForMonth(curMonth);
        showToast(i18n.getLang() === 'ru' ? 'Регулярное расписание добавлено!' : 'Recurring schedule added & populated!');
      } else {
        const date = safeEl('inputLessonDate')?.value || getTodayISODate();
        if (editId) {
          store.updateLesson(editId, {
            date,
            startTime,
            endTime,
            orgName,
            className,
            rate,
            notes,
            status
          });
          showToast(i18n.getLang() === 'ru' ? 'Запись обновлена!' : 'Entry updated successfully!');
        } else {
          store.addLesson({
            date,
            startTime,
            endTime,
            orgName,
            className,
            rate,
            notes,
            status
          });
          showToast(i18n.getLang() === 'ru' ? 'Новая запись сохранена!' : 'New entry saved!');
        }
      }

      closeModal('modalAddLesson');
      populateOrgAndClassDropdowns();
      renderAllViews();
      window.cloudSync?.triggerAutoSync();
    });
  }

  // Reschedule Form Submission
  const formReschedule = safeEl('formReschedule');
  if (formReschedule) {
    formReschedule.addEventListener('submit', (e) => {
      e.preventDefault();
      const lessonId = safeEl('inputRescheduleLessonId')?.value;
      const newDate = safeEl('inputRescheduleNewDate')?.value;
      const newStart = safeEl('inputRescheduleNewStart')?.value;
      const newEnd = safeEl('inputRescheduleNewEnd')?.value;
      const reason = safeEl('inputRescheduleReason')?.value.trim() || '';

      store.rescheduleLesson(lessonId, newDate, newStart, newEnd, reason);
      showToast(i18n.t('toastRescheduled', { date: newDate }));
      closeModal('modalReschedule');
      renderAllViews();
      window.cloudSync?.triggerAutoSync();
    });
  }

  // Record Payment Form Submission
  const formRecordPayment = safeEl('formRecordPayment');
  if (formRecordPayment) {
    formRecordPayment.addEventListener('submit', (e) => {
      e.preventDefault();
      const orgName = safeEl('selectPayOrg')?.value || 'General Client';
      const month = safeEl('selectPayMonth')?.value || getTodayISODate().slice(0, 7);
      const amount = Number(safeEl('inputPayAmount')?.value) || 0;
      const date = safeEl('inputPayDate')?.value || getTodayISODate();
      const method = safeEl('selectPayMethod')?.value || 'Bank Transfer';
      const notes = safeEl('inputPayNotes')?.value.trim() || '';

      store.recordPayment({
        orgName,
        month,
        amount,
        date,
        method,
        notes
      });

      showToast(i18n.t('toastPaymentSaved', { currency: store.getCurrency(), amount: amount.toLocaleString() }));
      closeModal('modalRecordPayment');
      renderAllViews();
      window.cloudSync?.triggerAutoSync();
    });
  }

  // Confirm All Unconfirmed CTA
  safeEl('btnConfirmAllUnconfirmed')?.addEventListener('click', () => {
    const unconfirmed = store.getUnconfirmedLessons();
    unconfirmed.forEach(l => {
      store.markLessonDone(l.id);
    });
    showToast(i18n.getLang() === 'ru' ? `✓ Подтверждено записей: ${unconfirmed.length}` : `✓ Confirmed ${unconfirmed.length} entries as completed!`);
    closeModal('modalUnconfirmedReview');
    renderAllViews();
  });

  // Ledger Filter Change & Button Click
  safeEl('btnGenerateLedgerAction')?.addEventListener('click', () => {
    renderLedgerView();
    showToast(i18n.getLang() === 'ru' ? 'Ведомость сформирована' : 'Ledger generated');
  });

  safeEl('selectLedgerLanguage')?.addEventListener('change', () => {
    renderLedgerView();
  });

  // Ledger Mark as Paid CTA
  safeEl('btnLedgerMarkPaid')?.addEventListener('click', () => {
    const org = safeEl('selectLedgerOrg')?.value || 'all';
    const month = safeEl('selectLedgerMonth')?.value || getTodayISODate().slice(0, 7);
    const report = store.getLedgerReport(month, org, 'all', 'completed');
    
    safeVal('selectPayOrg', org === 'all' ? (store.getOrganisations()[0]?.name || 'General Organisation') : org);
    safeVal('selectPayMonth', month);
    safeVal('inputPayAmount', report.outstanding || report.totalEarned || 1000);
    openModal('modalRecordPayment');
  });

  // Overview Quick Record Payment
  safeEl('btnRecordPaymentQuick')?.addEventListener('click', () => {
    openModal('modalRecordPayment');
  });

  // Share Ledger Actions
  const btnLedgerShare = safeEl('btnLedgerShare');
  const btnShareTop = safeEl('btnShareLedgerTop');
  [btnLedgerShare, btnShareTop].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        openShareModal();
      });
    }
  });

  safeEl('btnCopyShareText')?.addEventListener('click', () => {
    const text = safeEl('textSharePreview')?.value || '';
    navigator.clipboard.writeText(text).then(() => {
      showToast(i18n.t('toastCopied'));
    }).catch(() => {
      safeEl('textSharePreview')?.select();
      document.execCommand('copy');
      showToast(i18n.t('toastCopied'));
    });
  });

  safeEl('btnPrintReceipt')?.addEventListener('click', () => triggerPrintReceipt());
  safeEl('btnExportCsv')?.addEventListener('click', () => triggerExportCsv());

  // Filter Listeners for Records
  safeEl('inputRecordSearch')?.addEventListener('input', () => renderRecordsView());
  safeEl('selectRecordMonth')?.addEventListener('change', () => renderRecordsView());
  safeEl('selectRecordOrg')?.addEventListener('change', () => renderRecordsView());

  // Quick Add Org & Class Buttons
  safeEl('btnQuickAddOrg')?.addEventListener('click', () => {
    safeVal('inputQuickAddType', 'org');
    safeText('lblQuickAddTitle', i18n.t('quickAddOrgTitle'));
    safeText('lblQuickAddName', i18n.t('lblQuickNameOrg'));
    safeVal('inputQuickAddName', '');
    openModal('modalQuickAddEntity');
  });

  safeEl('btnQuickAddClass')?.addEventListener('click', () => {
    safeVal('inputQuickAddType', 'class');
    safeText('lblQuickAddTitle', i18n.t('quickAddClassTitle'));
    safeText('lblQuickAddName', i18n.t('lblQuickNameClass'));
    safeVal('inputQuickAddName', '');
    openModal('modalQuickAddEntity');
  });

  const formQuickAdd = safeEl('formQuickAddEntity');
  if (formQuickAdd) {
    formQuickAdd.addEventListener('submit', (e) => {
      e.preventDefault();
      const type = safeEl('inputQuickAddType')?.value || 'org';
      const name = safeEl('inputQuickAddName')?.value.trim() || '';
      const rate = Number(safeEl('inputQuickAddRate')?.value) || 1000;
      
      if (type === 'org') {
        store.addOrganisation(name, rate);
        populateOrgAndClassDropdowns();
        safeVal('selectLessonOrg', name);
        showToast(i18n.t('toastOrgAdded', { name }));
      } else {
        const currentOrg = safeEl('selectLessonOrg')?.value || 'General Organisation';
        store.addClass(currentOrg, name, rate);
        populateOrgAndClassDropdowns();
        safeVal('selectLessonClass', name);
        showToast(i18n.t('toastClassAdded', { name }));
      }
      closeModal('modalQuickAddEntity');
    });
  }

  // Cloud Sync Drawer Open
  safeEl('btnDrawerCloudSync')?.addEventListener('click', () => {
    openCloudSyncModal();
    closeDrawer();
  });

  safeEl('btnCopyCloudKey')?.addEventListener('click', () => {
    const key = safeEl('inputCloudSyncKey')?.value || '';
    navigator.clipboard.writeText(key).then(() => {
      showToast(i18n.getLang() === 'ru' ? '📋 Ключ синхронизации скопирован!' : '📋 Cloud sync key copied!');
    }).catch(() => {
      showToast(i18n.getLang() === 'ru' ? 'Ключ скопирован' : 'Key copied');
    });
  });

  safeEl('btnRegenCloudKey')?.addEventListener('click', () => {
    const newKey = window.cloudSync.generateDefaultSyncKey();
    safeVal('inputCloudSyncKey', newKey);
    showToast(i18n.getLang() === 'ru' ? 'Сгенерирован новый ключ' : 'New sync key generated');
  });

  safeEl('btnTriggerCloudBackup')?.addEventListener('click', async () => {
    const btn = safeEl('btnTriggerCloudBackup');
    const key = safeEl('inputCloudSyncKey')?.value.trim() || 'default';
    if (btn) {
      btn.disabled = true;
      btn.textContent = i18n.getLang() === 'ru' ? '⏳ Сохранение...' : '⏳ Uploading...';
    }
    
    try {
      await window.cloudSync.backupToCloud(key);
      showToast(i18n.t('toastCloudBackupSuccess'));
      updateCloudSyncTimestampDisplay();
    } catch (err) {
      alert(i18n.getLang() === 'ru' ? `Ошибка облачного бэкапа: ${err.message}` : `Cloud backup error: ${err.message}`);
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = i18n.t('btnBackupNow');
      }
    }
  });

  safeEl('btnTriggerCloudRestore')?.addEventListener('click', async () => {
    const btn = safeEl('btnTriggerCloudRestore');
    const key = safeEl('inputCloudSyncKey')?.value.trim() || 'default';
    const confirmMsg = i18n.getLang() === 'ru' 
      ? `Восстановить данные из облака по ключу "${key}"? Текущие локальные данные обновятся.`
      : `Restore data from cloud using key "${key}"? Local data will be updated.`;
    
    if (!confirm(confirmMsg)) return;

    if (btn) {
      btn.disabled = true;
      btn.textContent = i18n.getLang() === 'ru' ? '⏳ Загрузка...' : '⏳ Restoring...';
    }

    try {
      await window.cloudSync.restoreFromCloud(key);
      showToast(i18n.t('toastCloudRestoreSuccess'));
      updateCloudSyncTimestampDisplay();
      populateOrgAndClassDropdowns();
      renderAllViews();
      closeModal('modalCloudSync');
    } catch (err) {
      alert(i18n.getLang() === 'ru' ? `Ошибка восстановления: ${err.message}` : `Restore error: ${err.message}`);
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = i18n.t('btnRestoreCloud');
      }
    }
  });

  const chkAutoSync = safeEl('chkAutoSync');
  if (chkAutoSync) {
    chkAutoSync.checked = window.cloudSync ? window.cloudSync.config.autoSync : false;
    chkAutoSync.addEventListener('change', () => {
      window.cloudSync?.saveConfig({ autoSync: chkAutoSync.checked });
      showToast(chkAutoSync.checked 
        ? (i18n.getLang() === 'ru' ? 'Авто-синхронизация включена' : 'Auto-sync enabled')
        : (i18n.getLang() === 'ru' ? 'Авто-синхронизация выключена' : 'Auto-sync disabled')
      );
    });
  }

  safeEl('btnShareCloudMessenger')?.addEventListener('click', async () => {
    await window.cloudSync?.shareToCloudMessengers();
  });

  safeEl('btnDrawerClearData')?.addEventListener('click', () => {
    const msg = i18n.getLang() === 'ru' ? 'Очистить все ваши данные и начать с чистого листа?' : 'Clear all your data and start fresh?';
    if (confirm(msg)) {
      store.clearUserData();
      showToast(i18n.t('toastClearDone'));
      populateOrgAndClassDropdowns();
      renderAllViews();
      closeDrawer();
    }
  });

  safeEl('btnDrawerExportBackup')?.addEventListener('click', () => {
    const user = window.authManager?.getCurrentUser();
    const nameSlug = user ? user.name.toLowerCase().replace(/\s+/g, '_') : 'ledger';
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(store.state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `fsms_ledgal_${nameSlug}_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast(i18n.t('toastBackupDownloaded'));
    closeDrawer();
  });

  const selectStatsYear = safeEl('selectStatsYear');
  if (selectStatsYear) {
    const curYear = new Date().getFullYear();
    selectStatsYear.innerHTML = `
      <option value="${curYear}">${curYear}</option>
      <option value="${curYear - 1}">${curYear - 1}</option>
    `;
    selectStatsYear.addEventListener('change', () => renderStatisticsView());
  }
}

function populateOrgAndClassDropdowns() {
  const store = window.fsmsStore;
  const i18n = window.i18n;
  if (!store || !i18n) return;

  const orgs = store.getOrganisations();
  const classes = store.getClasses();

  const selLessonOrg = safeEl('selectLessonOrg');
  const selLedgerOrg = safeEl('selectLedgerOrg');
  const selPayOrg = safeEl('selectPayOrg');
  const selRecordOrg = safeEl('selectRecordOrg');

  if (selLessonOrg) {
    selLessonOrg.innerHTML = '';
    if (orgs.length === 0) {
      selLessonOrg.innerHTML = '<option value="Individual">Individual / Client</option>';
    } else {
      orgs.forEach(o => {
        const opt = document.createElement('option');
        opt.value = o.name;
        opt.textContent = o.name;
        selLessonOrg.appendChild(opt);
      });
    }
  }

  if (selLedgerOrg) {
    selLedgerOrg.innerHTML = '';
    const optAll = document.createElement('option');
    optAll.value = 'all';
    optAll.textContent = i18n.t('allOrganisations');
    selLedgerOrg.appendChild(optAll);

    orgs.forEach(o => {
      const opt = document.createElement('option');
      opt.value = o.name;
      opt.textContent = o.name;
      selLedgerOrg.appendChild(opt);
    });
  }

  if (selPayOrg) {
    selPayOrg.innerHTML = '';
    if (orgs.length === 0) {
      selPayOrg.innerHTML = '<option value="Individual">Individual / Client</option>';
    } else {
      orgs.forEach(o => {
        const opt = document.createElement('option');
        opt.value = o.name;
        opt.textContent = o.name;
        selPayOrg.appendChild(opt);
      });
    }
  }

  if (selRecordOrg) {
    selRecordOrg.innerHTML = `<option value="all">${i18n.t('allOrganisations')}</option>`;
    orgs.forEach(o => {
      const opt = document.createElement('option');
      opt.value = o.name;
      opt.textContent = o.name;
      selRecordOrg.appendChild(opt);
    });
  }

  // Populate Months
  const selRecordMonth = safeEl('selectRecordMonth');
  const selLedgerMonth = safeEl('selectLedgerMonth');
  const selPayMonth = safeEl('selectPayMonth');

  const today = getTodayISODate();
  const [curYearNum, curMonthNum] = today.split('-').map(Number);

  const monthsList = [];
  for (let i = 0; i < 6; i++) {
    const d = new Date(curYearNum, curMonthNum - 1 - i, 1);
    const yStr = d.getFullYear();
    const mStr = String(d.getMonth() + 1).padStart(2, '0');
    monthsList.push({
      value: `${yStr}-${mStr}`,
      label: `${i18n.getMonthName(mStr, true)} ${yStr}`
    });
  }

  if (selRecordMonth) {
    selRecordMonth.innerHTML = `<option value="all">${i18n.t('allMonths')}</option>`;
    monthsList.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.value;
      opt.textContent = m.label;
      selRecordMonth.appendChild(opt);
    });
  }

  if (selLedgerMonth) {
    selLedgerMonth.innerHTML = '';
    monthsList.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.value;
      opt.textContent = m.label;
      selLedgerMonth.appendChild(opt);
    });
  }

  if (selPayMonth) {
    selPayMonth.innerHTML = '';
    monthsList.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.value;
      opt.textContent = m.label;
      selPayMonth.appendChild(opt);
    });
  }

  // Classes
  const selLessonClass = safeEl('selectLessonClass');
  const selLedgerClass = safeEl('selectLedgerClass');

  if (selLessonClass) {
    selLessonClass.innerHTML = '';
    if (classes.length === 0) {
      selLessonClass.innerHTML = '<option value="General Class">General Class / Activity</option>';
    } else {
      classes.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.name;
        opt.textContent = `${c.name} (${c.orgName})`;
        selLessonClass.appendChild(opt);
      });
    }
  }

  if (selLedgerClass) {
    selLedgerClass.innerHTML = `<option value="all">${i18n.t('allClasses')}</option>`;
    classes.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.name;
      opt.textContent = `${c.name} (${c.orgName})`;
      selLedgerClass.appendChild(opt);
    });
  }
}

function openModal(id) {
  safeEl(id)?.classList.add('open');
}

function closeModal(id) {
  safeEl(id)?.classList.remove('open');
}
window.closeModal = closeModal;

function openAddLessonModal(isRecurringDefault = false) {
  if (!requireAuth(() => openAddLessonModal(isRecurringDefault))) return;
  const i18n = window.i18n;
  safeVal('inputLessonEditId', '');
  safeText('modalAddLessonTitle', isRecurringDefault ? i18n.t('addRecurringTitle') : i18n.t('addLessonTitle'));
  
  if (isRecurringDefault) {
    safeEl('btnLessonTypeRecurring')?.click();
  } else {
    safeEl('btnLessonTypeOnetime')?.click();
  }

  safeVal('inputLessonDate', getTodayISODate());
  safeVal('inputLessonNotes', '');
  const radioCompleted = document.querySelector('input[name="lessonStatus"][value="scheduled"]') || document.querySelector('input[name="lessonStatus"][value="completed"]');
  if (radioCompleted) radioCompleted.checked = true;

  openModal('modalAddLesson');
}

function openEditLessonModal(lesson) {
  const i18n = window.i18n;
  safeVal('inputLessonEditId', lesson.id);
  safeText('modalAddLessonTitle', i18n.t('editLessonTitle'));
  safeEl('btnLessonTypeOnetime')?.click();

  safeVal('inputLessonDate', lesson.date);
  safeVal('inputLessonStartTime', lesson.startTime);
  safeVal('inputLessonEndTime', lesson.endTime);
  safeVal('selectLessonOrg', lesson.orgName);
  safeVal('selectLessonClass', lesson.className);
  safeVal('inputLessonAmount', lesson.rate);
  safeVal('inputLessonNotes', lesson.notes || '');

  const radio = document.querySelector(`input[name="lessonStatus"][value="${lesson.status}"]`);
  if (radio) radio.checked = true;

  openModal('modalAddLesson');
}

function openCloudSyncModal() {
  if (!requireAuth(() => openCloudSyncModal())) return;
  const sync = window.cloudSync;
  if (!sync) return;
  safeVal('inputCloudSyncKey', sync.config.syncKey);
  const chk = safeEl('chkAutoSync');
  if (chk) chk.checked = sync.config.autoSync;
  if (sync.config.supabaseUrl) safeVal('inputSupabaseUrl', sync.config.supabaseUrl);
  if (sync.config.supabaseKey) safeVal('inputSupabaseKey', sync.config.supabaseKey);
  updateCloudSyncTimestampDisplay();
  openModal('modalCloudSync');
}
window.openCloudSyncModal = openCloudSyncModal;

function updateCloudSyncTimestampDisplay() {
  const sync = window.cloudSync;
  const i18n = window.i18n;
  if (!sync || !i18n) return;

  if (sync.config.lastSyncedAt) {
    const d = new Date(sync.config.lastSyncedAt);
    const dateFormatted = `${String(d.getDate()).padStart(2,'0')} ${i18n.getMonthName(String(d.getMonth()+1).padStart(2,'0'), false)} ${d.getFullYear()}, ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
    safeText('lblLastSyncedTimestamp', dateFormatted);
  } else {
    safeText('lblLastSyncedTimestamp', i18n.t('lblNeverSynced'));
  }
}

function openShareModal() {
  const selectLedgerLang = safeEl('selectLedgerLanguage');
  const ledgerLang = selectLedgerLang ? selectLedgerLang.value : 'ru';
  window.i18n?.setLedgerLang(ledgerLang);

  safeEl('btnShareLangRu')?.classList.toggle('active', ledgerLang === 'ru');
  safeEl('btnShareLangEn')?.classList.toggle('active', ledgerLang === 'en');

  updateShareModalContent();
  openModal('modalShareLedger');
}

function updateShareModalContent() {
  const store = window.fsmsStore;
  const i18n = window.i18n;
  if (!store || !i18n) return;

  const targetLang = i18n.getLedgerLang() || 'ru';
  const currency = store.getCurrency();
  const org = safeEl('selectLedgerOrg')?.value || 'all';
  const month = safeEl('selectLedgerMonth')?.value || getTodayISODate().slice(0, 7);
  const report = store.getLedgerReport(month, org, 'all', 'completed');

  const monthName = i18n.getMonthName(month.split('-')[1], true, targetLang);
  const yearStr = month.split('-')[0];

  let orgTitle = report.orgName;
  if (targetLang === 'ru' && (org === 'all' || org === 'All Organisations')) {
    orgTitle = 'ВСЕ ОРГАНИЗАЦИИ';
  } else {
    orgTitle = report.orgName.toUpperCase();
  }

  let text = i18n.t('whatsappHeader', { org: orgTitle }, targetLang) + '\n';
  text += i18n.t('whatsappMonth', { month: monthName, year: yearStr }, targetLang) + '\n';
  text += i18n.t('whatsappTeacher', { teacher: store.getSettings().teacherName }, targetLang) + '\n';
  text += `------------------------------------\n`;
  text += i18n.t('whatsappListHeader', {}, targetLang) + '\n';

  if (report.lessons.length === 0) {
    text += `(Нет проведенных записей за этот период)\n`;
  } else {
    report.lessons.forEach((l, idx) => {
      const d = new Date(l.date + 'T00:00:00');
      const formatted = `${String(d.getDate()).padStart(2, '0')} ${i18n.getMonthName(String(d.getMonth()+1).padStart(2, '0'), false, targetLang)}`;
      const statusLabel = i18n.getStatusLabel(l.status, targetLang);
      text += `${idx + 1}. ${formatted} | ${l.className} | ${currency}${Number(l.rate).toLocaleString()} [✓ ${statusLabel}]\n`;
    });
  }

  text += `------------------------------------\n`;
  text += i18n.t('whatsappTotalLessons', { count: report.lessonsCount }, targetLang) + '\n';
  text += i18n.t('whatsappTotalEarned', { currency, amount: report.totalEarned.toLocaleString() }, targetLang) + '\n';
  text += i18n.t('whatsappTotalPaid', { currency, amount: report.totalPaid.toLocaleString() }, targetLang) + '\n';
  text += i18n.t('whatsappOutstanding', { currency, amount: report.outstanding.toLocaleString() }, targetLang) + '\n\n';
  text += i18n.t('whatsappFooter', {}, targetLang);

  safeVal('textSharePreview', text);
}

function triggerPrintReceipt() {
  const store = window.fsmsStore;
  const i18n = window.i18n;
  if (!store || !i18n) return;

  const targetLang = i18n.getLedgerLang() || 'ru';
  const currency = store.getCurrency();
  const org = safeEl('selectLedgerOrg')?.value || 'all';
  const month = safeEl('selectLedgerMonth')?.value || getTodayISODate().slice(0, 7);
  const report = store.getLedgerReport(month, org, 'all', 'completed');

  let orgTitle = report.orgName;
  if (targetLang === 'ru' && (org === 'all' || org === 'All Organisations')) {
    orgTitle = 'ВСЕ ОРГАНИЗАЦИИ';
  } else {
    orgTitle = report.orgName.toUpperCase();
  }

  const printTitle = targetLang === 'ru' ? 'FSMS LEDGAL — ВЕДОМОСТЬ УРОКОВ И ОПЛАТЫ' : 'FSMS LEDGAL — STATEMENT';
  const printTeacherLbl = targetLang === 'ru' ? 'Исполнитель' : 'User';

  const printContainer = safeEl('printable-receipt');
  if (!printContainer) return;

  printContainer.innerHTML = `
    <div style="font-family:system-ui, sans-serif; padding:40px; color:#0F172A; max-width:800px; margin:0 auto;">
      <div style="border-bottom:2px solid #0B192C; padding-bottom:16px; margin-bottom:20px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h1 style="font-size:22px; color:#0B192C; margin:0;">${printTitle}</h1>
          <div style="color:#64748B; font-size:14px; margin-top:4px;">${printTeacherLbl}: ${store.getSettings().teacherName}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:18px; font-weight:800; color:#0B192C;">${orgTitle}</div>
          <div style="color:#64748B; font-size:14px;">${i18n.getMonthName(month.split('-')[1], true, targetLang)} ${month.split('-')[0]}</div>
        </div>
      </div>

      <table style="width:100%; border-collapse:collapse; margin-bottom:24px; font-size:14px;">
        <thead>
          <tr style="background:#F1F5F9; border-bottom:2px solid #CBD5E1;">
            <th style="padding:10px; text-align:left;">${i18n.t('tableDate', {}, targetLang)}</th>
            <th style="padding:10px; text-align:left;">${i18n.t('tableClass', {}, targetLang)}</th>
            <th style="padding:10px; text-align:left;">${i18n.t('tableStatus', {}, targetLang)}</th>
            <th style="padding:10px; text-align:right;">${i18n.t('tableAmount', {}, targetLang)}</th>
          </tr>
        </thead>
        <tbody>
          ${report.lessons.length === 0 ? `<tr><td colspan="4" style="text-align:center; padding:16px; color:#94A3B8;">${i18n.t('noLessonsFound', {}, targetLang)}</td></tr>` : ''}
          ${report.lessons.map(l => `
            <tr style="border-bottom:1px solid #E2E8F0;">
              <td style="padding:8px 10px;">${l.date}</td>
              <td style="padding:8px 10px; font-weight:600;">${escapeHTML(l.className)}</td>
              <td style="padding:8px 10px; color:#059669;">${i18n.getStatusLabel(l.status, targetLang).toUpperCase()}</td>
              <td style="padding:8px 10px; text-align:right; font-weight:700;">${currency}${Number(l.rate).toLocaleString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div style="display:flex; justify-content:flex-end;">
        <div style="width:320px; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:16px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:14px;">
            <span>${i18n.t('statLessons', {}, targetLang)}:</span>
            <strong>${report.lessonsCount}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:14px;">
            <span>${i18n.t('boxAmountEarned', {}, targetLang)}:</span>
            <strong>${currency}${report.totalEarned.toLocaleString()}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:14px; color:#059669;">
            <span>${i18n.t('boxPaid', {}, targetLang)}:</span>
            <strong>${currency}${report.totalPaid.toLocaleString()}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; padding-top:8px; border-top:2px solid #CBD5E1; font-size:16px; font-weight:800; color:#DC2626;">
            <span>${i18n.t('boxOutstanding', {}, targetLang)}:</span>
            <span>${currency}${report.outstanding.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  window.print();
}

function triggerExportCsv() {
  const store = window.fsmsStore;
  const i18n = window.i18n;
  if (!store || !i18n) return;

  const targetLang = i18n.getLedgerLang() || 'ru';
  const org = safeEl('selectLedgerOrg')?.value || 'all';
  const month = safeEl('selectLedgerMonth')?.value || getTodayISODate().slice(0, 7);
  const report = store.getLedgerReport(month, org, 'all', 'completed');

  const hDate = i18n.t('tableDate', {}, targetLang);
  const hOrg = i18n.t('lblOrganisation', {}, targetLang);
  const hClass = i18n.t('tableClass', {}, targetLang);
  const hStatus = i18n.t('tableStatus', {}, targetLang);
  const hAmount = i18n.t('tableAmount', {}, targetLang);
  const hNotes = i18n.t('lblNotes', {}, targetLang);

  let csv = `${hDate},${hOrg},${hClass},${hStatus},${hAmount},${hNotes}\n`;
  report.lessons.forEach(l => {
    const statusLabel = i18n.getStatusLabel(l.status, targetLang);
    csv += `"${l.date}","${l.orgName}","${l.className}","${statusLabel}","${l.rate}","${l.notes || ''}"\n`;
  });

  const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `ledger_${report.orgName}_${month}_${targetLang}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  showToast(i18n.t('toastCsvDownloaded'));
}

function showToast(message) {
  const toast = safeEl('toastMessage');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
