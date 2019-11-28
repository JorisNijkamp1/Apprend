const puppeteer = require('puppeteer');

jest.setTimeout(30000)

describe(`Flashcard`, () => {
    let browser, page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 150,
            args: [`--window-size=800,800`, `--window-position=0,0`]
        });
        page = await browser.newPage()
    });

    afterAll(async () => {
        await browser.close()
    });

    test(`Load home`, async () => {
        await page.goto(`http://localhost:3000/`);
        await page.waitFor(`title`);
        const theTitle = await page.title();
        expect(theTitle).toBe(`React App`)
    });

    test(`Go to login`, async () => {
        await page.goto(`http://localhost:3000/login`)
        const theTitle = await page.title();
        expect(theTitle).toBe(`React App`)
    })

    test(`Fill username`, async () => {
        await page.type(`input#loginUsernameInput`, `Joris`, {delay: 15});
        const theTitle = await page.title();
        expect(theTitle).toBe(`React App`)
    })
    test(`Fill in password`, async () => {
        await page.type(`input#loginPasswordInput`, `han`, {delay: 15});
        const theTitle = await page.title();
        expect(theTitle).toBe(`React App`)
    })

    test(`Login and redirect`, async () => {
        const loginButton = await page.$(`form[name="login"] button`)
        expect(loginButton).toBeDefined()
        await loginButton.click()
    })

    test(`Load all deck from Joris`, async () => {
        await page.goto(`http://localhost:3000/Joris/decks`);
        await page.waitFor(`title`);
        const theTitle = await page.title();
        expect(theTitle).toBe(`React App`)
    });

    test(`Load deck frans woordjes`, async () => {
        await page.waitFor(`#card-0-link`);
        const deckButton = await page.$(`#card-0-link`);
        const theTitle = await page.title()
        await deckButton.click();
        expect(theTitle).toBe(`React App`)
    });

    test(`Load edit deck frans woordjes`, async () => {
        await page.waitFor(`#edit-deck`);
        const goToEditDeck = await page.$(`#edit-deck`);
        await goToEditDeck.click();
        const theTitle = await page.title()
        expect(theTitle).toBe(`React App`)
    });

    test('Edit deck name', async () => {
        await page.type(`input[name="name"]`, `test`, {delay: 15});
        const theTitle = await page.title()
        expect(theTitle).toBe(`React App`)
    })

    test('Edit deck description', async () => {
        await page.type(`textarea[name="description"]`, `test`, {delay: 15});
        const theTitle = await page.title()
        expect(theTitle).toBe(`React App`)
    })

    test('Save deck', async () => {
        await page.waitFor(`button[name="save-deck"]`);
        const saveEditedDeck = await page.$(`button[name="save-deck"]`);
        await saveEditedDeck.click();
        const theTitle = await page.title()
        expect(theTitle).toBe(`React App`);
    })
})

