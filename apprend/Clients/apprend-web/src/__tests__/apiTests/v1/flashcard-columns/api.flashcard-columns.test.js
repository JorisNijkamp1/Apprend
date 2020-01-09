import {API_URL} from '../../../../redux/urls';

describe('Edit the value of a column of a flashcard', () => {

    const user = 'Joris'
    const password = 'han'

    let login = {
        username: user,
        password: password
    }
    let deck

    beforeAll( async () => {
        const response = await fetch('http://localhost:3001/api/v1/login', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(login),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const getAllDecks = await fetch(`http://localhost:3001/api/v1/users/${user}/decks`)
        const data = await getAllDecks.json()
        deck = data.data.decks[0]
    })

    test('Edit the value of a column', async () => {

        const newValue = 'New description'
        const columnName = 'testname'

        const expectedResult = {
            message: 'Changes saved',
            status: 201
        }

        const response = await fetch(`${API_URL}/users/${user}/decks/${deck._id}/flashcards/${deck.flashcards[0]._id}/columns/${deck.flashcards[0].columns[0]._id}`, {
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify({props: [{prop: 'value', value: newValue}]}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        expect(response.status).toEqual(expectedResult.status)
        expect(data.message).toEqual(expectedResult.message)
    })
})