import { combineReducers } from 'redux'
import clientReducer from './client-reducer'

import createDeck from './create-deck'
import flashcards from "./flashcards";
import registerReducer from './register-reducer';
import playingReducer from './playing';

export const allReducers = combineReducers({
    client: clientReducer,
    createDeck: createDeck,
    flashcards: flashcards,
    register: registerReducer,
    playing: playingReducer
})
