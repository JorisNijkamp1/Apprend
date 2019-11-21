export const getHomepageDecks = (() => {
    const url = 'http://localhost:3001/decks';
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        mode: 'cors'
    };

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);

        }).catch((err => {
        console.log("Er gaat iets goed fout!");
        console.log(err);
    }))
});