# Panorays Assignment — Playwright E2E Tests

Automated end-to-end tests for the Panorays Security Kit application.

## Setup

```bash
npm install
npx playwright install
```

Copy `.env.example` to `.env` and fill in your credentials:

```
BASE_URL=https://www.panoraysapp.com/security_kit/
USERNAME=your-email@example.com
PASSWORD=your-password
```

## Running Tests

```bash
# Run all projects (setup → critical → regression)
npx playwright test

# Critical tests only
npx playwright test --project=critical

# Regression tests only
npx playwright test --project=regression

# View the HTML report
npx playwright show-report
```

## Project Structure

```
pages/                  Page Object Model classes
  interfaces/           TypeScript interfaces for each POM
tests/
  data/                 Test data (TypeScript)
  fixtures.ts           Custom fixtures (loginPage, loggedInPage, securityKitPage)
  auth.setup.ts         Authentication setup — runs once before all tests
  securityKit.spec.ts   Security Kit test suite
utils/
  constants.ts          Shared constants (timeouts, etc.)
playwright.config.ts    Playwright configuration
```

## Test Projects

| Project    | Tag           | Timeout | Purpose                        |
| ---------- | ------------- | ------- | ------------------------------ |
| setup      | —             | default | Authenticate and save session  |
| critical   | `@critical`   | 30s     | Core happy-path flows          |
| regression | `@regression` | 60s     | Extended coverage + edge cases |
