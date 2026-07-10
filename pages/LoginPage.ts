import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private usernameInput = '[data-test="username"]';
  private passwordInput = '[data-test="password"]';
  private loginButton   = '[data-test="login-button"]';
  private errorMessage  = '[data-test="error"]';

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to the login page
  async goto() {
    await this.page.goto('/');
  }

  // Fill in credentials and click login
  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  // Get the error message text
  async getErrorMessage(): Promise<string> {
    return await this.page.locator(this.errorMessage).innerText();
  }
}