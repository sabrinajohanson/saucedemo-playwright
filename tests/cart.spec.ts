import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage'

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
});

test.describe('Cart', () => {

  test('should show added product in cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Add product and go to cart
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await cartPage.goto();

    // Product should be in cart
    const names = await cartPage.getItemNames();
    expect(names).toContain('Sauce Labs Backpack');
  });

  test('should show correct number of items in cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Add two products and go to cart
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.addToCartByName('Sauce Labs Bike Light');
    await cartPage.goto();

    // Cart should have 2 items
    const count = await cartPage.getItemCount();
    expect(count).toBe(2);
  });

  test('should remove item from cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Add product, go to cart and remove it
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await cartPage.goto();
    await cartPage.removeItemByName('Sauce Labs Backpack');

    // Cart should be empty
    const count = await cartPage.getItemCount();
    expect(count).toBe(0);
  });

  test('should continue shopping from cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Go to cart and click continue shopping
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await cartPage.goto();
    await cartPage.continueShopping();

    // Should go back to inventory
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('should proceed to checkout from cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Add product and proceed to checkout
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await cartPage.goto();
    await cartPage.checkout();

    // Should go to checkout page
    await expect(page).toHaveURL(/checkout-step-one.html/);
  });

});