const { test, expect } = require('../../fixtures/logged-in-user');
const { getCredentials } = require('../../utils/data-reader');
const { deleteTestSessions } = require('../../utils/auth-helper');
const { openSessionModal } = require('../../utils/wait-helpers');
const { futureDateTimeLocal } = require('../../utils/date-helper');

test.describe('Live Session — Scheduling', () => {
  let credentials;

  test.beforeAll(async ({ request }) => {
    credentials = getCredentials();
    const loginRes = await request.post('/api/auth/login', {
      data: { email: credentials.validUser.email, password: credentials.validUser.password }
    });
    if (loginRes.ok()) {
      const { token } = await loginRes.json();
      await deleteTestSessions(request, token);
    }
  });

  test.afterEach(async ({ page, request }) => {
    const token = await page.evaluate(() => localStorage.getItem('token'));
    if (token) {
      await deleteTestSessions(request, token);
    }
  });

  test('TC-LS-03 | Schedule session with participant "fareed ahmed" invited', async ({ loggedInPage: page }) => {
    await openSessionModal(page);

    await page.locator('#sessionNameInput').fill('[TEST] Pair Review with Fareed');
    await page.locator('#sessionPurposeInput').fill('Code review session for the backend module');
    await page.locator('#sessionDateTimeInput').fill(futureDateTimeLocal(3, 10, 0));

    await page.locator('#sessionInviteInput').fill('fareed');
    await page.waitForTimeout(400); // debounce

    const resultsDropdown = page.locator('#userSearchResults');
    await expect(resultsDropdown).toBeVisible({ timeout: 5000 });
    await expect(resultsDropdown).toContainText('fareed ahmed');

    await resultsDropdown.locator('div').filter({ hasText: 'fareed ahmed' }).first().click();

    const selectedTag = page.locator('#selectedUsersContainer').locator('div').filter({ hasText: 'fareed ahmed' });
    await expect(selectedTag).toBeVisible();

    await page.locator('#submitCreateLiveSession').click();
    const successToast = page.locator('.toast.success, .toast:has-text("Session scheduled!")').first();
    await expect(successToast).toBeVisible({ timeout: 8000 });
  });
});
