import { Page } from '@playwright/test';

export class CartPage {
  private page: Page;

  private cartIcon        = '.shopping_cart_link';
  private cartItems       = '.cart_item';
  private removeButton    = '[data-test^="remove"]';
  private checkoutButton  = '[data-test="checkout"]';
  private continueButton  = '[data-test="continue-shopping"]';
  private itemName        = '.inventory_item_name';
  private itemPrice       = '.inventory_item_price';

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to cart
  async goto() {
    await this.page.click(this.cartIcon);
    await this.page.waitForURL('**/cart.html');
  }

  // Get number of items in cart
  async getItemCount(): Promise<number> {
    return await this.page.locator(this.cartItems).count();
  }

  // Get all item names in cart
  async getItemNames(): Promise<string[]> {
    return await this.page.locator(this.itemName).allInnerTexts();
  }

  // Get all item prices in cart
  async getItemPrices(): Promise<number[]> {
    const prices = await this.page.locator(this.itemPrice).allInnerTexts();
    return prices.map(p => parseFloat(p.replace('$', '')));
  }

  // Remove item from cart by name
  async removeItemByName(productName: string) {
    const item = this.page.locator('.cart_item').filter({ hasText: productName });
    await item.locator(this.removeButton).click();
  }

  // Click checkout button
  async checkout() {
    await this.page.click(this.checkoutButton);
    await this.page.waitForURL('**/checkout-step-one.html');
  }

  // Click continue shopping button
  async continueShopping() {
    await this.page.click(this.continueButton);
    await this.page.waitForURL('**/inventory.html');
  }
}