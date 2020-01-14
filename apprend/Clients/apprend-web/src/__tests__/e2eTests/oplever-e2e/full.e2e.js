const puppeteer = require('puppeteer');

jest.setTimeout(30000);

describe(`Complete test`, () => {
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

        await page.evaluate(() => document.getElementById("input-name").value = "");
        await page.type(`[id="input-name"]`, `Import`, {delay: 15});

        await page.evaluate(() => document.getElementById("input-description").value = "");
        await page.type(`[id="input-description"]`, `ik ben geimporteerd`, {delay: 15});

        await page.evaluate(() => document.getElementById("tags").value = "");
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

    test(`Go to create deck`, async () => {
        await page.goto(`http://localhost:3000/decks/create`)
        await page.waitFor(`input#create-deck-form-deckname`)
        const nameField = await page.$(`input#create-deck-form-deckname`)
        expect(nameField).toBeDefined()
    })

    test(`Fill deck name`, async () => {
        await page.type(`input#create-deck-form-deckname`, `test`, {delay: 5})
        const nameField = await page.$(`input#create-deck-form-deckname`)
        expect(nameField).toBeDefined()
    })

    test(`Fill deck description`, async () => {
        await page.type(`textarea#create-deck-form-description`, `Mooie omschrijving`, {delay: 5})
        const descriptionField = await page.$(`textarea#create-deck-form-description`)
        expect(descriptionField).toBeDefined()
    })

    test(`Fill in a tag`, async () => {
        await page.type(`input#tags`, `test`, {delay: 5})
        const tagsField = await page.$(`input#tags`)
        expect(tagsField).toBeDefined()
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

    for (let i = 0; i < 2; i++) {
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

    for(let i = 0; i < 2; i++) {
        test(`Add a name for a column`, async () => {
            await page.type(`input#index-` + i, `text` + i, {delay: 5})
            const nameField = await page.$(`input#index-` + i)
            expect(nameField).toBeDefined()
        });
    }

    test(`Add a name for a column`, async () => {
        await page.type(`input#index-2`, `image1`, {delay: 5})
        const nameField = await page.$(`input#index-2`)
        expect(nameField).toBeDefined()
    });

    for (let i = 0; i < 3; i++) {
        test(`Add a flashcard`, async () => {
            const addFlashcardButton = await page.$(`#FLASHCARD`)
            expect(addFlashcardButton).toBeDefined()
            await addFlashcardButton.click()
        });
    }

    for(let i = 0; i < 2; i++) {
        test(`Add data to a flashcard`, async () => {
            await page.type('tr#row-1 textarea#text-' + i, `textcol` + (i + 1), {delay: 5})
            const nameField = await page.$('tr#row-1 textarea#text-' + i)
            expect(nameField).toBeDefined()
        });
    }

    test(`Add data to a flashcard`, async () => {
        await page.type('tr#row-1 input#image-2', `https://iculture.textopus.nl/wp-content/uploads/2014/06/The-Test-Fun-for-Friends-iPhone-iPad.png`)
        const nameField = await page.$('tr#row-1 input#image-2')
        expect(nameField).toBeDefined()
    });

    test(`Remove a flashcard`, async () => {
        const addFlashcardButton = await page.$(`tr#row-0 #delete-0`)
        expect(addFlashcardButton).toBeDefined()
        await addFlashcardButton.click()
    });

    test(`Click the green icon to really delete the column`, async () => {
        const deleteButton = await page.$(`#faCheck`)
        expect(deleteButton).toBeDefined()
        await deleteButton.click()
    });

    test(`Toggle the status of the deck`, async () => {
        const deleteButton = await page.$(`#toggle-status-deck-button`)
        expect(deleteButton).toBeDefined()
        await deleteButton.click()
    });


    test('Load register page', async () => {
        await page.goto('http://localhost:3000/register');
        await page.waitFor(`title`);

        const theTitle = await page.title();
        expect(theTitle).toBe(`Apprend | Flashcard learning platform`);
    });

    test('Can register', async () => {
        const username = 'testuser';
        const email = 'testuser@test.com';
        const password = 'test';

        await page.waitFor('#registerUsernameInput');
        const registerUsernameInput = await page.$('#registerUsernameInput');
        await registerUsernameInput.click({clickCount: 3});
        await registerUsernameInput.type(username);

        await page.waitFor('#registerEmailInput');
        const registerEmailInput = await page.$('#registerEmailInput');
        await registerEmailInput.click({clickCount: 3});
        await registerEmailInput.type(email);

        await page.waitFor('#registerPasswordInput');
        const registerPasswordInput = await page.$('#registerPasswordInput');
        await registerPasswordInput.click({clickCount: 3});
        await registerPasswordInput.type(password);

        await page.waitFor('#registerRepeatPasswordInput');
        const registerRepeatPasswordInput = await page.$('#registerRepeatPasswordInput');
        await registerRepeatPasswordInput.click({clickCount: 3});
        await registerRepeatPasswordInput.type(password);

        const registerButton = await page.$('#registerSubmitButton');
        expect(registerButton).toBeDefined();
        await registerButton.click();
    });

    test('Click on my profile', async () => {
        await page.waitFor(`title`);

        const theTitle = await page.title();
        expect(theTitle).toBe(`Apprend | Flashcard learning platform`);

        await page.waitFor('#my-profile');

        const myprofileButton = await page.$(`[id="my-profile"]`);

        expect(myprofileButton).toBeDefined();

        await myprofileButton.click()

    })

});