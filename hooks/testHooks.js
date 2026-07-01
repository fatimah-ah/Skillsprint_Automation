const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.BASE_URL || 'https://skillsprint-gdcfg9h6e4dxakcf.centralindia-01.azurewebsites.net';
const CREDENTIALS_PATH = path.join(__dirname, '../data/credentials.json');

function loadCredentials() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    throw new Error(`Credentials file not found: ${CREDENTIALS_PATH}`);
  }
  return JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
}

async function clearBrowserStorage(page) {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}

async function loginViaApi(request, credentials) {
  // `request` is already an APIRequestContext — use it directly
  const response = await request.post('/api/auth/login', {
    data: {
      email: credentials.validUser.email,
      password: credentials.validUser.password
    }
  });

  if (!response.ok()) {
    const body = await response.text();
    throw new Error(`API login failed: ${response.status()} ${body}`);
  }

  const payload = await response.json();
  return payload.token;
}

async function cleanupTestTasks(request, token, titlePrefix = 'Build Playwright Framework - ') {
  // `request` is already an APIRequestContext — use it directly
  const tasksRes = await request.get('/api/tasks', {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!tasksRes.ok()) {
    const body = await tasksRes.text();
    throw new Error(`Fetching tasks failed: ${tasksRes.status()} ${body}`);
  }

  const tasks = await tasksRes.json();
  for (const task of tasks) {
    if (task.title?.startsWith(titlePrefix)) {
      await request.delete(`/api/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
  }
}

async function cleanupTasksForUser(request, credentials, titlePrefix) {
  const token = await loginViaApi(request, credentials);
  await cleanupTestTasks(request, token, titlePrefix);
}

module.exports = {
  BASE_URL,
  loadCredentials,
  clearBrowserStorage,
  loginViaApi,
  cleanupTestTasks,
  cleanupTasksForUser
};
