/*
|----------------------------------------------------------------------
| This file includes all Leitner system algorithm functions.
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
const shuffleCards = (array) => {
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
| Select X cards from box 0.
|--------------------------------------------------
 */
const selectBox0Cards = (cardsInDeck) => {
    const box0Cards = cardsInDeck.filter(card => card.box === 0);
    return shuffleCards(box0Cards).splice(0, X);
};

/*
|--------------------------------------------------
| Select all cards from box 1.
|--------------------------------------------------
 */
const selectBox1Cards = (cardsInDeck) => {
    return cardsInDeck.filter(card => card.box === 1);
};

/*
|--------------------------------------------------
| Select all cards from box 2 that have been
| played W2 sessions back.
|--------------------------------------------------
 */
const selectBox2Cards = (cardsInDeck, currentSessionNumber) => {
    return cardsInDeck.filter(card => {
        return card.box === 2 && (currentSessionNumber - W2) === card.sessionPlayed;
    });
};

/*
|--------------------------------------------------
| Select all cards from box 2 that have been
| played W3 sessions back.
|--------------------------------------------------
 */
const selectBox3Cards = (cardsInDeck, currentSessionNumber) => {
    return cardsInDeck.filter(card => {
        return card.box === 3 && (currentSessionNumber - W3) === card.sessionPlayed;
    });
};

/*
|--------------------------------------------------
| Create a selection of cards based on the
| Leitner system.
|--------------------------------------------------
 */
const leitner = (cardsInDeck, currentSessionNumber) => {
    const selectedBox0Cards = selectBox0Cards(cardsInDeck);
    const selectedBox1Cards = selectBox1Cards(cardsInDeck);
    const selectedBox2Cards = selectBox2Cards(cardsInDeck, currentSessionNumber);
    const selectedBox3Cards = selectBox3Cards(cardsInDeck, currentSessionNumber);
    console.log(selectedBox0Cards);
    console.log(selectedBox1Cards);
    console.log(selectedBox2Cards);
    console.log(selectedBox3Cards);
    const selection = [...selectedBox0Cards, ...selectedBox1Cards, ...selectedBox2Cards, ...selectedBox3Cards];

    return shuffleCards(selection);
};

export default leitner;