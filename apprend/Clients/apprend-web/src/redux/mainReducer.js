import {combineReducers} from 'redux'
import clientReducer from '../components/shared/reducers/clientReducer'
import createDeck from '../components/shared/reducers/createDeck'
import flashcards from "../components/shared/reducers/flashcardsReducer";
import decksReducer from '../components/shared/reducers/decksReducer'
import registerReducer from '../components/register/reducers/registerReducer';
import loginReducer from "../components/shared/reducers/loginReducer";
import playingReducer from '../components/playing/reducers/playing';
import searchReducer from "../components/shared/reducers/searchReducer";

export const allReducers = combineReducers({
    client: clientReducer,
    createDeck: createDeck,
    flashcards: flashcards,
    decks: decksReducer,
    register: registerReducer,
    playing: playingReducer,
    login: loginReducer,
    search: searchReducer,
});
