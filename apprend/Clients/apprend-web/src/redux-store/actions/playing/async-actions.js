import {API_URL} from '../../urls';
import {setCardsAction} from "./actions";

export const getCards = () => {
    return async dispatch => {
        //const url = `${API_URL}/users/` + username + `/decks/` + deckName;
        const url = `${API_URL}/users/Joris/decks/Frans woordjes`;
        const options = {
            method: 'GET',
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
                    dispatch(setCardsAction(data.cards));
                    return data.cards;
                }
            }).catch((err => {
            console.log("Er gaat iets goed fout!");
            console.log(err);
        }))
    }
};