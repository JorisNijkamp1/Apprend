/**
 * @jest-environment node
 */

'use strict';
const mongoose = require('mongoose')
const U = require('../../../../../../Server/database/models/user')
const User = mongoose.model('User', U)

describe('Importing a deck', () => {

    let testDeck;
    const username = 'testAccount'

    beforeAll(async () => {
        await mongoose.connect(
            `mongodb://localhost:27017/apprend`,
            {useNewUrlParser: true, useUnifiedTopology: true}
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
    })

    afterEach(async () => {
        await User.findByIdAndDelete(username)
    })

    afterAll(async () => {
        await mongoose.disconnect()
    })

    test('Import a deck', async () => {
        const expectedResult = {
            deckName: 'First Deck',
            description: 'First Deck Description',
            creatorId: username,
            amountOfDecks: 1,
        }

        let testUser = await User.findById(username)
        await testUser.addDeck(testDeck)

        testUser = await User.findById(username)

        expect(testUser.decks[0].name).toEqual(expectedResult.deckName)
        expect(testUser.decks[0].description).toEqual(expectedResult.description)
        expect(testUser.decks.length).toEqual(expectedResult.amountOfDecks)
    })
})