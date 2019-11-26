const puppeteer = require('puppeteer');

jest.setTimeout(30000)

describe(`Home`, () => {
    let browser, page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 1000,
            args: [`--window-size=800,800`, `--window-position=0,0`]
        })
        page = await browser.newPage()
    })

    afterAll(async () => {
        await browser.close()
    })

    test(`Load home`, async () => {
        await page.goto(`http://localhost:3000/`);
        await page.waitFor(`title`);
        const theTitle = await page.title();
        expect(theTitle).toBe(`React App`)
    })

    test(`Go to login`, async () => {
        await page.goto(`http://localhost:3000/login`)
    })

    test(`Fill username`, async () => {
        await page.type(`input#loginUsernameInput`, `Joris`, {delay: 15});
    })
    test(`Fill deck description`, async () => {
        await page.type(`input#loginPasswordInput`, `han`, {delay: 15});
    })

    test(`Go to create flashcards`, async () => {
        const loginButton = await page.$(`form[name="login"] button`)
        expect(loginButton).toBeDefined()
        await loginButton.click()
    })
})

