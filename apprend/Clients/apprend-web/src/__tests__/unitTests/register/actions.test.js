import {
    errorOccurred,
    setEmailExists,
    setRegisterSuccess,
    setUsernameExists
} from '../../../redux-store/actions/register/actions';
import {
    ERROR_OCCURRED,
    SET_EMAIL_EXISTS,
    SET_REGISTER_SUCCESS,
    SET_USERNAME_EXISTS
} from '../../../redux-store/actions/register/action-types';
import {setLoginAction, setAnonymousUserAction} from '../../../redux-store/actions/login/actions';

test('Action type SET_REGISTER_SUCCESS is correct', () => {
    expect(setRegisterSuccess().type).toBe(SET_REGISTER_SUCCESS);
});

test('Action payload SET_REGISTER_SUCCESS is correct', () => {
    expect(setRegisterSuccess(true).payload).toBeTruthy();
});

test('Action type SET_USERNAME_EXISTS is correct', () => {
    expect(setUsernameExists().type).toBe(SET_USERNAME_EXISTS);
});

test('Action payload SET_USERNAME_EXISTS is correct', () => {
    expect(setUsernameExists(true).payload).toBeTruthy();
});

test('Action type SET_EMAIL_EXISTS is correct', () => {
    expect(setEmailExists().type).toBe(SET_EMAIL_EXISTS);
});

test('Action payload SET_EMAIL_EXISTS is correct', () => {
    expect(setEmailExists(true).payload).toBeTruthy();
});

test('Action type ERROR_OCCURRED is correct', () => {
    expect(errorOccurred().type).toBe(ERROR_OCCURRED);
});

test('Action payload ERROR_OCCURRED is correct', () => {
    const expectedError = 'Dit is een test error!';
    expect(errorOccurred(expectedError).payload).toBe(expectedError);
});

test('User registers and logs in', async () => {
    const expectedResult = {
        "success": true,
        "username": "Niels"
    }
    const data = {
        "username": "Niels",
        'email': 'niels@gmail.com',
        "password": "hoi"
    };

    await fetch(`http://localhost:3001/api/v1/users`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        mode: 'cors'
    });

    const response = await fetch('http://localhost:3001/api/v1/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        mode: 'cors'
    })
    const result = await response.json();

    expect(result.success).toBe(expectedResult.success)
    expect(result.username).toBe(expectedResult.username)
})