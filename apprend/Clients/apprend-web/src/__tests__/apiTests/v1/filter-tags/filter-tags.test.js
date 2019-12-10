import {API_URL} from '../../../../redux-store/urls';

describe('Login API tests', function () {
    const value = "test";

    test('Not able to filter because you\'re not logged in', async () => {
        const response = await fetch(`${API_URL}/decks/tags?tag=${value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });

        const result = await response.json();

        expect(result.decks).toStrictEqual([]);
    })
});