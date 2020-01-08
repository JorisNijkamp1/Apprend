const puppeteer = require('puppeteer');

jest.setTimeout(30000)

describe(`Import deck`, () => {
    let browser, page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 100,
            args: [`--window-size=800,800`, `--window-position=0,0`]
        })
        page = await browser.newPage()
    })

    afterAll(async () => {
        await browser.close()
    })

    test(`Load decks from Aaron`, async () => {
        await page.goto(`http://localhost:3000/Aaron/decks`)
        await page.waitFor(`title`)
        const theTitle = await page.title()
        expect(theTitle).toBe(`Apprend | Flashcard learning platform`)
    })

    test(`Click on the first deck`, async () => {
        await page.waitFor(`#card-0-link`)
        const goToDeck = await page.$(`#card-0-link`)
        await goToDeck.click()
    })

    test(`Import the deck`, async () => {
        await page.waitFor(`#import-deck-button`)
        const importDeck = await page.$(`#import-deck-button`)
        await importDeck.click()
    })

    test(`Go to login`, async () => {
        await page.waitFor(`#original`)
        await page.goto(`http://localhost:3000/login`)
    })

    test(`Fill username`, async () => {
        await page.type(`input#loginUsernameInput`, `Aaron`, {delay: 15})
    })
    test(`Fill in password`, async () => {
        await page.type(`input#loginPasswordInput`, `ica`, {delay: 15})
    })

    test(`Login and redirect`, async () => {
        const loginButton = await page.$(`form[name="login"] button`)
        expect(loginButton).toBeDefined()
        await loginButton.click()
    })

    test(`Load decks from Aaron`, async () => {
        await page.goto(`http://localhost:3000/Aaron/decks`)
    })

    test(`Click on the first deck`, async () => {
        await page.waitFor(`#card-0-link`);
        const goToDeck = await page.$(`#card-0-link`)
        await goToDeck.click();
    })

    test(`Click to show the import history`, async () => {
        await page.waitFor(`#importList`);
        const goToDeck = await page.$(`#importList`)
        await goToDeck.click();
    })

    test(`Click on the first import`, async () => {
        await page.waitFor(`#import-0`);
        const goToDeck = await page.$(`#import-0`)
        await goToDeck.click();
    })
})
