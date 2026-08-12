// =========================================================
// FSMS Ledgal — 1 User per Device Authentication Manager
// Guest Mode by default -> Sign In / Sign Up to save & sync
// =========================================================

class AuthManager {
  constructor() {
    this.STORAGE_DEVICE_USER = 'fsms_device_user_account';
    this.currentUser = null;
    this.init();
  }

  storage() {
    return window.safeStorage || localStorage;
  }

  init() {
    try {
      const savedUser = this.storage().getItem(this.STORAGE_DEVICE_USER);
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
      } else {
        this.currentUser = null; // Guest mode by default
      }
    } catch (e) {
      console.error('Error loading device user:', e);
      this.currentUser = null;
    }
  }

  isGuest() {
    return !this.currentUser;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  hashPassword(password) {
    let hash = 0;
    const str = 'fsms_device_salt_' + password;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return 'h_' + Math.abs(hash).toString(16);
  }

  register(name, email, password, currency = '₽', language = 'en') {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    
    if (!cleanName) {
      throw new Error(window.i18n?.getLang() === 'ru' ? 'Пожалуйста, укажите ваше имя' : 'Please enter your name');
    }
    if (!cleanEmail) {
      throw new Error(window.i18n?.getLang() === 'ru' ? 'Пожалуйста, укажите email или логин' : 'Please enter your email or username');
    }
    if (!password || password.length < 3) {
      throw new Error(window.i18n?.getLang() === 'ru' ? 'Пароль должен содержать не менее 3 символов' : 'Password must be at least 3 characters');
    }

    const initials = cleanName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'US';
    const newUser = {
      id: 'usr_' + Date.now(),
      name: cleanName,
      email: cleanEmail,
      passwordHash: this.hashPassword(password),
      currency: currency || '₽',
      language: language || 'en',
      initials: initials,
      avatarColor: '#D4AF37',
      registeredAt: new Date().toISOString()
    };

    this.currentUser = newUser;
    this.storage().setItem(this.STORAGE_DEVICE_USER, JSON.stringify(newUser));

    if (window.i18n && language) {
      window.i18n.setLang(language);
    }

    if (window.fsmsStore) {
      window.fsmsStore.initForUser(newUser);
    }

    return newUser;
  }

  login(email, password) {
    const cleanEmail = email.trim().toLowerCase();
    const hash = this.hashPassword(password);

    const savedUserStr = this.storage().getItem(this.STORAGE_DEVICE_USER);
    if (savedUserStr) {
      const savedUser = JSON.parse(savedUserStr);
      if (savedUser.email.toLowerCase() === cleanEmail && savedUser.passwordHash === hash) {
        this.currentUser = savedUser;
        if (window.fsmsStore) window.fsmsStore.initForUser(savedUser);
        return savedUser;
      }
    }

    const cleanName = cleanEmail.split('@')[0];
    const initials = cleanName.slice(0, 2).toUpperCase() || 'US';
    const newUser = {
      id: 'usr_' + Date.now(),
      name: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
      email: cleanEmail,
      passwordHash: hash,
      currency: '₽',
      language: window.i18n ? window.i18n.getLang() : 'en',
      initials: initials,
      avatarColor: '#D4AF37',
      registeredAt: new Date().toISOString()
    };

    this.currentUser = newUser;
    this.storage().setItem(this.STORAGE_DEVICE_USER, JSON.stringify(newUser));
    if (window.fsmsStore) window.fsmsStore.initForUser(newUser);
    return newUser;
  }

  logout() {
    this.currentUser = null;
    this.storage().removeItem(this.STORAGE_DEVICE_USER);
    if (window.fsmsStore) {
      window.fsmsStore.initForUser(null);
    }
  }

  updateProfile(updates) {
    if (!this.currentUser) return null;
    if (updates.name) {
      updates.initials = updates.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'US';
    }
    this.currentUser = { ...this.currentUser, ...updates };
    this.storage().setItem(this.STORAGE_DEVICE_USER, JSON.stringify(this.currentUser));
    
    if (window.fsmsStore) {
      window.fsmsStore.updateSettings({
        teacherName: this.currentUser.name,
        currency: this.currentUser.currency
      });
    }
    return this.currentUser;
  }
}

window.authManager = new AuthManager();
