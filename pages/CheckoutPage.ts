import { Page } from '@playwright/test';

export class CheckoutPage {
  private page: Page;

  private firstNameInput  = '[data-test="firstName"]';
  private lastNameInput   = '[data-test="lastName"]';
  private postalCodeInput = '[data-test="postalCode"]';
  private continueButton  = '[data-test="continue"]';
  private cancelButton    = '[data-test="cancel"]';
  private errorMessage    = '[data-test="error"]';

  private summaryItems    = '.cart_item';
  private subtotalLabel   = '.summary_subtotal_label';
  private taxLabel        = '.summary_tax_label';
  private totalLabel      = '.summary_total_label';
  private finishButton    = '[data-test="finish"]';

  private confirmationHeader = '.complete-header';

  constructor(page: Page) {
    this.page = page;
  }

  // Fill personal information and continue
  async fillPersonalInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
    await this.page.click(this.continueButton);
  }

  // Get error message text
  async getErrorMessage(): Promise<string> {
    return await this.page.locator(this.errorMessage).innerText();
  }

  // Get number of items in order summary
  async getSummaryItemCount(): Promise<number> {
    return await this.page.locator(this.summaryItems).count();
  }

  // Get subtotal text
  async getSubtotal(): Promise<string> {
    return await this.page.locator(this.subtotalLabel).innerText();
  }

  // Get total text
  async getTotal(): Promise<string> {
    return await this.page.locator(this.totalLabel).innerText();
  }

  // Click finish button
  async finish() {
    await this.page.click(this.finishButton);
    await this.page.waitForURL('**/checkout-complete.html');
  }

  // Get confirmation message
  async getConfirmationMessage(): Promise<string> {
    return await this.page.locator(this.confirmationHeader).innerText();
  }

  // Cancel checkout
  async cancel() {
    await this.page.click(this.cancelButton);
  }
}