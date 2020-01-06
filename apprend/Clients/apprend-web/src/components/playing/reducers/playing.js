import {
    SET_PLAYING_CARDS,
    SET_PLAYING_DECK,
    SET_CORRECT_CARDS,
    SET_WRONG_CARDS,
    SET_ACTIVE_CARD,
    RESET_STATE,
    SET_ISLOADING,
    SET_GAME_ID,
    PLAYING_ERROR_OCCURRED
} from '../../../redux/actionTypes';

const initialState = {
    deck: null,
    cards: [],
    correctCards: [],
    wrongCards: [],
    activeCard: '',
    isLoading: false,
    gameId: '',
    error: null
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
            return {...initialState};
        case SET_ISLOADING:
            return {...state, isLoading: action.payload};
        case SET_GAME_ID:
            return {...state, gameId: action.payload};
        case SET_PLAYING_DECK:
            return {...state, deck: action.payload};
        case PLAYING_ERROR_OCCURRED:
            return {...state, error: action.payload};
        default:
            return state;
    }
}
