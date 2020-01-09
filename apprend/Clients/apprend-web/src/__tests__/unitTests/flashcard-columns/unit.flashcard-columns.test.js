/**
 * @jest-environment node
 */

'use strict';
const mongoose = require('mongoose')
const U = require('../../../../../../Server/database/models/user')
const User = mongoose.model('User', U)

describe('Editing columns of a flashcard', () => {

    let testUser
    let deck
    let flashcard
    let column
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
        flashcard = await deck.flashcards.id(deck.flashcards[0]._id)
        column = await flashcard.columns.id(flashcard.columns[0]._id)
    })

    afterEach( async () => {
        await User.findByIdAndDelete(username)
    })
    
    afterAll(async () => {
        await mongoose.disconnect()
    })

    test('Edit the value of a Text column', async () => {
        const editValue = 'New description' 
        const expectedResult = {
            value: editValue,
            type: 'Text',
        }

        const result = await  column.editColumn({prop: 'value', value: editValue})
        testUser.markModified('decks')
        await testUser.save()

        testUser = await User.findById(username)
        expect(testUser.decks[0].flashcards[0].columns[0].value).toEqual(expectedResult.value)
    })
})