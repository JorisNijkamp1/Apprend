import { CREATEDECK_EDIT_DECKNAME, CREATEDECK_SET_ISLOADING, CREATEDECK_ADD_TAG, CREATEDECK_DELETE_TAG, CREATEDECK_CLEAR_TAGS } from '../../redux/actionTypes'
import {API_URL} from '../../redux/urls';

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

export const createDeck = (deck, setLoader) => {
    return async dispatch => {
        let givenDeck = deck
        const url = `${API_URL}/decks`
        await dispatch(setIsLoading(true))
        setLoader(true)
        const response = await fetch(url, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(givenDeck),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        await dispatch(setIsLoading(false))
        const data = await response.json()
        setLoader(false)
        if (response.status === 201){
            return {message: data.message, data: data.data, success: true}
        }
        return {message: data.message}
    }
}