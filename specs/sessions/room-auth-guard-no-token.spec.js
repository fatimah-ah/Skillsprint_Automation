const { test, expect } = require('@playwright/test');
const { getCredentials } = require('../../utils/data-reader');
const { deleteTestSessions } = require('../../utils/auth-helper');

test.describe('Live Session Room — Auth Guard', () => {
  let credentials;
  let SESSION_ID;

  test.beforeAll(async ({ request }) => {
    credentials = getCredentials();
    const loginRes = await request.post('/api/auth/login', {
      data: { email: credentials.validUser.email, password: credentials.validUser.password }
    });
    const { token } = await loginRes.json();
    await deleteTestSessions(request, token);

    const futureTime = new Date(Date.now() + 2 * 60 * 1000).toISOString();
    const res = await request.post('/api/live-sessions/create', {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        sessionName:       '[TEST] Auth Guard Room',
        purpose:           'Testing room protection',
        durationMinutes:   30,
        scheduledDateTime: futureTime,
        invitedUserIds:    []
      }
    });
    const body = await res.json();
    SESSION_ID = body.data?._id || body.session?._id || body._id;
  });

  test.afterAll(async ({ request }) => {
    if (!SESSION_ID) return;
    const loginRes = await request.post('/api/auth/login', {
      data: { email: credentials.validUser.email, password: credentials.validUser.password }
    });
    const { token } = await loginRes.json();
    await request.delete(`/api/live-sessions/${SESSION_ID}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  });

  test('TC-LR-01 | Unauthenticated access redirects to login', async ({ page }) => {
    await page.goto('/login.html');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.goto(`/livevideo.html?sessionId=${SESSION_ID}`);
    await expect(page).toHaveURL(/login\.html/, { timeout: 8000 });
  });
});
