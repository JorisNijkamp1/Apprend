import {
    ERROR_OCCURRED,
    SET_REGISTER_SUCCESS,
    SET_EMAIL_EXISTS,
    SET_USERNAME_EXISTS
} from '../../../redux-config/actionTypes';

const initialState = {
    'newUserRegistered': false,
    'usernameExists': false,
    'emailExists': false,
    'isLoading': false,
    'error': null
};

export default function registerReducer(state = initialState, action) {
    switch (action.type) {
        case SET_REGISTER_SUCCESS:
            return {...state, 'newUserRegistered': action.payload, 'error': null};
        case SET_USERNAME_EXISTS:
            return {...state, 'usernameExists': action.payload};
        case SET_EMAIL_EXISTS:
            return {...state, 'emailExists': action.payload};
        case ERROR_OCCURRED:
            return {...state, 'error': action.payload};
        default:
            return state;
    }
}