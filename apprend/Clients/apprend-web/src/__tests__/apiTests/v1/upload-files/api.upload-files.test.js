import {API_URL} from '../../../../redux/urls';

describe('Upload an image', () => {
    const user = 'Joris'
    const password = 'han'

    let login = {
        username: user,
        password: password
    };

    let deck;

    beforeAll(async () => {
        const response = await fetch('http://localhost:3001/api/v1/login', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(login),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const getAllDecks = await fetch(`http://localhost:3001/api/v1/users/${user}/decks`);
        const data = await getAllDecks.json();
        deck = data.data.decks[0];
    });

    test('Upload not a file', async () => {
        const response = await fetch(`${API_URL}/upload/image`, {
            method: 'POST',
            credentials: 'include',
            body: 'testString'
        });

        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.message).toBe('No files were uploaded');
    })
});