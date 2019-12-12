import {API_URL} from '../../../../redux-store/urls';

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

describe('Login API tests', function () {
    const value = "test";

    test('Not able to filter because this user doesn\'t have any decks', async () => {
        const response = await fetch(`${API_URL}/decks/Jantje/tags?tag=${value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });

        const result = await response.json();

        expect(result.decks).toStrictEqual([]);
    });

    test('Filter deck with tag "test" from user Joris', async () => {
        const data = [
            {
                name: 'Finnish to Dutch prefixes',
                deckCreator: 'Joris',
                totalFlashcards: 2,
                deckId: '5ddfadab612b09570c6f3a33',
                description: 'Learning prefixes ',
                tags: ['test']
            }
        ];
        const response = await fetch(`${API_URL}/decks/Joris/tags?tag=${value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });

        const result = await response.json();
        
        let filteredDecks = getMatchingLanguages(value, result.decks)

        expect(filteredDecks).toStrictEqual(data);
    });
});