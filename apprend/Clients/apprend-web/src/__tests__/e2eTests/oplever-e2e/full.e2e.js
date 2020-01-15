const puppeteer = require('puppeteer');

jest.setTimeout(30000);

describe(`Complete test`, () => {
    let browser, page

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 50,
            defaultViewport: null,
            args: [`--window-size=1200,1200`, `--window-position=0,0`]
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

    for(let i = 0; i < 2; i++) {
        test(`Add a image column`, async () => {
            await page.waitFor(`#button-Image-1`);
            const imageButton = await page.$(`#button-Image-1`)
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

    for(let i = 0; i < 3; i++) {
        test(`Add a flashcard`, async () => {
            const addFlashcardButton = await page.$(`#add-flashcard-2`)
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
        await page.type('tr#row-1 input#column-1-2', `https://iculture.textopus.nl/wp-content/uploads/2014/06/The-Test-Fun-for-Friends-iPhone-iPad.png`)
        const nameField = await page.$('tr#row-1 input#column-1-2')
        expect(nameField).toBeDefined()
    });

    test(`Remove a flashcard`, async () => {
        const deleteButton = await page.$(`tr#row-0 #delete-0`)
        expect(deleteButton).toBeDefined()
        await deleteButton.click()
    });

    test(`Click the green icon to really delete the column`, async () => {
        const deleteButton = await page.$(`#faCheck`)
        expect(deleteButton).toBeDefined()
        await deleteButton.click()
    });

    test(`Toggle the status of the deck`, async () => {
        const statusButton = await page.$(`#toggle-status-deck-button`)
        expect(statusButton).toBeDefined()
        await statusButton.click()
    });

    test(`Go to the "my decks" page`, async () => {
        const decksButton = await page.$(`a[name="my-decks"]`)
        expect(decksButton).toBeDefined()
        await decksButton.click()
    });

    test(`Delete a deck`, async () => {
        await page.waitFor(`#delete-icon-button-0`);
        const deleteDeckButton = await page.$(`#delete-icon-button-0`)
        expect(deleteDeckButton).toBeDefined()
        await deleteDeckButton.click()
    });

    test(`Confirm deleting a deck`, async () => {
        const deleteDeckButton = await page.$(`#confirm-icon-button-0`)
        expect(deleteDeckButton).toBeDefined()
        await deleteDeckButton.click()
    });

    test(`Click the play a deck button`, async () => {
        const playButton = await page.$(`#card-0-play-link`)
        expect(playButton).toBeDefined()
        await playButton.click()
    });

    test(`Play a deck`, async () => {
        await page.waitFor(`#play-game`);
        const playButton = await page.$(`#play-game`)
        expect(playButton).toBeDefined()
        await playButton.click()
    });

    test(`Flip a card`, async () => {
        await page.waitFor(`#flip`);
        const flipButton = await page.$(`#flip`)
        expect(flipButton).toBeDefined()
        await flipButton.click()
    });

    test(`Click on correct`, async () => {
        const correctButton = await page.$(`#correct`)
        expect(correctButton).toBeDefined()
        await correctButton.click()
    });

    test(`Click on wrong`, async () => {
        const wrongButton = await page.$(`#wrong`)
        expect(wrongButton).toBeDefined()
        await wrongButton.click()
    });

    test(`Click on correct`, async () => {
        const correctButton = await page.$(`#correct`)
        expect(correctButton).toBeDefined()
        await correctButton.click()
    });

    test(`Click on the back button`, async () => {
        const backButton = await page.$(`#back`)
        expect(backButton).toBeDefined()
        await backButton.click()
    });
});