import {API_URL} from '../../../../redux-config/urls';

describe('Login API tests', function () {
    const data = {
        'username': 'Joris',
        'email': '',
        'password': 'han'
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

    test('Logout', async () => {
        const expectResult = {
            status: 200,
            username: null
        }
        const response = await fetch(`${API_URL}/login/logout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });
        const result = await response.json();
        expect(response.status).toBe(expectResult.status)
        expect(result.username).toBe(expectResult.username)
    })
});