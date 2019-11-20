import { CREATEDECK_EDITDECKNAME } from '../action-types'

export function changeDeckName(name){
    return {
        type: CREATEDECK_EDITDECKNAME,
        payload: name
    }
}