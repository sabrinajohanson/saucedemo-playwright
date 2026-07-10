import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
});

test.describe('Checkout', () => {

  test('should complete full purchase flow', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await cartPage.goto();
    await cartPage.checkout();

    await checkoutPage.fillPersonalInfo('Sabrina', 'Johanson', '89201');
    await checkoutPage.finish();

    const confirmation = await checkoutPage.getConfirmationMessage();
    expect(confirmation).toContain('Thank you');
  });

  test('should show error when first name is missing', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await cartPage.goto();
    await cartPage.checkout();

    await checkoutPage.fillPersonalInfo('', 'Johanson', '89201');

    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('First Name is required');
  });

  test('should show error when last name is missing', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await cartPage.goto();
    await cartPage.checkout();

    await checkoutPage.fillPersonalInfo('Sabrina', '', '89201');

    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('Last Name is required');
  });

  test('should show error when postal code is missing', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await cartPage.goto();
    await cartPage.checkout();

    await checkoutPage.fillPersonalInfo('Sabrina', 'Johanson', '');

    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('Postal Code is required');
  });

  test('should show correct item in order summary', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await cartPage.goto();
    await cartPage.checkout();
    await checkoutPage.fillPersonalInfo('Sabrina', 'Johanson', '89201');

    const count = await checkoutPage.getSummaryItemCount();
    expect(count).toBe(1);
  });

});