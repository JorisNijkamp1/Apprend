import {API_URL} from '../../urls'
import {setHomepageDecksAction} from "./actions";

export function getHomepageDecks(){
    return async dispatch => {
            const url = `${API_URL}/decks/home`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        mode: 'cors'
    };
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(data);
                dispatch(setHomepageDecksAction(data));
            }
        }).catch((err => {
        console.log("Er gaat iets goed fout!");
        console.log(err);
    }))
    }
}
