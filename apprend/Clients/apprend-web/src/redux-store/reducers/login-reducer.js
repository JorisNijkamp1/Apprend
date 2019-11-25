import {SET_LOGINACTION} from '../actions/action-types';
import produce from "immer";

const initialState = {
    username: null,
};

export default function loginReducer(state = initialState, action) {
    return produce(state, draft => {
        switch (action.type) {
            case SET_LOGINACTION:
                draft['username'] = action.payload;
                break;

            default:
                return draft
        }
    })
}
