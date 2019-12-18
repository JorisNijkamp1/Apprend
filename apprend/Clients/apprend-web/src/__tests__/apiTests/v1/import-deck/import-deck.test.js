import {API_URL} from "../../../../../src_old/redux-store/urls";

describe('import decks from another user', () => {
    let testDeck
    let account;
    beforeEach(() => {
        testDeck = {
            deckName: 'TestName',
            description: 'TestDescription',
        }
    })

    test('creating a deck as new anonymous user', async () => {
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
        account = madeDeck.creatorId;
        expect(typeof madeDeck._id).toBe('string')
        expect(madeDeck._id).toHaveLength(24)
        expect(madeDeck.name).toEqual(expectedResult.deckName)
        expect(typeof madeDeck.creatorId).toBe('string')
        expect(madeDeck.creatorId).toHaveLength(32)
        expect(madeDeck.description).toEqual(expectedResult.description)
        expect(madeDeck.status).toEqual(expectedResult.status)
        expect(response.status).toEqual(201)
    })

    test('Put import endpoint', async () => {
        const findJorisDecks = await fetch(`${API_URL}/users/Joris/decks`)
        const jorisDecks = await findJorisDecks.json()
        const JorisDeck = jorisDecks.decks.decks[0]._id

        const expectedResult = {
            status: 201,
            account: account
        }

        const response = await fetch(`${API_URL}/decks/${JorisDeck}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const result = await response.json();

        expect(response.status).toBe(expectedResult.status)
        expect(result.creatorId).toBe(expectedResult.account)
    })
})