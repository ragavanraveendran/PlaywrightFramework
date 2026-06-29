import { type Locator, type Page, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly getStartedButton: Locator;
    readonly pageTitle: RegExp;

    constructor(page: Page) {
        this.page = page;
        this.getStartedButton = page.getByRole('link', { name: 'Get v started' });
        this.pageTitle = /Playwright/;
    }

    async clickGetStarted() {
        await this.getStartedButton.click();
    }

    async assertPageTitle() {
        await expect(this.page).toHaveTitle(this.pageTitle);
    }
	
	    async click(locator:any){
        await locator.click();
    }

    async enterText(locator:any,text:string){
        await locator.fill(text);
    }
	    async navigate(url:string){
        await this.page.goto(url);
    }
}
