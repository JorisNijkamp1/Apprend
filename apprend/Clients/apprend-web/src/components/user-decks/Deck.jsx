import React, {useEffect} from "react";
import * as ReactRedux from "react-redux"
import {NavigatieBar} from "../shared/navbar/NavigatieBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useParams} from "react-router-dom";
import {Footer} from "../shared/footer/Footer"
import {getDeckAction} from "../../redux-store/actions/decks/async-actions";
import Card from "react-bootstrap/Card";
import 'loaders.css/src/animations/square-spin.scss'
import Button from "react-bootstrap/Button";
import Loader from "react-loaders";

const UserDecks = (props) => {
    let {deckId} = useParams();

    useEffect(() => {
        props.getDeck(deckId)
    }, []);

    let loader, deck;
    if (props.isLoading) {
        loader = (
            <Row className="mx-auto align-items-center flex-column py-5">
                <Loader type="square-spin" active={true} color={'#758BFE'}/>
                <h2>Loading decks...</h2>
            </Row>
        )
    } else {
        let totalFlashcards = 0;
        if (props.deck.flashcards) {
            totalFlashcards = props.deck.flashcards.length
        }
        deck = (
            <Card style={{width: '100%'}}>
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
                    <Button variant="warning">Deck bewerken</Button>
                    <Button variant="success" className={'float-right'}>Deck spelen</Button>
                </Card.Body>
            </Card>
        )
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
        deck: state.decks.deck,
        isLoading: state.decks.isLoading,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDeck: (deckId) => dispatch(getDeckAction(deckId)),
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(UserDecks);
