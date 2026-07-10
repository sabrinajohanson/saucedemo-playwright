import { Page } from '@playwright/test';

export class InventoryPage {
  private page: Page;

  private productList     = '.inventory_item';
  private cartBadge       = '.shopping_cart_badge';
  private sortDropdown    = '[data-test="product-sort-container"]';

  constructor(page: Page) {
    this.page = page;
  }

  // Get number of products listed
  async getProductCount(): Promise<number> {
    return await this.page.locator(this.productList).count();
  }

  // Add product to cart by name
  async addToCartByName(productName: string) {
    const product = this.page.locator('.inventory_item').filter({
      hasText: productName
    });
    await product.locator('button').click();
  }

  // Get cart badge count
  async getCartCount(): Promise<string> {
    return await this.page.locator(this.cartBadge).innerText();
  }

  // Sort products
async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
  // Wait for dropdown to be visible before interacting
  await this.page.waitForSelector(this.sortDropdown);
  await this.page.selectOption(this.sortDropdown, option);
  // Wait for products to re-render after sorting
  await this.page.waitForTimeout(1000);
}

  // Get all product names in order
  async getProductNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allInnerTexts();
  }

  // Get all product prices in order
  async getProductPrices(): Promise<number[]> {
    const prices = await this.page.locator('.inventory_item_price').allInnerTexts();
    return prices.map(p => parseFloat(p.replace('$', '')));
  }
}