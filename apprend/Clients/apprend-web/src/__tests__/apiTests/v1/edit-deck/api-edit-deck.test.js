import {API_URL} from '../../../../../src_old/redux-store/urls';

describe('Editing a deck', () => {

    let testDeck

    beforeEach(() => {
        testDeck = {
            deckName: 'TestName',
            description: 'TestDescription',
        }
    })

    test('creating a deck, edit that deck and edit a deck you dont own', async () => {
        const expectedResult = {
            deckName: 'TestName',
            description: 'TestDescription',
            status: 'original'
        }

        const response = await fetch('http://localhost:3001/api/v1/decks', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(testDeck),
            headers: {
                'Content-Type': 'application/json'
            },
        })

        const data = await response.json()

        const madeDeck = data.decks[0]

        expect(typeof madeDeck._id).toBe('string')
        expect(madeDeck._id).toHaveLength(24)
        expect(madeDeck.name).toEqual(expectedResult.deckName)
        expect(typeof madeDeck.creatorId).toBe('string')
        expect(madeDeck.creatorId).toHaveLength(32)
        expect(madeDeck.description).toEqual(expectedResult.description)
        expect(madeDeck.status).toEqual(expectedResult.status)
        expect(response.status).toEqual(201)

        const editExpectedResult = {
            name: 'New name for a deck',
            description: 'Awesome new description',
            creatorId: madeDeck.creatorId,
            deckId: madeDeck._id,
            status: 201
        }

        const editBody = {
            name: editExpectedResult.name,
            description: editExpectedResult.description,
            creatorId: editExpectedResult.creatorId
        }

        const editResponse = await fetch(`${API_URL}/decks/${madeDeck._id}`, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(editBody),
            headers: {
                'Content-Type': 'application/json'
            }

        })

        const editedDeck = await editResponse.json()

        expect(editResponse.status).toEqual(editExpectedResult.status)
        expect(editedDeck.name).toEqual(editExpectedResult.name)
        expect(editedDeck.description).toEqual(editExpectedResult.description)
        expect(editedDeck._id).toEqual(editExpectedResult.deckId)

        const expectedEditUnknownDeck = {
            status: 404,
            message: 'Deck not found'
        }
        const editUnknownDeckBody = {
            name: 'deckname',
            description: 'description',
            creatorId: madeDeck.creatorId
        }

        const unknownDeckResponse = await fetch(`${API_URL}/decks/1`, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(editUnknownDeckBody),
            headers: {
                'Content-Type': 'application/json'
            }

        })

        const unknownDeck = await unknownDeckResponse.json()

        // expect(unknownDeckResponse.status).toEqual(404)
        expect(unknownDeck).toEqual(expectedEditUnknownDeck.message)

    })

    test('Edit a deck that does not belong to you', async () => {

        const findJorisDecks = await fetch(`${API_URL}/users/Joris/decks`)
        const jorisDecks = await findJorisDecks.json()

        const editExpectedResult = {
            name: 'New name for a deck',
            description: 'Awesome new description',
            status: 500,
            message: 'This deck doesnt belong to you'
        }

        const editBody = {
            name: editExpectedResult.name,
            description: editExpectedResult.description,
            creatorId: 'Joris'
        }

        const JorisDeck = jorisDecks.decks.decks[0]._id
        const editResponse = await fetch(`${API_URL}/decks/${JorisDeck}`, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(editBody),
            headers: {
                'Content-Type': 'application/json'
            }

        })

        const editedDeck = await editResponse.json()

        expect(editResponse.status).toEqual(401)
        expect(editedDeck).toEqual(editExpectedResult.message)

    })
})