import {set_DecksHome} from "../../../redux/actionTypes";

const initialState = {
    decksHome: [],
}

export default function clientReducer(state = initialState, action) {
    switch (action.type) {
        case set_DecksHome:
            return {...state, decksHome: action.payload}
        default:
            return state
    }
}
