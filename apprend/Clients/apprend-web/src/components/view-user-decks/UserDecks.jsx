import React, {useEffect, useState} from 'react';
import * as ReactRedux from 'react-redux'
import {NavBar} from '../shared/components/NavBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useParams} from 'react-router-dom';
import {Footer} from '../shared/components/Footer'
import {
    getDeckEditAction,
    getUserDecksAction,
    setDeckEditedAction
} from '../shared/actions/actions';
import Card from 'react-bootstrap/Card';
import 'loaders.css/src/animations/square-spin.scss'
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import {isLoggedIn} from '../shared/actions/actions';
import {deleteDeckFromUser, toggleDeckStatus} from '../shared/actions/actions'
import {Form} from 'react-bootstrap';
import FilterTagsInput from '../view-deck/subcomponents/FilterTagsInput';
import {setFilteredDecks} from '../shared/actions/actions';
import {Link} from 'react-router-dom'
import { Notification } from '../shared/components/Notification';
import { LoadingComponent } from '../shared/components/LoadingComponent';
import ConfirmationBoxHOC from './sub-components/ConfirmationBoxHOC'
import StatusIcon from './sub-components/StatusIcon'
import IconHOC from './sub-components/IconHOC'
import FlashcardAmount from './sub-components/FlashcardAmount'

const Deck = (props) => {
    const {username} = useParams();
    const isCreator = (props.username === props.userDecks.userId);

    const [decks, setDecks] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        props.getUserDecks(username, setIsLoading)
        props.setFilteredDecks([])
    }, []);

    const handleDeleteDeck = async event => {
        const deckId = event.currentTarget.getAttribute('name')
        const result = await props.deleteDeckFromUser(deckId, username)
        Notification(result.message, 'success')
    };

    const handleEditDeck = event => {
        try {
            const deckId = event.currentTarget.getAttribute('name');
            const storeDeck = props.decks[props.decks.findIndex(d => d._id === deckId)]

            if (decks && decks[deckId]) {
                let deckData = {...decks[deckId]}
                deckData.description = decks[deckId].description ? decks[deckId].description : storeDeck.description
                deckData.name = decks[deckId].name ? decks[deckId].name : storeDeck.name
                props.setDeckEditedAction(storeDeck.creatorId, deckId, deckData.name, deckData.description, storeDeck.tags)
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

        if (decks) {
            if (decks[deckId]) {
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

        if (decks) {
            if (decks[deckId]) {
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
    ]

    const handleToggleDeckStatus = (event) => {
        const deckId = event.currentTarget.getAttribute('name')
        const storeDeck = props.decks[props.decks.findIndex(d => d._id === deckId)]

        props.toggleStatus(deckId, storeDeck.creatorId)

    }

    const userOptions = (deck, index) => {

        const showAllIcons = (icons, deck, index) => {
            return icons.map(icon => {
                return IconHOC(icon, deck, index)
            })
        }

        const allConfirmationBoxes = (decks) => {
            let boxes = []

            if (decks) {
                if (decks[deck._id]) {
                    if (decks[deck._id].deleteState) {
                        boxes.push(ConfirmationBoxHOC('Confirm delete?', deck, handleDeleteDeck, toggleLocalStateProperty, 'deleteState', index))
                    }
                    if (decks[deck._id].editState) {
                        boxes.push(ConfirmationBoxHOC('Confirm edit?', deck, handleEditDeck, toggleLocalStateProperty, 'editState', index))
                    }
                }
            }
            return boxes
        }

        return (
            <>
                <Card.Footer>
                    <Row>
                        <Col className="text-center">
                            <b><p className="small">Owner options:</p></b>
                        </Col>
                    </Row>
                    <Row>
                        {showAllIcons(allIcons, deck, index)}
                        {StatusIcon(IconHOC, deck, handleToggleDeckStatus)}
                    </Row>
                </Card.Footer>
                {allConfirmationBoxes(decks)}
            </>
        )
    }

    const showViewButton = (bool, deckId, index, isCreator) => {
        if (!bool) return (
            <Row>
                {isCreator ? <Col>
                    <Link to={`/decks/${deckId}/play`}>
                        <Button variant="outline-success" className={'w-100'} id={`card-`+index+'-play-link'}>
                            Play Deck
                        </Button>
                    </Link>
                </Col> : ''}
                <Col>
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
                    <Form.Group controlId="formBasicEmail" className={'text-center'}>
                        <Form.Label column={true}>
                            <strong>Edit {deck.name}</strong>
                        </Form.Label>
                        <Form.Control type="text"
                                      name={deckId}
                                      placeholder={deck.name}
                                      defaultValue={deck.name}
                                      id={`input-name-${index}`}
                                      onChange={(e) => {
                                          editProperty(e, 'name')
                                      }}
                        />
                    </Form.Group>
                    {FlashcardAmount(deck)}

                    <Form.Group controlId="formBasicEmail" className={'text-center'}>
                        <Form.Label column={true}><strong>Edit deck description</strong></Form.Label>
                        <Form.Control
                            type="text"
                            as="textarea"
                            name={deckId}
                            placeholder={deck.description}
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
            let id;
            if (deck.totalFlashcards === undefined) {
                id = deck._id;
            } else if (deck.flashcards === undefined) {
                id = deck.deckId;
            }
            return (
                <>
                    <Card.Title className={'text-center'}>
                        <Row>
                            <Col xs={12}>
                                <span id={`deck-name-${index}`}>{deck.name}</span>
                            </Col>
                        </Row>
                    </Card.Title>
                    {FlashcardAmount(deck)}

                    <Card.Title className={'text-center font-weight-normal'}>
                        <Row>
                            <Col xs={12}>
                                <span id={`deck-description-${index}`}>{deck.description}</span>
                            </Col>
                        </Row>
                    </Card.Title>

                    {showViewButton(decks ? decks[deck._id] ? decks[deck._id].editState : false : false, id, index, isCreator)}
                </>
            )
        }
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

    const ShowDecks = (decks) => {
        if (!decks) return ''
        if (typeof (props.filteredDecks) === 'string') {
            return <Row className="mx-auto align-items-center flex-column py-5">
                <h2>{props.filteredDecks} ☹️ </h2>
            </Row>
        }

        if (props.filteredDecks.length > 0) {
            return props.filteredDecks.map((deck, index) =>
                <Col xs={12} sm={6} lg={4} className="my-2">
                    <div className={"deck-effect"}>
                        <Card index={deck.name + index} id={'card-' + index}>
                            <Card.Body>
                                {ShowCard(deck, deck.deckId, index)}
                            </Card.Body>
                            {isCreator ? userOptions(deck, index) : ''}
                        </Card>
                    </div>
                </Col>
            )
        }

        return decks.map((deck, index) => (
            <Col xs={12} sm={6} lg={4} className="my-2">
                <div className={"deck-effect"}>
                    <Card key={deck.name + index} id={'card-' + index}>
                        <Card.Body>
                            {ShowCard(deck, deck._id, index)}
                        </Card.Body>
                        {isCreator ? userOptions(deck, index) : ''}
                    </Card>
                </div>
            </Col>)
        )
    }

    const showContent = () => {
        if (isLoading) return <LoadingComponent loadingText="Loading all decks" />
        return (
            <>
            <Row>
            <Col lg={{span: 8, offset: 2}}>
                <div className="mx-auto text-green pt-5">
                    <h1 className="display-5 text-center">
                        {username.length !== 32 ? `Decks of ${username}` : 'Decks of anonymous'}
                    </h1>
                </div>
            </Col>
        </Row>
        <div className={'pt-3 pb-5'}>
            <FilterTagsInput id="filter" linkTo={`/search?q=${props.searchValue}`}
                             username={props.userDecks.userId}/>
        </div>
        {showErrors()}
        <Row>
            {ShowDecks(props.decks)}
        </Row>
        </>
        )
    }

    return (
        <>
            <NavBar/>
            <Container>
                {showContent()}
            </Container>
            <Footer/>
        </>
    )
}

function mapStateToProps(state) {
    return {
        userDecks: state.decks.userDecks,
        decks: state.decks.userDecks.decks,
        isLoading: state.flashcards.isLoading,
        username: state.login.username,
        searchValue: state.search.searchValue,
        filteredDecks: state.decks.filteredDecks
    }
}

function mapDispatchToProps(dispatch) {
    return {
        isLoggedIn: () => dispatch(isLoggedIn()),
        getUserDecks: (username, func) => dispatch(getUserDecksAction(username, func)),
        deleteDeckFromUser: (deckId, user) => dispatch(deleteDeckFromUser(deckId, user)),
        setDeckEditedAction: (creatorId, _id, deckName, deckDescription, oldTags, newTags) => dispatch(setDeckEditedAction(creatorId, _id, deckName, deckDescription, oldTags, newTags)),
        getDecksEdit: (deckId) => dispatch(getDeckEditAction(deckId)),
        toggleStatus: (deckId, userId) => dispatch(toggleDeckStatus(deckId, userId)),
        setFilteredDecks: (decks) => dispatch(setFilteredDecks(decks))
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Deck);
