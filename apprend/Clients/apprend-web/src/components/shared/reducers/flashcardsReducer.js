import {FLASHCARDS_DECKFLASHCARDS, FLASHCARDS_SET_ISLOADING, FLASHCARDS_SET_ISSAVING} from '../../../redux/actionTypes'

const initialState = {
    deckFlashcards: [{
        id: 0,
        term: '',
        definition: ''
    }],
    isLoading: true,
    isSaving: false,
};

export default function createFlashcardReducer(state = initialState, action) {
    switch (action.type) {
        case FLASHCARDS_DECKFLASHCARDS:
            return {...state, deckFlashcards: action.payload};

        case FLASHCARDS_SET_ISLOADING:
            return {...state, isLoading: action.payload};

        case FLASHCARDS_SET_ISSAVING:
            return {...state, isSaving: action.payload};

        default:
            return state
    }
}
