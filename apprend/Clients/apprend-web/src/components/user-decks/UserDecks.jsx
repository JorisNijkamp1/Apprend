import React, {useEffect} from "react";
import * as ReactRedux from "react-redux"
import {NavigatieBar} from "../shared/navbar/NavigatieBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link, useParams} from "react-router-dom";
import {Footer} from "../shared/footer/Footer"
import {getDeckAction, getUserDecksAction} from "../../redux-store/actions/decks/async-actions";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import Loader from 'react-loaders'
import 'loaders.css/src/animations/square-spin.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import {isLoggedIn} from "../../redux-store/actions/login/async-actions";

const Deck = (props) => {
    const {username} = useParams();
    const isCreator = (props.username === props.userDecks.userId);

    useEffect(() => {
        props.getUserDecks(username)
    }, []);

    console.log(isCreator);
    console.log(props.username)
    console.log(props.userDecks.user)

    const deleteDeckIcon = () => {
        if (isCreator) {
            return (
                <Col xs={2}>
                    <span className={"float-right"}>
                        <FontAwesomeIcon icon={faTrash}
                                         className={'trash-icon'}
                                         size={'1x'}
                        />
                    </span>
                </Col>
            )
        }
    };

    let loader, userDecks;
    if (props.isLoading) {
        loader = (
            <Row className="mx-auto align-items-center flex-column py-5">
                <Loader type="square-spin" active={true} color={'#758BFE'}/>
                <h2>Loading decks...</h2>
            </Row>
        )
    } else {
        userDecks = props.userDecks.decks.map((deck, key) =>
            <Card key={deck.name + key} style={{minWidth: '300px'}} id={'card-' + key}>
                <Card.Body>
                    <Card.Title>
                        <Row>
                            <Col xs={isCreator ? 10 : 12}>
                                {deck.name}
                            </Col>
                            {deleteDeckIcon()}
                        </Row>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        With {deck.flashcards.length} {(deck.flashcards.length > 1) ? 'flashcards' : 'flashcard'}
                    </Card.Subtitle>
                    <Card.Text>
                        {deck.description}
                    </Card.Text>
                    <Row>
                        <Col xs={{span: 6, offset: 3}}>
                            <Link to={`/decks/${deck._id}`}>
                                <Button variant="outline-primary" className={'w-100'} id={'card-' + key + '-link'}>View deck</Button>
                            </Link>
                        </Col>
                    </Row>
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
                                Decks of {props.userDecks.user}
                            </h1>
                        </div>
                    </Col>
                </Row>
                {loader}
                <Row>
                    <CardColumns>
                        {userDecks}
                    </CardColumns>
                </Row>
            </Container>
            <Footer/>
        </>
    )
};

function mapStateToProps(state) {
    return {
        userDecks: state.decks.userDecks,
        isLoading: state.decks.isLoading,
        username: state.login.username,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        isLoggedIn: (username) => dispatch(isLoggedIn(username)),
        getUserDecks: (username) => dispatch(getUserDecksAction(username)),
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Deck);
