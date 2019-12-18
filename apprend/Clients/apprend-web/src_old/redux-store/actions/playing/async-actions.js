import {API_URL} from '../../urls';
import {setCardsAction, setLoadingAction, setGameIdAction} from './actions';

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