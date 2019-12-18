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

export const createDeck = deck => {
    return async dispatch => {
        let givenDeck = deck
        const url = `${API_URL}/decks`
        // try {
        await dispatch(setIsLoading(true))

        const response = await fetch(url, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(givenDeck),
            headers: {
                'Content-Type': 'application/json'
            },
            // mode: 'cors'

        })
        await dispatch(setIsLoading(false))
        if (response.status === 201){
            const data = await response.json()
            let madeDeck
            if (data.decks){
                madeDeck = data.decks[data.decks.length-1]
            } else {
                madeDeck = data
            }
            return data
        }


        // } catch (e) {
        //     await dispatch(setIsLoading(false))

        //     console.log(e)
        // }

    }
}