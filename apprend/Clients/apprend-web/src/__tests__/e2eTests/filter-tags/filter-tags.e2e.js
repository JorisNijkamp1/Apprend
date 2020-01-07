const puppeteer = require('puppeteer');

jest.setTimeout(30000)

describe(`Filter`, () => {
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
        await page.goto(`http://localhost:3000`);
        await page.waitFor(`title`);
        const theTitle = await page.title();
        expect(theTitle).toBe(`Apprend | Flashcard learning platform`)
    });

    test(`Go to login`, async () => {
        await page.goto(`http://localhost:3000/login`)
    });

    test(`Fill username`, async () => {
        await page.type(`input#loginUsernameInput`, `Joris`, {delay: 15});
    });

    test(`Fill in password`, async () => {
        await page.type(`input#loginPasswordInput`, `han`, {delay: 15});
    });

    test(`Login and redirect`, async () => {
        const loginButton = await page.$(`form[name="login"] button`)
        expect(loginButton).toBeDefined()
        await loginButton.click()
    });

    test(`Go to create deck`, async () => {
        await page.goto(`http://localhost:3000/decks/create`)
    });

    test(`Fill deck name`, async () => {
        await page.type(`input#create-deck-form-deckname`, `Test Deck`, {delay: 15});
    });

    test(`Fill deck description`, async () => {
        await page.type(`textarea#create-deck-form-description`, `test deck`, {delay: 15})
    });

    test(`Fill in a tag`, async () => {
        await page.type(`input#tags`, `test`, {delay: 15})
    });

    test(`Add a tag`, async () => {
        const tagButton = await page.$(`[id="addTag"]`)
        expect(tagButton).toBeDefined()
        await tagButton.click()
    });

    test(`Fill in a existing tag`, async () => {
        await page.type(`input#tags`, `test`, {delay: 15})
    });

    test(`Add a existing tag`, async () => {
        const tagButton = await page.$(`[id="addTag"]`)
        expect(tagButton).toBeDefined()
        await tagButton.click()
    });

    test(`Delete a tag`, async () => {
        const tagButton = await page.$(`[id="deleteTag"]`)
        expect(tagButton).toBeDefined()
        await tagButton.click()
    });

    test(`Add a empty tag`, async () => {
        const tagButton = await page.$(`[id="addTag"]`)
        expect(tagButton).toBeDefined()
        await tagButton.click()
    });

    test(`Fill in a tag`, async () => {
        await page.type(`input#tags`, `test`, {delay: 15})
    });

    test(`Add a tag`, async () => {
        const tagButton = await page.$(`[id="addTag"]`)
        expect(tagButton).toBeDefined()
        await tagButton.click()
    });

    test(`Go to create flashcards`, async () => {
        const loginButton = await page.$(`form[name="create-deck"] button[id="create-deck-button"]`)
        expect(loginButton).toBeDefined()
        await loginButton.click()
    });

    test(`Load all deck from Joris`, async () => {
        await page.goto(`http://localhost:3000/Joris/decks`);
    });

    test(`Filter on tag`, async () => {
        await page.waitFor(`[id="Filter"]`);
        await page.type(`input[id="Filter"]`, `test`, {delay: 15});
    });

    test(`Clear filter`, async () => {
        await page.evaluate(() => document.getElementById(`Filter`).value = "");
    });

    test(`Filter on tag`, async () => {
        await page.type(`input[id="Filter"]`, `qwertyuiop`, {delay: 15});
    });

    test(`Go to tag overview page`, async () => {
        await page.goto(`http://localhost:3000/tags/test`);
    });

    test(`Click on a deck`, async () => {
        await page.waitFor(`ul[id="tagList"]`);
    });
})

