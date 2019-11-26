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

test('Action type SET_REGISTER_SUCCESS is correct', () => {
    const expected = SET_REGISTER_SUCCESS;
    const result = setRegisterSuccess();

    expect(expected).toBe(result.type);
});

test('Action payload SET_REGISTER_SUCCESS is correct', () => {
    const expected = true;
    const result = setRegisterSuccess(true);

    expect(expected).toBe(result.payload);
});

test('Action type SET_USERNAME_EXISTS is correct', () => {
    const expected = SET_USERNAME_EXISTS;
    const result = setUsernameExists();

    expect(expected).toBe(result.type);
});

test('Action payload SET_USERNAME_EXISTS is correct', () => {
    const expected = true;
    const result = setUsernameExists(true);

    expect(expected).toBe(result.payload);
});

test('Action type SET_EMAIL_EXISTS is correct', () => {
    const expected = SET_EMAIL_EXISTS;
    const result = setEmailExists();

    expect(expected).toBe(result.type);
});

test('Action payload SET_EMAIL_EXISTS is correct', () => {
    const expected = true;
    const result = setEmailExists(true);

    expect(expected).toBe(result.payload);
});

test('Action type ERROR_OCCURRED is correct', () => {
    const expected = ERROR_OCCURRED;
    const result = errorOccurred();

    expect(expected).toBe(result.type);
});

test('Action payload ERROR_OCCURRED is correct', () => {
    const expected = 'Dit is een test error!';
    const result = errorOccurred(expected);

    expect(expected).toBe(result.payload);
});