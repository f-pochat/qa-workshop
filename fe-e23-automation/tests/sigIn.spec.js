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

test('1. Log-in with valid username and password.', async () => {
    await test.step('Click on My Account Menu', async () => {
        await topNav.clickMyAccountButton();
        await myAccount.verLoginheader();
    })
    await test.step('Enter registered username in username textbox', async () => {
        await myAccount.fillUserName(dataset.user1.username);
    });
    await test.step('Enter password in password textbox', async () => {
        await myAccount.fillPassInput(dataset.user1.password);
    });
    await test.step('Click on login button', async () => {
        await myAccount.clickLoginButton();
    });
    await test.step('User must successfully login to the web page', async () => {
        await myAccount.verUsername(dataset.user1.username);
    });
});

test('2. Log-in with incorrect username and incorrect password.', async () => {
    await test.step('Click on My Account Menu', async () => {
        await topNav.clickMyAccountButton();
        await myAccount.verLoginheader();
    })
    await test.step('Enter registered username in username textbox', async () => {
        await myAccount.fillUserName("incorrect username");
    });
    await test.step('Enter password in password textbox', async () => {
        await myAccount.fillPassInput("incorrect password");
    });
    await test.step('Click on login button', async () => {
        await myAccount.clickLoginButton();
    });
    await test.step('Error banner is shown', async () => {
        await myAccount.isErrorVisisble();
    });
});

test('3. Log-in with empty username and correct password.', async () => {
    await test.step('Click on My Account Menu', async () => {
        await topNav.clickMyAccountButton();
        await myAccount.verLoginheader();
    })
    await test.step('Enter password in password textbox', async () => {
        await myAccount.fillPassInput(dataset.user1.password);
    });
    await test.step('Click on login button', async () => {
        await myAccount.clickLoginButton();
    });
    await test.step('Error banner is shown', async () => {
        await myAccount.isErrorVisisble();
    });
});

test('4. Log-in with correct username and empty password.', async () => {
    await test.step('Click on My Account Menu', async () => {
        await topNav.clickMyAccountButton();
        await myAccount.verLoginheader();
    })
    await test.step('Enter registered username in username textbox', async () => {
        await myAccount.fillUserName(dataset.user1.username);
    });
    await test.step('Click on login button', async () => {
        await myAccount.clickLoginButton();
    });
    await test.step('Error banner is shown', async () => {
        await myAccount.isErrorVisisble();
    });
});

test('5. Log-in with empty username and empty password.', async () => {
    await test.step('Click on My Account Menu', async () => {
        await topNav.clickMyAccountButton();
        await myAccount.verLoginheader();
    })
    await test.step('Click on login button', async () => {
        await myAccount.clickLoginButton();
    });
    await test.step('Error banner is shown', async () => {
        await myAccount.isErrorVisisble();
    });
});

test('6. Log-in - Password should be masked', async () => {
    await test.step('Click on My Account Menu', async () => {
        await topNav.clickMyAccountButton();
        await myAccount.verLoginheader();
    })
    await test.step('Check password type', async () => {
        await myAccount.passInputIsTypePassword();
    });
});

test('7. Login - Handles case sensitive', async () => {
    await test.step('Click on My Account Menu', async () => {
        await topNav.clickMyAccountButton();
        await myAccount.verLoginheader();
    })
    await test.step('Enter registered username in username textbox', async () => {
        await myAccount.fillUserName(dataset.user1.username.toUpperCase());
    });
    await test.step('Enter password in password textbox', async () => {
        await myAccount.fillPassInput(dataset.user1.password.toUpperCase());
    });
    await test.step('Click on login button', async () => {
        await myAccount.clickLoginButton();
    });
    await test.step('Error banner is shown', async () => {
        await myAccount.isErrorVisisble();
    });
});

test('8. Login - Authentication', async () => {
    await test.step('Click on My Account Menu', async () => {
        await topNav.clickMyAccountButton();
        await myAccount.verLoginheader();
    })
    await test.step('Enter registered username in username textbox', async () => {
        await myAccount.fillUserName(dataset.user1.username);
    });
    await test.step('Enter password in password textbox', async () => {
        await myAccount.fillPassInput(dataset.user1.password);
    });
    await test.step('Click on login button', async () => {
        await myAccount.clickLoginButton();
    });
    await test.step('User must successfully login to the web page', async () => {
        await myAccount.verUsername(dataset.user1.username);
    });
    await test.step('Sign Out', async () => {
        await myAccount.clickSignOutButton();
    });
    await test.step('Back to login', async () => {
        await myAccount.verLoginheader();
    })
});