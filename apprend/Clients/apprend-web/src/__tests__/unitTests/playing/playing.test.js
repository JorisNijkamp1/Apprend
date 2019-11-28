'use strict';

const shuffleCards = (array) => {
    let random;
    let temp;
    for (let i = array.length - 1; i > 0; i -= 1) {
        random = Math.floor((i + 1) * Math.random());
        temp = array[random];
        array[random] = array[i];
        array[i] = temp;
    }
    return array;
}

xdescribe(`Shuffle cards`, () => {
    let cards;

    beforeEach(async () => {
        cards = [1, 2, 3, 4, 5];
    });
    
    test('Shuffle cards array', async () => {
        const result = await shuffleCards(cards);
        
        console.log(result)
    });
});

describe(`Setting game`, () => {
    test('Setting game successfully', async () => {
        const deckId = '5dde830753042f31e01a8dfb'
        const data = {
            "cards": {
                "_id" : "Apprende",
                "type" : "Text only",
                "question" : "Hello",
                "answer" : "Hoi"
            }
        };
    
        const response = await fetch('http://localhost:3001/api/v1/decks/' + deckId + '/setGame', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        })
        const result = await response.json();
    
        expect(result.success).toBe(true)
    });
})
