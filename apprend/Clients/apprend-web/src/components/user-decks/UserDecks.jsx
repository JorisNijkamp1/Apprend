import React, {useEffect, useState} from "react";
import * as ReactRedux from "react-redux"
import {NavigatieBar} from "../shared/navbar/NavigatieBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useParams} from "react-router-dom";
import {Footer} from "../shared/footer/Footer"
import {getDeckAction, getUserDecksAction} from "../../redux-store/actions/decks/async-actions";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import Loader from 'react-loaders'
import 'loaders.css/src/animations/square-spin.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {isLoggedIn} from "../../redux-store/actions/login/async-actions";
import { deleteDeckFromUser } from '../../redux-store/actions/decks/async-actions';
import FilterTagsInput from "../search-input/FilterTagsInput";
import {AddCard} from "./sub-components/AddCard";
import {setFilteredDecks} from "../../redux-store/actions/decks/actions";

const Deck = (props) => {
    const {username} = useParams();
    const isCreator = (props.username === props.userDecks.userId);
    const [decks, setDecks] = useState(['a'])

    useEffect(() => {
        props.getUserDecks(username)
        props.setFilteredDecks([])
    }, []);

    const handleDeleteDeck = event => {
        const deckId = event.currentTarget.getAttribute('name')
        props.deleteDeckFromUser(deckId)
    }

    const confirmationBox = (bool, deck) => {
        if (bool) return (
            <Card.Footer>
            <Row>
                <Col className="text-left" xs={8}>
                    Are you sure ?
                </Col>
                <Col xs={2} className="text-center text-green">
                    <FontAwesomeIcon icon={faCheck} name={deck._id} onClick={e => handleDeleteDeck(e)} />
                </Col>
                <Col xs={2} className="text-center text-red">
                    <FontAwesomeIcon icon={faTimes} name={deck._id} onClick={e => addDeleteDeckToState(e)} />
                </Col>
            </Row>
        </Card.Footer>
        )
        else return (
        <>
        </>
        )
    }

    const addDeleteDeckToState = event => {
        const deckId = event.currentTarget.getAttribute('name')
        let updatedDecks
        if (!decks.includes(deckId)){
            updatedDecks = [...decks]
            updatedDecks.push(deckId)
        } else {
            updatedDecks = decks.filter(deck => {
                return deck !== deckId
            })
        }
        setDecks(updatedDecks)
    }

    const userOptions = (deck) => {
        if (isCreator)
        return (
            <>
            <Card.Footer>
                <Row>
                    <Col className="text-center" xs={12}>
                        <b>Options</b>
                    </Col>
                    {deleteDeckIcon(deck)}
                </Row>
            </Card.Footer>
            {confirmationBox(decks.includes(deck._id), deck)}
        </>
        )
        else return <> </>
    }

    const deleteDeckIcon = (deck) => {
        if (isCreator) {
            return (
                <Col xs={2}>
                    <span className={"float-right"} name={deck._id}
                                         onClick={(event) => addDeleteDeckToState(event)}>
                        <FontAwesomeIcon icon={faTrash}
                                         className={'trash-icon'}
                                         size={'1x'}
                                         title={`Delete ${deck.name}`}

                        />
                    </span>
                </Col>
            )
        }
    };
    let loader, userDecks, error;
    if (props.isLoading) {
        loader = (
            <Row className="mx-auto align-items-center flex-column py-5">
                <Loader type="square-spin" active={true} color={'#758BFE'}/>
                <h2>Loading decks...</h2>
            </Row>
        )
    } else if (props.filteredDecks.length !== 0) {
        if (typeof(props.filteredDecks) === "string") {
            userDecks = (
            <Row className="mx-auto align-items-center flex-column py-5">
                <h2>{props.filteredDecks} ☹️ </h2>
            </Row>
            )
        } else {
            userDecks = props.filteredDecks.map((deck, key) =>
                <Col xs={12} sm={6} lg={4} className="my-2">
                    <Card key={deck.name + key} id={'card-' + key}>
                        {AddCard(deck, key)}
                        {userOptions(deck)}
                    </Card>
                </Col>
            )
        }
    } else if (props.userDecks.decks) {
        userDecks = props.userDecks.decks.map((deck, key) =>
            <Col xs={12} sm={6} lg={4} className="my-2">
                <Card key={deck.name + key} id={'card-' + key}>
                    {AddCard(deck, key)}
                    {userOptions(deck)}
                </Card>
            </Col>
        )
    } else if (props.userDecks.toString() === 'no-decks') {

    } else if (props.decks === 0){

    }

    const showErrors = () => {
        let errors = []
        if (props.userDecks.toString() === 'no-decks'){
            errors.push(            <Row className="mx-auto align-items-center flex-column py-5">
            <h2>User not found... 🙄</h2>
        </Row>)
        }
        else if (props.decks && !props.isLoading){
            if (props.decks.length === 0){
                errors.push(<Row className="mx-auto align-items-center flex-column py-5">
                <h2>User has no decks... ☹️</h2>
            </Row>)
            }

        }

        return (errors.map(error => error))
    }

    return (
        <>
            <NavigatieBar/>
            <Container>
                <Row>
                    <Col lg={{span: 8, offset: 2}}>
                        <div className="mx-auto text-green pt-5">
                            <h1 className="display-5 text-center">
                                {props.userDecks.user ? `Decks of ${props.userDecks.user}`: ''}
                            </h1>
                        </div>
                    </Col>
                </Row>
                <div className={'pt-3 pb-5'}>
                    <FilterTagsInput id="filter" linkTo={`/search?q=${props.searchValue}`} username={props.userDecks.user}/>
                </div>
                {loader}
                {showErrors()}
                {error}
                <Row>
                    {/* <CardColumns> */}
                        {userDecks}
                    {/* </CardColumns> */}
                </Row>
            </Container>
            <Footer/>
        </>
    )
}


function mapStateToProps(state) {
    return {
        userDecks: state.decks.userDecks,
        decks: state.decks.userDecks.decks,
        isLoading: state.decks.isLoading,
        username: state.login.username,
        searchValue: state.search.searchValue,
        filteredDecks: state.decks.filteredDecks
    }
}

function mapDispatchToProps(dispatch) {
    return {
        isLoggedIn: () => dispatch(isLoggedIn()),
        getUserDecks: (username) => dispatch(getUserDecksAction(username)),
        deleteDeckFromUser: (deckId) => dispatch(deleteDeckFromUser(deckId)),
        setFilteredDecks: (decks) => dispatch(setFilteredDecks(decks))
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Deck);
