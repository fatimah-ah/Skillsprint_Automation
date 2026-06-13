# SkillSprint Automation Framework

A robust, maintainable UI automation framework built with **Playwright + JavaScript** for testing the [SkillSprint](https://skillsprint-gdcfg9h6e4dxakcf.centralindia-01.azurewebsites.net) web application. It follows industry best practices including **Page Object Model (POM)**, **data-driven testing**, **global hooks**, **reusable utilities**, and **Allure reporting**.

---

## Architecture Diagram

```
SkillSprint_Automation/
├── playwright.config.js         ← Global config: baseURL, reporter, hooks
├── package.json                 ← Dependencies: Playwright, Allure, Winston
│
├── pages/                       ← PAGE OBJECT MODEL (POM)
│   ├── BasePage.js              ← Parent class (navigate, screenshot, wait)
│   ├── LandingPage.js           ← index.html locators & actions
│   ├── GetStartedPage.js        ← getstarted.html
│   ├── LoginPage.js             ← login.html
│   ├── DashboardPage.js         ← dashboard.html
│   ├── QuizPage.js              ← quiz.html
│   └── TaskPage.js              ← task.html
│
├── specs/                       ← TEST CASES (1 describe per file)
│   ├── landing/                 ← TC-01 to TC-10
│   ├── auth/                    ← TC-11 to TC-22
│   ├── quiz/                    ← TC-23 to TC-33
│   ├── tasks/                   ← TC-34 to TC-43
│   └── dashboard/               ← TC-44 to TC-53
│
├── data/                        ← TEST DATA (JSON, no hardcoded values in specs)
│   ├── credentials.json
│   ├── task-inputs.json
│   ├── quiz-config.json
│   ├── landing-content.json
│   ├── dashboard-content.json
│   └── routes.json
│
├── utils/                       ← UTILITIES LAYER
│   ├── logger.js                ← Winston logger (console + logs/run.log)
│   ├── config-reader.js         ← Reads baseURL, timeout, browser
│   ├── screenshot-helper.js     ← Auto-captures screenshots on failure
│   ├── data-reader.js           ← JSON parser for data/ folder
│   ├── wait-helpers.js          ← Custom explicit wait utilities
│   └── auth-helper.js           ← loginViaUI, loginViaStorage, clearSession
│
├── hooks/                       ← SETUP & TEARDOWN
│   ├── global-setup.js          ← Validates URL + generates auth-state.json
│   └── global-teardown.js       ← Logs suite end + triggers Allure report
│
├── fixtures/                    ← PLAYWRIGHT FIXTURES
│   ├── logged-in-user.js        ← Custom fixture: injects auth session
│   └── auth-state.json          ← Runtime-generated, gitignored
│
├── logs/                        ← RUNTIME LOGS (gitignored)
│   └── run.log
│
└── reports/                     ← TEST REPORTS (gitignored)
    ├── allure-results/
    ├── allure-report/
    └── playwright-report/
```

---

## Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later
- **Allure CLI** (optional, for HTML report): `npm install -g allure-commandline`

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/fatimah-ah/Skillsprint_Automation.git
cd Skillsprint_Automation
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install chromium
```

---

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run a specific spec folder

```bash
npx playwright test specs/landing/
npx playwright test specs/auth/
npx playwright test specs/quiz/
npx playwright test specs/tasks/
npx playwright test specs/dashboard/
```

### Run a specific test case

```bash
npx playwright test specs/landing/page-title.spec.js
```

### Run headed (visible browser)

```bash
npx playwright test --headed
```

---

## Viewing Reports

### Playwright HTML Report

```bash
npx playwright show-report reports/playwright-report
```

### Allure Report

```bash
# Generate the HTML report
npx allure generate reports/allure-results --clean -o reports/allure-report

# Open in browser
npx allure open reports/allure-report
```

> **Note:** The `global-teardown.js` hook automatically triggers Allure report generation after every test run.

---

## Test Coverage

| Suite       | TC Range   | Count | Description                                  |
|-------------|-----------|-------|----------------------------------------------|
| Landing     | TC-01–10  | 10    | UI elements, navigation, bento grid, footer  |
| Auth        | TC-11–22  | 12    | Login form, validation, auth guard           |
| Quiz        | TC-23–33  | 11    | Course grid, dialogs, quiz flow, search      |
| Tasks       | TC-34–43  | 10    | Form, priorities, subtasks, filters, calendar |
| Dashboard   | TC-44–53  | 10    | Sidebar, wallet, streak, reminders, search   |
| **Total**   |           | **53**|                                               |

---

## Framework Features

| Feature                  | Implementation                                    |
|--------------------------|---------------------------------------------------|
| Page Object Model        | `pages/` — one class per page, no assertions      |
| Data-Driven Testing      | `data/*.json` — all test inputs externalized      |
| Global Hooks             | `hooks/global-setup.js` + `global-teardown.js`    |
| Before/After Hooks       | Playwright `beforeEach`/`afterEach` via fixtures  |
| Allure Reporting         | `allure-playwright` reporter + auto-generation    |
| Playwright HTML Report   | Built-in `html` reporter                          |
| Screenshot on Failure    | `utils/screenshot-helper.js` in fixture           |
| Logging                  | `utils/logger.js` → console + `logs/run.log`      |
| Auth State Reuse         | `fixtures/logged-in-user.js` + `auth-state.json`  |
| Configuration            | `utils/config-reader.js`                          |
| Custom Wait Utilities    | `utils/wait-helpers.js`                           |
| Auth Helper              | `utils/auth-helper.js`                            |

---

## Project Structure Notes

- **No hardcoded values in spec files** — all inputs come from `data/*.json`
- **No assertions in page classes** — POM classes contain only locators and actions
- **`auth-state.json` is gitignored** — generated fresh each test run
- **Logs** are written to `logs/run.log` and are gitignored
- **Reports** are in `reports/` and are gitignored
