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

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                if(data.success){
                    console.log(data.username);
                    console.log(data.password);
                    dispatch(setLoginAction(data))
                }
            }).catch(err => {
            console.log(err);
            console.log("Er gaat iets fout met inloggen")
        })
    }
};