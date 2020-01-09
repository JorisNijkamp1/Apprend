import {
    _selectBox0Cards,
    _selectBox1Cards,
    _selectBox2Cards,
    _selectBox3Cards,
    shuffleCards,
    leitnerSelectCards
} from '../../../util/leitner-system/leitnerSystem';
import {X, W2, W3} from '../../../util/leitner-system/config';

describe('Leitner system unit-tests', () => {
    const CARD_1 = 'CARD_1';
    const CARD_2 = 'CARD_2';
    const CARD_3 = 'CARD_3';
    const CARD_4 = 'CARD_4';
    const CARD_5 = 'CARD_5';
    const CARD_6 = 'CARD_6';
    const CARD_7 = 'CARD_7';
    const CARD_8 = 'CARD_8';
    const CARD_9 = 'CARD_9';
    const CARD_10 = 'CARD_10';
    const CARD_11 = 'CARD_11';
    const CARD_12 = 'CARD_12';
    const CARD_13 = 'CARD_13';
    const CARD_14 = 'CARD_14';
    const CARD_15 = 'CARD_15';

    const flashcards = [
        {
            _id: CARD_1,
            box: 1,
            sessionPlayed: 0
        },
        {
            _id: CARD_2,
            box: 0,
            sessionPlayed: 7
        },
        {
            _id: CARD_3,
            box: 1,
            sessionPlayed: 0
        },
        {
            _id: CARD_4,
            box: 2,
            sessionPlayed: 0
        },
        {
            _id: CARD_5,
            box: 3,
            sessionPlayed: W3
        },
        {
            _id: CARD_6,
            box: 0,
            sessionPlayed: 0
        },
        {
            _id: CARD_7,
            box: 2,
            sessionPlayed: W2
        },
        {
            _id: CARD_8,
            box: 0,
            sessionPlayed: 0
        },
        {
            _id: CARD_9,
            box: 0,
            sessionPlayed: 0
        },
        {
            _id: CARD_10,
            box: 0,
            sessionPlayed: 0
        },
        {
            _id: CARD_11,
            box: 0,
            sessionPlayed: 0
        },
        {
            _id: CARD_12,
            box: 0,
            sessionPlayed: 0
        },
        {
            _id: CARD_13,
            box: 0,
            sessionPlayed: 0
        },
        {
            _id: CARD_14,
            box: 0,
            sessionPlayed: 0
        },
        {
            _id: CARD_15,
            box: 0,
            sessionPlayed: 0
        }
    ];

    test('Shuffling cards should return shuffled array with same items', () => {
        const shuffledCards = shuffleCards(flashcards);

        for (const flashcard of flashcards) {
            expect(shuffledCards.includes(flashcard)).toBeTruthy();
        }

        expect(Array.isArray(shuffledCards)).toBeTruthy();
    });

    test('Selecting cards from box 0 should behave normally', () => {
        const expectedLength = X;
        const result = _selectBox0Cards(flashcards);

        expect(Array.isArray(result)).toBeTruthy();
        expect(result.length).toBe(expectedLength);
    });

    test('Selecting cards from box 1 should behave normally', () => {
        const expectedLength = 2;
        const result = _selectBox1Cards(flashcards);
        const card1Exists = result.find(flashcard => flashcard._id === CARD_1);
        const card3Exists = result.find(flashcard => flashcard._id === CARD_3);

        expect(Array.isArray(result)).toBeTruthy();
        expect(card1Exists).toBeTruthy();
        expect(card3Exists).toBeTruthy();
        expect(result.length).toBe(expectedLength);
    });

    test('Selecting cards from box 2 should behave normally with correct session', () => {
        const currentSession = W2 * 2;
        const expectedLength = 2;
        const result = _selectBox2Cards(flashcards, currentSession);
        const card7Exists = result.find(flashcard => flashcard._id === CARD_7);

        expect(Array.isArray(result)).toBeTruthy();
        expect(card7Exists).toBeTruthy();
        expect(result.length).toBe(expectedLength);
    });

    test('Selecting cards from box 2 should behave normally with incorrect session', () => {
        const currentSession = W2 + 1;
        const expectedLength = 1;
        const result = _selectBox2Cards(flashcards, currentSession);

        expect(Array.isArray(result)).toBeTruthy();
        expect(result.length).toBe(expectedLength);
    });

    test('Selecting cards from box 3 should behave normally with correct session', () => {
        const currentSession = W3 * 2;
        const expectedLength = 1;
        const result = _selectBox3Cards(flashcards, currentSession);
        const card5Exists = result.find(flashcard => flashcard._id === CARD_5);

        expect(Array.isArray(result)).toBeTruthy();
        expect(card5Exists).toBeTruthy();
        expect(result.length).toBe(expectedLength);
    });

    test('Selecting cards from box 3 should behave normally with incorrect session', () => {
        const currentSession = W3 + 1;
        const expectedLength = 0;
        const result = _selectBox3Cards(flashcards, currentSession);

        expect(Array.isArray(result)).toBeTruthy();
        expect(result.length).toBe(expectedLength);
    });

    test('Selecting cards should behave normally', () => {
        const currentSession = W3;
        const expectedLength = 13;
        const result = leitnerSelectCards(flashcards, currentSession);

        expect(Array.isArray(result)).toBeTruthy();
        expect(result.length).toBe(expectedLength);
    });
});