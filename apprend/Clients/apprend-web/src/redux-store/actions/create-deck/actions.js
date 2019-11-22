import { CREATEDECK_EDIT_DECKNAME, CREATEDECK_SET_ISLOADING } from '../action-types'

export function changeDeckName(name){
    return {
        type: CREATEDECK_EDIT_DECKNAME,
        payload: name
    }
}

export function setIsLoading(bool){
    return {
        type: CREATEDECK_SET_ISLOADING,
        payload: bool
    }
}