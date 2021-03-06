import {SET_ANONYMOUS_USER, SET_LOGINACTION} from '../../redux-config/actionTypes'

export function setLoginAction(username) {
    return {
        type: SET_LOGINACTION,
        payload: username
    }
}

export function setAnonymousUserAction(bool) {
    return {
        type: SET_ANONYMOUS_USER,
        payload: bool
    }
}
