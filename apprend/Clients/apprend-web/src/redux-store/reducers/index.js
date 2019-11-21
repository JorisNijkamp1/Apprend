import { combineReducers } from 'redux'
import clientReducer from './client-reducer'
import createDeck from './create-deck'
import flashcards from "./flashcards";

export const allReducers = combineReducers({
    client: clientReducer,
    createDeck: createDeck,
    flashcards: flashcards,
})
