import {SET_ANONYMOUS_USER, SET_LOGINACTION} from '../../../redux/actionTypes';
import produce from "immer";

const initialState = {
    username: null,
    message: null,
    anonymousUser: true,
};

export default function loginReducer(state = initialState, action) {
    return produce(state, draft => {
        switch (action.type) {
            case SET_LOGINACTION:
                draft['username'] = action.payload;
                break;

            case SET_ANONYMOUS_USER:
                draft['anonymousUser'] = action.payload;
                break;

            default:
                return draft
        }
    })
}
