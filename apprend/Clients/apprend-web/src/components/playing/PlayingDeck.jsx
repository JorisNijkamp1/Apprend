import React, {useEffect, useState} from 'react';
import * as ReactRedux from 'react-redux';
import {useHistory} from 'react-router';
import {NavLink, useParams} from 'react-router-dom';
import {NavigatieBar} from '../shared/navbar/NavigatieBar';
import {Footer} from '../shared/footer/Footer';
import {Container, Row, Col} from 'react-bootstrap';
import PlayingCard from './sub-components/PlayingCard';
import {
    getDeck,
    setGame,
    updateGame,
    getGameData,
    updateDeckSession, moveFlashcardToBox
} from '../../redux-store/actions/playing/async-actions';
import {
    setCorrectCardsAction,
    setWrongCardsAction,
    setActiveCardAction,
    resetStateAction, setCardsAction
} from '../../redux-store/actions/playing/actions';
import Loader from 'react-loaders';
import 'loaders.css/src/animations/square-spin.scss';
import leitner from '../../util/leitner-system/leitnerSystem';

const PlayingComponent = (props) => {
    const history = useHistory();
    const {deckId} = useParams();
    let loader;

    useEffect(() => {
        props.doResetStateAction();
        props.doGetDeck(deckId).then(response => {
            let currentSession = response.session + 1;
            let allCards = leitner(response.flashcards, currentSession);

            while (allCards.length === 0) {
                currentSession++;
                allCards = leitner(response.flashcards, currentSession);
            }

            props.doSetGame(deckId, allCards);
            props.doSetActiveCardAction(allCards[0]);
            props.doUpdateDeckSession(deckId, currentSession);
            props.doSetCards(allCards);
        });
    }, []);

    const changeScore = (id, status) => {
        // props.doGetGameData(deckId, props.gameId).then(response => {
            // const currentCard = props.activeCard;
            //
            // if (status === 'correct' && !cardWasAlreadyAnsweredWrong(id)) {
            //     props.doSetCorrectCardsAction(id);
            //     props.doMoveFlashcardToBox(deckId, id, true);
            // } else if (status === 'wrong' && !cardWasAlreadyAnsweredWrong(id)) {
            //     props.doSetWrongCardsAction(id);
            //     props.doMoveFlashcardToBox(deckId, id, false);
            //
            //     const newCards = [...props.cards];
            //     newCards.push(currentCard);
            //     props.doSetCards(newCards);
            // }
            //
            // const nPlayedCards = props.correctCards.length + props.wrongCards.length;
            //
            // if ((props.correctCards.length + props.wrongCards.length) === props.cards.length) {
            //     props.doUpdateGame(deckId, response._id, currentCard, [], status);
            //     props.doSetActiveCardAction('');
            //     history.push('/score');
            //     return;
            // }
            //
            // const nextCard = props.cards[nPlayedCards];
            // props.doSetActiveCardAction(nextCard);
            // props.doUpdateGame(deckId, response._id, currentCard, nextCard, status);
        // });

        const currentCard = props.activeCard;
        const cardAlreadyAnsweredWrong = props.wrongCards.find(id => id === currentCard._id);
        let nCardsInDeck = props.cards.length;
        let nCardsAnswered = props.correctCards.length + props.wrongCards.length;

        if (status === 'correct') {
            props.doSetCorrectCardsAction(id);

            if (!cardAlreadyAnsweredWrong) {
                props.doMoveFlashcardToBox(deckId, id, true);
            }

            nCardsAnswered++;

        } else if (status === 'wrong') {
            if (!cardAlreadyAnsweredWrong) {
                props.doSetWrongCardsAction(id);
                props.doMoveFlashcardToBox(deckId, id, false);

                const newCards = [...props.cards];
                newCards.push(currentCard);
                props.doSetCards(newCards);
                nCardsInDeck++;
            }

            nCardsAnswered++;
        }

        console.log(`nCardsInDeck: ${nCardsInDeck}`);
        console.log(`nCardsAnswered: ${nCardsAnswered}`);

        if (nCardsAnswered === nCardsInDeck) {
            props.doUpdateGame(deckId, props.gameId, currentCard, [], status);
            props.doSetActiveCardAction('');
            history.push('/score');
            return;
        }

        const nextCard = props.cards[nCardsAnswered];
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
                <Col className={'text-center'}>
                    <progress value={props.correctCards.length + props.wrongCards.length + 1} max={props.cards.length}
                              className="bar"/>
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
        gameId: state.playing.gameId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        doSetCorrectCardsAction: (cards) => dispatch(setCorrectCardsAction(cards)),
        doSetWrongCardsAction: (cards) => dispatch(setWrongCardsAction(cards)),
        doSetActiveCardAction: (card) => {
            console.log(card.question)
            dispatch(setActiveCardAction(card))
        },
        doGetDeck: (deckId) => dispatch(getDeck(deckId)),
        doSetGame: (deckId, flashcards) => dispatch(setGame(deckId, flashcards)),
        doUpdateGame: (deckId, gameId, oldCard, newCard, status) => dispatch(updateGame(deckId, gameId, oldCard, newCard, status)),
        doGetGameData: (deckId, gameId) => dispatch(getGameData(deckId, gameId)),
        doResetStateAction: () => dispatch(resetStateAction()),
        doMoveFlashcardToBox: (deckId, flashcardId, answeredCorrect) => dispatch(moveFlashcardToBox(deckId, flashcardId, answeredCorrect)),
        doUpdateDeckSession: (deckId, currentSession) => dispatch(updateDeckSession(deckId, currentSession)),
        doSetCards: (cards) => dispatch(setCardsAction(cards))
    }
};

export const PlayingDeck = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PlayingComponent);
