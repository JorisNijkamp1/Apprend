import {API_URL} from '../../../../redux-config/urls';

describe('Users API tests', function () {
    beforeAll(async function () {
        const url = `${API_URL}/users`;
        const user = {
            'username': 'TestBeforeEach',
            'email': 'iihwduh8h2dnid@gmail.com',
            'password': 'Test123'
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(user)
        };

        await fetch(url, options);
    });

    afterAll(async function () {
        const username = 'TestBeforeEach';
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

    test('Get all users in an array', async function () {
        const url = `${API_URL}/users`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        };

        const response = await fetch(url, options);
        const results = await response.json();
        const isArray = Array.isArray(results);

        expect(response.status).toBe(200);
        expect(isArray).toBeTruthy();
    });

    test('Get specific user by ID', async function () {
        const username = 'TestBeforeEach';
        const url = `${API_URL}/users/${username}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        };

        const response = await fetch(url, options);
        const results = await response.json();

        expect(response.status).toBe(200);
        expect(results.message).toBeDefined();
        expect(results.data).toBeDefined();
        expect(results.data._id).toBe(username);
    });

    test('Fail to get specific user by ID', async function () {
        const username = 'uwdhibwudhinwud8y728ibdun';
        const url = `${API_URL}/users/${username}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        };

        const response = await fetch(url, options);
        const data = await response.json();

        expect(response.status).toBe(404);
        expect(data.message).toBeDefined();
    });

    test('Get only specific user ID by ID', async function () {
        const username = 'TestBeforeEach';
        const url = `${API_URL}/users/${username}/_id`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        };

        const response = await fetch(url, options);
        const results = await response.json();

        expect(response.status).toBe(200);
        expect(results.message).toBeDefined();
        expect(results.data).toBe(username);
    });

    test('Fail to get only specific user ID by ID', async function () {
        const username = 'uwdhibwudhinwud8y728ibdun';
        const url = `${API_URL}/users/${username}/_id`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        };

        const response = await fetch(url, options);
        const results = await response.json();

        expect(response.status).toBe(404);
        expect(results.message).toBeDefined();
    });

    test('Register new user', async function () {
        const username = 'TestPerson';
        const registerUrl = `${API_URL}/users`;
        const deleteUserUrl = `${API_URL}/users/${username}`;

        const registerOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                'username': username,
                'email': 'dwhd2oidnui28hdu@gmail.com',
                'password': 'Wachtwoord'
            })
        };

        const deleteUserOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        };

        const registered = await fetch(registerUrl, registerOptions);
        const registeredData = await registered.json();


        expect(registered.status).toBe(201);
        expect(registeredData.message).not.toBeUndefined();
        expect(registeredData.data._id).toBe(username);

        const deleted = await fetch(deleteUserUrl, deleteUserOptions);
        const deletedData = await deleted.json();

        expect(deleted.status).toBe(200);
        expect(deletedData.message).toBeDefined();
    });

    test('Register new user with duplicate username', async function () {
        const username = 'TestBeforeEach';
        const registerUrl = `${API_URL}/users`;
        const registerDuplicateUsernameOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                'username': username,
                'email': 'ewdwdwjokdmwod@gmail.com',
                'password': 'Test123'
            })
        };

        const registeredDuplicateUsername = await fetch(registerUrl, registerDuplicateUsernameOptions);
        const registeredDuplicateUsernameData = await registeredDuplicateUsername.json();

        expect(registeredDuplicateUsername.status).toBe(409);
        expect(registeredDuplicateUsernameData.message).toBeDefined();
    });

    test('Register new user with duplicate email', async function () {
        const email = 'iihwduh8h2dnid@gmail.com';
        const registerUrl = `${API_URL}/users`;

        const registerDuplicateEmailOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                'username': '92heuijd28h7enjdbhijn3j',
                'email': email,
                'password': 'Test123'
            })
        };

        const registeredDuplicateEmail = await fetch(registerUrl, registerDuplicateEmailOptions);
        const registeredDuplicateEmailData = await registeredDuplicateEmail.json();

        expect(registeredDuplicateEmail.status).toBe(409);
        expect(registeredDuplicateEmailData.message).toBeDefined();
    });

    test('Register new user with missing post data', async function () {
        const registerUrl = `${API_URL}/users`;
        const registerOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        };

        const registered = await fetch(registerUrl, registerOptions);
        const registeredData = await registered.json();

        expect(registered.status).toBe(400);
        expect(registeredData.message).toBeDefined();
    });
});
