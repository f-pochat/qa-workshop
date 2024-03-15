const { expect } = require('@playwright/test');

class Home {
    constructor(page) {
        //locators
        this.page = page;
        this.sliders = page.locator('div.n2-ss-slider-3 > .n2-ss-slide')
        this.arrivals = page.locator('//*[@id="themify_builder_content-22"]/div[2]/div/div/div/div/div[2]/div')
    }

    async expectNumberOfSliders(number) {
        expect(await this.sliders.count()).toBe(number)
    }

    async expectNumberOfArrivals(number) {
        expect(await this.arrivals.count()).toBe(number)
    }
}
module.exports = { Home };