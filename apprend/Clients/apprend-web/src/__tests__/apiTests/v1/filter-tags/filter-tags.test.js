import {API_URL} from '../../../../redux-config/urls';

describe('Filter API tests', function () {
    test('Fail to get all decks belonging to a specific user', async () => {
        const name = 'Jantje';
        const response = await fetch(`${API_URL}/users/${name}/decks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });

        const result = await response.json();
        expect(result.message).toEqual('User does not exist');
    });

    test('Get all decks belonging to a specific user', async () => {
        const name = 'Joris';
        const response = await fetch(`${API_URL}/users/${name}/decks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });

        const result = await response.json();
        expect(result.message).toEqual('All decks');
        expect(result.data.userId).toEqual(name);
        expect(result.data.decks.length).toEqual(3);
    });
});