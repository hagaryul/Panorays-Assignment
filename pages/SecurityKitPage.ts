import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ISecurityKitPage } from "./interfaces/ISecurityKitPage";

export class SecurityKitPage extends BasePage implements ISecurityKitPage {
  async selectPage(pageName: string): Promise<void> {
    await this.page.goto(process.env.BASE_URL!);
    await this.waitForPageLoad();
    await this.page.locator('[data-ptaction="menuSelect"]').click();
    await this.page.getByRole("option", { name: pageName }).click();
    await this.waitForPageLoad();
  }

  async addItem(url: string, name: string): Promise<void> {
    await this.page
      .locator('[data-ptaction="privacyAndComplianceTitleContainer"]')
      .click();
    await this.page
      .locator('[data-ptaction="privacyAndComplianceTileContainer"]')
      .waitFor();
    await this.page.getByRole("button", { name: /GDPR/ }).click();
    await this.page
      .locator('[data-ptaction="popoverAddBtn"]')
      .waitFor({ timeout: 10000 });
    await this.page.locator('[data-ptaction="popoverAddBtn"]').click();
    await this.page
      .getByRole("textbox", { name: "https://wwww.example.com" })
      .fill(url);
    await this.page.locator('input[name="name"]').fill(name);
    await this.page.locator('[data-ptaction="popoverSubmitBtn"]').click();
    await this.waitForPageLoad();
  }
  async expectItemVisible(name: string): Promise<void> {
    await expect(this.page.getByText(name)).toBeVisible();
  }
  async cleanup(): Promise<void> {
    const deleteBtn = this.page.locator(
      '[data-ptaction="privacyAndComplianceTitleDeleteBtn"]',
    );
    const isVisible = await deleteBtn.isVisible();
    if (isVisible) {
      await deleteBtn.click();
      await this.page.getByRole("button", { name: "Delete" }).click();
      await this.waitForPageLoad();
    }
  }
}
