import {API_URL} from '../../urls'
import {setDeckAction, setIsLoading, setUserDecksAction, setUserDecksDecksAction} from "./actions";

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
        }
    }
};

export const deleteDeckFromUser = (deckId) => {
    return async dispatch => {
        const url = `${API_URL}/decks/${deckId}`
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (response.status === 200){
            const data = await response.json()
            dispatch(setUserDecksDecksAction(data))
        }
    }
}
