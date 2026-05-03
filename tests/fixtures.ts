import { test as base } from "@playwright/test";
import { SecurityKitPage } from "../pages/SecurityKitPage";

type MyFixtures = {
  securityKitPage: SecurityKitPage;
};

export const test = base.extend<MyFixtures>({
  securityKitPage: async ({ page }, use) => {
    const securityKitPage = new SecurityKitPage(page);
    await use(securityKitPage);
  },
});

export { expect } from "@playwright/test";
