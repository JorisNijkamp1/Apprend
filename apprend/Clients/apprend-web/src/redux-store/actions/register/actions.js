import {SET_USERNAME_EXISTS} from './action-types';

export const registerNewUser = function (username, email, password) {
    // TODO: Implement action creator
};

export const setUsernameExists = function (exists = true) {
    return {
        'type': SET_USERNAME_EXISTS,
        'payload': exists
    }
};