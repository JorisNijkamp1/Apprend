import {API_URL} from '../../urls'

export const getUserDecks = (username) => {
    return async dispatch => {
        const url = `${API_URL}/users/${username}/decks`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log(data)
                }
            }).catch((err => console.log(err)))
    }
};
