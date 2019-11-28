/**
 * @jest-environment node
 */

'use strict';
const mongoose = require('mongoose')
const U = require('../../../../../../../Server/database/models/user')
const User = mongoose.model('User', U)

describe('creating a deck', () => {

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

    test('creating a deck as new user without any decks', async () => {
        const expectedResult = {
            deckName: 'First Deck',
            description: 'First Deck Description',
            creatorId: username,
            amountOfDecks: 1,
        }

        let testUser = await User.findById(username)
        const result = await testUser.addDeck(testDeck)

        testUser = await User.findById(username)

        expect(testUser.decks[0].name).toEqual(expectedResult.deckName)
        expect(testUser.decks[0].description).toEqual(expectedResult.description)
        expect(testUser.decks.length).toEqual(expectedResult.amountOfDecks)

    })

    test('creating a deck as an user with previous decks', async () => {
        const expectedResult = {
            deckName: 'Second Deck',
            description: 'Second Deck Description',
            amountOfDecks: 2
        }

        let testUser = await User.findById(username)
        let result = await testUser.addDeck(testDeck)

        testDeck = {
            name: 'Second Deck',
            description: 'Second Deck Description',
            creatorId: username,
            flashcards: [],
        }

        result = await testUser.addDeck(testDeck)
        
        testUser = await User.findById(username)

        expect(testUser.decks[1].name).toEqual(expectedResult.deckName)
        expect(testUser.decks[1].description).toEqual(expectedResult.description)
        expect(testUser.decks.length).toEqual(expectedResult.amountOfDecks)
    })
})