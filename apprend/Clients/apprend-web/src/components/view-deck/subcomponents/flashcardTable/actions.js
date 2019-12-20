function setDeckAction(deckId) {
    return {
        type: 'DECKS_SET_DECK',
        payload: deckId
    }
}

function set_column_name(column){
    return {
        type: 'SET_COLUMN_NAME',
        payload: column
    }
}

export const addColumn = (type, name,  creator, deck) => {
    return async dispatch => {
        const url = `http://localhost:3001/api/v1/users/${creator}/decks/${deck}/columns`

        const options = {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({column: {type: type, name: name}}),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.status === 201){
            dispatch(setDeckAction(data.data))
        }
    }
}

export const deleteColumn = (index, creator, deck) => {
    return async dispatch => {
        const url = `http://localhost:3001/api/v1/users/${creator}/decks/${deck}/columns/${index}`
        const options = {
            method: 'DELETE',
            credentials: 'include',
            // body: JSON.stringify({column: {type: type, name: name}}),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.status === 200){
            dispatch(setDeckAction(data.data))
        }
    }
}

export const editColumnName = (index, creator, deck, value) => {
    return async dispatch => {
        const url = `http://localhost:3001/api/v1/users/${creator}/decks/${deck}/columns/${index}`
        const options = {
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify({column: {value: value}}),
            headers: {
                'Content-Type': 'application/json'
            }
        } 
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.status === 200){
            dispatch(set_column_name({index: index, value: data.data}))
        }
    }
}

function addFlashcardAction(flashcard){
    return {
        type: 'DECK_ADD_FLASHCARD',
        payload: flashcard
    }
}

export const addFlashcard = (creator, deck) => {
    return async dispatch => {
        const url = `http://localhost:3001/api/v1/users/${creator}/decks/${deck}/flashcards`
        const options = {
            method: 'POST',
            credentials: 'include',
            // body: JSON.stringify({column: {value: value}}),
            headers: {
                'Content-Type': 'application/json'
            }
        } 
        const response = await fetch(url, options)

        if (response.status === 201){
            const data = await response.json()
            dispatch(addFlashcardAction(data.data))
        }
    }
}

function editFlashcardColumn(column){
    return {
        type: 'DECKS_EDIT_FLASHCARD_COLUMN',
        payload: column
    }
}

export const editFlashcard = (value, creator, deck, flashcard, index) => {
    return async dispatch => {
        console.log(value, creator, deck, flashcard, index)
        const url = `http://localhost:3001/api/v1/users/${creator}/decks/${deck}/flashcards/${flashcard}/columns/${index}`
        const options = {
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify({column: {value: value}}),
            headers: {
                'Content-Type': 'application/json'
            }
        } 
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.status === 200){
            dispatch(editFlashcardColumn({index: index, value: data.data, _id: flashcard}))
        }
    }
}