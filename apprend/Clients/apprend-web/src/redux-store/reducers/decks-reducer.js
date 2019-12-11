import {
    DECKS_SET_DECK,
    DECKS_SET_DECK_DATA,
    DECKS_SET_ISLOADING,
    DECKS_SET_USER_DECKS,
    DECKS_SET_USERDECKS_DECKS,
    DECK_EDIT_DATA,
    DECK_DELETE_TAG,
    DECK_FILTERED_DECKS
} from '../actions/action-types'
import produce from 'immer'

const initialState = {
    deck: [],
    deckData: [],
    userDecks: {decks: []},
    isLoading: false,
    deckEdit: [],
    filteredDecks: []
};

export default function decksReducer(state = initialState, action) {
    return produce(state, draft => {
        switch (action.type) {

            case DECKS_SET_USER_DECKS:
                draft['userDecks'] = action.payload;
                break;

            case DECKS_SET_DECK:
                draft['deck'] = action.payload;
                break;

            case DECKS_SET_DECK_DATA:
                draft['deckData'] = action.payload;
                break;

            case DECKS_SET_ISLOADING:
                draft['isLoading'] = action.payload;
                break;

            case DECKS_SET_USERDECKS_DECKS:
                draft['userDecks']['decks'] = action.payload
                break;
            case DECK_EDIT_DATA:
                draft['deckEdit'] = action.payload;
                break;
            case DECK_DELETE_TAG:
                let filtered = state.deckEdit.tags.filter(function(value, index, arr){
                    return value !== action.payload;
                });
                draft['deckEdit'].tags = filtered
                break;
            case DECK_FILTERED_DECKS:
                draft['filteredDecks'] = action.payload
            default:
                return draft
        }
    })
}
