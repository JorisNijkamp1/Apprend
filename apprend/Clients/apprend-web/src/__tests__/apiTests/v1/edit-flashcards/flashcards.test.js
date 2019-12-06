'use strict';
import {API_URL} from "../../../../redux-store/urls";

describe('Get flashcards from a deck', () => {
    test('Get deck endpoint', async () => {
        const expectedResult = {
            "success": true,
            "deck": {
                "name": "Frans woordjes",
                "flashcards": [
                    {
                        "_id": "0",
                        "type": "Text only",
                        "question": "Hond",
                        "answer": "Dog"
                    },
                    {
                        "_id": "1",
                        "type": "Text only",
                        "question": "Kat",
                        "answer": "Cat"
                    }
                ]
            }
        };

        const response = await fetch(`${API_URL}/decks/5ddfadab612b09570c6f3a33/flashcards`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });
        const result = await response.json();

        expect(result.success).toBe(expectedResult.success)
        expect(result.name).toBe(expectedResult.deck.name)
        expect(result.flashcards).toStrictEqual(expectedResult.deck.flashcards)
    });

    test('Edit deck endpoint', async () => {
        const expectedResult = {
            "success": true,
            "deck": {
                "name": "Frans woordjes",
                "flashcards": [
                    {
                        "_id": "0",
                        "type": "Text only",
                        "question": "Geit",
                        "answer": "Goat"
                    },
                    {
                        "_id": "1",
                        "type": "Text only",
                        "question": "Kat",
                        "answer": "Cat"
                    }
                ]
            }
        };
        
        const data = {
            "flashcards": [
                {
                    "id": "0",
                    "type": "Text only",
                    "term": "Geit",
                    "definition": "Goat"
                },
                {
                    "id": "1",
                    "type": "Text only",
                    "term": "Kat",
                    "definition": "Cat"
                }
            ],
            "test": true
        }

        const response = await fetch(`${API_URL}/decks/5ddfadab612b09570c6f3a33/flashcards`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });
        const result = await response.json();

        expect(result.success).toBe(expectedResult.success)
        expect(result.deck.name).toBe(expectedResult.deck.name)
        expect(result.deck.flashcards).toStrictEqual(expectedResult.deck.flashcards)
    });
})