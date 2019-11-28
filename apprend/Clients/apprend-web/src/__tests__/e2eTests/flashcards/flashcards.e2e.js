const puppeteer = require('puppeteer');

jest.setTimeout(30000)

describe(`Flashcard`, () => {
    let browser, page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 100,
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

    test(`Go to user profile`, async () => {
        const userProfileLink = await page.$(`label[for="formBasicEmail"] > strong > a`)
        expect(userProfileLink).toBeDefined()
        await userProfileLink.click()
    });

    test(`Go to a deck`, async () => {
        const viewDeckButton = await page.$(`a#card-0-link`)
        expect(viewDeckButton).toBeDefined()
        await viewDeckButton.click()
    });

    // test(`Fill deck name`, async () => {
    //     await page.type(`input#create-deck-form-deckname`, `Nederlands woordjes`, {delay: 15});
    // })


    // test(`Fill deck description`, async () => {
    //     await page.type(`textarea#create-deck-form-description`, `Gaaf deck`, {delay: 15})
    // })
    //
    // test(`Go to create flashcards`, async () => {
    //     const loginButton = await page.$(`form[name="create-deck"] button`)
    //     expect(loginButton).toBeDefined()
    //     await loginButton.click()
    // })
})

