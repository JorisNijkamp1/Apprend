import {SET_DECKS_HOME} from '../../redux-config/actionTypes';
import {API_URL} from '../../redux-config/urls';

export function setHomepageDecksAction(name) {
    return {
        type: SET_DECKS_HOME,
        payload: name
    }
}

export const getHomepageDecks = (funct) => {
    return async dispatch => {
        funct(true);
        const url = `${API_URL}/decks/home`;
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
            setTimeout(async () => {
                await dispatch(setHomepageDecksAction(data));
                funct(false)
            }, 500)
        } else {
            funct(false)
        }
    }
};