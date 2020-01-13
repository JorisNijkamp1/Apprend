import {API_URL} from '../../../../redux-config/urls';

describe('Create, edit and delete columns', () => {

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

    test('Add a new column to deck', async () => {
        const columnName = 'testname'

        const expectedResult = {
            message: 'Column added',
            status: 201,
            columnType: 'Text',
            columnName: columnName,
            columnsAmount: deck.columns.length + 1
        }

        const response = await fetch(`http://localhost:3001/api/v1/users/${user}/decks/${deck._id}/columns`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({column: {type: 'Text', name: columnName}}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        expect(response.status).toEqual(expectedResult.status)
        expect(data.message).toEqual(expectedResult.message)
        expect(data.data.columns[data.data.columns.length -1].type).toEqual(expectedResult.columnType)
        expect(data.data.columns[data.data.columns.length -1].name).toEqual(expectedResult.columnName)
        expect(data.data.columns.length).toEqual(expectedResult.columnsAmount)
    })

    test('Edit the name of a column ', async () => {

        const newName = 'newName'
        const expectedResult = {
            message: 'Saved',
            status: 200,
            columnName: newName,
        }

        const response = await fetch(`${API_URL}/users/${user}/decks/${deck._id}/columns/0`, {
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify({column: { value: newName}}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        
        expect(data.message).toEqual(expectedResult.message)
        expect(response.status).toEqual(expectedResult.status)
        expect(data.data).toEqual(expectedResult.columnName)

    })

    test('Delete a column', async () => {

        const expectedResult = {
            message: 'Delete ok',
            status: 200
        }

        const response = await fetch(`${API_URL}/users/${user}/decks/${deck._id}/columns/${deck.columns.length -1 }`, {
            method: 'DELETE',
            credentials: 'include',
        })
        const data = await response.json()

        expect(response.status).toEqual(expectedResult.status)
        expect(data.message).toEqual(expectedResult.message)
    })
})