const { test, expect } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');
const dataset = JSON.parse(JSON.stringify(require("../test-data/testdata.json")));

let poManager;
let topNav;
let myAccount;

// https://practice.automationtesting.in/test-cases/

test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    topNav = poManager.getTopNav();
    myAccount = poManager.getMyAccount();

    await page.goto(dataset.home.url, { viewport: null });
    expect(page).toHaveTitle(dataset.home.title);
});

test('1. Registration-Signin', async () => {
    await test.step('Click on My Account Menu', async () => {
        await topNav.clickMyAccountButton();
        await myAccount.verLoginheader();
    })
    await test.step('Enter new email in email textbox', async () => {
        await myAccount.fillRegisterEmail("invalid email");
    });
    await test.step('Enter new password in password textbox', async () => {
        await myAccount.fillRegisterPassword(dataset.newUser1.password);
    });
    await test.step('Verify register is disabled', async () => {
        await myAccount.expectRegisterToBeDisabled();
    });
});