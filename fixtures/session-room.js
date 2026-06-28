const { test: base } = require('@playwright/test');
const { getCredentials } = require('../utils/data-reader');
const { deleteTestSessions } = require('../utils/auth-helper');

const test = base.extend({
  sessionRoom: [async ({ request }, use) => {
    const credentials = getCredentials();

    const loginRes = await request.post('/api/auth/login', {
      data: { email: credentials.validUser.email, password: credentials.validUser.password }
    });
    if (!loginRes.ok()) throw new Error(`[sessionRoom] Login failed: ${loginRes.status()}`);
    const { token } = await loginRes.json();

    await deleteTestSessions(request, token);

    const futureTime = new Date(Date.now() + 2 * 60 * 1000).toISOString();
    const res = await request.post('/api/live-sessions/create', {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        sessionName:       '[TEST] Playwright Mentor Room',
        purpose:           'Automated mentor-side room tests',
        durationMinutes:   60,
        scheduledDateTime: futureTime,
        invitedUserIds:    []
      }
    });
    if (!res.ok()) {
      const body = await res.text();
      throw new Error(`[sessionRoom] Create failed: ${res.status()} ${body}`);
    }
    const body = await res.json();
    const SESSION_ID = body.data?._id || body.session?._id || body._id;
    if (!SESSION_ID) throw new Error('[sessionRoom] Could not extract SESSION_ID');
    console.log('[sessionRoom] Created session:', SESSION_ID);

    await use({ credentials, SESSION_ID, token });

    await request.delete(`/api/live-sessions/${SESSION_ID}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('[sessionRoom] Deleted session:', SESSION_ID);
  }, { scope: 'worker' }]
});

module.exports = { test, expect: base.expect };
