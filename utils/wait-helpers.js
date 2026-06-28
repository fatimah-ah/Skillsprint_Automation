
const { expect } = require('@playwright/test');

async function waitForElement(page, selector, timeout = 10000) {
  await page.waitForSelector(selector, { state: 'visible', timeout });
}

async function waitForToast(page, selector = '.toast, .alert, [class*="toast"], [class*="alert"], [class*="notification"]', timeout = 8000) {
  await page.waitForSelector(selector, { state: 'visible', timeout });
}

async function waitForOverlayGone(page, selector = '.overlay, .spinner, .loading, [class*="overlay"]', timeout = 10000) {
  try {
    await page.waitForSelector(selector, { state: 'hidden', timeout });
  } catch (_) {
    // Overlay may not exist at all, which is fine
  }
}

async function waitForNetworkIdle(page, timeout = 15000) {
  await page.waitForLoadState('networkidle', { timeout });
}

async function waitForNavigation(page, timeout = 15000) {
  await page.waitForLoadState('domcontentloaded', { timeout });
}

async function waitForRoomReady(page) {
  await expect(page.locator('#sessionName'))
    .not.toHaveText('Session Name', { timeout: 15000 });
}

async function openChatPanel(page) {
  await page.locator('#toggleChat').click();
  await expect(page.locator('#chatPanel')).toBeVisible({ timeout: 4000 });
}

async function openParticipantsPanel(page) {
  await page.locator('#toggleParticipants').click();
  await expect(page.locator('#rightPanel')).toBeVisible({ timeout: 4000 });
}

async function openSessionModal(page) {
  await page.locator('#createBtn').click();
  const createMenu = page.locator('#floatingCreateMenu');
  await expect(createMenu).toBeVisible({ timeout: 5000 });
  await page.locator('#btnCreateLiveSession').click();
  const modal = page.locator('#createLiveSessionModal');
  await expect(modal).toHaveClass(/active/, { timeout: 5000 });
  await expect(page.locator('#sessionNameInput')).toBeVisible();
}

module.exports = {
  waitForElement,
  waitForToast,
  waitForOverlayGone,
  waitForNetworkIdle,
  waitForNavigation,
  waitForRoomReady,
  openChatPanel,
  openParticipantsPanel,
  openSessionModal
};

