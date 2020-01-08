
const escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const getMatchingLanguages = (value, decks) => {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');
    const match = [];
    for (let i = 0; i < decks.length; i++) {
        for (let j = 0; j < decks[i].tags.length; j++) {
            if (regex.test(decks[i].tags[j])) {
                match.push(decks[i])
            }
        }
    }

    if (match.length === 0) {
        match.push("There are no decks with this tag!")
        return match
    } else {
        return (match.length > 4) ? match.slice(0, 4) : match;
    }
};


describe('filter tests', () => {
    const deck = [
        {
            "_id": "5ddfadab612b09570c6f3a33",
            "name": "Finnish to Dutch prefixes",
            "description": "Learning prefixes ",
            "creatorId": "Joris",
            "status": "isEdited",
            "flashcards": [
                {
                    "_id": "Apprende0",
                    "type": "Text only",
                    "question": "Kissa",
                    "answer": "Kat"
                },
                {
                    "_id": "Apprende1",
                    "type": "Text only",
                    "question": "Koira",
                    "answer": "Hond"
                }
            ],
            "tags": [
                "test"
            ]
        }
    ];

    test('Filtering on "test"', async () => {
        const value = "test";
        let filteredDecks = getMatchingLanguages(value, deck)

        expect(filteredDecks).toStrictEqual(deck)
    });

    test('Filtering on "aardbei"', async () => {
        const value = "aardbei";
        let filteredDecks = getMatchingLanguages(value, deck)

        expect(filteredDecks).toStrictEqual(["There are no decks with this tag!"])
    });
})