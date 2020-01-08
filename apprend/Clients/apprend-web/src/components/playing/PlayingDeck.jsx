import React, {useEffect, useState} from 'react';
import * as ReactRedux from 'react-redux';
import {Redirect, useHistory} from 'react-router';
import {Notification} from '../shared/components/Notification';
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
    updateDeckSession,
    moveFlashcardToBox, errorOccurred
} from './actions';
import {
    setCorrectCardsAction,
    setWrongCardsAction,
    setActiveCardAction,
    resetStateAction, setCardsAction
} from './actions';
import Loader from 'react-loaders';
import 'loaders.css/src/animations/square-spin.scss';
import {leitnerSelectCards} from '../../util/leitner-system/leitnerSystem';
import {isLoggedIn} from '../shared/actions/actions';

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
    const [currentSession, setCurrentSession] = useState();
    let loader;

    useEffect(() => {
        props.doResetStateAction();
        props.isLoggedIn();
    }, []);

    const changeScore = (flashcard, status) => {
        const STATUS_CORRECT = 'correct';
        const STATUS_WRONG = 'wrong';

        const currentCard = props.activeCard;
        const cardAlreadyAnsweredWrong = props.wrongCards.includes(currentCard._id);
        let nCardsInDeck = props.cards.length;
        let nCardsAnswered = props.correctCards.length + props.wrongCards.length;

        if (status === STATUS_CORRECT) {
            props.doSetCorrectCardsAction(flashcard._id);

            if (!cardAlreadyAnsweredWrong) {
                props.doMoveFlashcardToBox(deckId, props.username, flashcard, currentSession, true);
            }

            nCardsAnswered++;

        } else if (status === STATUS_WRONG) {
            props.doSetWrongCardsAction(flashcard._id);

            if (!cardAlreadyAnsweredWrong) {
                props.doMoveFlashcardToBox(deckId, props.username, flashcard, currentSession, false);

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

    const setupGame = () => {
        props.doGetDeck(props.username, deckId).then(response => {
            if (response.status === 404) {
                throw new Error('This deck does not exist.');
            } else if (response.status !== 200) {
                throw new Error('Something went wrong, please try again later!');
            } else {
                return response.json();
            }
        }).then(results => {
            if (results.data.flashcards.length < 1) {
                props.doErrorOccurred('A deck needs to contain at least 1 card to play!');
                return;
            }

            let session = results.session + 1;
            let allCards = leitnerSelectCards(results.flashcards, session);
            let counter = 0;

            while (allCards.length === 0) {
                counter++;
                session++;
                allCards = leitnerSelectCards(results.flashcards, session);

                if (counter > 500) break;
            }

            props.doSetGame(deckId, allCards);
            props.doSetActiveCardAction(allCards[0]);
            props.doUpdateDeckSession(deckId, session);
            props.doSetCards(allCards);
            setCurrentSession(session);
        }).catch(error => {
            props.doErrorOccurred(error.message);
        });
    };

    if (props.error !== null) {
        Notification(props.error, 'danger');
        return <Redirect to={'/'}/>;
    }

    if (props.username !== null) {
        setupGame();
    }

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
                <Button onClick={() => props.ginoTest(props.username, deckId, props.activeCard._id, {data: 'hallo'})
                }>
                    KLIK MIJ
                </Button>
                <Col className={'text-center'}>
                    <progress value={props.correctCards.length + props.wrongCards.length + 1} max={props.cards.length}/>
                </Col>
                <Col className={'text-center'}>
                    <b>Card {props.correctCards.length + props.wrongCards.length + 1} out of {props.cards.length}</b>
                </Col>
                <PlayingCard changeScore={changeScore}
                             activeCard={props.activeCard}
                             front={props.activeCard.question}
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

    return (props.error !== null) ? <Redirect to={'/'}/> : (
        <>
            <NavigatieBar/>
            {loader}
            <Footer/>
        </>
    )
};

const mapStateToProps = state => {
    return {
        username: state.login.username,
        deck: state.playing.deck,
        error: state.playing.error,
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
        isLoggedIn: () => dispatch(isLoggedIn()),
        doSetCorrectCardsAction: (cards) => dispatch(setCorrectCardsAction(cards)),
        doSetWrongCardsAction: (cards) => dispatch(setWrongCardsAction(cards)),
        doSetActiveCardAction: (card) => dispatch(setActiveCardAction(card)),
        doGetDeck: (creatorId, deckId) => dispatch(getDeck(creatorId, deckId)),
        doSetGame: (deckId, flashcards) => dispatch(setGame(deckId, flashcards)),
        doUpdateGame: (deckId, gameId, oldCard, newCard, status) => dispatch(updateGame(deckId, gameId, oldCard, newCard, status)),
        doGetGameData: (deckId, gameId) => dispatch(getGameData(deckId, gameId)),
        doResetStateAction: () => dispatch(resetStateAction()),
        doMoveFlashcardToBox: (deckId, deckCreator, flashcard, currentSession, answeredCorrect) => dispatch(moveFlashcardToBox(deckId, deckCreator, flashcard, currentSession, answeredCorrect)),
        doUpdateDeckSession: (deckId, creatorId, currentSession) => dispatch(updateDeckSession(deckId, creatorId, currentSession)),
        doSetCards: (cards) => dispatch(setCardsAction(cards)),
        doErrorOccurred: (errorMessage) => dispatch(errorOccurred(errorMessage)),
        ginoTest: (userId, deckId, flashcardId) => dispatch(ginoTestFunc(userId, deckId, flashcardId)),
    }
};

export const PlayingDeck = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PlayingComponent);