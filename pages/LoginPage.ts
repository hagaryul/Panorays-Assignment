import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ILoginPage } from "./interfaces/ILoginPage";

export class LoginPage extends BasePage implements ILoginPage {
  async goto(): Promise<void> {
    await this.page.goto(process.env.BASE_URL!);
    await this.waitForPageLoad();
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.locator("#username").fill(username);
    await this.page.getByRole("button", { name: "Next" }).click();
    await this.page.locator("#password").fill(password);
    await this.page.getByRole("button", { name: "Sign In" }).click();
    await this.waitForPageLoad();
  }

  async expectLoggedIn(): Promise<void> {
    await this.page.getByRole("combobox").waitFor({ timeout: 10000 });
    await expect(this.page.getByRole("combobox")).toBeVisible();
  }
}
