// =========================================================
// FSMS Ledgal — Clean Empty State Initializer
// Zero demo data
// =========================================================

function getTodayISODate() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function createEmptyUserState(user = null) {
  const today = getTodayISODate();
  return {
    settings: {
      teacherName: user ? user.name : 'Guest',
      currency: user ? user.currency : '₽',
      theme: 'navy-gold',
      schoolName: 'FAVOURED LEDGAL',
      currentDate: today,
      reminderThresholdMinutes: 30
    },
    organisations: [],
    classes: [],
    recurringSchedules: [],
    payments: [],
    monthlyHistoricalTotals: {},
    lessons: []
  };
}

const DEFAULT_EMPTY_STATE = createEmptyUserState();
