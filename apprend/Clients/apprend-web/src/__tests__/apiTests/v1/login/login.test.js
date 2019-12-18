import {API_URL} from '../../../../../src_old/redux-store/urls';

describe('Login API tests', function () {
    const data = {
        'username': 'Niels',
        'email': 'niels@gmail.com',
        'password': 'hoi'
    };

    beforeAll(async function () {
        await fetch(`${API_URL}/users`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });
    });

    afterAll(async function () {
        const username = 'Niels';
        const url = `${API_URL}/users/${username}`;

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        };

        await fetch(url, options);
    });

    test('User registers and log in fails', async () => {
        const error = 'You aren\'t logged in';

        const response = await fetch(`${API_URL}/login/check`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });

        const result = await response.json();

        expect(result.success).toBeFalsy();
        expect(result.error).toBe(error);
    })
});