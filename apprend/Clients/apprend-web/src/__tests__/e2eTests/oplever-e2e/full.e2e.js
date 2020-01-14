const puppeteer = require('puppeteer');

jest.setTimeout(30000);

describe(`Playing`, () => {
    let browser, page

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 50,
            args: [`--window-size=800,800`, `--window-position=0,0`]
        })
        page = await browser.newPage()
    });

    afterAll(async () => {
        await browser.close()
    });

    test(`Load home`, async () => {
        await page.goto(`http://localhost:3000/`)
        await page.waitFor(`title`);
        const theTitle = await page.title();
        expect(theTitle).toBe(`Apprend | Flashcard learning platform`)
    })

    test(`Click cookie`, async () => {
        const cookie = await page.$(`[id="cookie"]`);
        expect(cookie).toBeDefined()
        await cookie.click();
    })

    test(`Search for a deck`, async () => {
        await page.waitFor(`#auto-suggest-search`);
        await page.type(`div.react-autosuggest__container > input`, `Aaron`, {delay: 15});
        const aaronProfile = await page.$(`[id="react-autowhatever-auto-suggest-home-section-0-item-0"]`)
        expect(aaronProfile).toBeDefined();
        await aaronProfile.click();
    });

    test(`Go to first deck of Aaron's decks`, async () => {
        await page.waitFor(`#card-0`);
        const deck = await page.$(`[id="card-0-link"]`);
        expect(deck).toBeDefined();
        await deck.click();
    })

    test(`Import deck from aaron`, async () => {
        await page.waitFor(`#import-deck-button`);
        const importButton = await page.$(`[id="import-deck-button"]`);
        expect(importButton).toBeDefined();
        await importButton.click();
    })

    test(`Click edit button`, async () => {
        await page.waitFor(`#edit-deck-button`);
        const editButton = await page.$(`[id="edit-deck-button"]`);
        expect(editButton).toBeDefined();
        await editButton.click()
    })

    test(`Input Name, Description, Tags`, async () => {
        await page.waitFor(`#input-name`);
        await page.waitFor(`#input-description`);
        await page.waitFor(`#tags`);

        await page.type(`[id="input-name"]`, `Import`, {delay: 15});
        await page.type(`[id="input-description"]`, `ik ben geimporteerd`, {delay: 15});
        await page.type(`[id="tags"]`, `import`, {delay: 15});

        const nameField = await page.$(`[id="input-name"]`);
        const descriptionField = await page.$(`[id="input-description"]`);
        const tagsField = await page.$(`[id="tags"]`);
        const addTag = await page.$(`[id="add-tag-button"]`);


        expect(nameField).toBeDefined()
        expect(descriptionField).toBeDefined()
        expect(tagsField).toBeDefined()
        expect(addTag).toBeDefined()

        await addTag.click();
    })

    test(`Confirm edit deck`, async () => {
        await page.waitFor('#confirm-undefined-icon-button');

        const confirmButton = await page.$(`[id="confirm-undefined-icon-button"]`);

        expect(confirmButton).toBeDefined();

        await confirmButton.click()
    })

});