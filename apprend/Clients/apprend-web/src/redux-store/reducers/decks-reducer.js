import {
    DECKS_ADD_DECK,
    DECKS_SET_ISLOADING,
    DECKS_SET_USER_DECKS,
} from '../actions/action-types'
import produce from 'immer'

const initialState = {
    deck: [],
    userDecks: {decks:[]},
    isLoading: false
};

export default function decksReducer(state = initialState, action){
    return produce(state, draft => {
        switch(action.type){
            case DECKS_ADD_DECK:
                draft['decks'].push(action.payload);
                break;

            case DECKS_SET_USER_DECKS:
                draft['userDecks'] = action.payload;
                break;

            case DECKS_SET_ISLOADING:
                draft['isLoading'] = action.payload;
                break;

            default:
                return draft
        }
    })
}
