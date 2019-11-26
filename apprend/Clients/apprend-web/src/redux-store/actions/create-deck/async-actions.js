import { API_URL } from '../../urls'
import {setIsLoading } from './actions'

export const createDeck = (deck) => {
    console.log('IK WIL EEN NIEUW DECK AANMAKEN')
    return async dispatch => {
        let givenDeck = deck
        const url = `${API_URL}/decks`
        try {
            await dispatch(setIsLoading(true))

            const response = await fetch('http://localhost:3001/api/v1/decks', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(givenDeck),
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'

            })
            await dispatch(setIsLoading(false))
    
            const data = await response.json()
            console.log(data, '##############################')
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