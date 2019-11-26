import {SET_LOGINACTION} from '../action-types'

export function setLoginAction(username) {
    return {
        type: SET_LOGINACTION,
        payload: username
    }
}
