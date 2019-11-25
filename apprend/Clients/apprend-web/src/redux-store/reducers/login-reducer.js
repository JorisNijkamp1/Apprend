import {SET_LOGINACTION} from '../actions/action-types';
import produce from "immer";

const initialState = {
    username: undefined,
    password: undefined
};

export default function loginReducer(state = initialState, action) {
    return produce(state, draft => {
        switch (action.type) {
            case SET_LOGINACTION:
                draft['username'].push(action.payload.username);
                draft['password'].push(action.payload.password);
                break;

            default:
                return draft
        }
    })
}