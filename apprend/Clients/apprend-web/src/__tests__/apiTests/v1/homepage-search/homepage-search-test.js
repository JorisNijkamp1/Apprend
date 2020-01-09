import {API_URL} from '../../../../redux/urls';

describe('Home search-deck API', function () {
    const valueDeck = "Filipino";
    const valueUser = "Joris";

    test('Search value for deck', async () => {
        const expectedResult = {
            "decks": [
                {
                    "name": "Filipino to Dutch words",
                    "description": "Learn Filipino words",
                    "deckCreator": "Joris",
                }
            ]
        }
        const response = await fetch(`${API_URL}/decks?deck=${valueDeck}`, {
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

    test('Search value for user', async () => {
        const expectedResult = {
            "users": [
                {
                    "_id": "Joris",
                    "type": 'user'
                }
            ]
        };
        const response = await fetch(`${API_URL}/decks?deck=${valueUser}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });
        const result = await response.json();
        expect(result.results[0].results.name).toEqual(expectedResult.users._id);
        expect(result.results[0].results.type).toEqual(expectedResult.users.type);
    });
});
