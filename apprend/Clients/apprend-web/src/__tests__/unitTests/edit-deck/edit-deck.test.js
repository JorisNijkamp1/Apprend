/**
 * @jest-environment node
 */

'use strict';
const mongoose = require('mongoose')
const U = require('../../../../../../Server/database/models/user')
const User = mongoose.model('User', U)

describe('Editing a deck', () => {

    let testDeck
    const username = 'testAccount'
    let user

    beforeAll(async () => {
        await mongoose.connect(
            `mongodb://localhost:27017/apprendTest`,
            { useNewUrlParser: true , useUnifiedTopology: true }
        );
    });

    beforeEach(async () => {
        await User.create({
            _id: username,
            email: '',
            password: '',
        })

        testDeck = {
            name: 'First Deck',
            description: 'First Deck Description',
            creatorId: username,
            status: 'original',
            flashcards: [],
        }
        user = await User.findById(username)
        await user.addDeck(testDeck)
    })

    afterEach( async () => {
        await User.findByIdAndDelete(username)
    })

    afterAll(async () => {
        await mongoose.disconnect()
    })

    test('editing a deck with the method editDeck on subdoc Deck', async () => {

        const expectedResult = {
            deckName: 'Edited Deck',
            description: 'Different description',
        }

        const deck = await user.decks.id(user.decks[0]._id)
        // await deck.editDeck(expectedResult.deckName, expectedResult.description)
        await deck.editDeck([{name: 'name', value: expectedResult.deckName}, {name: 'description', value: expectedResult.description}])
        user.markModified('decks')
        await user.save()

        const userAfterEdit = await User.findById(username)
        const deckAfterEdit = await userAfterEdit.decks.id(userAfterEdit.decks[0]._id)

        expect(deckAfterEdit.name).toEqual(expectedResult.deckName)
        expect(deckAfterEdit.description).toEqual(expectedResult.description)
    })
});
