import {combineReducers} from 'redux'
import clientReducer from './client-reducer'
import createDeck from './create-deck'
import flashcards from "./flashcards";
import decksReducer from './decks-reducer'
import registerReducer from './register-reducer';
import loginReducer from "./login-reducer";

export const allReducers = combineReducers({
    client: clientReducer,
    createDeck: createDeck,
    flashcards: flashcards,
    decks: decksReducer,
    register: registerReducer,
    login: loginReducer,
})
