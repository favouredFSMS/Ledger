// =========================================================
// FSMS Ledgal — Internationalization (i18n) Module
// English (EN) & Russian (RU) with Safe Storage Support
// =========================================================

const I18N_DICTIONARY = {
  en: {
    appName: "FAVOURED LEDGAL",
    appSubtitle: "PERSONAL & BUSINESS LEDGER",
    drawerTitle: "FSMS LEDGAL",
    drawerSubtitle: "Personal & Business Ledger",
    
    // Greeting
    goodMorning: "Good morning",
    goodAfternoon: "Good afternoon",
    goodEvening: "Good evening",
    
    // Guest Mode & Auth
    guestModeBadge: "Guest Mode",
    guestGreeting: "Welcome 👋",
    guestBannerTitle: "You are in Guest Mode",
    guestBannerSub: "Sign Up or Sign In to save records, create recurring schedules, and enable cloud sync.",
    btnGuestSignUp: "Create Free Account",
    btnGuestSignIn: "Sign In",
    authModalTitle: "USER ACCOUNT",
    authGateMsg: "Please sign up or sign in to save this entry and sync with the cloud.",
    tabLogin: "Sign In",
    tabRegister: "Sign Up",
    lblName: "Full Name / Profile Name",
    lblEmail: "Email or Username",
    lblPassword: "Password",
    lblPreferredCurrency: "Currency Symbol",
    btnLogin: "SIGN IN",
    btnRegister: "CREATE FREE ACCOUNT",
    btnLogout: "Log Out",
    lblLoggedAs: "Active Account:",
    lblNoUser: "Guest Mode (Not signed in)",
    toastLoginSuccess: "Welcome back, {name}!",
    toastRegisterSuccess: "Account created! Welcome, {name}!",
    toastLogout: "Logged out. You are now in Guest Mode.",

    // Tabs & Navigation
    tabToday: "Today",
    tabSchedule: "Schedule",
    tabRecords: "Records",
    tabLedger: "Ledger",
    tabStatistics: "Statistics",
    
    // Today View
    todaysLessons: "Today's Schedule",
    todaySummary: "Today Summary",
    lessons: "Entries",
    expected: "Expected",
    completed: "Completed",
    cancelled: "Cancelled",
    rescheduled: "Rescheduled",
    scheduled: "Scheduled",
    noLessonsToday: "No entries scheduled for today",
    enjoyFreeTime: "Add an entry using the ＋ button or set up your weekly schedule!",
    btnDone: "✓ Done",
    btnCancel: "✕ Cancel",
    btnReschedule: "⟳ Reschedule",
    btnUndoReset: "Undo / Reset",
    
    // Smart Reminders
    unconfirmedAlertSingular: "1 unconfirmed past entry",
    unconfirmedAlertPlural: "{n} unconfirmed past entries",
    reminderSub: "Tap to confirm or reschedule",
    btnReview: "Review",
    unconfirmedTitle: "UNCONFIRMED ITEMS",
    unconfirmedDesc: "These entries were scheduled in your calendar but haven't been confirmed yet. Confirm what happened to keep your ledger 100% accurate!",
    btnConfirmAllDone: "✓ CONFIRM ALL AS COMPLETED",
    allConfirmedMsg: "🎉 All scheduled items have been confirmed! No action needed.",

    // Schedule View
    segRecurring: "Recurring",
    segOnetime: "One-time",
    btnAddScheduleTemplate: "Add Recurring Schedule",
    noRecurringSchedules: "No recurring schedules yet",
    noRecurringSub: "Tap '+ Add Recurring Schedule' below to set up your weekly timetable.",
    noOnetimeLessons: "No upcoming one-time bookings",
    onetimeSub: "One-time bookings will appear here.",
    
    // Add / Edit Lesson Modal
    addLessonTitle: "ADD ENTRY",
    editLessonTitle: "EDIT ENTRY",
    addRecurringTitle: "ADD RECURRING SCHEDULE",
    lblDate: "Date",
    lblTimeSlot: "Time Slot",
    lblOrganisation: "Organisation / Client",
    lblClassGroup: "Class / Group",
    lblAmount: "Amount",
    lblNotes: "Notes (Optional)",
    lblStatus: "Status",
    lblRepeatEvery: "Repeat Every",
    btnSaveLesson: "SAVE ENTRY",
    
    // Records View
    searchPlaceholder: "Search class or org...",
    allOrganisations: "All Organisations",
    allClasses: "All Classes",
    allMonths: "All Months",
    allStatuses: "All Statuses",
    allTime: "All Time",
    noRecordsMatch: "No records history yet",
    changeFilterTip: "Complete entries or adjust your filter above to see records.",
    
    // Ledger View
    tabGenLedger: "Generate Ledger",
    tabOverviewPayments: "Payments",
    lblLedgerLang: "Statement Language",
    btnGenerateLedger: "GENERATE LEDGER",
    lblMonth: "Month",
    statLessons: "Entries",
    statEarned: "Earned",
    statPaid: "Paid",
    statDue: "Due",
    tableDate: "Date",
    tableClass: "Class / Group",
    tableStatus: "Status",
    tableAmount: "Amount",
    tableTotal: "TOTAL",
    boxAmountEarned: "Amount Earned",
    boxPaid: "Paid",
    boxOutstanding: "Outstanding",
    btnMarkAsPaid: "MARK AS PAID",
    btnShareLedger: "SHARE LEDGER",
    noLessonsFound: "No entries recorded for this period yet",
    
    // Overview / Payments View
    overviewTitle: "OVERVIEW",
    byOrganisation: "BY ORGANISATION",
    btnRecordPayment: "+ Record Payment",
    btnViewDetailedReport: "VIEW DETAILED FINANCIAL REPORT",
    lessonsCountSuffix: "entries",
    settledBadge: "Settled",
    noOrgsYet: "No organisations recorded yet. Add entries to track payments.",
    
    // Statistics View
    statsIncome: "Income",
    statsLessons: "Entries",
    statsOrgs: "Organisations",
    statsMonthlyIncome: "Monthly Income",
    statsByOrgMonth: "By Organisation",
    statsOutstandingDebt: "Outstanding Payments",
    statsFromOrgs: "From {n} organisation{s}",
    
    // Share Modal
    shareTitle: "SHARE LEDGER",
    shareDesc: "Generate and copy a professional summary ready to send to clients via WhatsApp, Telegram, or Email.",
    lblFormattedText: "Formatted Statement Text",
    btnCopyText: "📋 COPY TEXT",
    btnPrintPdf: "🖨️ PRINT / PDF",
    btnExportCsv: "📊 EXPORT CSV SPREADSHEET",
    
    // Reschedule Modal
    rescheduleTitle: "RESCHEDULE ENTRY",
    lblNewDate: "New Date",
    lblNewTimeSlot: "New Time Slot",
    lblReasonNotes: "Reason / Notes (Optional)",
    btnConfirmReschedule: "CONFIRM RESCHEDULE",
    
    // Payment Modal
    recordPaymentTitle: "RECORD PAYMENT",
    lblPaymentOrg: "Organisation / Client",
    lblPaymentAmount: "Payment Amount",
    lblPaymentDate: "Payment Date",
    lblPaymentMethod: "Payment Method",
    lblPaymentNotes: "Notes / Reference",
    btnSavePayment: "SAVE PAYMENT",
    methodBank: "Bank Transfer",
    methodCash: "Cash",
    methodCard: "Card",
    methodOther: "Other",

    // Quick Add Entity
    quickAddOrgTitle: "ADD NEW ORGANISATION",
    quickAddClassTitle: "ADD NEW CLASS / GROUP",
    lblQuickNameOrg: "Organisation Name",
    lblQuickNameClass: "Class / Group Name",
    lblDefaultRate: "Default Hourly Rate",
    btnSaveSelect: "SAVE & SELECT",
    
    // Cloud Backup & Sync Hub
    drawerItemCloudSync: "Cloud Backup & Sync",
    cloudModalTitle: "CLOUD BACKUP & SYNC",
    cloudModalDesc: "Safely store your teaching records, schedules, and ledgers in the cloud so you never lose your data across devices.",
    cloudSyncKeyLabel: "Your Cloud Sync Key",
    cloudSyncKeyHelp: "Use this private key on any other phone, tablet, or computer to sync and restore your data.",
    btnBackupNow: "☁️ BACKUP TO CLOUD NOW",
    btnRestoreCloud: "🔄 RESTORE FROM CLOUD",
    lblAutoSyncToggle: "Auto-sync to cloud when entries are completed",
    lblLastSynced: "Last synced:",
    lblNeverSynced: "Never synced yet",
    btnShareToMessenger: "📲 Send Backup to Telegram / Google Drive",
    cloudProviderLabel: "Storage Provider",
    providerBuiltin: "Ledgal Cloud Vault (Fast & Zero Setup)",
    providerSupabase: "Custom Supabase (Free Private PostgreSQL)",
    lblSupabaseUrl: "Supabase Project URL",
    lblSupabaseKey: "Supabase Anon Public Key",
    btnSaveCloudConfig: "SAVE SETTINGS",

    // Drawer Items
    drawerItemToday: "Today's Dashboard",
    drawerItemSchedule: "Recurring Schedule",
    drawerItemRecords: "Records History",
    drawerItemLedger: "Monthly Ledgers",
    drawerItemStats: "Analytics & Statistics",
    drawerItemClearData: "Clear My Data",
    drawerItemBackup: "Backup Data (JSON)",
    drawerLangLabel: "Interface Language",
    
    // Days & Months
    daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    daysOfWeekFull: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    monthsAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    monthsFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    
    // Formatted WhatsApp Statement Template
    whatsappHeader: "🏫 *{org} — LESSON & PAYMENT STATEMENT*",
    whatsappMonth: "📅 Month: {month} {year}",
    whatsappTeacher: "👤 Name: {teacher}",
    whatsappListHeader: "ITEMIZED ENTRIES:",
    whatsappTotalLessons: "📊 Total Entries: {count}",
    whatsappTotalEarned: "💰 Total Earned: {currency}{amount}",
    whatsappTotalPaid: "✅ Total Paid: {currency}{amount}",
    whatsappOutstanding: "🔴 Outstanding Balance: {currency}{amount}",
    whatsappFooter: "Payment details / bank transfer available upon request. Thank you!",
    
    // Toast Messages
    toastDone: "✓ Entry recorded as completed!",
    toastCancelled: "Entry marked as cancelled",
    toastReset: "Entry status reset to scheduled",
    toastRescheduled: "✓ Entry rescheduled to {date}",
    toastPaymentSaved: "✓ Payment of {currency}{amount} recorded!",
    toastCopied: "📋 Statement copied to clipboard!",
    toastCsvDownloaded: "CSV export downloaded!",
    toastBackupDownloaded: "Backup JSON downloaded!",
    toastClearDone: "Data cleared successfully",
    toastOrgAdded: 'Organisation "{name}" added!',
    toastClassAdded: 'Class "{name}" added!',
    toastCloudBackupSuccess: "✓ Cloud backup saved successfully!",
    toastCloudRestoreSuccess: "✓ Data restored from cloud successfully!"
  },
  
  ru: {
    appName: "FAVOURED LEDGAL",
    appSubtitle: "СИСТЕМА УЧЕТА И ВЕДОМОСТЕЙ",
    drawerTitle: "FSMS LEDGAL",
    drawerSubtitle: "Система учета уроков и оплат",
    
    // Greeting
    goodMorning: "Доброе утро",
    goodAfternoon: "Добрый день",
    goodEvening: "Добрый вечер",
    
    // Guest Mode & Auth
    guestModeBadge: "Гостевой режим",
    guestGreeting: "Добро пожаловать 👋",
    guestBannerTitle: "Вы находитесь в Гостевом режиме",
    guestBannerSub: "Зарегистрируйтесь или войдите в аккаунт, чтобы сохранять записи, расписание и настроить облачный бэкап.",
    btnGuestSignUp: "Создать аккаунт бесплатно",
    btnGuestSignIn: "Войти",
    authModalTitle: "АККАУНТ ПОЛЬЗОВАТЕЛЯ",
    authGateMsg: "Пожалуйста, зарегистрируйтесь или войдите, чтобы сохранить эту запись и синхронизировать с облаком.",
    tabLogin: "Вход",
    tabRegister: "Регистрация",
    lblName: "Ваше имя / Профиль",
    lblEmail: "Email или Логин",
    lblPassword: "Пароль",
    lblPreferredCurrency: "Символ валюты",
    btnLogin: "ВОЙТИ В АККАУНТ",
    btnRegister: "СОЗДАТЬ АККАУНТ БЕСПЛАТНО",
    btnLogout: "Выйти из аккаунта",
    lblLoggedAs: "Аккаунт:",
    lblNoUser: "Гостевой режим (Вход не выполнен)",
    toastLoginSuccess: "С возвращением, {name}!",
    toastRegisterSuccess: "Аккаунт создан! Добро пожаловать, {name}!",
    toastLogout: "Вы вышли. Включен гостевой режим.",

    // Tabs & Navigation
    tabToday: "Сегодня",
    tabSchedule: "Расписание",
    tabRecords: "Журнал",
    tabLedger: "Ведомости",
    tabStatistics: "Статистика",
    
    // Today View
    todaysLessons: "Расписание на сегодня",
    todaySummary: "Итоги за сегодня",
    lessons: "Записей",
    expected: "Ожидается",
    completed: "Проведено",
    cancelled: "Отменено",
    rescheduled: "Перенесено",
    scheduled: "Запланировано",
    noLessonsToday: "На сегодня нет запланированных записей",
    enjoyFreeTime: "Добавьте запись кнопкой ＋ или настройте регулярное расписание!",
    btnDone: "✓ Проведено",
    btnCancel: "✕ Отмена",
    btnReschedule: "⟳ Перенести",
    btnUndoReset: "Сбросить / Отменить",
    
    // Smart Reminders
    unconfirmedAlertSingular: "1 неподтвержденная прошедшая запись",
    unconfirmedAlertPlural: "{n} неподтвержденных прошедших записей",
    reminderSub: "Нажмите, чтобы подтвердить или перенести",
    btnReview: "Проверить",
    unconfirmedTitle: "НЕПОДТВЕРЖДЕННЫЕ ЗАПИСИ",
    unconfirmedDesc: "Эти записи стояли в расписании, но еще не были отмечены. Подтвердите их статус, чтобы ведомость сошлась до копейки!",
    btnConfirmAllDone: "✓ ПОДТВЕРДИТЬ ВСЕ КАК ПРОВЕДЕННЫЕ",
    allConfirmedMsg: "🎉 Все записи подтверждены! Неподтвержденных записей нет.",

    // Schedule View
    segRecurring: "Регулярные",
    segOnetime: "Разовые",
    btnAddScheduleTemplate: "Добавить регулярное расписание",
    noRecurringSchedules: "Регулярных расписаний пока нет",
    noRecurringSub: "Нажмите '+ Добавить регулярное расписание' ниже, чтобы задать недельное расписание.",
    noOnetimeLessons: "Нет предстоящих разовых записей",
    onetimeSub: "Здесь будут отображаться разовые занятия и индивидуальные брони.",
    
    // Add / Edit Lesson Modal
    addLessonTitle: "ДОБАВИТЬ ЗАПИСЬ",
    editLessonTitle: "РЕДАКТИРОВАТЬ ЗАПИСЬ",
    addRecurringTitle: "ДОБАВИТЬ РЕГУЛЯРНОЕ РАСПИСАНИЕ",
    lblDate: "Дата",
    lblTimeSlot: "Время занятия",
    lblOrganisation: "Организация / Клиент",
    lblClassGroup: "Группа / Ученик",
    lblAmount: "Ставка / Стоимость",
    lblNotes: "Заметки (необязательно)",
    lblStatus: "Статус",
    lblRepeatEvery: "Повторять каждые",
    btnSaveLesson: "СОХРАНИТЬ ЗАПИСЬ",
    
    // Records View
    searchPlaceholder: "Поиск группы или организации...",
    allOrganisations: "Все организации",
    allClasses: "Все группы",
    allMonths: "Все месяцы",
    allStatuses: "Все статусы",
    allTime: "За все время",
    noRecordsMatch: "Журнал пока пуст",
    changeFilterTip: "Отмечайте проведенные уроки, чтобы видеть их историю здесь.",
    
    // Ledger View
    tabGenLedger: "Сформировать ведомость",
    tabOverviewPayments: "Оплаты и баланс",
    lblLedgerLang: "Язык ведомости",
    btnGenerateLedger: "СФОРМИРОВАТЬ ВЕДОМОСТЬ",
    lblMonth: "Месяц",
    statLessons: "Записей",
    statEarned: "Начислено",
    statPaid: "Оплачено",
    statDue: "К оплате",
    tableDate: "Дата",
    tableClass: "Группа / Клиент",
    tableStatus: "Статус",
    tableAmount: "Сумма",
    tableTotal: "ИТОГО",
    boxAmountEarned: "Начислено",
    boxPaid: "Поступило оплат",
    boxOutstanding: "Остаток к оплате (Долг)",
    btnMarkAsPaid: "ОТМЕТИТЬ КАК ОПЛАЧЕНО",
    btnShareLedger: "ПОДЕЛИТЬСЯ ВЕДОМОСТЬЮ",
    noLessonsFound: "Нет записей за выбранный период",
    
    // Overview / Payments View
    overviewTitle: "ОБЩИЙ БАЛАНС",
    byOrganisation: "ПО ОРГАНИЗАЦИЯМ",
    btnRecordPayment: "+ Внести оплату",
    btnViewDetailedReport: "ПОДРОБНЫЙ ФИНАНСОВЫЙ ОТЧЕТ",
    lessonsCountSuffix: "записей",
    settledBadge: "Оплачено",
    noOrgsYet: "Организаций пока нет. Добавьте записи для учета оплат.",
    
    // Statistics View
    statsIncome: "Доход",
    statsLessons: "Записи",
    statsOrgs: "Организации",
    statsMonthlyIncome: "Доход по месяцам",
    statsByOrgMonth: "Доли организаций",
    statsOutstandingDebt: "Задолженность по оплатам",
    statsFromOrgs: "От {n} организаций",
    
    // Share Modal
    shareTitle: "ОТПРАВИТЬ ВЕДОМОСТЬ",
    shareDesc: "Готовая ведомость для отправки клиентам в WhatsApp, Telegram или по почте.",
    lblFormattedText: "Текст ведомости",
    btnCopyText: "📋 СКОПИРОВАТЬ ТЕКСТ",
    btnPrintPdf: "🖨️ ПЕЧАТЬ / PDF",
    btnExportCsv: "📊 СКАЧАТЬ ТАБЛИЦУ (CSV)",
    
    // Reschedule Modal
    rescheduleTitle: "ПЕРЕНОС ЗАПИСИ",
    lblNewDate: "Новая дата",
    lblNewTimeSlot: "Новое время",
    lblReasonNotes: "Причина / Заметки (необязательно)",
    btnConfirmReschedule: "ПОДТВЕРДИТЬ ПЕРЕНОС",
    
    // Payment Modal
    recordPaymentTitle: "ВНЕСТИ ОПЛАТУ",
    lblPaymentOrg: "Организация / Клиент",
    lblPaymentAmount: "Сумма оплаты",
    lblPaymentDate: "Дата оплаты",
    lblPaymentMethod: "Способ оплаты",
    lblPaymentNotes: "Комментарий / Номер перевода",
    btnSavePayment: "СОХРАНИТЬ ОПЛАТУ",
    methodBank: "Банковский перевод (Сбер / Т-Банк)",
    methodCash: "Наличные",
    methodCard: "Банковская карта",
    methodOther: "Другое",

    // Quick Add Entity
    quickAddOrgTitle: "ДОБАВИТЬ ОРГАНИЗАЦИЮ",
    quickAddClassTitle: "ДОБАВИТЬ ГРУППУ / КЛИЕНТА",
    lblQuickNameOrg: "Название организации",
    lblQuickNameClass: "Название группы или имя клиента",
    lblDefaultRate: "Ставка по умолчанию",
    btnSaveSelect: "СОХРАНИТЬ И ВЫБРАТЬ",
    
    // Cloud Backup & Sync Hub
    drawerItemCloudSync: "Облачный бэкап и синхронизация",
    cloudModalTitle: "ОБЛАЧНАЯ СИНХРОНИЗАЦИЯ И БЭКАП",
    cloudModalDesc: "Безопасное хранение записей, расписаний и оплат в облаке. Доступ к вашим данным с любого телефона или компьютера.",
    cloudSyncKeyLabel: "Ваш секретный ключ синхронизации",
    cloudSyncKeyHelp: "Введите этот ключ на новом телефоне или планшете, чтобы мгновенно загрузить все данные из облака.",
    btnBackupNow: "☁️ СОХРАНИТЬ В ОБЛАКО СЕЙЧАС",
    btnRestoreCloud: "🔄 ВОССТАНОВИТЬ ИЗ ОБЛАКА",
    lblAutoSyncToggle: "Авто-синхронизация при отметке записей",
    lblLastSynced: "Последняя синхронизация:",
    lblNeverSynced: "Еще не синхронизировалось",
    btnShareToMessenger: "📲 Отправить бэкап в Telegram / Google Диск",
    cloudProviderLabel: "Облачный провайдер",
    providerBuiltin: "Облачное хранилище Ledgal (Мгновенно, без настроек)",
    providerSupabase: "Свой Supabase (Бесплатный PostgreSQL)",
    lblSupabaseUrl: "URL проекта Supabase",
    lblSupabaseKey: "Публичный Anon ключ Supabase",
    btnSaveCloudConfig: "СОХРАНИТЬ НАСТРОЙКИ",

    // Drawer Items
    drawerItemToday: "Главный экран (Сегодня)",
    drawerItemSchedule: "Регулярное расписание",
    drawerItemRecords: "Журнал записей",
    drawerItemLedger: "Месячные ведомости",
    drawerItemStats: "Статистика и аналитика",
    drawerItemClearData: "Очистить мои данные",
    drawerItemBackup: "Резервная копия (JSON файл)",
    drawerLangLabel: "Язык интерфейса",
    
    // Days & Months
    daysOfWeek: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    daysOfWeekFull: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
    monthsAbbr: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    monthsFull: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    
    // Formatted WhatsApp Statement Template
    whatsappHeader: "🏫 *{org} — ВЕДОМОСТЬ УРОКОВ И ОПЛАТЫ*",
    whatsappMonth: "📅 Месяц: {month} {year}",
    whatsappTeacher: "👤 Имя: {teacher}",
    whatsappListHeader: "СПИСОК ПРОВЕДЕННЫХ ЗАНЯТИЙ:",
    whatsappTotalLessons: "📊 Всего записей: {count}",
    whatsappTotalEarned: "💰 Итого начислено: {currency}{amount}",
    whatsappTotalPaid: "✅ Оплачено: {currency}{amount}",
    whatsappOutstanding: "🔴 К оплате (Остаток): {currency}{amount}",
    whatsappFooter: "Реквизиты для оплаты: Сбербанк / Т-Банк. Спасибо!",
    
    // Toast Messages
    toastDone: "✓ Запись отмечена как проведенная!",
    toastCancelled: "Запись отмечена как отмененная",
    toastReset: "Статус записи возвращен в расписание",
    toastRescheduled: "✓ Запись перенесена на {date}",
    toastPaymentSaved: "✓ Оплата на сумму {currency}{amount} сохранена!",
    toastCopied: "📋 Ведомость скопирована в буфер обмена!",
    toastCsvDownloaded: "Файл CSV скачан!",
    toastBackupDownloaded: "Резервная копия JSON сохранена!",
    toastClearDone: "Данные очищены",
    toastOrgAdded: 'Организация "{name}" добавлена!',
    toastClassAdded: 'Группа "{name}" добавлена!',
    toastCloudBackupSuccess: "✓ Резервная копия сохранена в облаке!",
    toastCloudRestoreSuccess: "✓ Данные успешно восстановлены из облака!"
  }
};

class I18nManager {
  constructor() {
    this.currentLang = this.storage().getItem('fsms_lang') || 'en';
    this.ledgerLang = this.storage().getItem('fsms_ledger_lang') || 'ru';
  }

  storage() {
    return window.safeStorage || localStorage;
  }

  setLang(lang) {
    if (I18N_DICTIONARY[lang]) {
      this.currentLang = lang;
      this.storage().setItem('fsms_lang', lang);
      document.documentElement.lang = lang;
    }
  }

  getLang() {
    return this.currentLang;
  }

  setLedgerLang(lang) {
    if (I18N_DICTIONARY[lang]) {
      this.ledgerLang = lang;
      this.storage().setItem('fsms_ledger_lang', lang);
    }
  }

  getLedgerLang() {
    return this.ledgerLang;
  }

  t(key, params = {}, forcedLang = null) {
    const lang = forcedLang || this.currentLang;
    const dict = I18N_DICTIONARY[lang] || I18N_DICTIONARY.en;
    let str = dict[key] || I18N_DICTIONARY.en[key] || key;

    if (typeof str === 'string') {
      Object.keys(params).forEach(p => {
        str = str.replace(new RegExp(`\\{${p}\\}`, 'g'), params[p]);
      });
    }
    return str;
  }

  getMonthName(monthNumStr, full = false, forcedLang = null) {
    const lang = forcedLang || this.currentLang;
    const dict = I18N_DICTIONARY[lang] || I18N_DICTIONARY.en;
    const idx = parseInt(monthNumStr, 10) - 1;
    if (idx >= 0 && idx < 12) {
      return full ? dict.monthsFull[idx] : dict.monthsAbbr[idx];
    }
    return '';
  }

  getDayName(dayIdx, full = false, forcedLang = null) {
    const lang = forcedLang || this.currentLang;
    const dict = I18N_DICTIONARY[lang] || I18N_DICTIONARY.en;
    if (dayIdx >= 0 && dayIdx < 7) {
      return full ? dict.daysOfWeekFull[dayIdx] : dict.daysOfWeek[dayIdx];
    }
    return '';
  }

  getStatusLabel(status, forcedLang = null) {
    const lang = forcedLang || this.currentLang;
    const dict = I18N_DICTIONARY[lang] || I18N_DICTIONARY.en;
    switch (status) {
      case 'completed': return dict.completed;
      case 'cancelled': return dict.cancelled;
      case 'rescheduled': return dict.rescheduled;
      case 'scheduled': return dict.scheduled;
      default: return status;
    }
  }
}

window.i18n = new I18nManager();
