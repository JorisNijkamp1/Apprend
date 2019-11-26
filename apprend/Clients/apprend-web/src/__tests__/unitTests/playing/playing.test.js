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

const changeScore = (status) => {
    if (status === "correct") {
        return correct += 1;
    } else if (status === "wrong") {
        return wrong += 1;
    }
}

let array;
let correct;
let wrong;

beforeEach(async () => {
    array = [1, 2, 3, 4, 5];
    correct = 0;
    wrong = 0;
});

test('Shuffle cards array', async () => {
    const result = await shuffleCards(array);
    
    console.log(result)
});

test('Updating correct score', async () => {
    const result = await changeScore('correct');

    expect(result).toEqual(1);
});

test('Updating wrong score', async () => {
    const result = await changeScore('wrong');

    expect(result).toEqual(1);
});

test('Updating both scores', async () => {
    await changeScore('correct');
    await changeScore('wrong');
    await changeScore('correct');

    expect(correct).toEqual(2) && expect(wrong).toEqual(1);
});
