import {Page, Locator,expect } from '@playwright/test';

export class CartPage {
	private readonly page: Page;
	private readonly cartTableBody: Locator;
	private readonly cartRows: Locator;

	constructor(page: Page) {
		this.page = page;
		this.cartTableBody = page.locator('#tbodyid');
		this.cartRows = this.cartTableBody.locator('tr');
	}

	async waitForCartToLoad() {
		await expect(this.cartTableBody).toBeVisible();
	}

	async isProductInCart(productName: string): Promise<boolean> {
		return (await this.cartRows.filter({ hasText: productName }).count()) > 0;
	}

	async removeProductFromCart(productName: string) {
		const productRow = this.cartRows.filter({ hasText: productName });
		await productRow.locator('a:has-text("Delete")').click();
		await expect(productRow).toHaveCount(0);
	}
}



