import React, {useState} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import {Link} from "react-router-dom";
import {getSearchSuggestions, setSearchValue} from "../actions/actions";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import {useHistory} from "react-router-dom";

const SearchDecksInput = (props) => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    let lastRequestId = null;

    const onSuggestionsFetchRequested = ({value}) => {
        // console.log('onSuggestionsFetchRequested');
        loadSuggestions(value);
    };

    const loadSuggestions = (value) => {
        // console.log('loadSuggestions');

        // Cancel the previous request
        if (lastRequestId !== null)
            clearTimeout(lastRequestId);

        props.getSearchSuggestions(value).then((data) => {
            setSuggestions(data)
        });
    };

    const onChange = (event, {newValue}) => {
        props.setSearchValue(newValue);
        setValue(newValue);
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const renderSuggestion = (suggestion) => {
        console.log(suggestion);

        let result;
        if (suggestion.type === "deck") {
            result = (
                <Link to={`/decks/${suggestion.deck._id}`} className={'search-deck-suggestions-link d-i'}>
                    <span>
                        <span style={{fontWeight: 600}}>{suggestion.deck.name}</span>
                        <span className={'float-right'}><i>{suggestion.deck.flashcards} flashcards</i></span>
                    </span>
                </Link>
            )
        }

        if (suggestion.type === "user") {
            result = (
                <Link to={`/${suggestion._id}/decks`} className={'search-deck-suggestions-link d-i'}>
                    <span>
                        <span style={{fontWeight: 600}}>{suggestion._id}</span>
                        <span className={'float-right'}><i>(user)</i></span>
                    </span>
                </Link>
            )
        }

        return result;
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
        searchSuggestions: state.search.searchSuggestions
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setSearchValue: (searchValue) => dispatch(setSearchValue(searchValue)),
        getSearchSuggestions: (searchValue) => dispatch(getSearchSuggestions(searchValue)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchDecksInput);
