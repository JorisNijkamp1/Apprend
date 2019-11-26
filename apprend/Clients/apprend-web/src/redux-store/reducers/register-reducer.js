import {REGISTER_NEW_USER, SET_USERNAME_EXISTS} from '../actions/register/action-types';

const initialState = {
    'usernameExists': false,
    'isLoading': false,
    'error': null
};

export default function registerReducer(state = initialState, action) {
    switch (action.type) {
        case REGISTER_NEW_USER:
            // TODO: Implement reducer.
            return state;
        case SET_USERNAME_EXISTS:
            return {...state, 'usernameExists': action.payload};
        default:
            return state;
    }
}