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
    const value = "d";

    test('Not able to filter because you don\'t have any decks', async () => {
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

    test('Filter deck with tag "d" from user Joris', async () => {
        const data = [
            {
                name: 'test1',
                deckCreator: 'Joris',
                totalFlashcards: 0,
                deckId: '5dea4c91db367563d4a9eada',
                description: 'test',
                tags: [ 'dfvsdv' ]
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