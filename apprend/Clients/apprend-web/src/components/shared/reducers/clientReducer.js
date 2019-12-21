import {set_DecksHome} from "../../../redux/actionTypes";
import produce from 'immer'

const initialState = {
    decksHome: [],
    quickDelete: false,
}

export default function clientReducer(state = initialState, action) {
    return produce(state, draft => {
        switch (action.type) {
            case set_DecksHome:
                draft['decksHome'] = action.payload
                break
            case 'DECKS_TOGGLE_QUICKDELETE':
                draft['quickDelete'] = action.payload
                break;
            default:
                return draft
        }
    }) 
}
