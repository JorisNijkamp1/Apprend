const puppeteer = require('puppeteer');

jest.setTimeout(30000);

describe(`Login & add or replace 3 flashcards to an exist Deck`, () => {
    let browser, page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 75,
            args: [`--window-size=1200,800`, `--window-position=1700,0`]
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
        expect(theTitle).toBe(`React App`);
    });

    test(`Go to login`, async () => {
        await page.goto(`http://localhost:3000/login`);
        const theTitle = await page.title();
        expect(theTitle).toBe(`React App`);
    });

    test(`Fill username`, async () => {
        await page.type(`input#loginUsernameInput`, `Joris`, {delay: 5});
        const theTitle = await page.title();
        expect(theTitle).toBe(`React App`);
    });

    test(`Fill in password`, async () => {
        await page.type(`input#loginPasswordInput`, `han`, {delay: 5});
        const theTitle = await page.title();
        expect(theTitle).toBe(`React App`);
    });

    test(`Login and redirect`, async () => {
        const loginButton = await page.$(`form[name="login"] button`);
        await loginButton.click();
        expect(loginButton).toBeDefined();
    });

    test(`Load all deck from Joris`, async () => {
        await page.goto(`http://localhost:3000/Joris/decks`);
        await page.waitFor(`title`);
        const theTitle = await page.title();
        expect(theTitle).toBeDefined();
    });

    test(`Load deck frans woordjes`, async () => {
        await page.waitFor(`#card-0-link`);
        const deckButton = await page.$(`#card-0-link`);
        await deckButton.click();
        expect(deckButton).toBeDefined();
    });

    test(`Go to Edit flashcards page`, async () => {
        await page.waitFor(`#edit-flashcard-button`);
        const deckButton = await page.$(`#edit-flashcard-button`);
        await deckButton.click();
        expect(deckButton).toBeDefined();
    });

    test(`Fill Term of first flashcard`, async () => {
        const termInput = await page.waitFor(`input#flashcard-0-term`);
        await page.evaluate( () => document.getElementById("flashcard-0-term").value = "");
        await page.type(`input#flashcard-0-term`, `Dog`, {delay: 5});
        expect(termInput).toBeDefined();
    });

    test(`Fill Definition of first flashcard`, async () => {
        const defnitionInput = await page.waitFor(`input#flashcard-0-definition`);
        await page.evaluate( () => document.getElementById("flashcard-0-definition").value = "");
        await page.type(`input#flashcard-0-definition`, `Hond`, {delay: 5});
        expect(defnitionInput).toBeDefined();
    });

    // test(`Delete second flashcard if exist`, async () => {
    //     await page.waitFor(`#add-new-flashcard`);
    //
    //     if (await page.$('#flashcard-1') === null) {
    //         const deleteFlashcardIcon = await page.$(`#flashcard-1-delete-icon`);
    //         await deleteFlashcardIcon.click();
    //         expect(deleteFlashcardIcon).toBeDefined();
    //     }
    // });

    test(`Add a second flashcard if not exist`, async () => {
        await page.waitFor(`#add-new-flashcard`);
        if (await page.$('#flashcard-1') === null) {
            const addNewFlashcardIcon = await page.$(`#add-new-flashcard`);
            await addNewFlashcardIcon.click();
            expect(addNewFlashcardIcon).toBeDefined();
        }
    });

    test(`Fill Term of second flashcard`, async () => {
        const termInput = await page.waitFor(`input#flashcard-1-term`);
        await page.evaluate( () => document.getElementById("flashcard-1-term").value = "");
        await page.type(`input#flashcard-1-term`, `Cat`, {delay: 5});
        expect(termInput).toBeDefined();
    });

    test(`Fill Definition of second flashcard`, async () => {
        const defnitionInput = await page.waitFor(`input#flashcard-1-definition`);
        await page.evaluate( () => document.getElementById("flashcard-1-definition").value = "");
        await page.type(`input#flashcard-1-definition`, `Kat`, {delay: 5});
        expect(defnitionInput).toBeDefined();
    });

    // test(`Add a third flashcard if not exist`, async () => {
    //     await page.waitFor(`#add-new-flashcard`);
    //     if (await page.$('#flashcard-2') === null) {
    //         const addNewFlashcardIcon = await page.$(`#add-new-flashcard`);
    //         await addNewFlashcardIcon.click();
    //         expect(addNewFlashcardIcon).toBeDefined();
    //     }
    // });

    test(`Fill Term of third flashcard`, async () => {
        const termInput = await page.waitFor(`input#flashcard-2-term`);
        await page.evaluate( () => document.getElementById("flashcard-2-term").value = "");
        await page.type(`input#flashcard-2-term`, `Food`, {delay: 5});
        expect(termInput).toBeDefined();
    });

    test(`Fill Definition of third flashcard`, async () => {
        const defnitionInput = await page.waitFor(`input#flashcard-2-definition`);
        await page.evaluate( () => document.getElementById("flashcard-2-definition").value = "");
        await page.type(`input#flashcard-2-definition`, `Eten`, {delay: 5});
        expect(defnitionInput).toBeDefined();
    });

    test(`Save flashcards`, async () => {
        await page.waitFor(`#save-flashcards-button`);
        const saveFlashcardsButton = await page.$(`#save-flashcards-button`);
        await saveFlashcardsButton.click();
        expect(saveFlashcardsButton).toBeDefined();
    });
});
