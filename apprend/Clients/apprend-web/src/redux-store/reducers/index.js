import { combineReducers } from 'redux'
import clientReducer from './client-reducer'
import createDeck from './create-deck'

export const allReducers = combineReducers({
    client: clientReducer,
    createDeck: createDeck,
})