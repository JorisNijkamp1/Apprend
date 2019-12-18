import {API_URL} from '../../redux/urls';
import {
    SET_PLAYING_CARDS,
    SET_CORRECT_CARDS,
    SET_WRONG_CARDS,
    SET_ACTIVE_CARD,
    RESET_STATE,
    SET_ISLOADING,
    SET_GAME_ID
} from '../../redux/actionTypes';

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

export const getDeck = (deckId) => {
    return async dispatch => {
        await dispatch(setLoadingAction(true));
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
                if (data._id === deckId) {
                    setTimeout(function () {
                        dispatch(setLoadingAction(false));
                    }, 1000);
                    return data;
                }
            }).catch((err => {
                console.log('Er gaat iets goed fout!');
                console.log(err);
            }))
    }
};

export const setGame = (deckId, cards) => {
    return async dispatch => {
        const url = `${API_URL}/decks/${deckId}/setGame`;

        let data = {
            cards: cards
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include',
            mode: 'cors'
        };

        return fetch(url, options)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch(setGameIdAction(data.gameId));
                }
            }).catch((err => {
                console.log('Er gaat iets goed fout!');
                console.log(err);
            }))
    }
};

export const updateGame = (deckId, gameId, oldCard, newCard, status) => {
    return async () => {
        const url = `${API_URL}/decks/${deckId}/updateGame`;

        let data = {
            gameId: gameId,
            oldCard: oldCard,
            newCard: newCard,
            status: status
        };

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include',
            mode: 'cors'
        };

        fetch(url, options)
    }
};

export const getGameData = (deckId, gameId) => {
    return async dispatch => {
        const url = `${API_URL}/decks/${deckId}/games/${gameId}`;
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
                    return data.game[0]
                }
            }).catch((err => {
                console.log('Er gaat iets goed fout!');
                console.log(err);
            }))
    }
};

export const updateDeckSession = (deckId, session) => {
    return async dispatch => {
        const url = `${API_URL}/decks/${deckId}/session`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                'session': session
            })
        };

        return fetch(url, options).then(response => {
            return response.json();
        }).then(results => {
            if (results.success) return results.deck;
        }).catch((err => {
            console.log('Something went wrong...');
            console.log(err);
        }))
    }
};

export const moveFlashcardToBox = (deckId, flashcardId, answeredCorrect) => {
    return async dispatch => {
        const url = `${API_URL}/decks/${deckId}/flashcards/${flashcardId}/leitner`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                'answeredCorrect': answeredCorrect
            })
        };

        return fetch(url, options).then(response => {
            return response.json();
        }).then(results => {
            if (results.success) return results.deck;
        }).catch((err => {
            console.log('Something went wrong...');
            console.log(err);
        }))
    }
};