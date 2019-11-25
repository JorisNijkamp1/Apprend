import React, {useEffect, useState} from "react";
import * as ReactRedux from "react-redux";
import {useHistory} from "react-router";
import {NavLink} from "react-router-dom";
import {NavigatieBar} from "../shared/navbar/NavigatieBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Footer} from "../shared/footer/Footer";
import PlayingCard from "./sub-components/PlayingCard";
import {API_URL} from "../../redux-store/urls";
import {setCardsAction, setCorrectCardsAction, setWrongCardsAction} from "../../redux-store/actions/playing/actions";

const PlayingComponent = (props) => {
    let history = useHistory();
    const [card, setCard] = useState({_id: 0, term: "...", definition: "..."});
    const [score, setScore] = useState({correct: 0, wrong: 0, i: 1});

    const fetchData = () => {
        fetch(`${API_URL}/decks/Frans woordjes/play`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                props.doSetCardsAction(data.cards);
                let allCards = shuffleCards(data.cards);
                setCard({_id: allCards[0].cardId, term: allCards[0].question, definition: allCards[0].answer});
            }
        }).catch((err => {
            console.log("Er gaat iets fout!");
            console.log(err);
        }))
    }

    useEffect(() => {
        fetchData();
    }, []);

    const shuffleCards = (max) => {
        let rand, temp, i;
        for (i = max.length - 1; i > 0; i -= 1) {
            rand = Math.floor((i + 1) * Math.random());
            temp = max[rand];
            max[rand] = max[i];
            max[i] = temp;
        }
        return max;
    }

    const changeScore = (id, status) => {
        if (status === "correct") {
            props.doSetCorrectCardsAction(id);
            if (score.i < props.cards.length) {
                setCard({_id: props.cards[score.i].cardId, term: props.cards[score.i].question, definition: props.cards[score.i].answer});
                setScore({correct: score.correct += 1, wrong: score.wrong, i: score.i += 1});
            } else {
                history.push("/");
            }
        } else if (status === "wrong") {
            props.doSetWrongCardsAction(id);
            if (score.i < props.cards.length) {
                setCard({_id: props.cards[score.i].cardId, term: props.cards[score.i].question, definition: props.cards[score.i].answer});
                setScore({wrong: score.wrong += 1, correct: score.correct, i: score.i += 1});
            } else {
                history.push("/");
            }
        }
    }

    return (
    <>
    <NavigatieBar/>
    <Container>
        <NavLink to="/" className="btn btn-blue">
            Back
        </NavLink>
        <PlayingCard changeScore={changeScore} id={card._id} front={card.term} back={card.definition}/>
        <Row className={"justify-content-between"}>
            <Col lg={{span: 4}} className={"text-center"}>
                Correct cards: {score.correct}
            </Col>
            <Col lg={{span: 4}} className={"text-center"}>
                Wrong cards: {score.wrong}
            </Col>
        </Row>
    </Container>
    <Footer/>
    </>
    )
}

const mapStateToProps = state => {
    return {
        cards: state.playing.cards
    }
}

const mapDispatchToProps = dispatch => {
    return {
        doSetCardsAction: (cards) => dispatch(setCardsAction(cards)),
        doSetCorrectCardsAction: (cards) => dispatch(setCorrectCardsAction(cards)),
        doSetWrongCardsAction: (cards) => dispatch(setWrongCardsAction(cards))
    }
}

export const PlayingDeck = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PlayingComponent);