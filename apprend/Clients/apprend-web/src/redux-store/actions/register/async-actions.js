import {API_URL} from '../../urls';
import {setRegisterSuccess, setUsernameExists, setEmailExists, errorOccurred} from '../register/actions';

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

        fetch(url, options).then(response => {
            return response.json();
        }).then(results => {
            if (results.success) {
                dispatch(setRegisterSuccess(true));
            } else {
                if (results.error !== undefined) {
                    dispatch(errorOccurred(results.error));
                } else {
                    dispatch(errorOccurred('Something went wrong, please try again.'));
                }
            }
        }).catch(error => {
            dispatch(errorOccurred('Something went wrong, please try again.'));
            console.log(error);
        });
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

        fetch(url, options).then(response => {
            return response.json();
        }).then(results => {
            if (results.success) {
                dispatch(setUsernameExists(true));
            } else {
                dispatch(setUsernameExists(false));
            }
        }).catch(error => {
            dispatch(errorOccurred('We could not verify your username, please try again.'));
            console.log(error);
        });
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

        fetch(url, options).then(response => {
            if (response.status !== 200) {
                console.log(response.status);
            }

            return response.json();
        }).then(results => {
            if (results.success) {
                dispatch(setEmailExists(true));
            } else {
                dispatch(setEmailExists(false));
            }
        }).catch(error => {
            dispatch(errorOccurred('We could not verify your E-mail, please try again.'));
            console.log(error);
        });
    };
};