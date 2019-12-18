import { CREATEDECK_EDIT_DECKNAME, CREATEDECK_SET_ISLOADING, CREATEDECK_ADD_TAG, CREATEDECK_DELETE_TAG, CREATEDECK_CLEAR_TAGS } from '../../../src_old/redux-store/actions/action-types'

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

export function addTag(tag){
    return {
        type: CREATEDECK_ADD_TAG,
        payload: tag
    }
}

export function deleteTag(tag){
    return {
        type: CREATEDECK_DELETE_TAG,
        payload: tag
    }
}

export function clearTags(){
    return {
        type: CREATEDECK_CLEAR_TAGS
    }
}