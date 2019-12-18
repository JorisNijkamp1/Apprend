import {SET_PLAYING_CARDS} from '../../../redux/actionTypes';
import {SET_CORRECT_CARDS} from '../../../redux/actionTypes';
import {SET_WRONG_CARDS} from '../../../redux/actionTypes';
import {SET_ACTIVE_CARD} from '../../../redux/actionTypes';
import {RESET_STATE} from '../../../redux/actionTypes';
import {SET_ISLOADING} from '../../../redux/actionTypes';
import {SET_GAME_ID} from '../../../redux/actionTypes';

const initialState = {
    cards: [],
    correctCards: [],
    wrongCards: [],
    activeCard: '',
    isLoading: false,
    gameId: ''
};

export default function playingReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PLAYING_CARDS:
            return {...state, cards: action.payload};
        case SET_CORRECT_CARDS:
            return {...state, correctCards: state.correctCards.concat(action.payload)};
        case SET_WRONG_CARDS:
            return {...state, wrongCards: state.wrongCards.concat(action.payload)};
        case SET_ACTIVE_CARD:
            return {...state, activeCard: action.payload};
        case RESET_STATE:
            return {cards: [], correctCards: [], wrongCards: [], activeCard: ''};
        case SET_ISLOADING:
            return {...state, isLoading: action.payload};
        case SET_GAME_ID:
            return {...state, gameId: action.payload};
        default:
            return state;
    }
}
