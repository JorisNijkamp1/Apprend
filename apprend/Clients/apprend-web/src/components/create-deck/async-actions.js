import { API_URL } from '../../redux/urls'
import {setIsLoading } from './actions'

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
