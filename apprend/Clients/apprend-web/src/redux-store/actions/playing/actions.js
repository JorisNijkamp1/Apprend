import {SET_PLAYING_CARDS, SET_CORRECT_CARDS, SET_WRONG_CARDS, SET_ACTIVE_CARD, RESET_STATE} from '../action-types';

export function setCardsAction(cards){
    return {
        type: SET_PLAYING_CARDS,
        payload: cards
    }
}

export function setCorrectCardsAction(cards){
    return {
        type: SET_CORRECT_CARDS,
        payload: cards
    }
}

export function setWrongCardsAction(cards){
    return {
        type: SET_WRONG_CARDS,
        payload: cards
    }
}

export function setActiveCardAction(card){
    return {
        type: SET_ACTIVE_CARD,
        payload: card
    }
}

export function resetStateAction(){
    return {
        type: RESET_STATE
    }
}