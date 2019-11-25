import {SET_PLAYING_CARDS} from '../action-types';
import {SET_CORRECT_CARDS} from '../action-types';
import {SET_WRONG_CARDS} from '../action-types';
import {SET_ACTIVE_CARD} from '../action-types';

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