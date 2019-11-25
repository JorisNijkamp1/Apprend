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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

const UserDecks = (props) => {
    let {deckId} = useParams();

    useEffect(() => {
        console.log(deckId)
    }, []);

    let userDecks;
    if (props.deck) {
        userDecks = props.deck.map((deck, key) =>
            <Card key={deck.name + key}>
                <Card.Body>
                    <Card.Title>
                        <Row>
                            <Col xs={10}>
                                {deck.name}
                            </Col>
                            <Col xs={2}>
                                <span className={"float-right"}>
                                    <FontAwesomeIcon icon={faTrash}
                                                     className={'trash-icon'}
                                                     size={'1x'}
                                    />
                                </span>
                            </Col>
                        </Row>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">With X flashcards</Card.Subtitle>
                    <Card.Text>
                        {deck.description}
                    </Card.Text>
                    <Row>
                        <Col xs={{span: 6, offset: 3}}>
                            <Link to={`/decks/${deck._id}`}>
                                <Button variant="outline-primary" className={'w-100'}>View deck</Button>
                            </Link>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    }

    return (
        <>
            <NavigatieBar/>
            <Container>
                <Row>
                    <Col lg={{span: 8, offset: 2}}>
                        <div className="mx-auto text-green pt-5">
                            <h1 className="display-5 text-center">
                                Deck ...
                            </h1>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {userDecks}
                </Row>
            </Container>
            <Footer/>
        </>
    )
};

function mapStateToProps(state) {
    return {
        deck: state.decks.deck,
        setIsLoading: state.decks.setIsLoading,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDeck: (deckId) => dispatch(getDeckAction(deckId)),
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(UserDecks);
