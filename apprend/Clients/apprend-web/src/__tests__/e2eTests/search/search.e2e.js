const puppeteer = require('puppeteer');

jest.setTimeout(30000)

describe(`Search for some decks`, () => {
    let browser, page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 50,
            args: [`--window-size=800,800`, `--window-position=1600,0`]
        });
        page = await browser.newPage()
    });

    afterAll(async () => {
        await browser.close()
    });

    test(`Load homepage`, async () => {
        await page.goto(`http://localhost:3000/`);
        await page.waitFor(`#auto-suggest-search`);
        const theTitle = await page.title();
        expect(theTitle).toBe(`Apprend | Flashcard learning platform`)
    });

    test(`Search for a deck`, async () => {
        await page.waitFor(`#auto-suggest-search`);
        await page.type(`div.react-autosuggest__container > input`, `English`, {delay: 15});
    });

    test(`Click on first auto suggested result`, async () => {
        await page.waitFor(`#react-autowhatever-1--item-0`);
        const firstAutoSuggestedResult = await page.$(`#react-autowhatever-1--item-0`);

        firstAutoSuggestedResult.click();
        expect(firstAutoSuggestedResult).toBeDefined();
    });

    test(`Show deck page`, async () => {
        const playButton = await page.waitFor(`#import-deck-button`);
        expect(playButton).toBeDefined()
    })
});
