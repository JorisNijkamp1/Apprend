import React from "react";
import * as ReactRedux from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import {NavBar} from "../../shared/components/NavBar";
import {Footer} from "../../shared/components/Footer";
import {PageTitle} from "../../shared/components/PageTitle";
import {Container, Row, Card} from "react-bootstrap";

const ScoreComponent = (props) => {
    const {deckId} = useParams();
    return (
    <>
    <NavBar/>
    <Container>
        <PageTitle title="Your score"/>
        <Row className={"justify-content-between"}>
            <Card className={"flipCard scoreCard"}>
                <Card.Header className={"bg-blue text-white text-center"}>
                    Cards answered:
                </Card.Header>
                <div className="card">
                    <Card.Body className={"side text-center"}>
                        {props.correctCards.length + props.wrongCards.length}
                    </Card.Body>
                </div>
            </Card>
            <Card className={"flipCard scoreCard"}>
                <Card.Header className={"bg-blue text-white text-center"}>
                    Cards answered correct:
                </Card.Header>
                <div className="card">
                    <Card.Body className={"side text-center"}>
                        {props.correctCards.length}
                    </Card.Body>
                </div>
            </Card>
            <Card className={"flipCard scoreCard"}>
                <Card.Header className={"bg-blue text-white text-center"}>
                    Cards answered wrong:
                </Card.Header>
                <div className="card">
                    <Card.Body className={"side text-center"}>
                        {props.wrongCards.length}
                    </Card.Body>
                </div>
            </Card>
        </Row>
        <Row className={"justify-content-center"}>
            <NavLink to={`/decks/${deckId}`} id="back" className="btn btn-blue">
                Go back to the deck
            </NavLink>
        </Row>
    </Container>
    <Footer/>
    </>
    )
}

const mapStateToProps = state => {
    return {
        correctCards: state.playing.correctCards,
        wrongCards: state.playing.wrongCards
    }
}

export const PlayingScore = ReactRedux.connect(mapStateToProps)(ScoreComponent);
