import React, {useEffect} from "react";
import * as ReactRedux from "react-redux"
import {NavigatieBar} from "../shared/navbar/NavigatieBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link, useParams} from "react-router-dom";
import {Footer} from "../shared/footer/Footer"
import {getUserDecksAction} from "../../redux-store/actions/decks/async-actions";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import Loader from 'react-loaders'
import 'loaders.css/src/animations/square-spin.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

const Deck = (props) => {
    let {username} = useParams();

    useEffect(() => {
        props.getUserDecks(username)
    }, []);

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
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserDecks: (username) => dispatch(getUserDecksAction(username)),
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Deck);
