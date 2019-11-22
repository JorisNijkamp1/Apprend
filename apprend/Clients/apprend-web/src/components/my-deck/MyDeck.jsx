import React, {useEffect} from "react";
import * as ReactRedux from "react-redux"
import {NavigatieBar} from "../shared/navbar/NavigatieBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useParams} from "react-router-dom";
import {Footer} from "../shared/footer/Footer"
import {getUserDecksAction} from "../../redux-store/actions/decks/async-actions";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import Loader from 'react-loaders'
import 'loaders.css/src/animations/square-spin.scss'

const MyDeck = (props) => {
    let {username} = useParams();

    useEffect(() => {
        props.getUserDecks(username)
    }, []);

    let loader, userDecks;
    if (props.userDecksIsLoading) {
        loader = (
            <Row className="mx-auto align-items-center flex-column py-5">
                <Loader type="square-spin" active={true} color={'#758BFE'}/>
                <h2>Loading decks...</h2>
            </Row>
        )
    } else {
        userDecks = props.userDecks.decks.map((deck) =>
            <Card>
                <Card.Body>
                    <Card.Title>{deck.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">With X flashcards</Card.Subtitle>
                    <Card.Text>
                        {deck.description}
                    </Card.Text>
                    {/*<Card.Link href="#" className={'text-danger'}>Delete deck</Card.Link>*/}
                    {/*<Card.Link href="#">Edit deck</Card.Link>*/}
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
        userDecksIsLoading: state.decks.userDecksIsLoading,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserDecks: (username) => dispatch(getUserDecksAction(username)),
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(MyDeck);
