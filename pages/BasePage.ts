import { Page } from "@playwright/test";
import { IBasePage } from "./interfaces/IBasePage";

export class BasePage implements IBasePage {
  constructor(protected page: Page) {}

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }
}
