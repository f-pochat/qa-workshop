const { expect } = require('@playwright/test');

class TopNav {
    constructor(page) {
        //locators
        this.page = page;
        // locators - My account button
        this.myAccountButton1 = page.locator("#menu-item-50"); //CSS - id
        this.shopButton = page.locator("#menu-item-40");
        this.homeButton = page.locator("//a[@title='Automation Practice Site']");
    }

    async clickMyAccountButton() {
        await this.myAccountButton1.click();
    }
    async clickShopButton() {
        await this.shopButton.click();
    }
    async clickHomeButton() {
        await this.homeButton.click();
    }

}
module.exports = { TopNav };