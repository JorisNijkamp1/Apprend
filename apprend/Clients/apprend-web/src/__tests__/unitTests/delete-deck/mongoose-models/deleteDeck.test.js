/**
 * @jest-environment node
 */

'use strict';
const mongoose = require('mongoose')
const U = require('../../../../../../../Server/database/models/user')
const User = mongoose.model('User', U)

describe('Deleting a deck', () => {

    let testDeck
    const username = 'testAccount'

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
    })

    afterEach( async () => {
        await User.findByIdAndDelete(username)
    })
    
    afterAll(async () => {
        await mongoose.disconnect()
    })

    test('deleting a deck from an user', async () => {
        const expectedResult = {
            amountOfStartingDecks: 1,
            amountOfEndDecks: 0,
            name: 'First Deck'
        }

        let testUser = await User.findById(username)
        const addDeckResult = await testUser.addDeck(testDeck)
        expect(testUser.decks.length).toEqual(expectedResult.amountOfStartingDecks)
        testUser = await User.findById(username)

        const deleteDeckResult = await testUser.deleteDeck(addDeckResult._id.toString())
        testUser = await User.findById(username)

        expect(addDeckResult.name).toEqual(expectedResult.name)
        expect(testUser.decks.length).toEqual(expectedResult.amountOfEndDecks)

    })
})