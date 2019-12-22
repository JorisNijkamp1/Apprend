import {
    DECKS_SET_DECK,
    DECKS_SET_DECK_DATA,
    DECKS_SET_ISLOADING,
    DECKS_SET_USER_DECKS,
    DECKS_SET_USERDECKS_DECKS,
    DECK_EDIT_DATA,
    DECK_DELETE_TAG,
    DECK_FILTERED_DECKS
} from '../../../redux/actionTypes'
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
        let index
        let indexColumn
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

            // Kijken of ik een specifieke deck kan updaten
            case 'DECKS_SET_SPECIFIC_DECK':
                index = draft['userDecks']['decks'].findIndex(d => d._id === action.payload._id)
                draft['userDecks']['decks'][index] = action.payload
                break;

            case DECK_DELETE_TAG:
                let filtered = state.deckEdit.data.tags.filter(function(value, index, arr){
                    return value !== action.payload;
                });
                draft['deckEdit'].data.tags = filtered
                break;
            case DECK_FILTERED_DECKS:
                draft['filteredDecks'] = action.payload
                break;

            case 'SET_COLUMN_NAME':
                draft['deck']['columns'][action.payload.index].name = action.payload.value
                break;
            
            case 'DECK_ADD_FLASHCARD':
                draft['deck']['flashcards'].push(action.payload)
                break;

            case 'DECKS_EDIT_FLASHCARD_COLUMN':
                index = draft['deck']['flashcards'].findIndex(fc => fc._id === action.payload._id)
                if (index !== undefined)
                indexColumn = draft['deck']['flashcards'][index]['columns'].findIndex(col => col._id === action.payload.index)
                if (indexColumn !== undefined)
                console.log(action.payload.value)
                draft['deck']['flashcards'][index]['columns'][indexColumn][action.payload.prop] = action.payload.value
                break;

            case 'DECKS_DELETE_FLASHCARD':
                draft['deck']['flashcards'] = state['deck']['flashcards'].filter(fc => fc._id !== action.payload)
                break;

            default:
                return draft
        }
    })
}
