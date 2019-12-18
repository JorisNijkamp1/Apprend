import { API_URL } from '../../redux/urls'

export const getAllUsers = (func) => {
    return async dispatch => {
        const url = `${API_URL}/users`
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        })
        if (response.status === 200) {
            const data = await response.json()
            func(data)
        }
    }
}