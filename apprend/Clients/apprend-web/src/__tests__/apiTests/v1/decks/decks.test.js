/*
|-----------------------------------------------------------
| RUN THE SEED FILE BEFORE RUNNING THESE TESTS!
|-----------------------------------------------------------
 */

import {API_URL} from '../../../../redux-store/urls';
import {seedUsers} from '../../../../../../../Server/seed';

describe('Decks API tests', function () {
    beforeAll(async () => {
        await seedUsers();
    });

    test('Test updating deck session', async () => {
        const deckId = '5ddfadab612b09570c6f3a34';
        const url = `${API_URL}/decks/${deckId}/session`;

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                session: 1,
                test: true
            })
        };

        const response = await fetch(url, options);
        const results = await response.json();

        expect(results.session).toBeDefined();
        expect(results.session).toBe(1);
    });

    test('Test updating flashcard box and sessionPlayed with correct answer', async () => {
        const deckId = '5ddfadab612b09570c6f3a34';
        const flashcardId = 'Apprende';
        const url = `${API_URL}/decks/${deckId}/flashcards/${flashcardId}/leitner`;

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                answeredCorrect: true,
                test: true
            })
        };

        const response = await fetch(url, options);
        const results = await response.json();

        expect(results.deck).toBeDefined();

        const currentFlashcard = results.deck.flashcards.find(flashcard => flashcard._id === flashcardId);

        expect(currentFlashcard).toBeDefined();
        expect(currentFlashcard.box).toBe(2);
        expect(currentFlashcard.sessionPlayed).toBe(1);
    });

    test('Test updating flashcard box and sessionPlayed with correct answer again', async () => {
        const deckId = '5ddfadab612b09570c6f3a34';
        const flashcardId = 'Apprende';
        const url = `${API_URL}/decks/${deckId}/flashcards/${flashcardId}/leitner`;

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                answeredCorrect: true,
                test: true
            })
        };

        const response = await fetch(url, options);
        const results = await response.json();

        expect(results.deck).toBeDefined();

        const currentFlashcard = results.deck.flashcards.find(flashcard => flashcard._id === flashcardId);

        expect(currentFlashcard).toBeDefined();
        expect(currentFlashcard.box).toBe(3);
        expect(currentFlashcard.sessionPlayed).toBe(1);
    });

    test('Test updating flashcard box and sessionPlayed with incorrect answer', async () => {
        const deckId = '5ddfadab612b09570c6f3a34';
        const flashcardId = 'Apprende';
        const url = `${API_URL}/decks/${deckId}/flashcards/${flashcardId}/leitner`;

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                answeredCorrect: false,
                test: true
            })
        };

        const response = await fetch(url, options);
        const results = await response.json();

        expect(results.deck).toBeDefined();

        const currentFlashcard = results.deck.flashcards.find(flashcard => flashcard._id === flashcardId);

        expect(currentFlashcard).toBeDefined();
        expect(currentFlashcard.box).toBe(1);
        expect(currentFlashcard.sessionPlayed).toBe(1);
    });
});