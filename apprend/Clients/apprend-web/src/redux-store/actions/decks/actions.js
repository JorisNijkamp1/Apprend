import {
    CREATEDECK_SET_ISLOADING,
    DECKS_ADD_DECK, DECKS_SET_DECK, DECKS_SET_DECK_DATA, DECKS_SET_ISLOADING,
    DECKS_SET_USER_DECKS
} from "../action-types";

export function decksAddDeckAction(deck){
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

export function setDeckDataAction(deckData){
    return {
        type: DECKS_SET_DECK_DATA,
        payload: deckData
    }
}

export function setIsLoading(bool){
    return {
        type: DECKS_SET_ISLOADING,
        payload: bool
    }
}
