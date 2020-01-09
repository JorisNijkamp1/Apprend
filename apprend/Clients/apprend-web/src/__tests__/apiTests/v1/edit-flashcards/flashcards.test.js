'use strict';
import {API_URL} from "../../../../redux/urls";

describe('Get flashcards from a deck', () => {
    const deckId = "5ddfadab612b09570c6f3a33"
    const expectedResult = {
        "success": true,
        "deck": {
            "deckId": deckId,
            "name": "Finnish to Dutch prefixes"
        }
    };

    test('Get deck endpoint', async () => {
        const response = await fetch(`${API_URL}/decks/${deckId}/flashcards`, {
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
        expect(result.deckId).toBe(expectedResult.deck.deckId)
        expect(result.flashcards).toHaveLength(2)
    });

    test('Edit deck endpoint', async () => {
        const data = {
            "flashcards": [
                {
                    "type": "Text only",
                    "question": "Wie",
                    "answer": "Wat",
                    "sessionPlayed": 0,
                    "columns": [
                        {
                            "type": "Text",
                            "value": ""
                        },
                        {
                            "type": "Text",
                            "value": ""
                        }
                    ],
                    "box": 0
                },
                {
                    "type": "Text only",
                    "question": "Wat",
                    "answer": "Wie",
                    "sessionPlayed": 0,
                    "columns": [
                        {
                            "type": "Text",
                            "value": ""
                        },
                        {
                            "type": "Text",
                            "value": ""
                        }
                    ],
                    "box": 0
                }
            ],
            "test": true
        }

        const response = await fetch(`${API_URL}/decks/${deckId}/flashcards`, {
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
        expect(result.deck.flashcards).toHaveLength(2)
    });
})