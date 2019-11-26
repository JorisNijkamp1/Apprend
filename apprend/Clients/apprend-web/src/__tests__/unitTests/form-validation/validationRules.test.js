import {
    emailValid,
    passwordValid, registerFormMaySubmit,
    repeatPasswordValid,
    usernameValid
} from '../../../redux-store/form-validation/validationRules';

test('Username should be valid', () => {
    const expected = true;
    const username = 'Johndoe125';
    const result = usernameValid(username);

    expect(expected).toBe(result);
});

test('Username should not be valid', () => {
    const expected = false;
    const username = 'Johndoe125@';
    const result = usernameValid(username);

    expect(expected).toBe(result);
});

test('Email should be valid', () => {
    const expected = true;
    const username = 'john@doe.com';
    const result = emailValid(username);

    expect(expected).toBe(result);
});

test('Email should not be valid', () => {
    const expected = false;
    const username = 'johndoecom';
    const result = emailValid(username);

    expect(expected).toBe(result);
});

test('Password should be valid', () => {
    const expected = true;
    const username = 'Test123#';
    const result = passwordValid(username);

    expect(expected).toBe(result);
});

test('Repeat password is same as password', () => {
    const expected = true;
    const password = 'Admin123#';
    const repeatPassword = 'Admin123#';
    const result = repeatPasswordValid(password, repeatPassword);

    expect(expected).toBe(result);
});

test('Repeat password is not same as password', () => {
    const expected = false;
    const password = 'Admin123#';
    const repeatPassword = 'Test456$';
    const result = repeatPasswordValid(password, repeatPassword);

    expect(expected).toBe(result);
});

test('Register form may submit', () => {
    const expected = true;
    const username = 'Senkuu';
    const email = 'test@gmail.com';
    const password = 'Admin123#';
    const repeatPassword = 'Admin123#';
    const result = registerFormMaySubmit(username, email, password, repeatPassword);

    expect(expected).toBe(result);
});

test('Register form may not submit', () => {
    const expected = false;
    const username = 'Senkuu#$';
    const email = 'testgmail.com';
    const password = 'Admin123#';
    const repeatPassword = 'Test456$';
    const result = repeatPasswordValid(username, email, password, repeatPassword);

    expect(expected).toBe(result);
});