import {API_URL} from '../../urls'
import {decksSetIsLoading, setUserDecksAction} from "./actions";

export const getUserDecksAction = (username) => {
    return async dispatch => {
        await dispatch(decksSetIsLoading(true))
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
            setTimeout(function () {
                dispatch(setUserDecksAction(data.decks))
                dispatch(decksSetIsLoading(false))
            }, 500);
        }
    }
};
