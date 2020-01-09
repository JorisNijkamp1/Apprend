/**
 * @jest-environment node
 */

'use strict';
const mongoose = require('mongoose')
const U = require('../../../../../../Server/database/models/user')
const User = mongoose.model('User', U)

describe('Adding, editing and deleting deck columns', () => {

    let testUser
    let deck
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
            flashcards: [{columns: [{type: 'Text', value: ''}, {type: 'Text', value: ''}]}],
            columns: [{type: 'Text', value: '1'}, {type: 'Text', value: '2'}]
        }
        testUser = await User.findById(username)
        const result = await testUser.addDeck(testDeck)
        deck = await testUser.decks.id(testUser.decks[0]._id)
    })

    afterEach( async () => {
        await User.findByIdAndDelete(username)
    })
    
    afterAll(async () => {
        await mongoose.disconnect()
    })

    test('Adding a new column to a deck', async () => {
        const expectedResult = {
            columnAmount: 3,
            type: 'Text',
            name: 'Nice name'
        }

        const deck = await testUser.decks.id(testUser.decks[0]._id)
        const result = await  deck.addColumn({type: 'Text', name: 'Nice name'})
        testUser.markModified('decks')
        await testUser.save()

        testUser = await User.findById(username)

        expect(testUser.decks[0].columns.length).toEqual(expectedResult.columnAmount)
        expect(testUser.decks[0].columns[2].type).toEqual(expectedResult.type)
        expect(testUser.decks[0].columns[2].name).toEqual(expectedResult.name)
        expect(testUser.decks[0].flashcards[0].columns.length).toEqual(expectedResult.columnAmount)
    })

    test('Deleting a column', async () => {
        const expectedResult = {
            columnAmount: 1,
        } 
        const result = await deck.deleteColumn(0)
        testUser.markModified('decks')
        await testUser.save()
        testUser = await User.findById(username)
        expect(testUser.decks[0].columns.length).toEqual(expectedResult.columnAmount)
        expect(testUser.decks[0].flashcards[0].columns.length).toEqual(expectedResult.columnAmount)
    })
})