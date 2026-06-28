const { test, expect } = require('../../fixtures/session-room');
const { loginAndJoinRoom } = require('../../utils/auth-helper');
const { waitForRoomReady } = require('../../utils/wait-helpers');

test.use({
  permissions: ['camera', 'microphone'],
  launchOptions: { args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'] }
});

test('TC-LR-09 | Mentor starts and stops screen sharing', async ({ page, sessionRoom }) => {
  const { credentials, SESSION_ID } = sessionRoom;
  await loginAndJoinRoom(page, credentials.validUser.email, credentials.validUser.password, SESSION_ID);
  await waitForRoomReady(page);

  const shareBtn = page.locator('#toggleShare');
  await expect(shareBtn).not.toHaveClass(/active/);

  await shareBtn.click();
  await expect(shareBtn).toHaveClass(/active/, { timeout: 6000 });
  await expect(page.locator('.toast').first()).toContainText(/screen sharing active/i, { timeout: 5000 });

  await shareBtn.click();
  await expect(shareBtn).not.toHaveClass(/active/, { timeout: 5000 });
  await expect(page.locator('.toast').first()).toContainText(/screen sharing stopped/i, { timeout: 5000 });
});
