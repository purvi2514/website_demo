const KEY = 'j_cli_session_v1';

export function setSession(data) {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch(e) { console.warn(e); }
}

export function getSession() {
  try { return JSON.parse(localStorage.getItem(KEY)); } catch(e) { return null; }
}

export function clearSession() {
  try { localStorage.removeItem(KEY); } catch(e) { }
}
