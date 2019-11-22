const puppeteer = require('puppeteer');

describe(`Home`, () => {
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

    test(`Load home`, async () => {
        await page.goto(`http://localhost:3000/`);
        await page.waitFor(`title`);
        const theTitle = await page.title();
        expect(theTitle).toBe(`React App`)
    })

    test(`Go to create deck`, async () => {
        await page.goto(`http://localhost:3000/decks/create`)
        await page.type(`input#create-deck-form-deckname`, `Nederlands woordjes`)
        await page.waitFor(`titel`);
        await page.type(`textarea#create-deck-form-description`, `Het allermooiste deck van Nederland!`)
        // const createDeckButton = await page.$(`form[createDeck] button`);
        // expect(createDeckButton).toBeDefined()
        // await createDeckButton.click()
        // const theTitle = await page.title();
        // expect(theTitle).toBe(`React App`)
    })
})

