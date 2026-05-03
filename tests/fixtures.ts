import { Page } from "@playwright/test";
import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { SecurityKitPage } from "../pages/SecurityKitPage";

type MyFixtures = {
  loginPage: LoginPage;
  loggedInPage: Page;
  securityKitPage: SecurityKitPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  loggedInPage: async ({ page }, use) => {
    await page.goto(process.env.BASE_URL!);
    await use(page);
  },
  securityKitPage: async ({ page }, use) => {
    await use(new SecurityKitPage(page));
  },
});

export { expect } from "@playwright/test";
