import React, {useEffect, useState} from "react";
import * as ReactRedux from "react-redux"
import {NavigatieBar} from "../shared/navbar/NavigatieBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link, useParams} from "react-router-dom";
import {Footer} from "../shared/footer/Footer"
import {
    getDeckEditAction,
    getUserDecksAction,
    setDeckEditedAction
} from "../../redux-store/actions/decks/async-actions";
import Card from "react-bootstrap/Card";
import Loader from 'react-loaders'
import 'loaders.css/src/animations/square-spin.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faCheck, faTimes, faEdit, faLockOpen, faLock} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import {isLoggedIn} from "../../redux-store/actions/login/async-actions";
import {deleteDeckFromUser} from '../../redux-store/actions/decks/async-actions'
import {Form} from "react-bootstrap";

const Deck = (props) => {
    const {username} = useParams();
    const isCreator = (props.username === props.userDecks.userId);

    const [decks, setDecks] = useState()

    let {deckId} = useParams()

    useEffect(() => {
        // props.getDecksEdit(deckId)
        props.getUserDecks(username)
    }, []);

    const confirmationBoxHOC = (message, deck, funct, stateFunct, property, index) => {
        return (
            <Card.Footer>
            <Row>
                <Col className="text-left" xs={8}>
                    {message}
                </Col>
                <Col xs={2} className="text-center text-green">
                    <FontAwesomeIcon icon={faCheck} name={deck._id}
                                    id={`confirm-icon-button-${index}`}
                                    onClick={(event) => {
                                        funct(event)
                                    }}
                    />
                </Col>
                <Col xs={2} className="text-center text-red">
                    <FontAwesomeIcon icon={faTimes} name={deck._id} id={`cancel-icon-button-${index}`} onClick={(event) => {
                        stateFunct(event, property)
                    }}/>
                </Col>
            </Row>
        </Card.Footer>
        )
    }

    const handleDeleteDeck = event => {
        const deckId = event.currentTarget.getAttribute('name')
        props.deleteDeckFromUser(deckId)
    };

    const handleEditDeck = event => {
        try {
            const deckId = event.currentTarget.getAttribute('name');
            const storeDeck = props.decks[props.decks.findIndex(d => d._id === deckId)]

            if (decks && decks[deckId]){
                let deckData = {...decks[deckId]}
                deckData.description = decks[deckId].description ? decks[deckId].description : storeDeck.description
                deckData.name = decks[deckId].name ? decks[deckId].name : storeDeck.name
                props.setDeckEditedAction(storeDeck.creatorId, deckId, deckData.name, deckData.description)
                toggleLocalStateProperty(event, 'editState')            
            }
        } catch (e) {
            console.log('SOMETHING WENT WRONG WITH EDITING A DECK', e)
        }
    }

    const editProperty = (event, property) => {
        const deckId = event.currentTarget.getAttribute('name')
        const newPropertyValue = event.currentTarget.value
        let updatedDecks = {}

        let newDeck = {}
        newDeck['id'] = deckId
        newDeck[property] = newPropertyValue

        if (decks){
            if (decks[deckId]){
                updatedDecks = {...decks}
                updatedDecks[deckId][property] = newPropertyValue
            } else {
                updatedDecks = {...decks}
                updatedDecks[deckId] = newDeck
            }
        } else {
            updatedDecks[deckId] = newDeck
        }
        setDecks({...updatedDecks})
    }

    const toggleLocalStateProperty = (event, property, reset = false) => {
        const deckId = event.currentTarget.getAttribute('name')
        let updatedDecks = {}

        let newDeck = {}
        newDeck['id'] = deckId
        newDeck[property] = true

        if (decks){
            if (decks[deckId]){
                updatedDecks = {...decks}
                updatedDecks[deckId][property] = !updatedDecks[deckId][property]
                delete updatedDecks[deckId]['name']
                delete updatedDecks[deckId]['description']
            } else {
                updatedDecks = {...decks}
                updatedDecks[deckId] = newDeck
            }
        } else {
            updatedDecks[deckId] = newDeck
        }

        setDecks({...updatedDecks})
    }

    const toggleDeckStatus = () => {

    }

    /* Lijst met alle opties die de eigenaar ziet
    
        icon: FontAwesome icon die je importeert
        title: >String< decknaam als je op de icon hovert
        funct: functie die je aanroept als je op de icon drukt
        statePropertyName: de propertyname die je aanpast wanneer je op de icon klikt 

    */

    const allIcons = [
        {
            icon: faTrash,
            title: 'Delete',
            funct: toggleLocalStateProperty,
            statePropertyName: 'deleteState',
            classColor: '',
        },
        {
            icon: faEdit,
            title: 'Edit',
            funct: toggleLocalStateProperty,
            statePropertyName: 'editState',
            classColor: ''
        },
        {
            icon: faLockOpen,
            title: 'Set this deck to private',
            ownTitle: true,
            funct: toggleDeckStatus,
            classColor: 'text-green',
            public: true
        },
        {
            icon: faLock,
            title: 'Set this deck to public',
            ownTitle: true,
            funct: toggleDeckStatus,
            classColor: 'text-red',
        }
    ]

    const showAllIcons = (icons, deck, index) => {
        return icons.map(icon => {
            if (deck.private && icon.)
            return iconHOC(icon, deck, index )
        })
    }

    const userOptions = (deck, index) => {

        // Laat alle confirmationBoxes onder elkaar zien
        const allConfirmationBoxes = (decks) => {
            let boxes = []

            if (decks){
                if (decks[deck._id]){
                    if (decks[deck._id].deleteState){
                        boxes.push(confirmationBoxHOC('Confirm delete?', deck, handleDeleteDeck, toggleLocalStateProperty, 'deleteState', index))
                    }
                    if (decks[deck._id].editState){
                        boxes.push(confirmationBoxHOC('Confirm edit?', deck, handleEditDeck, toggleLocalStateProperty, 'editState', index))
                    }
                }
            }

            return boxes
        }

        return (
            <>
                <Card.Footer>
                    <Row>
                        {showAllIcons(allIcons, deck, index)}
                    </Row>
                </Card.Footer>
                {allConfirmationBoxes(decks)}
            </>
        )
    }

    const iconHOC = (icon, deck, index) => {
        return (
            <Col xs={2}>
            <span className={"float-right"} name={deck._id}
                  onClick={(event) => {
                      icon.funct(event, icon.statePropertyName)
                  }}>
                <FontAwesomeIcon icon={icon.icon}
                                 className={`trash-icon ${icon.classColor}`}
                                 size={`1x`}
                                 title={icon.ownTitle ? icon.title : `${icon.title} ${deck.name}`}
                                 id={`${icon.title.toLowerCase()}-icon-button-${index}`}
                />
            </span>
        </Col>
        )
    }

    const FlashcardAmount = (deck) => {
        return (
            <Card.Subtitle className="mb-2 text-muted text-center">
            ({deck.flashcards.length} {(deck.flashcards.length > 1 || deck.flashcards.length === 0) ? 'flashcards' : 'flashcard'})
        </Card.Subtitle>
        )
    }

    const showViewButton = (bool, deckId, index) => {
        if (!bool) return (
        <Row>
        <Col xs={{span: 6, offset: 3}}>
            <Link to={`/decks/${deckId}`}>
                <Button variant="outline-primary" className={'w-100'} id={'card-' + index + '-link'}>View
                    deck</Button>
            </Link>
        </Col>
    </Row>
        )
    }

    const ShowCard = (deck, deckId, index) => {

        if (decks && decks[deckId] && decks[deckId].editState) {
            return (
                <>
                    <Form.Group controlId="formBasicEmail" className={"text-center"}>
                        <Form.Label column={true}>
                            <strong>Edit {deck.name}</strong>
                        </Form.Label>
                    <Form.Control type="text"
                                  name={deckId}
                                  placeholder="Haustiere"
                                  defaultValue={deck.name}
                                  id={`input-name-${index}`}
                                  onChange={(e) => {

                                    editProperty(e, 'name')
                                  }}
                    />
                </Form.Group>
                {FlashcardAmount(deck)}

                <Form.Group controlId="formBasicEmail" className={"text-center"}>
                    <Form.Label column={true}><strong>Edit deck description</strong></Form.Label>
                    <Form.Control 
                                  type="text"
                                  as="textarea"
                                  name={deckId}
                                  placeholder="Haustiere"
                                  defaultValue={deck.description}  
                                  id={`input-description-${index}`}
                                  className={'form-control'}
                                  onChange={(e) => {

                                    editProperty(e, 'description')

                                  }}
                    />
                </Form.Group>
                </>
            )
        } else {
            return (
                <>
                    <Card.Title className={"text-center"}>
                        <Row>
                            <Col xs={12}>
                                <span id={`deck-name-${index}`}>{deck.name}</span>
                            </Col>
                        </Row>
                    </Card.Title>
                    {FlashcardAmount(deck)}

                    <Card.Title className={"text-center font-weight-normal"}>
                        <Row>
                            <Col xs={12}>
                                <span id={`deck-description-${index}`}>{deck.description}</span>
                            </Col>
                        </Row>
                    </Card.Title>
                    {showViewButton(decks ? decks[deck._id] ? decks[deck._id].editState : false : false, deck._id, index)}
                </>
            )
        }
    }

    const LoaderComponent = () => {
        return (
            <Row className="mx-auto align-items-center flex-column py-5">
                <Loader type="square-spin" active={true} color={'#758BFE'}/>
                <h2>Loading decks...</h2>
            </Row>
        )
    }

    const showErrors = () => {
        let errors = []
        if (props.userDecks.toString() === 'no-decks') {
            errors.push(<Row className="mx-auto align-items-center flex-column py-5">
                <h2>User not found... 🙄</h2>
            </Row>)
        } else if (props.decks && !props.isLoading) {
            if (props.decks.length === 0) {
                errors.push(
                    <Row className="mx-auto align-items-center flex-column py-5">
                        <h2>User has no decks... ☹️</h2>
                    </Row>)
            }
        }
        return (errors.map(error => error))
    }

    const ShowDecks = (loading, decks) => {
        if (loading) return <LoaderComponent />

        const allDecks = decks.map((deck, index) => (
            <Col xs={12} sm={6} lg={4} className="my-2">
                <Card key={deck.name + index} id={'card-' + index}>
                    <Card.Body>
                        {ShowCard(deck, deck._id, index)}
                    </Card.Body>
                    {isCreator ? userOptions(deck, index) : ''}
                </Card>
            </Col>)
        )
        return allDecks
    }

    return (
        <>
            <NavigatieBar/>
            <Container>
                <Row>
                    <Col lg={{span: 8, offset: 2}}>
                        <div className="mx-auto text-green pt-5">
                            <h1 className="display-5 text-center">
                                {props.userDecks.user ? `Decks of ${props.userDecks.user}` : ''}
                            </h1>
                        </div>
                    </Col>
                </Row>
                {showErrors()}
                <Row>
                    {ShowDecks(props.isLoading, props.decks)}
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
        username: state.login.username
    }
}

function mapDispatchToProps(dispatch) {
    return {
        isLoggedIn: () => dispatch(isLoggedIn()),
        getUserDecks: (username) => dispatch(getUserDecksAction(username)),
        deleteDeckFromUser: (deckId) => dispatch(deleteDeckFromUser(deckId)),
        setDeckEditedAction: (creatorId, _id, deckName, deckDescription) => dispatch(setDeckEditedAction(creatorId, _id, deckName, deckDescription)),
        getDecksEdit: (deckId) => dispatch(getDeckEditAction(deckId)),
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Deck);
