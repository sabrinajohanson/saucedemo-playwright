import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {

  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to login page
    await loginPage.goto();

    // Login with valid credentials
    await loginPage.login('standard_user', 'secret_sauce');

    // After login, URL should change to inventory page
    await expect(page).toHaveURL('/inventory.html');
  });

  test('should show error with locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    // Should show error message
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('locked out');
  });

  test('should show error with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('invalid_user', 'invalid_pass');

    // Should show error message
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username and password do not match');
  });

});