export interface ISecurityKitPage {
  selectPage(pageName: string): Promise<void>;
  openPrivacySection(): Promise<void>;
  clearGdprArtifacts(): Promise<void>;
  addItem(url: string, name: string): Promise<void>;
  expectItemVisible(name: string): Promise<void>;
  expectItemCount(count: number): Promise<void>;
}
