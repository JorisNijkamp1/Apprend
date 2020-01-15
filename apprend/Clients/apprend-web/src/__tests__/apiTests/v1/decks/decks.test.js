/*
|-----------------------------------------------------------
| RUN THE SEED FILE BEFORE RUNNING THESE TESTS!
|-----------------------------------------------------------
 */

import {API_URL} from '../../../../redux-config/urls';

describe('Decks API tests', function () {
    const user = 'Aaron'
    const password = 'ica'

    let login = {
        username: user,
        password: password
    };

    let deck

    beforeAll(async () => {
        const response = await fetch('http://localhost:3001/api/v1/login', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(login),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const getAllDecks = await fetch(`http://localhost:3001/api/v1/users/${user}/decks`)
        const data = await getAllDecks.json()
        deck = data.data.decks[0]
    })

    test('Test updating deck session', async () => {
        const deckId = deck._id;
        const url = `${API_URL}/users/${user}/decks/${deckId}`;

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                properties:
                    [
                        {
                            name: 'session',
                            value: '1'
                        }
                    ]
            })
        };

        const response = await fetch(url, options);
        const results = await response.json();

        expect(results.data.session).toEqual(1);
    });

    test('Test updating flashcard box and sessionPlayed with correct answer', async () => {
        const deckId = deck._id;
        const url = `${API_URL}/users/${user}/decks/${deckId}/flashcards/${deck.flashcards[0]._id}`;

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                properties:
                    [
                        {
                            name: 'box',
                            value: 1
                        },
                        {
                            name: 'sessionPlayed',
                            value: 2
                        }
                    ]
            })
        };

        const response = await fetch(url, options);
        const results = await response.json();

        expect(results.data[0].name).toEqual('box');
        expect(results.data[0].value).toEqual(1);
    });
});