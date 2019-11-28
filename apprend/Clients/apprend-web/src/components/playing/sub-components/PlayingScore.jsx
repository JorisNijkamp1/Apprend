import React from "react";
import * as ReactRedux from "react-redux";
import {NavLink} from "react-router-dom";
import {NavigatieBar} from "../../shared/navbar/NavigatieBar";
import {Footer} from "../../shared/footer/Footer";
import {PageTitle} from "../../shared/PageTitle";
import {Container, Row, Card} from "react-bootstrap";

const ScoreComponent = (props) => {
    return (
    <>
    <NavigatieBar/>
    <Container>
        <PageTitle title="Your score"/>
        <Row className={"justify-content-between"}>
            <Card className={"flipCard"}>
                <Card.Header className={"bg-blue text-white text-center"}>
                    Cards answered:
                </Card.Header>
                <div className="card">
                    <Card.Body className={"side text-center"}>
                        {props.correctCards.length + props.wrongCards.length}
                    </Card.Body>
                </div>
            </Card>
            <Card className={"flipCard"}>
                <Card.Header className={"bg-blue text-white text-center"}>
                    Cards answered correct:
                </Card.Header>
                <div className="card">
                    <Card.Body className={"side text-center"}>
                        {props.correctCards.length}
                    </Card.Body>
                </div>
            </Card>
            <Card className={"flipCard"}>
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
            <NavLink to="/" id="back" className="btn btn-blue">
                Go to the homepage
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