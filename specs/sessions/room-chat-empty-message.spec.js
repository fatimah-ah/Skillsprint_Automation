const { test, expect } = require('../../fixtures/session-room');
const { loginAndJoinRoom } = require('../../utils/auth-helper');
const { waitForRoomReady, openChatPanel } = require('../../utils/wait-helpers');

test.use({
  permissions: ['camera', 'microphone'],
  launchOptions: { args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'] }
});

test('TC-LR-06 | Empty/whitespace chat message is not sent', async ({ page, sessionRoom }) => {
  const { credentials, SESSION_ID } = sessionRoom;
  await loginAndJoinRoom(page, credentials.validUser.email, credentials.validUser.password, SESSION_ID);
  await waitForRoomReady(page);
  await openChatPanel(page);

  const countBefore = await page.locator('#chatMessages .message').count();

  await page.locator('#chatInput').fill('     ');
  await page.locator('#sendChatBtn').click();

  await expect(page.locator('#chatMessages .message')).toHaveCount(countBefore);
});
