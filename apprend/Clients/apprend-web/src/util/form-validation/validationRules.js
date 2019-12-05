/*
|-------------------------------------------------------------------------
| Validation rules
|-------------------------------------------------------------------------
 */
const REGEX_USERNAME = /[^A-Za-z0-9]+/g;

/*
|-------------------------------------------------------------------------
| Input validation functions
|-------------------------------------------------------------------------
 */
export const usernameValid = function (username) {
    return username && !username.match(REGEX_USERNAME);
};

export const emailValid = function (email) {
    return email && email.includes('@') && email.includes('.');
};

export const passwordValid = function (password) {
    return !!password;
};

export const repeatPasswordValid = function (password, repeatPassword) {
    return repeatPassword && password && password === repeatPassword;
};

/*
|-------------------------------------------------------------------------
| Form specific validation functions
|-------------------------------------------------------------------------
 */
export const registerFormMaySubmit = function (username, email, password, repeatPassword) {
    return usernameValid(username) &&
        emailValid(email) &&
        passwordValid(password) &&
        repeatPasswordValid(password, repeatPassword);
};