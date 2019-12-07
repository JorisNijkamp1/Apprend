const puppeteer = require('puppeteer');

jest.setTimeout(12000)

describe(`Edit a deck e2e`, () => {
    let browser, page;
    let deckNameBeforeEdit
    let descriptionBeforeEdit

    const typeInName = ' + testName'
    const typeInDescription = ' + testDesc'


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
        expect(theTitle).toBe(`Apprend | Flashcard learning platform`)
    });

    test(`Go to login`, async () => {
        await page.goto(`http://localhost:3000/login`)

        const loginButton = await page.$(`form[name="login"] button`)
        expect(loginButton).toBeDefined()
        const theTitle = await page.title();
        expect(theTitle).toBe(`Apprend | Flashcard learning platform`)
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

    test(`Load all deck from Joris`, async () => {
        await page.waitFor(1000)
        await page.goto(`http://localhost:3000/Joris/decks`);
    });

    test(`Load deck frans woordjes`, async () => {
        await page.waitFor(`#edit-icon-button-0`);
        deckNameBeforeEdit = await page.$eval('#deck-name-0', el => el.textContent)
        descriptionBeforeEdit = await page.$eval('#deck-description-0', el => el.textContent)
        const editButton = await page.$(`#edit-icon-button-0`);
        await editButton.click();
    });

    test('Edit deck name', async () => {
        await page.waitFor('#input-name-0')
        await page.type(`input[id="input-name-0"]`, `${typeInName}`, {delay: 15});
    })

    test('Edit deck description', async () => {
        await page.type(`textarea[id="input-description-0"]`, `${typeInDescription}`, {delay: 15});
    })

    test('Save changes', async () => {

        await page.waitFor(`#confirm-icon-button-0`);
        const confirmButton = await page.$(`#confirm-icon-button-0`);
        await confirmButton.click();
    })

    test('Check if changes were saved', async () => {
        await page.waitFor('#deck-name-0')
        const nameAfterEdit = await page.$eval('#deck-name-0', el => el.textContent)
        const descriptionAfterEdit = await page.$eval('#deck-description-0', el => el.textContent)
        expect(nameAfterEdit).toEqual(deckNameBeforeEdit + typeInName)
        expect(descriptionAfterEdit).toEqual(typeInDescription + descriptionBeforeEdit)
    } )
})

