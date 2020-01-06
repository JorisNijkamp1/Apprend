import {API_URL} from '../../../../redux/urls';

describe('Filter API tests', function () {
    test('Not able to filter because this user doesn\'t have any decks', async () => {
        const response = await fetch(`${API_URL}/users/Jantje/decks`, {
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
});