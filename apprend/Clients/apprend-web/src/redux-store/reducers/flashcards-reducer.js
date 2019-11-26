import {FLASHCARDS_DECKFLASHCARDS, FLASHCARDS_SET_ISLOADING} from '../actions/action-types'

const initialState = {
    deckFlashcards: [{
        id: 0,
        term: '',
        definition: ''
    }],
    isLoading: true
};

export default function createFlashcardReducer(state = initialState, action) {
    switch (action.type) {
        case FLASHCARDS_DECKFLASHCARDS:
            return {...state, deckFlashcards: action.payload};

        case FLASHCARDS_SET_ISLOADING:
            return {...state, isLoading: action.payload};

        default:
            return state
    }
}
