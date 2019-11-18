import { combineReducers } from 'redux'
import clientReducer from './client-reducer'

export const allReducers = combineReducers({
    client: clientReducer,
})