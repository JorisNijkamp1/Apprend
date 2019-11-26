import {API_URL} from '../../urls';
import {setCardsAction} from "./actions";

export const getDeck = (deckId) => {
    return async dispatch => {
        const url = `${API_URL}/decks/${deckId}`;
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
                    dispatch(setCardsAction(data.deck.flashcards));
                    return data.deck;
                }
            }).catch((err => {
            console.log("Er gaat iets goed fout!");
            console.log(err);
        }))
    }
};