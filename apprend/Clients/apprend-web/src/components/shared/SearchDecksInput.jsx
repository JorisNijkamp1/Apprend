import React, {useState} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import {API_URL} from "../../../src_old/redux-store/urls";
import {Link} from "react-router-dom";
import {setSearchValue} from "../../../src_old/redux-store/actions/search/actions";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import {useHistory} from "react-router-dom";

const getMatchingLanguages = (value, decks) => {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');
    decks = decks.filter(deck => regex.test(deck.name));
    return (decks.length > 4) ? decks.slice(0, 4) : decks;
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
    return suggestion.name;
};

function renderSuggestion(suggestion) {
    return (
        <Link to={`/decks/${suggestion.deckId}`} className={'search-deck-suggestions-link'}>
            <span style={{fontWeight: 600}}>{suggestion.name}</span>
            <br/>
            <i>{suggestion.totalFlashcards} flashcards</i>
        </Link>
    );
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

            const url = `${API_URL}/decks?deck=${value}`;
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

    let history = useHistory()
    const onSubmit = (e) => {
        e.preventDefault();
        history.push(props.linkTo)
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
            <Form onSubmit={(e) => onSubmit(e)} id={'auto-suggest-search-deck'}>
                <Row>
                    <Col md={{span: 10, offset: 1}}>
                        <Row>
                            <Col xs={{span: 8}} md={{span: 8, offset: 1}} lg={{span: 6, offset: 2}}>
                                <InputGroup className="mb-3">
                                    <Autosuggest
                                        suggestions={suggestions}
                                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                                        getSuggestionValue={getSuggestionValue}
                                        renderSuggestion={renderSuggestion}
                                        inputProps={inputProps}
                                        highlightFirstSuggestion={false}
                                    />
                                </InputGroup>
                            </Col>
                            <Col xs={{span: 2}} md={{span: 2}} lg={{span: 2}}>
                                <InputGroup.Append>
                                    <Link to={props.linkTo}>
                                        <Button className={'bg-blue text-white hover-shadow'}>
                                            <FontAwesomeIcon icon={faSearch}
                                                             className={'trash-icon'}
                                                             size={'1x'}
                                                             title={`Search`}
                                            />
                                            <span className={'ml-1'}>Search</span>
                                        </Button>
                                    </Link>
                                </InputGroup.Append>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
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
