import {API_URL} from "../../urls";
import {setLoginAction} from './actions.js'


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
                    return true
                } else {
                    console.log('Wrong username or password')
                    return false
                }
            }).catch(err => {
                console.log(err);
                console.log("Er gaat iets fout met inloggen")
            })
    }
};
