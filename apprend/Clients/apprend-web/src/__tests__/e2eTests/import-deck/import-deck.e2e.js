import {API_URL} from "../../../redux-store/urls";

const puppeteer = require('puppeteer');

jest.setTimeout(30000)

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
        expect(theTitle).toBe(`Apprend | Flashcard learning platform`)
    })

    test(`Load home`, async () => {
        await page.goto(`http://localhost:3000/`);
        await page.waitFor(`title`);
        const theTitle = await page.title();
        expect(theTitle).toBe(`Apprend | Flashcard learning platform`)
    })

    test(`Go to create deck`, async () => {
        await page.goto(`http://localhost:3000/decks/create`)
    })

    test(`Fill deck name`, async () => {
        await page.type(`input#create-deck-form-deckname`, `Nederlands woordjes`, {delay: 15});
    })
    test(`Fill deck description`, async () => {
        await page.type(`textarea#create-deck-form-description`, `Gaaf deck`, {delay: 15})
    })

    test(`Go to create flashcards`, async () => {
        const createDeck = await page.$(`form[name="create-deck"] button`)
        expect(createDeck).toBeDefined()
        await createDeck.click()
    })

    test(`Load decks from aaron`, async () => {
        await page.goto(`http://localhost:3000/Aaron/decks`);
        await page.waitFor(`title`);
        const theTitle = await page.title();
        expect(theTitle).toBe(`Apprend | Flashcard learning platform`)
    })

    test(`Load a specific deck to import`, async () => {
        await page.waitFor(`#card-0-link`);
        const goToDeck = await page.$(`#card-0-link`);
        await goToDeck.click();
        const theTitle = await page.title();
        expect(theTitle).toBe(`Apprend | Flashcard learning platform`)
    })

    test(`Load a specific deck to import`, async () => {
        await page.waitFor(`#import-deck`);
        const goToDeck = await page.$(`#import-deck`);
        await goToDeck.click();
        const theTitle = await page.title();
        expect(theTitle).toBe(`Apprend | Flashcard learning platform`)
    })

    test(`Load decks from aaron`, async () => {
        await page.goto(`http://localhost:3000/Joris/decks`);
        await page.waitFor(`title`);
        const theTitle = await page.title();
        expect(theTitle).toBe(`Apprend | Flashcard learning platform`)
    })

})

