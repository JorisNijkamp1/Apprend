import {
    errorOccurred,
    setEmailExists,
    setRegisterSuccess,
    setUsernameExists
} from '../../../components/register/actions';
import {
    ERROR_OCCURRED,
    SET_EMAIL_EXISTS,
    SET_REGISTER_SUCCESS,
    SET_USERNAME_EXISTS
} from '../../../redux/actionTypes';

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
