import { API_URL } from '../../urls'
import {setIsLoading } from './actions'
import { decksAddDeckAction } from '../decks/actions'

export const createDeck = (deck) => {
    return async dispatch => {
        let givenDeck = deck
        const url = `${API_URL}/decks`
        try {
            await dispatch(setIsLoading(true))
            const response = await fetch(url, {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(givenDeck),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            await dispatch(setIsLoading(false))
    
            const data = await response.json()
            let deck
            if (data.decks){
                deck = data.decks[data.decks.length-1]
            } else {
                deck = data
            }
            return data
            
        } catch (e) {
            await dispatch(setIsLoading(false))

            console.log(e)
        }

    }
}