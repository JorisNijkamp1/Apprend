import React, {useEffect, useState} from "react";
import * as ReactRedux from 'react-redux'
import {Link, useParams} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {Col, Card, Row, Container} from "react-bootstrap";
import {setSearchIsLoading, getAllDecks} from "../shared/actions/actions";
import Loader from "react-loaders";
import {NavigatieBar} from '../shared/components/NavigatieBar';

const TagOverview = (props) => {
    const [decks, setDecks] = useState([]);
    const {tag} = useParams();

    useEffect(() => {
        props.setIsLoading(true);
        fetchDecks()
            .then(result => {
                setDecks(result);
                return setTimeout(() => {
                    props.setIsLoading(false);
                }, 1000)
            })
    }, []);

    const getMatchingLanguages = decks => {
        const match = [];

        for (let i = 0; i < decks.length; i++) {
            for (let j = 0; j < decks[i].tags.length; j++) {
                if (decks[i].tags[j] === tag.trim().toLowerCase()) {
                    match.push(decks[i])
                }
            }
        }

        const filteredMatch = match.filter((deck, index) => {
            return index === match.findIndex(filter => {
                return filter === deck;
            });
        });
        return filteredMatch;
    };

    const fetchDecks = async () => {
        let response = await props.getAllDecks();
        return getMatchingLanguages(response);
    }

    const isLoading = () => {
        if (props.isLoading) return (
            <Row className="mx-auto align-items-center flex-column py-5">
                <Loader type="square-spin" active={true} color={'#758BFE'}/>
                <h2>Loading decks...</h2>
            </Row>
        )
    };

    const searchTitle = () => {
        return (
            <h1 className={'text-center w-100'}>Results for the tag <b><i>{tag}</i></b></h1>
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
        console.log(decks)
        if (!props.isLoading) return decks.map((deck, index) => {
            return (
                <Col lg={{span: 6}} md={{span: 6}} key={deck.deckId + '-' + index}>
                    <Link to={`/decks/${deck._id}`} className={'deck-card-link'}>
                        <Card className={'hover-shadow mb-4'}>
                            <Card.Header className={'bg-blue text-white text-center'}><h2>{deck.name}</h2>
                            </Card.Header>
                            <Card.Body>
                                <p className={'text-center'} style={{color: '#000'}}>
                                    {deck.description}
                                </p>
                                <strong>
                                    <Link id="creator" to={`/${deck.creatorId}/decks`}>
                                        <FontAwesomeIcon icon={faUser}
                                                         size={'1x'}
                                                         title={`Search`}
                                                         color={'#000'}
                                        />
                                        <span style={{marginLeft: 5, color: '#000'}}>
                                            {(deck.creatorId.length === 32) ? 'Guest' : deck.creatorId}
                                        </span>
                                    </Link>
                                    <span className={'float-right'} style={{color: '#000'}}>
                                        <span className={'font-weight-bold'}>Flashcards: {deck.flashcards.length}</span>
                                    </span>
                                </strong>
                                <ul id="tagList">
                                    <span style={{marginRight: 5, color: '#000'}}>
                                        <b>Tags:</b>
                                    </span>
                                    {deck.tags.map((tag) => <li key={tag} className="listItem" style={{color: '#000'}}>
                                        {tag}
                                    </li>)}
                                </ul>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            )
        })
    };

    return (
        <>
            <NavigatieBar/>
            <Container>
                <Row className={'mt-5'}>
                    {searchTitle()}
                </Row>
                <Row className={'mt-5'}>
                    {isLoading()}
                    {noResultsFound()}
                    {searchResults()}
                </Row>
            </Container>
        </>
    );
};

const mapStateToProps = state => {
    return {
        isLoading: state.search.isLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setIsLoading: (bool) => dispatch(setSearchIsLoading(bool)),
        getAllDecks: () => dispatch(getAllDecks())
    }
};

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TagOverview);