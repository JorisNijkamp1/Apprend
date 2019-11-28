import {API_URL} from '../../urls'
import {setDeckAction, setIsLoading, setUserDecksAction} from "./actions";

export const getUserDecksAction = (username) => {
    return async dispatch => {
        await dispatch(setIsLoading(true))
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
                dispatch(setUserDecksAction(data.decks));
                dispatch(setIsLoading(false))
            }, 1000);
        }else {
            setTimeout(function () {
                dispatch(setUserDecksAction('no-decks'));
                dispatch(setIsLoading(false))
            }, 1000);
        }
    }
};

export const getDeckAction = (deckId) => {
    return async dispatch => {
        await dispatch(setIsLoading(true));
        const url = `${API_URL}/decks/${deckId}`;
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
                dispatch(setDeckAction(data.deck));
                dispatch(setIsLoading(false))
            }, 500);
        }else {
            setTimeout(function () {
                dispatch(setDeckAction('deck-not-found'));
                dispatch(setIsLoading(false))
            }, 500);
        }
    }
};
