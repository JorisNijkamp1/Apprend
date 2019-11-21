import {CREATEDECK_EDITDECKNAME} from '../actions/action-types'

const initialState = {
    deckName: undefined,
}

export default function createDeckReducer(state = initialState, action) {
    switch (action.type) {
        case CREATEDECK_EDITDECKNAME:
            return {...state, deckName: action.payload}
        default:
            return state
    }
}