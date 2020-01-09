import {API_URL} from '../../../../redux/urls';

describe('Update user email & password', () => {
    const user = {
        'username': 'Joris',
        'email': '',
        'password': 'han'
    };

    beforeAll(async function () {
        await fetch(`${API_URL}/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });
    });

    test('Update email', async function () {
        const data = {
            'email': 'joris@gmail.com',
        };

        const response = await fetch(`${API_URL}/users/Joris`, {
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        });
        const result = await response.json();
        expect(result.data.email).toEqual(data.email);
    })

});