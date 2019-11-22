import { DECKS_ADD_DECK } from "../action-types";

export function decksAddDeckAction(deck){
    return {
        type: DECKS_ADD_DECK,
        payload: deck
    }
}