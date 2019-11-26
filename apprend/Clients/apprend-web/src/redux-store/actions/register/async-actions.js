import {API_URL} from '../../urls';
import {setUsernameExists} from '../register/actions';

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
                dispatch(setUsernameExists(false))
            }
        }).catch(error => {
            console.log('An unknown error occurred...');
            console.log(error);
        });
    };
};