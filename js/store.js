// =========================================================
// FSMS Ledgal — Per-User Isolated State Store
// Zero demo data, safe storage fallback, 100% resilient
// =========================================================

class FSMSStore {
  constructor() {
    this.currentUserId = null;
    this.state = null;
    this.init();
  }

  storage() {
    return window.safeStorage || localStorage;
  }

  init() {
    const auth = window.authManager;
    const user = auth ? auth.getCurrentUser() : null;
    this.initForUser(user);
  }

  getStorageKey(userId) {
    return `fsms_user_${userId || 'guest'}_data_v3`;
  }

  initForUser(user) {
    if (user && user.id) {
      this.currentUserId = user.id;
      const key = this.getStorageKey(user.id);
      const saved = this.storage().getItem(key);
      
      if (saved) {
        try {
          this.state = JSON.parse(saved);
          if (!this.state.settings) this.state.settings = { teacherName: user.name, currency: user.currency || '₽', currentDate: getTodayISODate() };
          if (!this.state.organisations) this.state.organisations = [];
          if (!this.state.classes) this.state.classes = [];
          if (!this.state.recurringSchedules) this.state.recurringSchedules = [];
          if (!this.state.lessons) this.state.lessons = [];
          if (!this.state.payments) this.state.payments = [];
          if (!this.state.monthlyHistoricalTotals) this.state.monthlyHistoricalTotals = {};
        } catch (e) {
          console.error('Error loading user data:', e);
          this.state = createEmptyUserState(user);
          this.save();
        }
      } else {
        this.state = createEmptyUserState(user);
        this.save();
      }
    } else {
      this.currentUserId = null;
      this.state = createEmptyUserState(null);
    }
  }

  save() {
    if (!this.currentUserId || !this.state) return;
    try {
      const key = this.getStorageKey(this.currentUserId);
      this.storage().setItem(key, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save user data:', e);
    }
  }

  clearUserData() {
    if (this.currentUserId) {
      const key = this.getStorageKey(this.currentUserId);
      this.storage().removeItem(key);
      const user = window.authManager?.getCurrentUser();
      this.state = createEmptyUserState(user);
      this.save();
    }
  }

  getSettings() {
    return (this.state && this.state.settings) || { teacherName: 'Guest', currency: '₽', currentDate: getTodayISODate() };
  }

  updateSettings(updates) {
    if (!this.state) return;
    this.state.settings = { ...this.state.settings, ...updates };
    this.save();
  }

  getCurrentDate() {
    return (this.state && this.state.settings && this.state.settings.currentDate) || getTodayISODate();
  }

  setCurrentDate(dateStr) {
    if (this.state && this.state.settings) {
      this.state.settings.currentDate = dateStr;
      this.save();
    }
  }

  getCurrency() {
    return (this.state && this.state.settings && this.state.settings.currency) || '₽';
  }

  // --- ORGANISATIONS & CLASSES ---
  getOrganisations() {
    return (this.state && this.state.organisations) || [];
  }

  addOrganisation(name, defaultRate = 1000, color = '#3B82F6') {
    const cleanName = name.trim();
    if (!cleanName || !this.state) return null;
    
    if (!this.state.organisations) this.state.organisations = [];
    const existing = this.state.organisations.find(o => o.name.toLowerCase() === cleanName.toLowerCase());
    if (existing) return existing;

    const newOrg = {
      id: 'org-' + Date.now() + '-' + Math.floor(Math.random()*1000),
      name: cleanName,
      defaultRate: Number(defaultRate) || 1000,
      color: color || '#3B82F6'
    };
    this.state.organisations.push(newOrg);
    this.save();
    return newOrg;
  }

  getClasses(orgName = null) {
    if (!this.state || !this.state.classes) return [];
    if (!orgName || orgName === 'all' || orgName === 'All Organisations') {
      return this.state.classes;
    }
    return this.state.classes.filter(c => c.orgName && c.orgName.toLowerCase() === orgName.toLowerCase());
  }

  addClass(orgName, className, rate = 1000) {
    const cleanClass = className.trim();
    if (!cleanClass || !this.state) return null;
    const cleanOrg = orgName ? orgName.trim() : 'General';

    if (!this.state.classes) this.state.classes = [];
    const existing = this.state.classes.find(c =>
      c.name.toLowerCase() === cleanClass.toLowerCase() &&
      c.orgName.toLowerCase() === cleanOrg.toLowerCase()
    );
    if (existing) return existing;

    const badge = cleanClass.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'CL';
    const newClass = {
      id: 'cls-' + Date.now() + '-' + Math.floor(Math.random()*1000),
      orgName: cleanOrg,
      name: cleanClass,
      badge: badge,
      rate: Number(rate) || 1000,
      color: '#3B82F6'
    };
    this.state.classes.push(newClass);
    this.save();
    return newClass;
  }

  // --- RECURRING SCHEDULES ---
  getRecurringSchedules() {
    return (this.state && this.state.recurringSchedules) || [];
  }

  addRecurringSchedule(data) {
    if (!this.state) return null;
    if (!this.state.recurringSchedules) this.state.recurringSchedules = [];

    const badge = data.badge || (data.className ? data.className.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : 'SC');
    const newSched = {
      id: 'rec-' + Date.now() + '-' + Math.floor(Math.random()*1000),
      className: data.className,
      orgName: data.orgName,
      badge: badge,
      badgeColor: data.badgeColor || '#3B82F6',
      days: data.days || [1],
      daysLabel: data.daysLabel || 'Custom Days',
      startTime: data.startTime || '09:00',
      endTime: data.endTime || '10:00',
      rate: Number(data.rate) || 1000,
      active: data.active !== false
    };
    this.state.recurringSchedules.push(newSched);
    this.save();
    return newSched;
  }

  updateRecurringSchedule(id, updates) {
    if (!this.state || !this.state.recurringSchedules) return null;
    const index = this.state.recurringSchedules.findIndex(s => s.id === id);
    if (index !== -1) {
      this.state.recurringSchedules[index] = { ...this.state.recurringSchedules[index], ...updates };
      this.save();
      return this.state.recurringSchedules[index];
    }
    return null;
  }

  deleteRecurringSchedule(id) {
    if (!this.state || !this.state.recurringSchedules) return;
    this.state.recurringSchedules = this.state.recurringSchedules.filter(s => s.id !== id);
    this.save();
  }

  // --- LESSONS / ENTRIES ---
  getLessons(filter = {}) {
    if (!this.state || !this.state.lessons) return [];
    let list = [...this.state.lessons];

    if (filter.date) {
      list = list.filter(l => l.date === filter.date);
    }
    if (filter.month) {
      list = list.filter(l => l.date && l.date.startsWith(filter.month));
    }
    if (filter.orgName && filter.orgName !== 'all' && filter.orgName !== 'All Organisations') {
      list = list.filter(l => l.orgName && l.orgName.toLowerCase() === filter.orgName.toLowerCase());
    }
    if (filter.className && filter.className !== 'all' && filter.className !== 'All Classes') {
      list = list.filter(l => l.className && l.className.toLowerCase() === filter.className.toLowerCase());
    }
    if (filter.status && filter.status !== 'all' && filter.status !== 'All Statuses') {
      list = list.filter(l => l.status === filter.status);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(l =>
        (l.orgName && l.orgName.toLowerCase().includes(q)) ||
        (l.className && l.className.toLowerCase().includes(q)) ||
        (l.notes && l.notes.toLowerCase().includes(q))
      );
    }

    list.sort((a, b) => {
      if (a.date !== b.date) return b.date.localeCompare(a.date);
      return a.startTime.localeCompare(b.startTime);
    });

    return list;
  }

  getTodayLessons(targetDate = null) {
    const date = targetDate || this.getCurrentDate();
    let todayList = this.getLessons({ date });
    todayList.sort((a, b) => a.startTime.localeCompare(b.startTime));
    return todayList;
  }

  getTodaySummary(targetDate = null) {
    const lessons = this.getTodayLessons(targetDate);
    const totalCount = lessons.length;
    let expectedSum = 0;
    let completedSum = 0;
    let completedCount = 0;

    lessons.forEach(l => {
      expectedSum += Number(l.rate) || 0;
      if (l.status === 'completed') {
        completedSum += Number(l.rate) || 0;
        completedCount++;
      }
    });

    return {
      totalCount,
      completedCount,
      expectedSum,
      completedSum
    };
  }

  getUnconfirmedLessons() {
    if (!this.state || !this.state.lessons) return [];
    const today = this.getCurrentDate();
    return this.state.lessons.filter(l => {
      if (l.status !== 'scheduled') return false;
      return l.date < today;
    });
  }

  addLesson(data) {
    if (!this.state) return null;
    if (!this.state.lessons) this.state.lessons = [];

    const badge = data.badge || (data.className ? data.className.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : 'LS');
    const newLesson = {
      id: 'les-' + Date.now() + '-' + Math.floor(Math.random()*10000),
      date: data.date || this.getCurrentDate(),
      startTime: data.startTime || '09:00',
      endTime: data.endTime || '10:00',
      orgName: data.orgName || 'Individual',
      className: data.className || 'General Class',
      badge: badge,
      rate: Number(data.rate) || 1000,
      status: data.status || 'scheduled',
      notes: data.notes || '',
      rescheduledTo: data.rescheduledTo || null
    };

    if (data.orgName) this.addOrganisation(data.orgName, data.rate);
    if (data.orgName && data.className) this.addClass(data.orgName, data.className, data.rate);

    this.state.lessons.push(newLesson);
    this.save();
    return newLesson;
  }

  updateLesson(id, updates) {
    if (!this.state || !this.state.lessons) return null;
    const index = this.state.lessons.findIndex(l => l.id === id);
    if (index !== -1) {
      this.state.lessons[index] = { ...this.state.lessons[index], ...updates };
      this.save();
      return this.state.lessons[index];
    }
    return null;
  }

  markLessonStatus(id, status) {
    return this.updateLesson(id, { status });
  }

  markLessonDone(id) {
    return this.markLessonStatus(id, 'completed');
  }

  markLessonCancelled(id, notes = '') {
    const updates = { status: 'cancelled' };
    if (notes) updates.notes = notes;
    return this.updateLesson(id, updates);
  }

  rescheduleLesson(id, newDate, newStartTime = null, newEndTime = null, reason = '') {
    const oldLesson = this.state.lessons.find(l => l.id === id);
    if (!oldLesson) return null;

    const updatedNotes = oldLesson.notes ? `${oldLesson.notes} (Rescheduled to ${newDate})` : `Rescheduled to ${newDate}`;
    this.updateLesson(id, {
      status: 'rescheduled',
      rescheduledTo: newDate,
      notes: reason ? `${updatedNotes} - ${reason}` : updatedNotes
    });

    const newLesson = this.addLesson({
      date: newDate,
      startTime: newStartTime || oldLesson.startTime,
      endTime: newEndTime || oldLesson.endTime,
      orgName: oldLesson.orgName,
      className: oldLesson.className,
      badge: oldLesson.badge,
      rate: oldLesson.rate,
      status: 'scheduled',
      notes: `Rescheduled from ${oldLesson.date}`
    });

    return { oldLesson, newLesson };
  }

  deleteLesson(id) {
    if (!this.state || !this.state.lessons) return;
    this.state.lessons = this.state.lessons.filter(l => l.id !== id);
    this.save();
  }

  // --- PAYMENTS & LEDGER ---
  getPayments(month = null, orgName = null) {
    if (!this.state || !this.state.payments) return [];
    let list = [...this.state.payments];
    if (month && month !== 'all') {
      list = list.filter(p => p.month === month || (p.date && p.date.startsWith(month)));
    }
    if (orgName && orgName !== 'all' && orgName !== 'All Organisations') {
      list = list.filter(p => p.orgName && p.orgName.toLowerCase() === orgName.toLowerCase());
    }
    list.sort((a, b) => b.date.localeCompare(a.date));
    return list;
  }

  recordPayment(data) {
    if (!this.state) return null;
    if (!this.state.payments) this.state.payments = [];

    const payment = {
      id: 'pay-' + Date.now() + '-' + Math.floor(Math.random()*1000),
      month: data.month || getTodayISODate().slice(0, 7),
      orgName: data.orgName,
      amount: Number(data.amount) || 0,
      date: data.date || this.getCurrentDate(),
      method: data.method || 'Bank Transfer',
      notes: data.notes || ''
    };
    this.state.payments.push(payment);
    this.save();
    return payment;
  }

  getLedgerReport(month = null, orgName = 'all', className = 'all', statusFilter = 'completed') {
    const targetMonth = month || getTodayISODate().slice(0, 7);
    const filter = { month: targetMonth };
    if (orgName && orgName !== 'all' && orgName !== 'All Organisations') {
      filter.orgName = orgName;
    }
    if (className && className !== 'all' && className !== 'All Classes') {
      filter.className = className;
    }
    if (statusFilter && statusFilter !== 'all') {
      filter.status = statusFilter;
    }

    let lessons = this.getLessons(filter);
    
    lessons.sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.startTime.localeCompare(b.startTime);
    });

    let totalEarned = 0;
    lessons.forEach(l => {
      if (l.status === 'completed') {
        totalEarned += Number(l.rate) || 0;
      }
    });

    const payments = this.getPayments(targetMonth, orgName);
    let totalPaid = 0;
    payments.forEach(p => {
      totalPaid += Number(p.amount) || 0;
    });

    const outstanding = Math.max(0, totalEarned - totalPaid);

    return {
      month: targetMonth,
      orgName: orgName === 'all' ? 'All Organisations' : orgName,
      className: className === 'all' ? 'All Classes' : className,
      lessonsCount: lessons.length,
      completedLessonsCount: lessons.filter(l => l.status === 'completed').length,
      lessons,
      totalEarned,
      totalPaid,
      outstanding,
      isFullyPaid: totalPaid >= totalEarned && totalEarned > 0,
      payments
    };
  }

  getMonthlyOverview(month = null) {
    const targetMonth = month || getTodayISODate().slice(0, 7);
    const allMonthLessons = this.getLessons({ month: targetMonth });
    const completedMonthLessons = allMonthLessons.filter(l => l.status === 'completed');

    let totalEarned = 0;
    completedMonthLessons.forEach(l => {
      totalEarned += Number(l.rate) || 0;
    });

    const monthPayments = this.getPayments(targetMonth);
    let totalPaid = 0;
    monthPayments.forEach(p => {
      totalPaid += Number(p.amount) || 0;
    });

    const outstanding = Math.max(0, totalEarned - totalPaid);

    const orgBreakdown = {};
    const orgs = this.getOrganisations();

    orgs.forEach(org => {
      orgBreakdown[org.name] = {
        name: org.name,
        color: org.color || '#3B82F6',
        lessons: 0,
        earned: 0,
        paid: 0,
        due: 0
      };
    });

    completedMonthLessons.forEach(l => {
      const org = l.orgName;
      if (!orgBreakdown[org]) {
        orgBreakdown[org] = {
          name: org,
          color: '#3B82F6',
          lessons: 0,
          earned: 0,
          paid: 0,
          due: 0
        };
      }
      orgBreakdown[org].lessons += 1;
      orgBreakdown[org].earned += Number(l.rate) || 0;
    });

    monthPayments.forEach(p => {
      const org = p.orgName;
      if (!orgBreakdown[org]) {
        orgBreakdown[org] = {
          name: org,
          color: '#3B82F6',
          lessons: 0,
          earned: 0,
          paid: 0,
          due: 0
        };
      }
      orgBreakdown[org].paid += Number(p.amount) || 0;
    });

    Object.values(orgBreakdown).forEach(item => {
      item.due = Math.max(0, item.earned - item.paid);
    });

    return {
      month: targetMonth,
      totalLessons: completedMonthLessons.length,
      allLessonsCount: allMonthLessons.length,
      totalEarned,
      totalPaid,
      outstanding,
      byOrganisation: Object.values(orgBreakdown).filter(item => item.lessons > 0 || item.earned > 0 || item.paid > 0)
    };
  }

  getStatistics(year = null) {
    const targetYear = year || String(new Date().getFullYear());
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const monthlyData = [];

    months.forEach((m, idx) => {
      const monthKey = `${targetYear}-${m}`;
      const overview = this.getMonthlyOverview(monthKey);
      monthlyData.push({
        month: monthKey,
        label: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][idx],
        earned: overview.totalEarned,
        lessons: overview.totalLessons
      });
    });

    const currentMonthKey = getTodayISODate().slice(0, 7);
    const curOverview = this.getMonthlyOverview(currentMonthKey);
    const orgShares = curOverview.byOrganisation.map(item => {
      const pct = curOverview.totalEarned > 0 ? ((item.earned / curOverview.totalEarned) * 100).toFixed(1) : '0';
      return {
        name: item.name,
        earned: item.earned,
        percentage: parseFloat(pct),
        color: item.color
      };
    });

    const debtors = curOverview.byOrganisation.filter(o => o.due > 0);

    return {
      year: targetYear,
      currentMonthEarned: curOverview.totalEarned,
      currentMonthPaid: curOverview.totalPaid,
      currentMonthOutstanding: curOverview.outstanding,
      monthlyData,
      orgShares,
      debtorsCount: debtors.length,
      debtorsList: debtors
    };
  }

  generateRecurringLessonsForMonth(yearMonthStr) {
    if (!this.state || !this.state.lessons) return 0;
    const [year, month] = yearMonthStr.split('-').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    const recurring = this.getRecurringSchedules().filter(r => r.active);
    let createdCount = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month - 1, day);
      const dayOfWeek = dateObj.getDay();
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      recurring.forEach(sched => {
        if (sched.days && sched.days.includes(dayOfWeek)) {
          const exists = this.state.lessons.some(l =>
            l.date === dateStr &&
            l.startTime === sched.startTime &&
            l.className.toLowerCase() === sched.className.toLowerCase()
          );

          if (!exists) {
            this.state.lessons.push({
              id: 'les-gen-' + Date.now() + '-' + Math.floor(Math.random()*10000),
              date: dateStr,
              startTime: sched.startTime,
              endTime: sched.endTime,
              orgName: sched.orgName,
              className: sched.className,
              badge: sched.badge,
              rate: sched.rate,
              status: 'scheduled',
              notes: 'Auto-generated from recurring schedule'
            });
            createdCount++;
          }
        }
      });
    }

    if (createdCount > 0) {
      this.save();
    }
    return createdCount;
  }
}

window.fsmsStore = new FSMSStore();
