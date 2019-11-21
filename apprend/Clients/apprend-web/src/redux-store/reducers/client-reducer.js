import {set_DecksHome} from "../actions/action-types";

const initialState = {
    deckName: [],
}

export default function clientReducer(state = initialState, action) {
    switch (action.type) {
        case set_DecksHome:
            return {...state, deckName: action.payload}
        default:
            return state
    }
}