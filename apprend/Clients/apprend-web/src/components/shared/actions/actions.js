import {API_URL} from '../../../redux/urls';
import {
    SEARCH_SET_IS_LOADING,
    SEARCH_SET_SEARCH_VALUE,
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
    FLASHCARDS_SET_ISSAVING,
    SEARCH_SUGGESTIONS,
    DELETE_FILTERED_TAG,
    FILTER_SET_TAGS,
    CLEAR_FILTERED_TAGS
} from '../../../redux/actionTypes';
import {setAnonymousUserAction, setLoginAction} from "../../login/actions";
import { Notification } from '../components/Notification'

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

export function deleteOldTag(deckEdit) {
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
export const getUserDecksAction = (username, setLoader,  skipLoader = false) => {
    return async dispatch => {
        console.log(username)
        if (!skipLoader) setLoader(true)
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
        console.log(data)
        if (response.status === 200) {
            if (skipLoader) setUserDecksAction(data.data);
            else {
                setTimeout(function () {
                    dispatch(setUserDecksAction(data.data));
                    setLoader(false)
                }, 1000);
            }
        } else {
            if (skipLoader) dispatch(setUserDecksAction('no-decks'));
            else {
                setTimeout(function () {
                    dispatch(setUserDecksAction('no-decks'));
                    setLoader(false)
                }, 1000);
            }
        }
    }
};

export const getDeckAction = (deckId, setLoader) => {
    return async dispatch => {
        setLoader(true)
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
            dispatch(setDeckAction(data.data));

            setTimeout(function () {
                setLoader(false)
            }, 1000);
        } else {
            setTimeout(function () {
                dispatch(setDeckAction('deck-not-found'));
                setLoader(false)
            }, 1000);
        }
    }
};

export const deleteDeckFromUser = (deckId, user) => {
    return async dispatch => {
        const url = `${API_URL}/users/${user}/decks/${deckId}`;
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();

        if (response.status === 200) {
            data.success = true
            dispatch(setUserDecksDecksAction(data.data))
        }

        return data
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
        const url = `${API_URL}/users/${creatorId}/decks/${deckId}`;

        const body = {
            properties: [
                {
                    name: "name",
                    value: deckName,
                },
                {
                    name: "description",
                    value: deckDescription
                },
                {
                    name: "tags",
                    value: tags
                }
            ]
        }
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
        console.log(data)
        if (response.status === 201) {
            dispatch(setSpecificDeckDataAction(data.data));
            dispatch(setDeckAction(data.data));
            return {message: data.message, success: true}
        }
        return {message: data.message ? data.message : 'There was an error', success: false}

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
        let data = await response.json(); 
        if (response.status === 201) {
            dispatch(setSpecificDeckDataAction(data.data));
            dispatch(setDeckAction(data.data))
            data.isSuccess = true
        }
        return {message: data.message, success: data.isSuccess ? true : false}
    }
};

export const importDeckAction = (deckId, creatorId) => {
    return async dispatch => {
        console.log(creatorId)
        const url = `${API_URL}/users/${creatorId}/decks/${deckId}`;
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
            return {
                data: data.data,
                success: true,
                message: data.message
            }
        } else {
            return {
                message: data.message,
                success: false,
            }
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

/*
|----------------------------------------------------------------
| Login (Async)
|----------------------------------------------------------------
 */
export const isLoggedIn = () => {
    return async dispatch => {
        const url = `${API_URL}/login/check`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        };

        return fetch(url, options)
            .then(response => response.json())
            .then(data => {
                if (data.loggedIn) {
                    console.log('You are logged in');
                    if (!data.anonymousUser) {
                        dispatch(setAnonymousUserAction(false))
                    }
                    dispatch(setLoginAction(data.username));
                    return true
                } else {
                    console.log("You aren't logged in");
                    return false
                }
            }).catch(err => {
                console.log(err);
            })
    }
};

export const userLogin = (username, password) => {
    return async dispatch => {
        const url = `${API_URL}/login`;
        let data = {
            username: username,
            password: password,
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

        return fetch(url, options)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('logged in');
                    dispatch(setLoginAction(data.username))
                    return 'success'
                } else {
                    console.log('Wrong username or password')
                    return 'Wrong username or password'
                }
            }).catch(err => {
                console.log(err);
                console.log("Er gaat iets fout met inloggen")
            })
    }
};

export const logoutAction = () => {
    return async dispatch => {
        const url = `${API_URL}/login/logout`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        };
        const response = await fetch(url, options)
        const data = await response.json();
        dispatch(setLoginAction(data.username))
        dispatch(setAnonymousUserAction(true))
    }
};

/*
|----------------------------------------------------------------
| Auto-suggest search input
|----------------------------------------------------------------
 */
export function setSearchSuggestions(suggestions) {
    return {
        type: SEARCH_SUGGESTIONS,
        payload: suggestions
    }
}

/*
|----------------------------------------------------------------
| Auto-suggest search input (Async)
|----------------------------------------------------------------
 */
export const getSearchSuggestions = (value) => {
    return async dispatch => {
        const url = `${API_URL}/decks?deck=${value}`;
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.status === 200) {
            const data = await response.json();
            dispatch(setSearchSuggestions(data.decks))
            return data.decks
        }
    }
};

/*
|----------------------------------------------------------------
| Filter
|----------------------------------------------------------------
 */
export function setFilteredTag(tag) {
    return {
        type: FILTER_SET_TAGS,
        payload: tag
    }
}

export function deleteFilteredTag(tag) {
    return {
        type: DELETE_FILTERED_TAG,
        payload: tag
    }
}

export function clearFilteredTags() {
    return {
        type: CLEAR_FILTERED_TAGS
    }
}

export const loadDecks = username => {
    return async dispatch => {
        const url = `${API_URL}/users/${username}/decks`;
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
            if (data.message === 'All decks') {
                return data.data
            } else {
                console.log('User bestaat niet')
            }
        }).catch(err => {
            console.log(err);
            console.log("Er gaat iets fout met ophalen van de decks")
        })
    }
};

/*
|----------------------------------------------------------------
| Tag page
|----------------------------------------------------------------
 */

export const getAllDecks = () => {
    return async dispatch => {
        const url = `${API_URL}/decks/tags`;
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
                return data.decks
            } else {
                console.log('Geen decks gevonden')
            }
        }).catch(err => {
            console.log(err);
            console.log("Er gaat iets fout met ophalen van de decks")
        })
    }
};