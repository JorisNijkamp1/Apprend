import {SET_REGISTER_SUCCESS, SET_USERNAME_EXISTS, SET_EMAIL_EXISTS, ERROR_OCCURRED} from '../../redux-config/actionTypes';
import {API_URL} from '../../redux-config/urls';
import {setAnonymousUserAction, setLoginAction} from '../login/actions';

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

export const registerNewUser = function (username, email, password) {
    return async dispatch => {
        const url = `${API_URL}/users`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                'username': username,
                'email': email,
                'password': password
            })
        };

        const response = await fetch(url, options);
        const results = await response.json();

        if (response.status === 201) {
            dispatch(setRegisterSuccess(true));
            dispatch(setAnonymousUserAction(false));
            dispatch(setLoginAction(results.data._id));
            return;
        }

        console.log(`(${response.status}) ${results.message}`);
        dispatch(errorOccurred('Something went wrong, please try again...'));
    }
};

export const checkUsernameExists = function (userId) {
    return async dispatch => {
        const url = `${API_URL}/users/${userId}/_id`;
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

        if (response.status === 404) {
            dispatch(setUsernameExists(false));
            return;
        }

        if (response.status === 200) {
            dispatch(setUsernameExists(true));
            return;
        }

        console.log(`(${response.status}) ${results.message}`);
        dispatch(errorOccurred('Something went wrong, please try again...'));
    };
};

export const checkEmailExists = function (email) {
    return async dispatch => {
        const url = `${API_URL}/users/email`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                'email': email
            })
        };

        const response = await fetch(url, options);
        const results = await response.json();

        if (response.status === 404) {
            dispatch(setEmailExists(false));
            return;
        }

        if (response.status === 200) {
            dispatch(setEmailExists(true));
            return;
        }

        console.log(`(${response.status}) ${results.message}`);
        dispatch(errorOccurred('Something went wrong, please try again...'));
    };
};