const { expect } = require('@playwright/test');

class MyAccount {
    constructor(page) {
        //locators
        this.page = page;
        this.loginH = page.locator('//h2[text()="Login"]');
        this.loginUserNameInput = page.locator('#username');
        this.loginPassInput = page.locator('#password');
        this.loginButton = page.locator('input[name="login"]');
        this.usernameSignIn = page.locator('//p/strong');
        this.errorBanner = page.locator(".woocommerce-error");
        this.signOutButton = page.locator("//a[@href='https://practice.automationtesting.in/my-account/customer-logout/' and text()='Sign out']")
    }

    async verLoginheader() {
        expect(this.loginH).toBeVisible;
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

    async passInputisTypePassword() {
        await expect(this.loginPassInput).toHaveAttribute("type", "password")
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async clickSignOutButton() {
        await this.signOutButton.click();
    }

    async verUsername(username) {
        await expect(this.usernameSignIn).toHaveText(username);
    }
}
module.exports = { MyAccount };