const puppeteer = require('puppeteer');

jest.setTimeout(30000)

describe(`Home`, () => {
    let browser, page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,
            args: [`--window-size=800,800`, `--window-position=0,0`]
        })
        page = await browser.newPage()
    })

    afterAll(async () => {
        await browser.close()
    })

    test(`Load home`, async () => {
        await page.goto(`http://localhost:3000/login`);
        await page.waitFor(`title`);
        const theTitle = await page.title();
        expect(theTitle).toBe(`Apprend | Flashcard learning platform`)
    })

    test(`Click cookie`, async () => {
        const cookie = await page.$(`[id="cookie"]`)
        expect(cookie).toBeDefined()
        await cookie.click()
    })

    test(`Fill username`, async () => {
        await page.type(`input#loginUsernameInput`, `Joris`, {delay: 15});
    })

    test(`Fill in password`, async () => {
        await page.type(`input#loginPasswordInput`, `han`, {delay: 15});
    })

    test(`Login and redirect`, async () => {
        const loginButton = await page.$(`form[name="login"] button`)
        expect(loginButton).toBeDefined()
        await loginButton.click()
    })

    test(`Load a specific deck to import`, async () => {
        await page.goto(`http://localhost:3000/decks/5ddfadab612b09570c6f3a33`);
    })

    test(`Fill in search`, async () => {
        await page.type(`input#formFilterFlashcards`, `Run`, {delay: 15});
    })
})

