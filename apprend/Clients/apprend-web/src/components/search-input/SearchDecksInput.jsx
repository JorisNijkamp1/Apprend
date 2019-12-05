import React, {useState} from "react";
import Autosuggest from 'react-autosuggest';
import {API_URL} from "../../redux-store/urls";

const getMatchingLanguages = (value, decks) => {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return decks.filter(deck => regex.test(deck.name));
};

/* ----------- */
/*    Utils    */
/* ----------- */

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/* --------------- */
/*    Component    */

/* --------------- */
function getSuggestionValue(suggestion) {
    return suggestion.name;
}

function renderSuggestion(suggestion) {
    console.log(suggestion)
    return (
        <>
            <span style={{fontWeight: 600}}>{suggestion.name}</span>
            <br/>
            <i>{suggestion.totalFlashcards} flashcards</i>
        </>
    );
}

export const SearchDecksInput = () => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    let lastRequestId = null;

    const loadSuggestions = (value) => {
        // Cancel the previous request
        if (lastRequestId !== null) {
            clearTimeout(lastRequestId);
        }

        // Request
        lastRequestId = setTimeout(async () => {

            const url = `${API_URL}/decks`;
            let decks;

            const response = await fetch(url, {
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.status === 200) {
                const data = await response.json();
                decks = data.decks
            } else {
                console.log('Error: ' + response);
                decks = []
            }

            setSuggestions(getMatchingLanguages(value, decks));
        });
    };

    const onChange = (event, {newValue}) => {
        setValue(newValue);
    };

    const onSuggestionsFetchRequested = ({value}) => {
        loadSuggestions(value);
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const inputProps = {
        placeholder: "Search a deck",
        value,
        onChange: onChange,
        className: 'form-control',
        style: {width: '100%'}
    };

    return (
        <>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
        </>
    );
};
