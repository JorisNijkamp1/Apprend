import React, {useEffect} from "react";
import * as ReactRedux from "react-redux"
import {NavigatieBar} from "../shared/navbar/NavigatieBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link, useParams} from "react-router-dom";
import {Footer} from "../shared/footer/Footer"
import {getDeckAction} from "../../redux-store/actions/decks/async-actions";
import Card from "react-bootstrap/Card";
import 'loaders.css/src/animations/square-spin.scss'
import Button from "react-bootstrap/Button";
import Loader from "react-loaders";
import {isLoggedIn} from "../../redux-store/actions/login/async-actions";

const UserDecks = (props) => {
    const {deckId} = useParams();
    const isCreator = (props.username === props.deck.creatorId);

    //Check if user is logged in
    useEffect(() => {
        props.isLoggedIn()
    }, []);

    useEffect(() => {
        props.getDeck(deckId)
    }, []);

    const editFlashcardsButton = () => {
        if (isCreator) {
            return (
                <>
                    <Link to={`/decks/${props.deck._id}/flashcards`}>
                        <Button variant="warning" id={'edit-flashcard-button'}>Edit flashcards</Button>
                    </Link>
                    <Link to={`/decks/${props.deck._id}/edit`}>
                        <Button id={"edit-deck"} className={"ml-4"} variant={"info"}>Edit deck</Button>
                    </Link>
                </>
            )
        }
    };

    let loader, deck, error;
    if (props.isLoading) {
        loader = (
            <Row className="mx-auto align-items-center flex-column py-5">
                <Loader type="square-spin" active={true} color={'#758BFE'}/>
                <h2>Loading decks...</h2>
            </Row>
        )
    } else {
        if (props.deck.toString() === 'deck-not-found') {
            error = (
                <Row className="mx-auto align-items-center flex-column py-5">
                    <h2>Deck not found... ☹️</h2>
                </Row>
            )
        }

        let totalFlashcards = 0;
        if (props.deck.flashcards) {
            totalFlashcards = props.deck.flashcards.length
        }
        if (props.deck.toString() !== 'deck-not-found'){
            deck = (
                <Card style={{width: '100%'}} bg={'light'} className={'my-5'}>
                    <Card.Body>
                        <Card.Title>{props.deck.name}</Card.Title>
                        <Card.Subtitle>
                            <Row>
                                <Col xs={12} md={4}>
                                    <b>Created on: </b>{props.deck.creationDate}
                                </Col>
                                <Col xs={12} md={4}>
                                    <b>Created by: </b>{props.deck.userName}
                                </Col>
                                <Col xs={12} md={4}>
                                    <b>Total flashcards: </b>{totalFlashcards}
                                </Col>
                            </Row>
                        </Card.Subtitle>
                        <Card.Text>
                            {props.deck.description}
                        </Card.Text>
                        {editFlashcardsButton()}
                        {totalFlashcards > 0 ?
                        <Link to={`/decks/${props.deck._id}/play`}>
                            <Button variant="success" id="play" className={'float-right'}>Deck spelen</Button>
                        </Link>
                        :
                        <div>
                            <Link to={`/decks/${props.deck._id}/play`}>
                                <Button variant="success" id="play" disabled className={'float-right'}>Deck spelen</Button>
                            </Link>
                            <small className="col buttonInfo text-muted">
                                A deck has to contain at least 1 flashcard in order to play the deck.
                            </small>
                        </div>
                    }
                    </Card.Body>
                </Card>
            )
        }
    }

    return (
        <>
            <NavigatieBar/>
            <Container>
                <Row>
                    <Col lg={{span: 8, offset: 2}}>
                        <div className="mx-auto text-green pt-5">
                            <h1 className="display-5 text-center">
                                Deck {props.deck.name}
                            </h1>
                        </div>
                    </Col>
                </Row>
                {loader}
                {error}
                <Row>
                    {deck}
                </Row>
            </Container>
            <Footer/>
        </>
    )
};

function mapStateToProps(state) {
    return {
        username: state.login.username,
        deck: state.decks.deck,
        isLoading: state.decks.isLoading,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        isLoggedIn: () => dispatch(isLoggedIn()),
        getDeck: (deckId) => dispatch(getDeckAction(deckId)),
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(UserDecks);
