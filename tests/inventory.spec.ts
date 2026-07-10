import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
});

test.describe('Inventory', () => {

  test('should display 6 products', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // SauceDemo always shows 6 products
    const count = await inventoryPage.getProductCount();
    expect(count).toBe(6);
  });

  test('should add product to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // Add a product and check cart badge
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe('1');
  });

  test('should add multiple products to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // Add two products and check cart badge
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.addToCartByName('Sauce Labs Bike Light');
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe('2');
  });

  test('should sort products from A to Z', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getProductNames();

    // Check if names are in alphabetical order
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('should sort products from Z to A', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getProductNames();

    // Check if names are in reverse alphabetical order
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test('should sort products by price low to high', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getProductPrices();

    // Check if prices are in ascending order
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('should sort products by price high to low', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getProductPrices();

    // Check if prices are in descending order
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

});