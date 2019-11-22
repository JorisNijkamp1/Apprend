import {REGISTER_NEW_USER} from '../actions/action-types';

const initialState = {
    'username': null,
    'isLoading': false,
    'error': null
};

export default function registerReducer(state = initialState, action) {
    switch (action.type) {
        case REGISTER_NEW_USER:
            // TODO: Implement reducer.
        default:
            return state
    }
}