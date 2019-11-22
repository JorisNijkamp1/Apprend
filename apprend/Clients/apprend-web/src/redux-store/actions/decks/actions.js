import {
    DECKS_ADD_DECK,
    DECKS_SET_USER_CHECKS
} from "../action-types";

export function decksAddDeckAction(deck){
    return {
        type: DECKS_ADD_DECK,
        payload: deck
    }
}

export function setUserDecksAction(decks) {
    return {
        type: DECKS_SET_USER_CHECKS,
        payload: decks
    }
}
