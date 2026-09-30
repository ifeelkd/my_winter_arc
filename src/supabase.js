/* ═══════════════════════════════════════════════════════════════
   WINTER ARC 2026 — Supabase Integration (Offline-First)
   ═══════════════════════════════════════════════════════════════ */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL || 'https://jyfxuzmdxbjbwpagandq.supabase.co';
const SUPABASE_KEY  = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_keWQCPyKCrVNk2DnS47YrQ__YYvnaxh';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true },
});

// ─── Current Session Helper ────────────────────────────────────
export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data?.session ?? null;
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user ?? null;
}

// ─── Auth ──────────────────────────────────────────────────────
export async function signUp(email, password, displayName) {
  const { data, error } = await supabase.auth.signUp({
    email, password,
    options: { data: { display_name: displayName } },
  });
  if (error) throw error;
  return data;
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// ─── Profile ───────────────────────────────────────────────────
export async function fetchProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function upsertProfile(userId, updates) {
  const { error } = await supabase
    .from('profiles')
    .upsert({ id: userId, ...updates }, { onConflict: 'id' });
  if (error) console.warn('[Supabase] upsertProfile error:', error.message);
}

// ─── Daily Logs ────────────────────────────────────────────────
export async function fetchAllLogs(userId) {
  const { data, error } = await supabase
    .from('daily_logs')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data ?? [];
}

export async function upsertDayLog(userId, dayKey, dayData) {
  const { error } = await supabase
    .from('daily_logs')
    .upsert(
      {
        user_id: userId,
        day_key: dayKey,
        checklist:       dayData.checklist       ?? {},
        sets:            dayData.sets            ?? {},
        steps:           dayData.steps           ?? 0,
        energy:          dayData.energy          ?? null,
        mood:            dayData.mood            ?? null,
        win:             dayData.win             ?? '',
        selected_choice: dayData.selectedChoice  ?? null,
        completed:       dayData.completed       ?? false,
        updated_at:      new Date().toISOString(),
      },
      { onConflict: 'user_id,day_key' }
    );
  if (error) console.warn('[Supabase] upsertDayLog error:', error.message);
}

// ─── Cloud to localStorage Merge (on login) ────────────────────
export async function pullCloudToLocal(userId, storageKey) {
  try {
    const [logs, profile] = await Promise.all([
      fetchAllLogs(userId),
      fetchProfile(userId),
    ]);

    const local = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (!local.days) local.days = {};

    logs.forEach(log => {
      const existing = local.days[log.day_key] || {};
      local.days[log.day_key] = {
        checklist:      { ...existing.checklist,      ...(log.checklist       || {}) },
        sets:           { ...existing.sets,           ...(log.sets            || {}) },
        steps:          log.steps           ?? existing.steps           ?? 0,
        energy:         log.energy          ?? existing.energy          ?? null,
        mood:           log.mood            ?? existing.mood            ?? null,
        win:            log.win             || existing.win             || '',
        selectedChoice: log.selected_choice || existing.selectedChoice  || null,
        completed:      log.completed       ?? existing.completed       ?? false,
      };
    });

    if (profile) {
      if (profile.avatar)       local.avatar      = profile.avatar;
      if (profile.display_name) local.playerName  = profile.display_name;
    }

    localStorage.setItem(storageKey, JSON.stringify(local));
    return { logs, profile };
  } catch (err) {
    console.warn('[Supabase] pullCloudToLocal error:', err.message);
    return null;
  }
}

// ─── Fire-and-forget push helpers ──────────────────────────────
export function pushDayToCloud(userId, dayKey, dayData) {
  if (!userId) return;
  upsertDayLog(userId, dayKey, dayData).catch(() => {});
}

export function pushProfileToCloud(userId, profileData) {
  if (!userId) return;
  upsertProfile(userId, profileData).catch(() => {});
}
