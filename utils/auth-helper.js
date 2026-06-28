const path = require('path');
const fs = require('fs');

const AUTH_STATE_PATH = path.join(__dirname, '../fixtures/auth-state.json');
const BASE_URL = 'https://skillsprint-gdcfg9h6e4dxakcf.centralindia-01.azurewebsites.net';

async function loginViaUI(page, email, password) {
  await page.goto(`${BASE_URL}/login.html`, { waitUntil: 'domcontentloaded' });
  await page.fill('#email, input[type="email"], input[name="email"]', email);
  await page.fill('#password, input[type="password"], input[name="password"]', password);
  await page.click('button[type="submit"], .login-btn, button:has-text("Login"), button:has-text("Sign In")');
  await page.waitForURL('**/dashboard**', { timeout: 15000 }).catch(() => {});
}

async function loginViaStorage(page, token) {
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.evaluate((t) => {
    localStorage.setItem('token', t);
    localStorage.setItem('authToken', t);
    localStorage.setItem('jwt', t);
  }, token);
}

async function clearSession(page) {
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}

function getStorageStatePath() {
  if (fs.existsSync(AUTH_STATE_PATH)) {
    return AUTH_STATE_PATH;
  }
  return null;
}

async function loginAndJoinRoom(page, email, password, sessionId) {
  await loginViaUI(page, email, password);
  await page.goto(`${BASE_URL}/livevideo.html?sessionId=${sessionId}`);
}

async function deleteTestSessions(request, token, sessionPrefix = '[TEST]') {
  try {
    const res = await request.get('/api/live-sessions/my-schedule', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok()) return;
    const sessions = await res.json();
    for (const session of sessions) {
      const name = session.sessionName || '';
      if (
        name.startsWith(sessionPrefix) ||
        name.includes('Playwright') ||
        name.includes('Fareed') ||
        name.includes('Quick Sync') ||
        name.includes('Conflict') ||
        name.includes('Mentor Room')
      ) {
        await request.delete(`/api/live-sessions/${session._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    }
  } catch (e) {
    console.warn('[deleteTestSessions] Failed:', e.message);
  }
}

module.exports = {
  loginViaUI,
  loginViaStorage,
  clearSession,
  getStorageStatePath,
  AUTH_STATE_PATH,
  loginAndJoinRoom,
  deleteTestSessions
};

