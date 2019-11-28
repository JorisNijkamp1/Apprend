import {setLoginAction} from '../../../redux-store/actions/login/actions';
import {SET_LOGINACTION} from '../../../redux-store/actions/action-types';

test('Action type SET_LOGINACTION is correct', () => {
    const expected = SET_LOGINACTION;
    const result = setLoginAction();

    expect(expected).toBe(result.type);
});

test('Result end point goeie inlog', async () => {
    const expectedResult = {
        "success": true,
        "username": "Joris"
    }
    const data = {
        "username": "Joris",
        "password": "han"
    };
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

test('Result end point foutieve inlog', async () => {
    const expectedResult = {
        "success": false,
        "username": ""
    }
    const data = {
        "username": "Foutusername",
        "password": "Foutwachtwoord"
    };
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