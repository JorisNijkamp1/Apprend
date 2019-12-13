import React, {useEffect, useState} from "react";
import * as ReactRedux from 'react-redux'
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import {API_URL} from "../../redux-store/urls";
import {setIsLoading, setSearchValue} from "../../redux-store/actions/search/actions";
import Loader from "react-loaders";

const SearchResults = (props) => {
    const [decks, setDecks] = useState([]);
    const urlParams = new URLSearchParams(window.location.search);
    let searchValue = (urlParams.get('q') === 'null') ? '' : urlParams.get('q');

    useEffect(() => {
        props.setIsLoading(true);
        fetchDecks(searchValue)
            .then(result => {
                setDecks(result.decks);
                return setTimeout(() => {
                    props.setIsLoading(false);
                }, 1000)
            })
    }, []);

    async function fetchDecks(value) {
        const url = `${API_URL}/decks?deck=${value}`;

        const response = await fetch(url, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.status === 200) {
            return await response.json()
        } else {
            console.log('Error: ' + response);
            return []
        }
    }

    const isLoading = () => {
        if (props.isLoading) return (
            <Row className="mx-auto align-items-center flex-column py-5">
                <Loader type="square-spin" active={true} color={'#758BFE'}/>
                <h2>Loading decks...</h2>
            </Row>
        )
    };

    const searchTitle = (searchValue) => {
        if (searchValue) return (
            <h1 className={'text-center w-100'}>Results for <b><i>{searchValue}</i></b></h1>
        )
    };

    const noResultsFound = () => {
        if (!props.isLoading && decks.length === 0) return (
            <h3 className={'text-center w-100'}>
                No decks found... 😭
            </h3>
        )
    };

    const searchResults = () => {
        if (!props.isLoading) return decks.map((deck, index) => {
            return (
                <Col lg={{span: 6}} md={{span: 6}} key={deck.deckId + '-' + index}>
                    <Link to={`/decks/${deck.deckId}`} className={'deck-card-link'}>
                        <Card className={'hover-shadow mb-4'}>
                            <Card.Header className={'bg-blue text-white text-center'}><h2>{deck.name}</h2>
                            </Card.Header>
                            <Card.Body>
                                <p className={'text-center'} style={{color: '#000'}}>
                                    {deck.description}
                                </p>
                                <strong>
                                    <Link id="creator" to={`/${deck.deckCreator}/decks`}>
                                        <FontAwesomeIcon icon={faUser}
                                                         size={'1x'}
                                                         title={`Search`}
                                                         color={'#000'}
                                        />
                                        <span style={{marginLeft: 5, color: '#000'}}>
                                            {(deck.deckCreator.length === 32) ? 'Guest' : deck.deckCreator}
                                        </span>
                                    </Link>
                                    <span className={'float-right'} style={{color: '#000'}}>
                                        <span className={'font-weight-bold'}>Flashcards: {deck.totalFlashcards}</span>
                                    </span>
                                </strong>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            )
        })
    };

    return (
        <>
            <Row className={'mt-5'}>
                {searchTitle(searchValue)}
            </Row>
            <Row className={'mt-5'}>
                {isLoading()}
                {noResultsFound()}
                {searchResults()}
            </Row>
        </>
    );
};

const mapStateToProps = state => {
    return {
        isLoading: state.search.isLoading,
        searchValue: state.search.searchValue,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setSearchValue: (searchValue) => dispatch(setSearchValue(searchValue)),
        setIsLoading: (bool) => dispatch(setIsLoading(bool))
    }
};

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SearchResults);
