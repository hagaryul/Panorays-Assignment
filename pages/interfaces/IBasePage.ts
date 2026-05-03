export interface IBasePage {
  waitForPageLoad(): Promise<void>;
  getTitle(): Promise<string>;
}
