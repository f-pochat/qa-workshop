const { expect } = require('@playwright/test');

class MyAccount {
    constructor(page) {
        //locators
        this.page = page;
        this.loginH = page.locator('//h2[text()="Login"]');
        this.goShopButton = page.locator('//a[text()="Go Shop"]');
        this.loginUserNameInput = page.locator('#username');
        this.registerEmailInput = page.locator('#reg_email');
        this.registerPasswordInput = page.locator('#reg_password');
        this.loginPassInput = page.locator('#password');
        this.loginButton = page.locator('input[name="login"]');
        this.registerButton = page.locator('input[name="register"]');
        this.usernameSignIn = page.locator('//p/strong');
        this.errorBanner = page.locator(".woocommerce-error");
        this.signOutButton = page.locator("//a[@href='https://practice.automationtesting.in/my-account/customer-logout/' and text()='Sign out']")
        this.ordersButton = page.locator("//a[@href='https://practice.automationtesting.in/my-account/orders/' and text()='Orders']")
    }

    async verLoginheader() {
        expect(this.loginH).toBeVisible;
    }

    async checkOrdersHeaders() {
        expect(this.goShopButton).toBeVisible;
    }

    async isErrorVisisble() {
        expect(this.errorBanner).toBeVisible
    }

    async fillUserName(username) {
        await this.loginUserNameInput.type(username)
    }

    async fillPassInput(password) {
        await this.loginPassInput.type(password);
    }

    async fillRegisterEmail(email) {
        await this.registerEmailInput.type(email)
    }

    async fillRegisterPassword(password) {
        await this.registerPasswordInput.type(password);
    }

    async passInputIsTypePassword() {
        await expect(this.loginPassInput).toHaveAttribute("type", "password")
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async expectRegisterToBeDisabled() {
        await expect(this.registerButton).toBeDisabled;
    }

    async clickSignOutButton() {
        await this.signOutButton.click();
    }

    async clickOrdersButton() {
        await this.ordersButton.click();
    }

    async verUsername(username) {
        await expect(this.usernameSignIn).toHaveText(username);
    }
}
module.exports = { MyAccount };