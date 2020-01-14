const puppeteer = require('puppeteer');

jest.setTimeout(30000);

describe(`Playing`, () => {
    let browser, page

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 300,
            args: [`--window-size=800,800`, `--window-position=0,0`]
        })
        page = await browser.newPage()
    });

    afterAll(async () => {
        await browser.close()
    });



});