export interface ILoginPage {
  goto(): Promise<void>;
  login(username: string, password: string): Promise<void>;
  expectLoggedIn(): Promise<void>;
}
