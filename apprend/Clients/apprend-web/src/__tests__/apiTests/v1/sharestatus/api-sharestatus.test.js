import {API_URL} from '../../../../redux/urls';

describe('Setting decks to a new shared status', () => {

    let testDeck
    let madeDeck

    beforeAll( async () => {

        testDeck = {
            deckName: 'TestName',
            description: 'TestDescription',
        }

        const response = await fetch(`${API_URL}/decks`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(testDeck),
            headers: {
                'Content-Type': 'application/json'
            },
        })

        const data = await response.json()

        madeDeck = data.data.decks[0]

    })

    test('creating a deck as public, and set it private afterwards', async () => {

        const editExpectedResult = {
            private: true,
            deckName: 'TestName'
        }

        const editResponse = await fetch(`${API_URL}/users/${madeDeck.creatorId}/decks/${madeDeck._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        })

        const editResult = await editResponse.json()

        expect(editResult.data.private).toEqual(editExpectedResult.private)
        expect(editResult.data.name).toEqual(editExpectedResult.deckName)

    })

    test('Make it public afterwards', async () => {
    
        const editExpectedResult = {
            private: false,
            deckName: 'TestName'
        }

        const editResponse = await fetch(`${API_URL}/users/${madeDeck.creatorId}/decks/${madeDeck._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        })

        const editResult = await editResponse.json()

        expect(editResult.data.private).toEqual(editExpectedResult.private)
        expect(editResult.data.name).toEqual(editExpectedResult.deckName)
    })

    test('Toggle a deck that doesnt exist', async () => {
    
        const editExpectedResult = {
            status: 404
        }

        const editResponse = await fetch(`${API_URL}/users/${madeDeck.creatorId}/decks/1`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        })

        expect(editResponse.status).toEqual(editExpectedResult.status)
    })

    test('Toggle a deck that doesnt belong to you', async () => {

        /*
            In order to pass this test, you need a user matching 'user' and that user needs at least one deck
        */

        const user = 'Joris'

        const findAnUserAndDecks = await fetch(`${API_URL}/users/${user}/decks`)
        const data = await findAnUserAndDecks.json()
    
        const editExpectedResult = {
            status: 401
        }

        const editResponse = await fetch(`${API_URL}/users/${user}/decks/${data.data.decks[0]._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        })

        expect(editResponse.status).toEqual(editExpectedResult.status)
    })


})