import { API_URL } from '../../urls'
import {setIsLoading } from './actions'

export const createDeck = deck => {
    console.log('IK WIL EEN NIEUW DECK AANMAKEN')
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
    
            const data = await response.json()
            console.log(data, '##############################')
            let madeDeck
            if (data.decks){
                madeDeck = data.decks[data.decks.length-1]
            } else {
                madeDeck = data
            }
            console.log(madeDeck)
            return data
            
        // } catch (e) {
        //     await dispatch(setIsLoading(false))

        //     console.log(e)
        // }

    }
}