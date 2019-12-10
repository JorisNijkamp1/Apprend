const puppeteer = require('puppeteer');

jest.setTimeout(12000)

describe(`Toggle the share status of a deck`, () => {
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

    test(`Toggle the status`, async () => {
        await page.waitFor(1200);
        let toggleStatusButton = await page.$(`#setthisdecktoprivate-icon-button-0`);
        let privatePath = false
        if (!toggleStatusButton){
            privatePath = true
            toggleStatusButton = await page.$(`#setthisdecktopublic-icon-button-0`)
        } 
        await toggleStatusButton.click();
        let newToggleStatusButton
        if (privatePath) newToggleStatusButton = await page.$(`#setthisdecktoprivate-icon-button-0`)
        else newToggleStatusButton = await page.$(`#setthisdecktopublic-icon-button-0`)
        expect(newToggleStatusButton).toBeDefined()
    });

})

