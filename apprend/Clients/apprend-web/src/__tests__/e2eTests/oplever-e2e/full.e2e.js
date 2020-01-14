const puppeteer = require('puppeteer');

jest.setTimeout(30000);

describe(`Playing`, () => {
    let browser, page

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 150,
            args: [`--window-size=800,800`, `--window-position=0,0`]
        })
        page = await browser.newPage()
    });

    afterAll(async () => {
        await browser.close()
    });

    test(`Go to create deck`, async () => {
        await page.goto(`http://localhost:3000/decks/create`)
    })

    test(`Click cookie`, async () => {
        const cookie = await page.$(`[id="cookie"]`)
        expect(cookie).toBeDefined()
        await cookie.click()
    })

    test(`Fill deck name`, async () => {
        await page.type(`input#create-deck-form-deckname`, `test`, {delay: 5});
    })

    test(`Fill deck description`, async () => {
        await page.type(`textarea#create-deck-form-description`, `Mooie omschrijving`, {delay: 5})
    })

    test(`Fill in a tag`, async () => {
        await page.type(`input#tags`, `test`, {delay: 5})
    });

    test(`Add a tag`, async () => {
        const tagButton = await page.$(`#addTag`)
        expect(tagButton).toBeDefined()
        await tagButton.click()
    });

    test(`Go to create flashcards`, async () => {
        const loginButton = await page.$(`#create-deck-button`)
        expect(loginButton).toBeDefined()
        await loginButton.click()
    })

    for(let i = 0; i < 2; i++) {
        test(`Add a image column`, async () => {
            await page.waitFor(`#Image`);
            const imageButton = await page.$(`#Image`)
            expect(imageButton).toBeDefined()
            await imageButton.click()
        });
    }

    test(`Delete the last image column`, async () => {
        const deleteButton = await page.$(`#delete-3`)
        expect(deleteButton).toBeDefined()
        await deleteButton.click()
    });

    test(`Click the green icon to really delete the column`, async () => {
        const deleteButton = await page.$(`#faCheck`)
        expect(deleteButton).toBeDefined()
        await deleteButton.click()
    });

    for(let i = 0; i < 3; i++) {
        test(`Add a flashcard`, async () => {
            const addFlashcardButton = await page.$(`#FLASHCARD`)
            expect(addFlashcardButton).toBeDefined()
            await addFlashcardButton.click()
        });
    }
});