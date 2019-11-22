import { FLASHCARDS_DECKFLASHCARDS } from '../action-types'

export function changeDeckFlashcards(flashcards){
    return {
        type: FLASHCARDS_DECKFLASHCARDS,
        payload: flashcards
    }
}
