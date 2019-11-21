import { combineReducers } from 'redux'
import clientReducer from './client-reducer'
import registerReducer from './register-reducer';

export const allReducers = combineReducers({
    client: clientReducer,
    register: registerReducer
})