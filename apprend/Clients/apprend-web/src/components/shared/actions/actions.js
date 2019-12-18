import {API_URL} from '../../../redux/urls';
import {
    SEARCH_SET_IS_LOADING,
    SEARCH_SET_SEARCH_VALUE,
    CREATEDECK_SET_ISLOADING,
    DECKS_ADD_DECK, DECKS_SET_DECK,
    DECKS_SET_DECK_DATA,
    DECKS_SET_ISLOADING,
    DECKS_SET_USERDECKS_DECKS,
    DECKS_SET_USER_DECKS,
    DECK_EDIT_DATA,
    DECK_DELETE_TAG,
    DECK_FILTERED_DECKS,
    FLASHCARDS_SET_ISLOADING,
    FLASHCARDS_DECKFLASHCARDS,
    FLASHCARDS_SET_ISSAVING
} from '../../../redux/actionTypes';

/*
|----------------------------------------------------------------
| Decks
|----------------------------------------------------------------
 */
export function setSearchValue(searchValue) {
    return {
        type: SEARCH_SET_SEARCH_VALUE,
        payload: searchValue
    }
}

export function setSearchIsLoading(bool) {
    return {
        type: SEARCH_SET_IS_LOADING,
        payload: bool
    }
}

export function decksAddDeckAction(deck) {
    return {
        type: DECKS_ADD_DECK,
        payload: deck
    }
}

export function setUserDecksAction(decks) {
    return {
        type: DECKS_SET_USER_DECKS,
        payload: decks
    }
}

export function setDeckAction(deckId) {
    return {
        type: DECKS_SET_DECK,
        payload: deckId
    }
}

export function setDeckDataAction(deckData) {
    return {
        type: DECKS_SET_DECK_DATA,
        payload: deckData
    }
}

export function setDeckIsLoading(bool) {
    return {
        type: DECKS_SET_ISLOADING,
        payload: bool
    }
}

export function setUserDecksDecksAction(decks) {
    return {
        type: DECKS_SET_USERDECKS_DECKS,
        payload: decks
    }
}

export function setDeckEditAction(deckEdit) {
    return {
        type: DECK_EDIT_DATA,
        payload: deckEdit
    }
}

export function setSpecificDeckDataAction(deck) {
    return {
        type: 'DECKS_SET_SPECIFIC_DECK',
        payload: deck
    }
}

export function deleteTag(deckEdit) {
    return {
        type: DECK_DELETE_TAG,
        payload: deckEdit
    }
}

export function setFilteredDecks(decks) {
    return {
        type: DECK_FILTERED_DECKS,
        payload: decks
    }
}

/*
|----------------------------------------------------------------
| Decks (Async)
|----------------------------------------------------------------
 */
export const getUserDecksAction = (username, skipLoader = false) => {
    return async dispatch => {
        if (!skipLoader) await dispatch(setIsLoading(true));
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
            if (skipLoader) setUserDecksAction(data.decks);
            else {
                setTimeout(function () {
                    dispatch(setUserDecksAction(data.decks));
                    dispatch(setIsLoading(false))
                }, 1000);
            }
        } else {
            if (skipLoader) dispatch(setUserDecksAction('no-decks'));
            else {
                setTimeout(function () {
                    dispatch(setUserDecksAction('no-decks'));
                    dispatch(setIsLoading(false))
                }, 1000);
            }
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
        if (response.status === 200) {
            dispatch(setDeckAction(data));

            setTimeout(function () {
                dispatch(setIsLoading(false))
            }, 500);
        } else {
            setTimeout(function () {
                dispatch(setDeckAction('deck-not-found'));
                dispatch(setIsLoading(false))
            }, 500);
        }
    }
};

export const deleteDeckFromUser = (deckId) => {
    return async dispatch => {
        const url = `${API_URL}/decks/${deckId}`;
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.status === 200) {
            const data = await response.json();
            dispatch(setUserDecksDecksAction(data))
        }
    }
};

export const getDeckEditAction = (deckId) => {
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
        const response = await fetch(url, options);
        if (response.status === 200) {
            const data = await response.json();
            dispatch(setDeckEditAction(data));
            return data
        }
    }
};

export const setDeckEditedAction = (creatorId, deckId, deckName, deckDescription, oldTags, newTags) => {
    let tags = oldTags;
    if (newTags && newTags.length > 0) tags = oldTags.concat(newTags);
    return async dispatch => {
        const url = `${API_URL}/decks/${deckId}`;
        let body = {
            name: deckName,
            description: deckDescription,
            creatorId: creatorId,
            tags: tags
        };
        const options = {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        };
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.status === 201) {
            dispatch(setSpecificDeckDataAction(data));
            dispatch(setDeckAction(data));
        }
    }
};

export const toggleDeckStatus = (deckId, userId) => {
    return async dispatch => {
        const url = `${API_URL}/users/${userId}/decks/${deckId}`;
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });

        if (response.status === 201) {
            const data = await response.json();
            dispatch(setSpecificDeckDataAction(data));
            dispatch(setDeckAction(data))
        }
    }
};

export const importDeckAction = deckId => {
    return async dispatch => {
        const url = `${API_URL}/decks/${deckId}`;
        const options = {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        };
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.status === 201) {
            return data
        }
    }
};

/*
|----------------------------------------------------------------
| Flashcards
|----------------------------------------------------------------
 */
export function changeDeckFlashcards(flashcards) {
    return {
        type: FLASHCARDS_DECKFLASHCARDS,
        payload: flashcards
    }
}

export function setIsLoading(bool) {
    return {
        type: FLASHCARDS_SET_ISLOADING,
        payload: bool
    }
}

export function setIsSaving(bool) {
    return {
        type: FLASHCARDS_SET_ISSAVING,
        payload: bool
    }
}

/*
|----------------------------------------------------------------
| Flashcards (Async)
|----------------------------------------------------------------
 */
export const getDeckFlashcardsAction = (deckId) => {
    return async dispatch => {
        await dispatch(setIsLoading(true))
        const url = `${API_URL}/decks/${deckId}/flashcards`;
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
                let flashcards = [];
                data.flashcards.forEach((flashcard, key) => {
                    flashcards.push({
                        id: key,
                        term: flashcard.question,
                        definition: flashcard.answer,
                        sessionPlayed: flashcard.sessionPlayed,
                        box: flashcard.box
                    })
                });

                if (flashcards.length === 0) {
                    flashcards.push({
                        id: 0,
                        term: '',
                        definition: '',
                        sessionPlayed: 0,
                        box: 0
                    })
                }

                dispatch(changeDeckFlashcards(flashcards));
                dispatch(setDeckDataAction({
                    deckId: data.deckId,
                    deckName: data.name,
                    creatorId: data.creatorId
                }));
                dispatch(setIsLoading(false))
            }, 750);
        } else if (!data.flashcards) {
            console.log('Deck doesn\'t exits');
            dispatch(setDeckDataAction({
                error: true,
                deckId: null,
                deckName: null
            }));
            dispatch(setIsLoading(false))
        }
    }
};

export const editDeckFlashcardsAction = (deckId, flashcards) => {
    return async dispatch => {
        await dispatch(setIsSaving(true))
        const url = `${API_URL}/decks/${deckId}/flashcards`;
        let data = {
            flashcards: flashcards,
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        };
        const response = await fetch(url, options);
        const result = await response.json();
        if (result.success) {
            const result = () => {
                return new Promise(function (resolve) {
                    setTimeout(async function () {
                        await dispatch(setIsSaving(false));
                        resolve('success');
                    }, 1000);
                });
            };
            return result()

        } else {
            console.log(result)
        }
    }
};