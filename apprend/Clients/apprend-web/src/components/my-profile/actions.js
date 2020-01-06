import {API_URL} from '../../redux/urls';
import {SET_USER} from "../../redux/actionTypes";

export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
}

export const getUser = function (user) {
    return async dispatch => {
        const url = `${API_URL}/users/${user}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        };

        const response = await fetch(url, options);
        if (response.status === 200) {
            const data = await response.json();
            await dispatch(setUser(data.data));
        } else {
            console.log("Error")
        }
    };
};