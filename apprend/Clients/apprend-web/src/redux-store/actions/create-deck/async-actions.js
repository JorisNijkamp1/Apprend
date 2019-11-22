import { API_URL } from '../../urls'
import {setIsLoading } from './actions'

export const createDeck = (deck) => {
    return async dispatch => {
        const url = `${API_URL}/decks`
        try {
            await dispatch(setIsLoading(true))
            const response = await fetch(url, {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(deck),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            await dispatch(setIsLoading(false))
    
            const data = await response.json()
            return data
            
        } catch (e) {
            await dispatch(setIsLoading(false))

            console.log(e)
        }

    }
}