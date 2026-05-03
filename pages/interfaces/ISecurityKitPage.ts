export interface ISecurityKitPage {
  selectPage(pageName: string): Promise<void>;
  addItem(url: string, name: string): Promise<void>;
  expectItemVisible(name: string): Promise<void>;
}
