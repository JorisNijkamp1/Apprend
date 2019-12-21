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
        return data
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
        let data = await response.json()
        if (response.status === 200){
            dispatch(setDeckAction(data.data))
            data.success = true
        }
        return data
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
        let data = await response.json()
        if (response.status === 200){
            dispatch(set_column_name({index: index, value: data.data}))
            data.success = true
        }
        return data
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
        const data = await response.json()
        if (response.status === 201){
            dispatch(addFlashcardAction(data.data))
        }

        return data
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

        return data
    }
}

function deleteFlashcardAction(id){
    return {
        type: 'DECKS_DELETE_FLASHCARD',
        payload: id
    }
}

export const deleteFlashcard = (flashcard, creator, deck) => {
    return async dispatch => {
        const url = `http://localhost:3001/api/v1/users/${creator}/decks/${deck}/flashcards/${flashcard}`
        const options = {
            method: 'DELETE',
            credentials: 'include',
            // body: JSON.stringify({column: {value: value}}),
            headers: {
                'Content-Type': 'application/json'
            }
        } 
        const response = await fetch(url, options)
        let data = await response.json()
        if (response.status === 200){
            dispatch(deleteFlashcardAction(flashcard))
            data.success = true
        }
        return data
    }
}

export const setQuickDeleteAction = (bool) =>{
    console.log('action wordt aangeroepen')
    return {
        type: 'DECKS_TOGGLE_QUICKDELETE',
        payload: bool
    }
}