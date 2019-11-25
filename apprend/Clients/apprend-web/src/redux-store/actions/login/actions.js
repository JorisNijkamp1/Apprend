import {SET_LOGINACTION} from '../action-types'

export function setLoginAction(username, password) {
    return {
        type: SET_LOGINACTION,
        payload: username, password
    }
}