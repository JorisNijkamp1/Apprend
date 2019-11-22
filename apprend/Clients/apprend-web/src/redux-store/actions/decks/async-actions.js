import {API_URL} from '../../urls'
import {setUserDecksAction} from "./actions";

export const getUserDecksAction = (username) => {
    return async dispatch => {
        const url = `${API_URL}/users/${username}/decks`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        };
        const response = await fetch(url, options);
        const data = await response.json();
        if (data.success) {
            dispatch(setUserDecksAction(data.decks))
        }
    }
};
