import {API_URL} from '../../../../redux-store/urls';

test('Get all users in an array', async function () {
    const url = `${API_URL}/users`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
            'username': username,
            'email': email,
            'password': password
        })
    };

    const expected = true;
    const users = await fetch(url, options);
    const result = Array.isArray(users);

    expect(result).toBe(expected);
});