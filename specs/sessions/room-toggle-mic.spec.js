const { test, expect } = require('../../fixtures/session-room');
const { loginAndJoinRoom } = require('../../utils/auth-helper');
const { waitForRoomReady } = require('../../utils/wait-helpers');

test.use({
  permissions: ['camera', 'microphone'],
  launchOptions: { args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'] }
});

test('TC-LR-07 | Mentor toggles microphone off and back on', async ({ page, sessionRoom }) => {
  const { credentials, SESSION_ID } = sessionRoom;
  await loginAndJoinRoom(page, credentials.validUser.email, credentials.validUser.password, SESSION_ID);
  await waitForRoomReady(page);

  const micBtn = page.locator('#toggleMic');

  await expect(micBtn).not.toHaveClass(/off/);

  await micBtn.click();
  await expect(micBtn).toHaveClass(/off/);

  await micBtn.click();
  await expect(micBtn).not.toHaveClass(/off/);
});
