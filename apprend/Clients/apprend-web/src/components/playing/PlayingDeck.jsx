import React, {useEffect, useState} from 'react';
import * as ReactRedux from 'react-redux';
import {useHistory} from 'react-router';
import {NavLink, useParams} from 'react-router-dom';
import {NavigatieBar} from '../shared/components/NavigatieBar';
import {Footer} from '../shared/components/Footer';
import {Container, Row, Col, Button} from 'react-bootstrap';
import PlayingCard from './subcomponents/PlayingCard';
import {
    getDeck,
    setGame,
    updateGame,
    getGameData,
    updateDeckSession, moveFlashcardToBox
} from '../../../src_old/redux-store/actions/playing/async-actions';
import {
    setCorrectCardsAction,
    setWrongCardsAction,
    setActiveCardAction,
    resetStateAction, setCardsAction
} from '../../../src_old/redux-store/actions/playing/actions';
import Loader from 'react-loaders';
import 'loaders.css/src/animations/square-spin.scss';
import leitner from '../../util/leitner-system/leitnerSystem';

const ginoTestFunc = (user, deck, card, body) => {
        return async dispatch => {
            console.log('IK BEN GINO AAN HET TESTEN')
            const response = await fetch(`http://localhost:3001/api/v1/users/${user}/decks/${deck}/flashcards/${card}`, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })

            if (response) {

            }
        }
}

const PlayingComponent = (props) => {
    const history = useHistory();
    const {deckId} = useParams();
    let loader;

    useEffect(() => {
        props.doResetStateAction();
        props.doGetDeck(deckId).then(response => {
            let currentSession = response.session + 1;
            let allCards = leitner(response.flashcards, currentSession);
            let counter = 0;

            while (allCards.length === 0) {
                counter++;

                currentSession++;
                allCards = leitner(response.flashcards, currentSession);

                if (counter > 500) break;
            }

            props.doSetGame(deckId, allCards);
            props.doSetActiveCardAction(allCards[0]);
            props.doUpdateDeckSession(deckId, currentSession);
            props.doSetCards(allCards);
        });
    }, []);

    const changeScore = (id, status) => {
        const STATUS_CORRECT = 'correct';
        const STATUS_WRONG = 'wrong';

        const currentCard = props.activeCard;
        const cardAlreadyAnsweredWrong = props.wrongCards.includes(currentCard._id);
        let nCardsInDeck = props.cards.length;
        let nCardsAnswered = props.correctCards.length + props.wrongCards.length;

        if (status === STATUS_CORRECT) {
            props.doSetCorrectCardsAction(id);

            if (!cardAlreadyAnsweredWrong) {
                props.doMoveFlashcardToBox(deckId, id, true);
            }

            nCardsAnswered++;

        } else if (status === STATUS_WRONG) {
            props.doSetWrongCardsAction(id);

            if (!cardAlreadyAnsweredWrong) {
                props.doMoveFlashcardToBox(deckId, id, false);

                const newCards = [...props.cards];
                newCards.push(currentCard);
                props.doSetCards(newCards);
                nCardsInDeck++;
            }

            nCardsAnswered++;
        }

        if (nCardsAnswered === nCardsInDeck) {
            props.doUpdateGame(deckId, props.gameId, currentCard, [], status);
            props.doSetActiveCardAction('');
            history.push(`/decks/${deckId}/score`);
            return;
        }

        let nextCard = props.cards[nCardsAnswered];

        console.log('nCardsAnswered: ', nCardsAnswered);
        console.log('nCardsInDeck: ', nCardsInDeck);

        // Only activated when the last card is wrong for the first time.
        // Needed because pushing a new card into the deck is async.
        if (nextCard === undefined &&
            nCardsAnswered === (nCardsInDeck - 1) &&
            status === STATUS_WRONG) {
            nextCard = currentCard;
        }

        props.doSetActiveCardAction(nextCard);
        props.doUpdateGame(deckId, props.gameId, currentCard, nextCard, status);
    };

    if (props.isLoading) {
        loader = (
            <Container>
                <Row className="mx-auto align-items-center flex-column py-5">
                    <Loader type="square-spin" active={true} color={'#758BFE'}/>
                    <h2>Loading cards...</h2>
                </Row>
            </Container>
        )
    } else {
        loader = (
            <Container>
                <NavLink to={`/decks/${deckId}`} className="btn btn-blue">
                    Back
                </NavLink>
                <Button onClick={() =>             props.ginoTest(props.username, deckId, props.activeCard._id, {data: 'hallo'})
}>
                    KLIK MIJ
                </Button>
                <Col className={'text-center'}>
                    <progress value={props.correctCards.length + props.wrongCards.length + 1} max={props.cards.length}/>
                </Col>
                <Col className={'text-center'}>
                    <b>Card {props.correctCards.length + props.wrongCards.length + 1} out of {props.cards.length}</b>
                </Col>
                <PlayingCard changeScore={changeScore} id={props.activeCard._id} front={props.activeCard.question}
                             back={props.activeCard.answer}/>
                <Row className={'justify-content-between'}>
                    <Col lg={{span: 4}} className={'text-center'}>
                        Correct cards: {props.correctCards.length}
                    </Col>
                    <Col lg={{span: 4}} className={'text-center'}>
                        Wrong cards: {props.wrongCards.length}
                    </Col>
                </Row>
                <Row className={'justify-content-center'}>
                    <NavLink to="/score" id="stop" className="btn btn-blue">
                        Stop learning
                    </NavLink>
                </Row>
            </Container>
        )
    }

    return (
        <>
            <NavigatieBar/>
            {loader}
            <Footer/>
        </>
    )
};

const mapStateToProps = state => {
    return {
        cards: state.playing.cards,
        correctCards: state.playing.correctCards,
        wrongCards: state.playing.wrongCards,
        activeCard: state.playing.activeCard,
        isLoading: state.playing.isLoading,
        gameId: state.playing.gameId,
        username: state.login.username,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        doSetCorrectCardsAction: (cards) => dispatch(setCorrectCardsAction(cards)),
        doSetWrongCardsAction: (cards) => dispatch(setWrongCardsAction(cards)),
        doSetActiveCardAction: (card) => dispatch(setActiveCardAction(card)),
        doGetDeck: (deckId) => dispatch(getDeck(deckId)),
        doSetGame: (deckId, flashcards) => dispatch(setGame(deckId, flashcards)),
        doUpdateGame: (deckId, gameId, oldCard, newCard, status) => dispatch(updateGame(deckId, gameId, oldCard, newCard, status)),
        doGetGameData: (deckId, gameId) => dispatch(getGameData(deckId, gameId)),
        doResetStateAction: () => dispatch(resetStateAction()),
        doMoveFlashcardToBox: (deckId, flashcardId, answeredCorrect) => dispatch(moveFlashcardToBox(deckId, flashcardId, answeredCorrect)),
        doUpdateDeckSession: (deckId, currentSession) => dispatch(updateDeckSession(deckId, currentSession)),
        doSetCards: (cards) => dispatch(setCardsAction(cards)),
        ginoTest: (userId, deckId, flashcardId) => dispatch(ginoTestFunc(userId, deckId, flashcardId)),
    }
};

export const PlayingDeck = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PlayingComponent);
