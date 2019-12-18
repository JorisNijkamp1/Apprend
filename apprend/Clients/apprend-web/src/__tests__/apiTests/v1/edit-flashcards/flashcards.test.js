'use strict';
import {API_URL} from "../../../../../src_old/redux-store/urls";

describe('Get flashcards from a deck', () => {
    const expectedResult = {
        "success": true,
        "deck": {
            "name": "Finnish to Dutch prefixes",
            "flashcards": [
                {
                    "_id": "Apprende0",
                    "type": "Text only",
                    "question": "Kissa",
                    "answer": "Kat",
                    "sessionPlayed": 0,
                    "box": 0
                },
                {
                    "_id": "Apprende1",
                    "type": "Text only",
                    "question": "Koira",
                    "answer": "Hond",
                    "sessionPlayed": 0,
                    "box": 0
                }
            ]
        }
    };

    test('Get deck endpoint', async () => {
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
        const data = {
            "flashcards": [
                {
                    "id": "Apprende0",
                    "type": "Text only",
                    "term": "Kissa",
                    "definition": "Kat",
                    "sessionPlayed": 0,
                    "box": 0
                },
                {
                    "id": "Apprende1",
                    "type": "Text only",
                    "term": "Koira",
                    "definition": "Hond",
                    "sessionPlayed": 0,
                    "box": 0
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