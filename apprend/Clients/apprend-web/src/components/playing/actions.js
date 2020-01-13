import {API_URL} from '../../redux/urls';
import {
    SET_PLAYING_CARDS,
    SET_CORRECT_CARDS,
    SET_WRONG_CARDS,
    SET_ACTIVE_CARD,
    RESET_STATE,
    SET_ISLOADING,
    SET_GAME_ID,
    SET_PLAYING_DECK,
    PLAYING_ERROR_OCCURRED
} from '../../redux/actionTypes';
import {leitnerGetNewBox} from '../../util/leitner-system/leitnerSystem';

export function setCardsAction(cards) {
    return {
        type: SET_PLAYING_CARDS,
        payload: cards
    }
}

export function setCorrectCardsAction(cards) {
    return {
        type: SET_CORRECT_CARDS,
        payload: cards
    }
}

export function setWrongCardsAction(cards) {
    return {
        type: SET_WRONG_CARDS,
        payload: cards
    }
}

export function setActiveCardAction(card) {
    return {
        type: SET_ACTIVE_CARD,
        payload: card
    }
}

export function resetStateAction() {
    return {
        type: RESET_STATE
    }
}

export function setLoadingAction(status) {
    return {
        type: SET_ISLOADING,
        payload: status
    }
}

export function setGameIdAction(gameId) {
    return {
        type: SET_GAME_ID,
        payload: gameId
    }
}

export function setPlayingDeck(deck) {
    return {
        type: SET_PLAYING_DECK,
        payload: deck
    }
}

export function errorOccurred(error) {
    return {
        type: PLAYING_ERROR_OCCURRED,
        payload: error
    }
}

export const getDeck = (creatorId, deckId) => {
    return async dispatch => {
        const url = `${API_URL}/users/${creatorId}/decks/${deckId}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        };

        return fetch(url, options);
    }
};

export const updateDeckSession = (deckId, creatorId, session) => {
    return async dispatch => {
        const url = `${API_URL}/users/${creatorId}/decks/${deckId}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                'properties': [
                    {
                        'name': 'session',
                        'value': session
                    }
                ]
            })
        };

        const response = await fetch(url, options);
        const results = await response.json();

        if (response.status === 201) {
            return results.data;
        }

        dispatch(errorOccurred('Something went wrong, please try again...'));
    }
};

export const moveFlashcardToBox = (deckId, deckCreator, flashcard, currentSession, answeredCorrectly) => {
    return async dispatch => {
        const url = `${API_URL}/users/${deckCreator}/decks/${deckId}/flashcards/${flashcard._id}`;
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                'properties': [
                    {
                        'name': 'box',
                        'value': leitnerGetNewBox(flashcard.box, answeredCorrectly)
                    },
                    {
                        'name': 'sessionPlayed',
                        'value': currentSession
                    }
                ]
            })
        };

        const response = await fetch(url, options);
        const results = await response.json();

        if (response.status === 201) {
            return results.data;
        }

        console.log(`(${response.status}) ${results.message}`);
        dispatch(errorOccurred('Something went wrong, please try again...'));
    }
};