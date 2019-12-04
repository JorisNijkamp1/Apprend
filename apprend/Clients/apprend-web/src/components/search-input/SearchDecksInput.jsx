import React, {useState} from "react";
import Autosuggest from 'react-autosuggest';
import {API_URL} from "../../redux-store/urls";

const exampleDecks = ([
    {
        name: 'C',
        flashcards: 3
    },
    {
        name: 'C#',
        flashcards: 12
    },
    {
        name: 'C++',
        flashcards: 33
    },
    {
        name: 'Clojure',
        flashcards: 54
    },
    {
        name: 'Elm',
        flashcards: 14
    },
    {
        name: 'Go',
        flashcards: 21
    },
    {
        name: 'Haskell',
        flashcards: 28
    },
    {
        name: 'Java',
        flashcards: 39
    },
    {
        name: 'JavaScript',
        flashcards: 22
    },
    {
        name: 'Perl',
        flashcards: 11
    },
    {
        name: 'PHP',
        flashcards: 74
    },
    {
        name: 'Python',
        flashcards: 3
    },
    {
        name: 'Ruby',
        flashcards: 23
    },
    {
        name: 'Scala',
        flashcards: 76
    }
]);

// Imagine you have a list of decks that you'd like to autosuggest.
const decks = async () => {
    const url = `${API_URL}/decks`;

    const response = await fetch(url, {
        credentials: 'include',
        method: 'GET',
        // body: JSON.stringify(givenDeck),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.status === 200) {
        const data = await response.json();
        return data.decks
    } else {
        console.log('Error: ' + response);
        return []
    }
};

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : exampleDecks.filter(deck =>
        deck.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        <span style={{fontWeight: 600}}>{suggestion.name}</span>
        <br/>
        <i>{suggestion.flashcards} flashcards</i>
    </div>
);

export const SearchDecksInput = () => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const onChange = (event, {newValue}) => {
        return setValue(newValue);
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    const onSuggestionsFetchRequested = async ({value}) => {
        console.log('onSuggestionsFetchRequested');

        return setSuggestions(getSuggestions(value));
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    const onSuggestionsClearRequested = () => {
        console.log('onSuggestionsClearRequested');
        return setSuggestions([]);
    };

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
        placeholder: 'Search for a Deck',
        value,
        onChange: onChange,
        className: 'form-control',
        style: {width: '100%'}
    };

    // Finally, render it!
    return (
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
        />
    );
};
