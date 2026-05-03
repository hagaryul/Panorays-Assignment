import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ISecurityKitPage } from "./interfaces/ISecurityKitPage";
import { ELEMENT_TIMEOUT } from "../utils/constants";

export class SecurityKitPage extends BasePage implements ISecurityKitPage {
  async selectPage(pageName: string): Promise<void> {
    await this.page.goto(process.env.BASE_URL!);
    await this.waitForPageLoad();
    await this.page.locator('[data-ptaction="menuSelect"]').click();
    await this.page.getByRole("option", { name: pageName }).click();
    await this.waitForPageLoad();
  }

  async openPrivacySection(): Promise<void> {
    const isOpen = await this.page
      .locator('[data-ptaction="privacyAndComplianceArrowUp"]')
      .isVisible();
    if (!isOpen) {
      await this.page
        .locator('[data-ptaction="privacyAndComplianceTitleContainer"]')
        .click();
    }
  }

  async clearGdprArtifacts(): Promise<void> {
    const gdprExists = await this.page
      .locator('[data-ptaction="privacyAndComplianceTitleDeleteBtn"]')
      .isVisible();
    if (gdprExists) {
      await this.page
        .locator('[data-ptaction="privacyAndComplianceTitleDeleteBtn"]')
        .click();
      await this.page
        .locator('[data-ptaction="removeArtifactRemoveBtn"]')
        .click();
      await this.waitForPageLoad();
    }
  }

  async addItem(url: string, name: string): Promise<void> {
    await this.page.keyboard.press("Escape");
    await this.page
      .locator('[data-ptaction="privacyAndComplianceAddBtn"]')
      .click();
    await this.page.getByRole("button", { name: /GDPR/ }).click();
    await this.page.getByLabel("add").click();
    await this.page.locator('input[name="link"]').fill(url);
    await this.page.locator('input[name="name"]').fill(name);
    await this.page.locator('[data-ptaction="popoverSubmitBtn"]').click();
    await this.waitForPageLoad();
  }

  async expectItemVisible(name: string): Promise<void> {
    await expect(
      this.page.locator('[data-ptaction="GDPRTileControlArtifact"]'),
    ).toBeVisible({ timeout: ELEMENT_TIMEOUT });
  }

  async expectItemCount(count: number): Promise<void> {
    await expect(
      this.page.locator('[data-ptaction="GDPRTileControlArtifact"]'),
    ).toHaveCount(count, { timeout: ELEMENT_TIMEOUT });
  }
}
