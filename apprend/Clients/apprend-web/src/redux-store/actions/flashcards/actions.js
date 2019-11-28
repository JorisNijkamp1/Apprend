import {FLASHCARDS_SET_ISLOADING, FLASHCARDS_DECKFLASHCARDS, FLASHCARDS_SET_ISSAVING} from '../action-types'

export function changeDeckFlashcards(flashcards){
    return {
        type: FLASHCARDS_DECKFLASHCARDS,
        payload: flashcards
    }
}

export function setIsLoading(bool){
    return {
        type: FLASHCARDS_SET_ISLOADING,
        payload: bool
    }
}

export function setIsSaving(bool){
    return {
        type: FLASHCARDS_SET_ISSAVING,
        payload: bool
    }
}
