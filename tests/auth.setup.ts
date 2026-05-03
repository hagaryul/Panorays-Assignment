import { test as setup } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

setup("authenticate", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
  await loginPage.expectLoggedIn();
  await page.context().storageState({ path: ".auth/session.json" });
});
