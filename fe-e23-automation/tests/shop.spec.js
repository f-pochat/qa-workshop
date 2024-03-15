const { test, expect } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');
const dataset = JSON.parse(JSON.stringify(require("../test-data/testdata.json")));

let poManager;
let topNav;
let shop;

// https://practice.automationtesting.in/test-cases/

test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    shop = poManager.getShop();
    topNav = poManager.getTopNav();

    await page.goto(dataset.home.url, { viewport: null });
    expect(page).toHaveTitle(dataset.home.title);
});

test('1. Shop - Products Categories Functionality', async () => {
    await test.step('Click on Shop menu button', async () => {
        await topNav.clickShopButton();
    })
    
    await test.step('Click Android filter', async () => {
        await shop.clickAndroidFilter();
    })

    await test.step('There must only be 1 product', async () => {
        await shop.expectProductListCount(1);
    })
});
