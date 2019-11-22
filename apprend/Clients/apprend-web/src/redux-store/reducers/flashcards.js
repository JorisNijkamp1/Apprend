import {FLASHCARDS_DECKFLASHCARDS} from '../actions/action-types'

const initialState = {
    deckFlashcards: [{
        id: 0,
        term: null,
        definition: null
    }]
};

export default function createFlashcardReducer(state = initialState, action) {
    switch (action.type) {
        case FLASHCARDS_DECKFLASHCARDS:
            return {...state, deckFlashcards: action.payload}
        default:
            return state
    }
}
