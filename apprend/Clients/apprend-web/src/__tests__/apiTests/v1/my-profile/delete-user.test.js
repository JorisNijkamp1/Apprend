import {API_URL} from '../../../../redux/urls';

describe('Delete a user', () => {
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

    test('Delete a user by username', async function () {
        const expectedResult = {
            data: true,
            message: 'Your user has been deleted!'
        };

        const response = await fetch(`${API_URL}/users/Niels`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });
        const result = await response.json();
        console.log(result)
        expect(expectedResult.data).toEqual(result.data);
        expect(expectedResult.message).toEqual(result.message);

    })

    test('Delete a user by username but the username does not exist', async function () {
        const expectedResult = {
            message: 'User does not exist'
        };

        const response = await fetch(`${API_URL}/users/Niel`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });
        const result = await response.json();
        console.log(result)
        expect(expectedResult.message).toEqual(result.message);

    })
});
