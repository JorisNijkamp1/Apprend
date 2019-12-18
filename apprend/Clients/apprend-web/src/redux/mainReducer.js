import {combineReducers} from 'redux'
import clientReducer from '../components/shared/reducers/client-reducer'
import createDeck from '../components/shared/reducers/create-deck'
import flashcards from "../components/shared/reducers/flashcards-reducer";
import decksReducer from '../components/shared/reducers/decks-reducer'
import registerReducer from '../components/register/reducers/registerReducer';
import loginReducer from "../components/shared/reducers/login-reducer";
import playingReducer from '../components/playing/reducers/playing';
import searchReducer from "../components/shared/reducers/search-reducer";

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
