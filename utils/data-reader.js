const fs = require('fs');
const path = require('path');

function read(filename) {
  const filePath = path.join(__dirname, '../data', filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Data file not found: ${filePath}`);
  }
  const rawData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(rawData);
}

function getCredentials() {
  return read('credentials.json');
}

function getTasks() {
  return read('task-inputs.json');
}

function getQuizConfig() {
  return read('quiz-config.json');
}

function getLandingContent() {
  return read('landing-content.json');
}

function getDashboardContent() {
  return read('dashboard-content.json');
}

function getRoutes() {
  return read('routes.json');
}

module.exports = {
  read,
  getCredentials,
  getTasks,
  getQuizConfig,
  getLandingContent,
  getDashboardContent,
  getRoutes
};
