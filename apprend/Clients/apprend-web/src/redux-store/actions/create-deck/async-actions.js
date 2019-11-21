import { API_URL } from '../../urls'

export const createDeck = (deck) => {
    return async dispatch => {
        const url = `${API_URL}/decks`
        const response = await fetch(url, {
            credentials: true,
            method: 'POST',
            body: JSON.stringify(deck),
            'Content-Type': 'application/json'
        })
    }
}