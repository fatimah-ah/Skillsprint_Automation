const { test, expect } = require('@playwright/test');
const { getCredentials } = require('../../utils/data-reader');
const { loginViaUI } = require('../../utils/auth-helper');
const { waitForRoomReady } = require('../../utils/wait-helpers');

test.describe('Live Session — E2E Lifecycle', () => {
  let credentials;
  let createdSessionId;

  test.beforeAll(async ({ request }) => {
    credentials = getCredentials();
    try {
      const loginRes = await request.post('/api/auth/login', {
        data: { email: credentials.validUser.email, password: credentials.validUser.password }
      });
      if (loginRes.ok()) {
        const { token } = await loginRes.json();
        const scheduleRes = await request.get('/api/live-sessions/my-schedule', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (scheduleRes.ok()) {
          const sessions = await scheduleRes.json();
          for (const session of sessions) {
            const name = session.sessionName || '';
            if (name.includes('E2E Live Session') || name.startsWith('[TEST]')) {
              await request.delete(`/api/live-sessions/${session._id}`, {
                headers: { Authorization: `Bearer ${token}` }
              });
            }
          }
        }
      }
    } catch (e) {
      console.warn('[beforeAll] cleanup failed:', e.message);
    }
  });

  test.afterAll(async ({ request }) => {
    if (!createdSessionId) return;
    try {
      const loginRes = await request.post('/api/auth/login', {
        data: { email: credentials.validUser.email, password: credentials.validUser.password }
      });
      if (loginRes.ok()) {
        const { token } = await loginRes.json();
        await request.delete(`/api/live-sessions/${createdSessionId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (e) {
      console.warn('[afterAll] cleanup failed:', e.message);
    }
  });

  test('TC-LR-E2E | Mentor schedules, joins, and ends a live session', async ({ page }) => {
    await loginViaUI(page, credentials.validUser.email, credentials.validUser.password);
    await expect(page).toHaveURL(/dashboard\.html/, { timeout: 10000 });

    await page.locator('#createBtn').click();
    const createMenu = page.locator('#floatingCreateMenu');
    await expect(createMenu).toBeVisible({ timeout: 5000 });
    await page.locator('#btnCreateLiveSession').click();

    const modal = page.locator('#createLiveSessionModal');
    await expect(modal).toHaveClass(/active/, { timeout: 5000 });

    await page.locator('#sessionNameInput').fill('[TEST] E2E Live Session Room');
    await page.locator('#sessionPurposeInput').fill('End to end validation of the live session lifecycle');
    await page.locator('#sessionDurationInput').fill('30');

    const futureTime = new Date(Date.now() + 2 * 60 * 1000);
    const pad = n => String(n).padStart(2, '0');
    const futureStr = `${futureTime.getFullYear()}-${pad(futureTime.getMonth()+1)}-${pad(futureTime.getDate())}T${pad(futureTime.getHours())}:${pad(futureTime.getMinutes())}`;
    await page.locator('#sessionDateTimeInput').fill(futureStr);

    const responsePromise = page.waitForResponse(response =>
      response.url().includes('/api/live-sessions') && response.status() === 201
    );

    await page.locator('#submitCreateLiveSession').click();

    const response = await responsePromise;
    const body = await response.json();
    createdSessionId = body.data?._id || body.session?._id || body._id;
    expect(createdSessionId).toBeDefined();

    const successToast = page.locator('.toast.success, .toast:has-text("Session scheduled!")').first();
    await expect(successToast).toBeVisible({ timeout: 8000 });

    await page.goto(`/livevideo.html?sessionId=${createdSessionId}`);
    await waitForRoomReady(page);

    await expect(page.locator('#sessionName')).toContainText('[TEST] E2E Live Session Room');
    await expect(page.locator('#localVideo')).toBeAttached();

    await page.locator('#navbarPrimaryAction').click();

    const dialog = page.locator('.confirm-dialog, .custom-dialog, [role="dialog"]').first();
    await expect(dialog).toBeVisible({ timeout: 5000 });
    const confirmBtn = dialog.locator('button').filter({ hasText: /end|yes|confirm/i }).first();
    await confirmBtn.click();

    await expect(page).toHaveURL(/dashboard\.html/, { timeout: 10000 });
  });
});
