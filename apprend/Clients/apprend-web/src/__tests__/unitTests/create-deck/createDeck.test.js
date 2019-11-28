
describe('creating a deck for a new anonymous user', () => {

    let testDeck

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

        expect(typeof madeDeck._id).toBe('string')
        expect(madeDeck._id).toHaveLength(24)
        expect(madeDeck.name).toEqual(expectedResult.deckName)
        expect(typeof madeDeck.creatorId).toBe('string')
        expect(madeDeck.creatorId).toHaveLength(32)
        expect(madeDeck.description).toEqual(expectedResult.description)
        expect(madeDeck.status).toEqual(expectedResult.status)
        expect(response.status).toEqual(201)

    })
})