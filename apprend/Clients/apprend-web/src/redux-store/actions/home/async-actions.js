import {API_URL} from '../../urls'
import {setHomepageDecksAction} from "./actions";

export const getHomepageDecks = (funct) => {
    return async dispatch => {
        funct(true)
        const url = `${API_URL}/decks/home`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        };

        const response = await fetch(url, options)
        if (response.status === 200){
            const data = await response.json()
            setTimeout(async () => {
                await dispatch(setHomepageDecksAction(data))
                funct(false)
            }, 500)
        } else {
            funct(false)
        }
    }
};
