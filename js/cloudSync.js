// =========================================================
// FSMS Ledgal — Cloud Sync & Backup Manager
// Multi-Tier Cloud Backup with Safe Storage Support
// =========================================================

class CloudSyncManager {
  constructor() {
    this.CONFIG_KEY = 'fsms_cloud_config_v1';
    this.config = {
      syncKey: this.storage().getItem('fsms_sync_key') || this.generateDefaultSyncKey(),
      autoSync: this.storage().getItem('fsms_auto_sync') === 'true',
      lastSyncedAt: this.storage().getItem('fsms_last_synced') || null,
      provider: this.storage().getItem('fsms_cloud_provider') || 'builtin',
      supabaseUrl: this.storage().getItem('fsms_supabase_url') || '',
      supabaseKey: this.storage().getItem('fsms_supabase_key') || ''
    };
  }

  storage() {
    return window.safeStorage || localStorage;
  }

  generateDefaultSyncKey() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let rand = '';
    for (let i = 0; i < 6; i++) {
      rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const defaultKey = `vault-${rand.toLowerCase()}`;
    this.storage().setItem('fsms_sync_key', defaultKey);
    return defaultKey;
  }

  saveConfig(updates) {
    this.config = { ...this.config, ...updates };
    this.storage().setItem('fsms_sync_key', this.config.syncKey);
    this.storage().setItem('fsms_auto_sync', this.config.autoSync ? 'true' : 'false');
    this.storage().setItem('fsms_cloud_provider', this.config.provider);
    if (this.config.supabaseUrl) this.storage().setItem('fsms_supabase_url', this.config.supabaseUrl);
    if (this.config.supabaseKey) this.storage().setItem('fsms_supabase_key', this.config.supabaseKey);
  }

  setLastSynced(isoStr) {
    this.config.lastSyncedAt = isoStr;
    this.storage().setItem('fsms_last_synced', isoStr);
  }

  // --- 1. BACKUP TO CLOUD ---
  async backupToCloud(customSyncKey = null) {
    const key = (customSyncKey || this.config.syncKey || 'default').trim().toLowerCase();
    const dataToBackup = window.fsmsStore.state;

    if (this.config.provider === 'supabase' && this.config.supabaseUrl && this.config.supabaseKey) {
      return await this.backupToSupabase(key, dataToBackup);
    }

    try {
      const response = await fetch('/api/sync/backup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          syncKey: key,
          data: dataToBackup
        })
      });

      if (!response.ok) {
        throw new Error(`Cloud server returned HTTP ${response.status}`);
      }

      const res = await response.json();
      if (res.status === 'success') {
        const nowIso = new Date().toISOString();
        this.setLastSynced(nowIso);
        return { success: true, timestamp: nowIso, size: res.size, syncKey: key };
      } else {
        throw new Error(res.message || 'Cloud backup failed');
      }
    } catch (err) {
      console.warn('Built-in sync endpoint unreachable, creating local cloud snapshot:', err);
      this.storage().setItem(`fsms_cloud_snapshot_${key}`, JSON.stringify({
        timestamp: new Date().toISOString(),
        data: dataToBackup
      }));
      const nowIso = new Date().toISOString();
      this.setLastSynced(nowIso);
      return { success: true, timestamp: nowIso, fallback: true, syncKey: key };
    }
  }

  // --- 2. RESTORE FROM CLOUD ---
  async restoreFromCloud(customSyncKey = null) {
    const key = (customSyncKey || this.config.syncKey || 'default').trim().toLowerCase();

    if (this.config.provider === 'supabase' && this.config.supabaseUrl && this.config.supabaseKey) {
      return await this.restoreFromSupabase(key);
    }

    try {
      const response = await fetch(`/api/sync/restore?syncKey=${encodeURIComponent(key)}`);
      if (!response.ok) {
        if (response.status === 404) {
          const localSnap = this.storage().getItem(`fsms_cloud_snapshot_${key}`);
          if (localSnap) {
            const parsed = JSON.parse(localSnap);
            window.fsmsStore.state = parsed.data;
            window.fsmsStore.save();
            return { success: true, timestamp: parsed.timestamp, source: 'snapshot' };
          }
          throw new Error(`No backup found in cloud for key "${key}"`);
        }
        throw new Error(`Cloud restore error: HTTP ${response.status}`);
      }

      const res = await response.json();
      if (res.status === 'success' && res.backup && res.backup.data) {
        window.fsmsStore.state = res.backup.data;
        window.fsmsStore.save();
        this.setLastSynced(res.backup.timestamp || new Date().toISOString());
        return { success: true, timestamp: res.backup.timestamp, data: res.backup.data };
      } else {
        throw new Error(res.message || 'Invalid backup payload returned');
      }
    } catch (err) {
      const localSnap = this.storage().getItem(`fsms_cloud_snapshot_${key}`);
      if (localSnap) {
        const parsed = JSON.parse(localSnap);
        window.fsmsStore.state = parsed.data;
        window.fsmsStore.save();
        return { success: true, timestamp: parsed.timestamp, source: 'snapshot' };
      }
      throw err;
    }
  }

  // --- 3. SUPABASE CLOUD REST SYNC ---
  async backupToSupabase(syncKey, data) {
    const endpoint = `${this.config.supabaseUrl.replace(/\/$/, '')}/rest/v1/ledgal_backups`;
    const payload = {
      sync_key: syncKey,
      backup_data: data,
      updated_at: new Date().toISOString()
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': this.config.supabaseKey,
        'Authorization': `Bearer ${this.config.supabaseKey}`,
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Supabase error (${response.status}): ${errText}`);
    }

    const nowIso = new Date().toISOString();
    this.setLastSynced(nowIso);
    return { success: true, timestamp: nowIso, provider: 'supabase' };
  }

  async restoreFromSupabase(syncKey) {
    const endpoint = `${this.config.supabaseUrl.replace(/\/$/, '')}/rest/v1/ledgal_backups?sync_key=eq.${encodeURIComponent(syncKey)}&select=*`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'apikey': this.config.supabaseKey,
        'Authorization': `Bearer ${this.config.supabaseKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Supabase error: HTTP ${response.status}`);
    }

    const rows = await response.json();
    if (!rows || rows.length === 0) {
      throw new Error(`No backup found on Supabase for key "${syncKey}"`);
    }

    const latest = rows[0];
    if (latest && latest.backup_data) {
      window.fsmsStore.state = latest.backup_data;
      window.fsmsStore.save();
      this.setLastSynced(latest.updated_at || new Date().toISOString());
      return { success: true, timestamp: latest.updated_at, data: latest.backup_data };
    }
    throw new Error('Invalid Supabase record format');
  }

  // --- 4. SHARE TO TELEGRAM / GOOGLE DRIVE / ICLOUD ---
  async shareToCloudMessengers() {
    const dataStr = JSON.stringify(window.fsmsStore.state, null, 2);
    const dateStr = new Date().toISOString().split('T')[0];
    const fileName = `fsms_ledgal_cloud_backup_${dateStr}.json`;

    if (navigator.share) {
      try {
        const file = new File([dataStr], fileName, { type: 'application/json' });
        await navigator.share({
          title: 'FSMS Ledgal Backup',
          text: `FSMS Ledgal Backup (${dateStr}) — Save to Telegram Saved Messages or Google Drive.`,
          files: [file]
        });
        return { success: true, method: 'share' };
      } catch (e) {
        if (e.name !== 'AbortError') {
          this.downloadJsonFile(dataStr, fileName);
        }
      }
    } else {
      this.downloadJsonFile(dataStr, fileName);
      return { success: true, method: 'download' };
    }
  }

  downloadJsonFile(content, fileName) {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  triggerAutoSync() {
    if (this.config.autoSync && window.authManager && !window.authManager.isGuest()) {
      this.backupToCloud().catch(err => {
        console.log('Background auto-sync skipped:', err);
      });
    }
  }
}

window.cloudSync = new CloudSyncManager();
