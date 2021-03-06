import React, {useEffect, useState} from 'react';
import * as ReactRedux from 'react-redux';
import {Redirect, useHistory} from 'react-router';
import {Notification} from '../shared/components/Notification';
import {NavLink, useParams} from 'react-router-dom';
import {NavBar} from '../shared/components/NavBar';
import {Footer} from '../shared/components/Footer';
import {Container, Row, Col} from 'react-bootstrap';
import PlayingCard from './subcomponents/PlayingCard';
import {
    getDeck,
    updateDeckSession,
    moveFlashcardToBox, errorOccurred, setPlayingDeck
} from './actions';
import {
    setCorrectCardsAction,
    setWrongCardsAction,
    setActiveCardAction,
    resetStateAction, setCardsAction
} from './actions';
import 'loaders.css/src/animations/square-spin.scss';
import {leitnerSelectCards} from '../../util/leitner-system/leitnerSystem';
import {isLoggedIn} from '../shared/actions/actions';
import { LoadingComponent } from '../shared/components/LoadingComponent';
import ColumnSelector from './subcomponents/ColumnSelector';

const PlayingComponent = (props) => {
    const history = useHistory();
    const {deckId} = useParams();
    const [currentSession, setCurrentSession] = useState();
    const [setgame, Setsetgame] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [columns, setColumns] = useState({front: 0, back: 1})
    const [columnsChosen, setColumnsChosen] = useState(false)

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

            let session = results.data.session + 1;
            let allCards = leitnerSelectCards(results.data.flashcards, session);
            let counter = 0;

            while (allCards.length === 0) {
                counter++;
                session++;
                allCards = leitnerSelectCards(results.data.flashcards, session);

                if (counter > 500) break;
            }
            props.doSetPlayingDeck(results.data)
            props.doSetActiveCardAction(allCards[0]);
            props.doUpdateDeckSession(deckId, props.username, session);
            props.doSetCards(allCards);
            setCurrentSession(session);
            setIsLoading(false)
        }).catch(error => {
            props.doErrorOccurred(error.message);
        });
    };

    const handleColumnSelector = (index, side) => {
        let sides = columns
        if (side === 'front'){
            if (columns.back === index) sides.back = ''
        } else if (side === 'back'){
            if (columns.front === index) sides.front = ''
        }
        setColumns({...sides, [side]: index})
    }

    const handleSetColumns = () => {
        setColumnsChosen(true)
    }

    if (props.error !== null) {
        Notification(props.error, 'danger');
        return <Redirect to={'/'}/>;
    }


    if (props.username !== null) {
        if (!setgame){
            Setsetgame(true)
            setupGame();
        }
    }

    if (isLoading) {
        loader = (
            <LoadingComponent  loadingText="Loading cards..."/>
        )

        
    } else {
        if (!columnsChosen){
            loader = (
                <ColumnSelector deck={props.deck} func={handleColumnSelector} funcSetColumns={handleSetColumns} columns={columns}/>
            )
        } else 
        loader = (
            <Container>
                <NavLink to={`/decks/${deckId}`} className="btn btn-blue">
                    Back
                </NavLink>
                <Col className={'text-center'}>
                    <progress value={props.correctCards.length + props.wrongCards.length + 1} max={props.cards.length}/>
                </Col>
                <Col className={'text-center'}>
                    <b>Card {props.correctCards.length + props.wrongCards.length + 1} out of {props.cards.length}</b>
                </Col>
                <PlayingCard changeScore={changeScore}
                             activeCard={props.activeCard}
                             front={props.activeCard.columns[columns.front]}
                             back={props.activeCard.columns[columns.back]}
                             />
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
            <NavBar/>
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
        doResetStateAction: () => dispatch(resetStateAction()),
        doMoveFlashcardToBox: (deckId, deckCreator, flashcard, currentSession, answeredCorrect) => dispatch(moveFlashcardToBox(deckId, deckCreator, flashcard, currentSession, answeredCorrect)),
        doUpdateDeckSession: (deckId, creatorId, currentSession) => dispatch(updateDeckSession(deckId, creatorId, currentSession)),
        doSetCards: (cards) => dispatch(setCardsAction(cards)),
        doErrorOccurred: (errorMessage) => dispatch(errorOccurred(errorMessage)),
        doSetPlayingDeck: (payload) => dispatch(setPlayingDeck(payload)),
    }
};

export const PlayingDeck = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PlayingComponent);
