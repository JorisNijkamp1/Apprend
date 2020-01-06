/*
|----------------------------------------------------------------------
| This file includes all Leitner system algorithm functions for
| creating a selection of cards to play with.
|
| Please refer to the Apprend Software Guidebook, chapter 7:
| Infrastructure Architecture, for a more detailed explanation.
|----------------------------------------------------------------------
 */
import {X, W2, W3} from './config';

/*
|--------------------------------------------------
| Shuffle the values of an array.
|--------------------------------------------------
 */
export const shuffleCards = function (array) {
    let random, temp;

    for (let i = (array.length - 1); i > 0; i -= 1) {
        random = Math.floor((i + 1) * Math.random());
        temp = array[random];

        array[random] = array[i];
        array[i] = temp;
    }

    return array;
};

/*
|--------------------------------------------------
| Select X cards from box 0. This box will
| eventually be empty because it serves as a
| temporary box for cards that haven't been
| played yet. Cards will never return to box 0.
|--------------------------------------------------
 */
export const _selectBox0Cards = function (allCardsInDeck) {
    const box0Cards = allCardsInDeck.filter(card => card.box === 0);
    return shuffleCards(box0Cards).splice(0, X);
};

/*
|--------------------------------------------------
| Select all cards from box 1.
|--------------------------------------------------
 */
export const _selectBox1Cards = function (allCardsInDeck) {
    return allCardsInDeck.filter(card => card.box === 1);
};

/*
|--------------------------------------------------
| Select all cards from box 2 that have been
| played W2 sessions back.
|--------------------------------------------------
 */
export const _selectBox2Cards = function (allCardsInDeck, currentSessionNumber) {
    return allCardsInDeck.filter(card => {
        return card.box === 2 && (currentSessionNumber - W2) >= card.sessionPlayed;
    });
};

/*
|--------------------------------------------------
| Select all cards from box 3 that have been
| played W3 sessions back.
|--------------------------------------------------
 */
export const _selectBox3Cards = function (allCardsInDeck, currentSessionNumber) {
    return allCardsInDeck.filter(card => {
        return card.box === 3 && (currentSessionNumber - W3) >= card.sessionPlayed;
    });
};

/*
|--------------------------------------------------
| Get the new box number for a flashcard by
| providing its old box number and if it was
| answered correctly.
|--------------------------------------------------
 */
export const leitnerGetNewBox = function (currentFlashcardBox, answeredCorrectly) {
    if (answeredCorrectly && currentFlashcardBox === 2) return 3;
    if (answeredCorrectly) return 2;
    return 1;
};

/*
|--------------------------------------------------
| Create a selection of cards.
|--------------------------------------------------
 */
export const leitnerSelectCards = function (allCardsInDeck, currentSessionNumber) {
    const selectedBox0Cards = _selectBox0Cards(allCardsInDeck);
    const selectedBox1Cards = _selectBox1Cards(allCardsInDeck);
    const selectedBox2Cards = _selectBox2Cards(allCardsInDeck, currentSessionNumber);
    const selectedBox3Cards = _selectBox3Cards(allCardsInDeck, currentSessionNumber);
    const selection = [...selectedBox0Cards, ...selectedBox1Cards, ...selectedBox2Cards, ...selectedBox3Cards];

    return shuffleCards(selection);
};