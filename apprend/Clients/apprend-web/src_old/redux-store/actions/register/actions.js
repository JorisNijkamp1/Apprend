import {SET_REGISTER_SUCCESS, SET_USERNAME_EXISTS, SET_EMAIL_EXISTS, ERROR_OCCURRED} from './action-types';

export const setRegisterSuccess = function (registered = true) {
    return {
        'type': SET_REGISTER_SUCCESS,
        'payload': registered
    }
};

export const setUsernameExists = function (exists = true) {
    return {
        'type': SET_USERNAME_EXISTS,
        'payload': exists
    }
};

export const setEmailExists = function (exists = true) {
    return {
        'type': SET_EMAIL_EXISTS,
        'payload': exists
    }
};

export const errorOccurred = function (error) {
    return {
        'type': ERROR_OCCURRED,
        'payload': error
    }
};