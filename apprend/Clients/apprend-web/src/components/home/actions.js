import {set_DecksHome} from '../../../src_old/redux-store/actions/action-types';
import {API_URL} from '../../redux/urls';

export function setHomepageDecksAction(name) {
    return {
        type: set_DecksHome,
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