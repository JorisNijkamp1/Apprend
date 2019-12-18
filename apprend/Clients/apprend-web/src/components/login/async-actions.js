import {API_URL} from "../../redux/urls";
import {setLoginAction} from './actions.js'
import {setAnonymousUserAction} from "./actions";
import {setDeckEditAction} from "../../../src_old/redux-store/actions/decks/actions";

export const userLogin = (username, password) => {
    return async dispatch => {
        const url = `${API_URL}/login`;
        let data = {
            username: username,
            password: password,
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        };

        return fetch(url, options)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('logged in');
                    dispatch(setLoginAction(data.username))
                    return 'success'
                } else {
                    console.log('Wrong username or password')
                    return 'Wrong username or password'
                }
            }).catch(err => {
                console.log(err);
                console.log("Er gaat iets fout met inloggen")
            })
    }
};

export const isLoggedIn = () => {
    return async dispatch => {
        const url = `${API_URL}/login/check`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        };

        return fetch(url, options)
            .then(response => response.json())
            .then(data => {
                if (data.loggedIn) {
                    console.log('You are logged in');
                    if (!data.anonymousUser) {
                        dispatch(setAnonymousUserAction(false))
                    }
                    dispatch(setLoginAction(data.username));
                    return true
                } else {
                    console.log("You aren't logged in");
                    return false
                }
            }).catch(err => {
                console.log(err);
            })
    }
};

export const logoutAction = () => {
    return async dispatch => {
        const url = `${API_URL}/login/logout`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        };
        const response = await fetch(url, options)
        const data = await response.json();
        dispatch(setLoginAction(data.username))
        dispatch(setAnonymousUserAction(true))
    }
};