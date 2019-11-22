import {DECKS_ADD_DECK, DECKS_SET_USER_CHECKS,} from '../actions/action-types'
import produce from 'immer'

const initialState = {
    decks: [],
    userDecks: {decks:[]}
};

export default function decksReducer(state = initialState, action){
    return produce(state, draft => {
        switch(action.type){
            case DECKS_ADD_DECK:
                draft['decks'].push(action.payload);
                break;

            case DECKS_SET_USER_CHECKS:
                draft['userDecks'] = action.payload;
                break;

            default:
                return draft
        }
    })
}
