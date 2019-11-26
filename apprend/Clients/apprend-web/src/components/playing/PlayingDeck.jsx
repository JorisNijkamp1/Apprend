import React, {useEffect} from "react";
import * as ReactRedux from "react-redux";
import {useHistory} from "react-router";
import {NavLink, useParams} from "react-router-dom";
import {NavigatieBar} from "../shared/navbar/NavigatieBar";
import {Footer} from "../shared/footer/Footer";
import {Container, Row, Col} from "react-bootstrap";
import PlayingCard from "./sub-components/PlayingCard";
import {getDeck} from "../../redux-store/actions/playing/async-actions";
import {setCorrectCardsAction, setWrongCardsAction, setActiveCardAction, resetStateAction} from "../../redux-store/actions/playing/actions";

const PlayingComponent = (props) => {
    const history = useHistory();
    const {deckId} = useParams();

    useEffect(() => {
        props.doResetStateAction();
        props.doGetDeck(deckId)
        .then(response => {
            let allCards = shuffleCards(response.flashcards);
            props.doSetActiveCardAction(allCards[0]);
        })
    }, []);

    const shuffleCards = (array) => {
        let random;
        let temp;
        for (let i = array.length - 1; i > 0; i -= 1) {
            random = Math.floor((i + 1) * Math.random());
            temp = array[random];
            array[random] = array[i];
            array[i] = temp;
        }
        return array;
    }

    const changeScore = (id, status) => {
        let i = props.correctCards.length + props.wrongCards.length + 1
        if (status === "correct") {
            props.doSetCorrectCardsAction(id);
            if (i < props.cards.length) {
                props.doSetActiveCardAction(props.cards[i]);
            } else {
                props.doSetActiveCardAction("");
                history.push("/score");
            }
        } else if (status === "wrong") {
            props.doSetWrongCardsAction(id);
            if (i < props.cards.length) {
                props.doSetActiveCardAction(props.cards[i]);
            } else {
                props.doSetActiveCardAction("");
                history.push("/score");
            }
        }
    }

    return (
    <>
    <NavigatieBar/>
    <Container>
        <NavLink to={`/decks/${deckId}`} className="btn btn-blue">
            Back
        </NavLink>
        <Col className={"text-center"}>
            <progress value={props.correctCards.length + props.wrongCards.length + 1} max={props.cards.length}/>
        </Col>
        <Col className={"text-center"}>       
            <b>Card {props.correctCards.length + props.wrongCards.length + 1} out of {props.cards.length}</b>
        </Col>
        <PlayingCard changeScore={changeScore} id={props.activeCard._id} front={props.activeCard.question} back={props.activeCard.answer}/>
        <Row className={"justify-content-between"}>
            <Col lg={{span: 4}} className={"text-center"}>
                Correct cards: {props.correctCards.length}
            </Col>
            <Col lg={{span: 4}} className={"text-center"}>
                Wrong cards: {props.wrongCards.length}
            </Col>
        </Row>
        <Row className={"justify-content-center"}>
            <NavLink to="/score" className="btn btn-blue">
                Stop learning
            </NavLink>
        </Row>
    </Container>
    <Footer/>
    </>
    )
}

const mapStateToProps = state => {
    return {
        cards: state.playing.cards,
        correctCards: state.playing.correctCards,
        wrongCards: state.playing.wrongCards,
        activeCard: state.playing.activeCard
    }
}

const mapDispatchToProps = dispatch => {
    return {
        doSetCorrectCardsAction: (cards) => dispatch(setCorrectCardsAction(cards)),
        doSetWrongCardsAction: (cards) => dispatch(setWrongCardsAction(cards)),
        doSetActiveCardAction: (card) => dispatch(setActiveCardAction(card)),
        doGetDeck: (deckId) => dispatch(getDeck(deckId)),
        doResetStateAction: () => dispatch(resetStateAction())
    }
}

export const PlayingDeck = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PlayingComponent);