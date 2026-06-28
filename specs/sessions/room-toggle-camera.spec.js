const { test, expect } = require('../../fixtures/session-room');
const { loginAndJoinRoom } = require('../../utils/auth-helper');
const { waitForRoomReady } = require('../../utils/wait-helpers');

test.use({
  permissions: ['camera', 'microphone'],
  launchOptions: { args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'] }
});

test('TC-LR-08 | Mentor toggles camera off and back on', async ({ page, sessionRoom }) => {
  const { credentials, SESSION_ID } = sessionRoom;
  await loginAndJoinRoom(page, credentials.validUser.email, credentials.validUser.password, SESSION_ID);
  await waitForRoomReady(page);

  const camBtn = page.locator('#toggleCam');

  await expect(camBtn).not.toHaveClass(/off/);

  await camBtn.click();
  await expect(camBtn).toHaveClass(/off/);
  await expect(page.locator('.video-wrapper.local .avatar-placeholder')).toBeVisible();

  await camBtn.click();
  await expect(camBtn).not.toHaveClass(/off/);
});
