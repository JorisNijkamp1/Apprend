import {API_URL} from '../../../../redux-store/urls';

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
        const data = await response.json();

        const result = Array.isArray(data.users);
        expect(result).toBeTruthy();
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
        const data = await response.json();

        expect(data.success).not.toBeUndefined();
        expect(data.success).toBeTruthy();
        expect(data.user).not.toBeUndefined();
        expect(data.user._id).toBe(username);
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

        expect(data.success).not.toBeUndefined();
        expect(data.success).toBeFalsy();
        expect(data.error).not.toBeUndefined();
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
        const data = await response.json();

        const successExists = data.success !== undefined;

        expect(successExists).not.toBeUndefined();
        expect(data.success).toBeTruthy();
        expect(data._id).toBe(username);
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
        const data = await response.json();

        expect(data.success).not.toBeUndefined();
        expect(data.success).toBeFalsy();
        expect(data.error).not.toBeUndefined();
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

        const successExists = registeredData.success !== undefined;
        const success = registeredData.success;

        expect(registered.status).toBe(201);
        expect(successExists).not.toBeUndefined();
        expect(success).toBeTruthy();
        expect(registeredData.user).not.toBeUndefined();
        expect(registeredData.user._id).toBe(username);

        const deleted = await fetch(deleteUserUrl, deleteUserOptions);
        const deletedData = await deleted.json();

        expect(deleted.status).toBe(200);
        expect(deletedData.success).not.toBeUndefined();
        expect(deletedData.success).toBeTruthy();
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
        expect(registeredData.success).not.toBeUndefined();
        expect(registeredData.success).toBeTruthy();
        expect(registeredData.user).not.toBeUndefined();
        expect(registeredData.user._id).toBe(username);

        const deleted = await fetch(deleteUserUrl, deleteUserOptions);
        const deletedData = await deleted.json();

        expect(deleted.status).toBe(200);
        expect(deletedData.success).not.toBeUndefined();
        expect(deletedData.success).toBeTruthy();
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
        expect(registeredDuplicateUsernameData.success).not.toBeUndefined();
        expect(registeredDuplicateUsernameData.error).not.toBeUndefined();
        expect(registeredDuplicateUsernameData.success).toBeFalsy();
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
        expect(registeredDuplicateEmailData.success).not.toBeUndefined();
        expect(registeredDuplicateEmailData.error).not.toBeUndefined();
        expect(registeredDuplicateEmailData.success).toBeFalsy();
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
        expect(registeredData.success).not.toBeUndefined();
        expect(registeredData.error).not.toBeUndefined();
        expect(registeredData.success).toBeFalsy();
    });
});
