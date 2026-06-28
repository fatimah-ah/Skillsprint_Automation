const { test, expect } = require('../../fixtures/session-room');
const { loginAndJoinRoom } = require('../../utils/auth-helper');
const { waitForRoomReady } = require('../../utils/wait-helpers');

test.use({
  permissions: ['camera', 'microphone'],
  launchOptions: { args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'] }
});

test('TC-LR-03 | Room loads with session name, status tag, and local video', async ({ page, sessionRoom }) => {
  const { credentials, SESSION_ID } = sessionRoom;
  await loginAndJoinRoom(page, credentials.validUser.email, credentials.validUser.password, SESSION_ID);
  await waitForRoomReady(page);

  await expect(page.locator('#sessionName')).toContainText('[TEST] Playwright Mentor Room');
  await expect(page.locator('#sessionStatus')).toHaveText(/scheduled|live/i);
  await expect(page.locator('.video-wrapper.local')).toBeVisible();
  await expect(page.locator('#localVideo')).toBeAttached();
  await expect(page.locator('.video-wrapper.local .participant-name')).toContainText('You (Mentor)');
  await expect(page.locator('#sessionTimer')).toBeVisible();
  await expect(page.locator('#sessionTimer')).toHaveText('00:00');
});
