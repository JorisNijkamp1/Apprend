import {API_URL} from '../../../../../src_old/redux-store/urls';

describe('Home search-deck API', function () {
    const value = "Filipino";

    test('Search value after Endpoint call', async () => {
        const expectedResult = {
            "decks": [
                {
                    "name": "Filipino to Dutch words",
                    "description": "Learn Filipino words",
                    "deckCreator": "Joris",
                    "totalFlashcards": 0,
                    "deckId": "5df22f478638434f1cf097d9"
                }
            ]
        }
        const response = await fetch(`${API_URL}/decks?deck=${value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });
        const result = await response.json();
        expect(expectedResult.decks.name).toEqual(result.name);
        expect(expectedResult.decks.description).toEqual(result.description);
        expect(expectedResult.decks.deckCreator).toEqual(result.deckCreator);
    });
});
