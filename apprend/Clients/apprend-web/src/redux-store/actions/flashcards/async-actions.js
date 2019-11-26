import {API_URL} from "../../urls";
import {changeDeckFlashcards, setIsLoading} from "../flashcards/actions";
import {setDeckDataAction} from "../decks/actions";

export const getDeckFlashcardsAction = (deckId) => {
    return async dispatch => {
        await dispatch(setIsLoading(true))
        const url = `${API_URL}/decks/${deckId}/flashcards`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        };
        const response = await fetch(url, options);
        const data = await response.json();
        if (data.success) {
            setTimeout(function () {
                let flashcards = [];
                data.flashcards.forEach((flashcard, key) => {
                    flashcards.push({
                        id: key,
                        term: flashcard.question,
                        definition: flashcard.answer
                    })
                });
                dispatch(changeDeckFlashcards(flashcards));
                dispatch(setDeckDataAction({
                    deckId: data.deckId,
                    deckName: data.name
                }));
                dispatch(setIsLoading(false))
            }, 750);
        }else if (!data.flashcards) {
            setTimeout(function () {
                dispatch(setIsLoading(false))
            }, 750);
        }
    }
};

export const editDeckFlashcardsAction = (deckId, flashcards) => {
    return async dispatch => {
        const url = `${API_URL}/decks/${deckId}/flashcards`;
        let data = {
            deckId: deckId,
            flashcards: flashcards,
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        };
        const response = await fetch(url, options);
        const result = await response.json();
        if (result.success) {
            setTimeout(function () {
                console.log(result)
            }, 750);
        }else if (!result.flashcards) {
            setTimeout(function () {
                console.log(result)
            }, 750);
        }
    }
};
