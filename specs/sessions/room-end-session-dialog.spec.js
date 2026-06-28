const { test, expect } = require('../../fixtures/session-room');
const { loginAndJoinRoom } = require('../../utils/auth-helper');
const { waitForRoomReady } = require('../../utils/wait-helpers');

test.use({
  permissions: ['camera', 'microphone'],
  launchOptions: { args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'] }
});

test('TC-LR-12 | Mentor End Session button triggers confirmation dialog', async ({ page, sessionRoom }) => {
  const { credentials, SESSION_ID } = sessionRoom;
  await loginAndJoinRoom(page, credentials.validUser.email, credentials.validUser.password, SESSION_ID);
  await waitForRoomReady(page);

  await page.locator('#navbarPrimaryAction').click();

  const dialog = page.locator('.confirm-dialog, .custom-dialog, [role="dialog"]');
  await expect(dialog).toBeVisible({ timeout: 5000 });
  await expect(dialog).toContainText(/end session/i);

  const cancelBtn = dialog.locator('button').filter({ hasText: /cancel|no/i });
  await cancelBtn.click();

  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/livevideo\.html/);
});
