import {API_URL} from "../../urls";
import {changeDeckFlashcards, setIsLoading} from "../flashcards/actions";
import {setDeckDataAction} from "../decks/actions";
import {setIsSaving} from "./actions";

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

                if (flashcards.length === 0) {
                    flashcards.push({
                        id: 0,
                        term: '',
                        definition: ''
                    })
                }

                dispatch(changeDeckFlashcards(flashcards));
                dispatch(setDeckDataAction({
                    deckId: data.deckId,
                    deckName: data.name,
                    creatorId: data.creatorId
                }));
                dispatch(setIsLoading(false))
            }, 750);
        } else if (!data.flashcards) {
            console.log("Deck doesn't exits");
            dispatch(setDeckDataAction({
                error: true,
                deckId: null,
                deckName: null
            }));
            dispatch(setIsLoading(false))
        }
    }
};

export const editDeckFlashcardsAction = (deckId, flashcards) => {
    return async dispatch => {
        await dispatch(setIsSaving(true))
        const url = `${API_URL}/decks/${deckId}/flashcards`;
        let data = {
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
            const result = () => {
                return new Promise(function (resolve) {
                    setTimeout(async function () {
                        await dispatch(setIsSaving(false))
                        resolve('success');
                    }, 1000);
                });
            };
            return result()

        } else {
            console.log(result)
        }
    }
};
