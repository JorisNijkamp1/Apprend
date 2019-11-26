/**
 * @jest-environment node
 */

'use strict';
const mongoose = require('mongoose')
// const User = require('../../../../../../../Server/database/models/user')
const U = require('../../../../../../../Server/database/models/user')
const User = mongoose.model('User', U)
const srvConfig = require('../../../../../../../Server/config');

describe('creating a deck', () => {

    let testDeck

    beforeAll(async () => {
        await mongoose.connect(
            `mongodb+srv://${srvConfig.USERNAME}:${srvConfig.PASSWORD}@${srvConfig.HOST}/${srvConfig.DB}?retryWrites=true&w=majority`, 
            { useNewUrlParser: true , useUnifiedTopology: true }
        );
    });

    beforeEach(async () => {
        await User.create({
            _id: 'test',
            email: '',
            password: '',
            // decks: []
        })

        testDeck = {
            deckName: 'First deck',
            description: 'First testdeck description',
        }
    })

    afterEach( async () => {
        // await User.findByIdAndDelete('test')
    })
    
    afterAll(async () => {
        await mongoose.disconnect()
    })

    test('creating a deck as new user without any decks', async () => {
        const expectedResult = {
            deckName: 'First deck',
            description: 'First testdeck description',
            status: 'original',
            amountOfDecks: 1,
        }

        let testUser = await User.findById('test')
        const result = await testUser.addDeck(testDeck)
        console.log(testUser, result)

        // user = await User.findById('test')

        // expect(result.deckName).toEqual(expectedResult.deckName)
        // expect(result.description).toEqual(expectedResult.description)
        // expect(user.decks.length).toEqual(expectedResult.amountOfDecks)

    })

    xtest('creating a deck as anonymous user with previous decks', async () => {
        const expectedResult = {
            deckName: 'Second testdeck',
            description: 'Second testdeck description',
            status: 'original',
        }

        // const t = await User.findById('Aaron')
        // console.log(t)

        // console.log(User)

        // const user = await User.findById('test')
        
        // testDeck.deckName = 'Second testdeck'
        // testDeck.description = 'Second testdeck description'

        // const data = await response.json()
        // console.log(data)

        // const user = await User.findById(data.creatorId)
        // console.log('ik kom hier')
        // const result = await user.addDeck(testDeck)

        // // expect(result._id).not.toBe(madeDeck._id)
        // expect(result._id).toHaveLength(24)
        // expect(result.deckName).toEqual(expectedResult.deckName)
        // expect(result.description).toEqual(expectedResult.description)

        
    })



    xtest('creating a deck as a logged in user with previous decks', async () => {

    })
})