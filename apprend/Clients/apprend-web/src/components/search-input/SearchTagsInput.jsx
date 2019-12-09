import React, {useState} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import {API_URL} from "../../redux-store/urls";
import {Link} from "react-router-dom";
import {setSearchValue} from "../../redux-store/actions/search/actions";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

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
    return (match.length > 4) ? match.slice(0, 4) : match;
};

/* ----------- */
/*    Utils    */
/* ----------- */

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
const escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/* --------------- */
/*    Component    */
/* --------------- */
const getSuggestionValue = (suggestion) => {
    console.log('jo')
    return suggestion.name;
};

function renderSuggestion(suggestion) {
    console.log('hoi')
    console.log(suggestion)
    console.log(suggestion.deckId !== undefined)
    if (suggestion.deckId) {
        return (
            <Link to={`/decks/${suggestion.deckId}`} className={'search-suggestions-link'}>
                <span style={{fontWeight: 600}}>{suggestion.name}</span>
            </Link>
        );
    } else {
        console.log('hoi')
        return "There are no decks with this tag!"
    }
}

const SearchDecksInput = (props) => {
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
            const url = `${API_URL}/decks/tags?tag=${value}`;
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
        props.setSearchValue(newValue);
        setValue(newValue);
    };

    const onSuggestionsFetchRequested = ({value}) => {
        loadSuggestions(value);
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const inputProps = {
        placeholder: "Filter on tags",
        value,
        onChange: onChange,
        className: 'form-control',
        style: {width: '100%'}
    };

    return (
        <>
            <Row>
                <Col md={{span: 10, offset: 1}}>
                    <Row>
                        <Col xs={{span: 8}} md={{span: 8, offset: 1}} lg={{span: 6, offset: 3}}>
                            <InputGroup className="mb-3">
                                <Autosuggest
                                    suggestions={suggestions}
                                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                                    getSuggestionValue={getSuggestionValue}
                                    renderSuggestion={renderSuggestion}
                                    inputProps={inputProps}
                                    highlightFirstSuggestion={true}
                                />
                            </InputGroup>
                        </Col>

                    </Row>
                </Col>
            </Row>
        </>
    );
};

SearchDecksInput.propTypes = {
    linkTo: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
    return {
        searchValue: state.search.searchValue,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setSearchValue: (searchValue) => dispatch(setSearchValue(searchValue)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchDecksInput);
