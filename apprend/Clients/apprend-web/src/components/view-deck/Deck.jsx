import React, {useEffect, useState} from "react";
import * as ReactRedux from "react-redux"
import {NavigatieBar} from "../shared/components/NavigatieBar";
import {Container, Row, Col, Button} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {Footer} from "../shared/components/Footer";
import {
    getDeckAction,
    getDeckEditAction,
    isLoggedIn,
    importDeckAction,
    deleteDeckFromUser,
    toggleDeckStatus,
    setDeckEditedAction,
    deleteOldTag
} from "../shared/actions/actions";
import Card from "react-bootstrap/Card";
import 'loaders.css/src/animations/square-spin.scss';
import Loader from "react-loaders";
import {useHistory} from 'react-router';
import {withRouter} from 'react-router-dom';
import PlayButton from "./subcomponents/PlayButton";
import EditButton from "./subcomponents/EditButton";
import ToggleStatusButton from "./subcomponents/ToggleStatusButton";
import DeleteButton from "./subcomponents/DeleteButton";
import ImportButton from "./subcomponents/ImportButton";
import ConfirmationBox from "./subcomponents/ConfirmationBox";
import {Notification} from '../shared/components/Notification';
import {addTag, clearTags, deleteTag} from '../create-deck/actions';

import FlashcardsOverview from "./subcomponents/OverviewFlashcards";
import {FlashcardTable} from './subcomponents/flashcardTable/FlashcardTable'
import DeckDescription from "./subcomponents/DeckDescription";
import DeckName from './subcomponents/DeckName';
import DeckTags from "./subcomponents/DeckTags";
import {LoadingComponent} from "../shared/components/LoadingComponent";
import ImportList from './subcomponents/ImportList'

const UserDecks = (props) => {
    const {deckId} = useParams();
    const isCreator = (props.username === props.deck.creatorId);

    const [editName, setEditName] = useState()
    const [editDescription, seteditDescription] = useState()
    const [editState, seteditState] = useState()
    const [deleteStatus, setdeleteStatus] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [input, setInput] = useState('')
    const [listStatus, setListStatus] = useState(false)

    const history = useHistory()

    //Check if user is logged in
    useEffect(() => {
        props.isLoggedIn()
        props.getDeck(deckId, setIsLoading).then(response => {
            if (response === 'Deck was not found') {
                Notification(response, 'danger')
                history.push('/')
            }
        })
        props.clearTags()
    }, []);

    const checkAdded = (tagValue) => {
        let tags = props.deckEdit.data.tags.concat(props.tags)
        return tags.some(tag => {
            return tag === tagValue.trim().toLowerCase();
        });
    }

    const getTagValue = () => {
        let tagValue = input;
        setInput('');
        let match = false;
        if (props.tags.length !== 0 || props.deckEdit.data.tags.length !== 0) {
            if (checkAdded(tagValue)) {
                Notification("You already have that tag", "danger");
            } else {
                match = true;
            }
            if (match === true) {
                if (tagValue.trim() !== "") {
                    props.addTag(tagValue);
                    match = false;
                } else {
                    Notification("You can't add an empty tag", "danger");
                }
            }
        } else {
            if (tagValue.trim() !== "") {
                props.addTag(tagValue);
            } else {
                Notification("You can't add an empty tag", "danger");
            }
        }
    }

    const playDeckHandler = () => {
        history.push(`/decks/${props.deck._id}/play`)
    }

    const handleImportButton = async () => {
        const result = await props.importDeck(props.deck._id, props.deck.creatorId);
        let deck;
        if (result.success) {
            if (!props.username) deck = result.data.decks[0]._id
            else deck = result.data._id
            await props.isLoggedIn()
            history.push(`/decks/${deck}`)
            props.getDeck(deck, setIsLoading)
        }
        Notification(result.message, result.success ? 'success' : 'danger')
    }

    // Toggles public/private status of a deck
    const toggleDeckStatusHandler = () => {
        props.toggleStatus(props.deck._id, props.deck.creatorId)
    }

    const showNotification = () => {
        Notification("A deck needs atleast 1 card to play!", "info");
    }

    const deleteDeckHandler = async () => {
        const result = await props.deleteDeckFromUser(props.deck._id, props.username)
        Notification(result.message, result.succes ? 'success' : 'danger')
        history.push(`/${props.username}/decks`)
    }

    const editDeckHandler = async () => {
        const result = await props.editDeck(props.deck.creatorId, props.deck._id, editName ? editName : props.deck.name, editDescription ? editDescription : props.deck.description, props.deckEdit.data.tags, props.tags)
        toggleEditStateHandler()
        props.clearTags()
        Notification(result.message, result.success ? 'success' : 'danger')
    }

    const toggleDeleteStatusHandler = () => {
        setdeleteStatus(!deleteStatus)
    }


    const toggleEditStateHandler = async () => {
        if (editState !== true) {
            await props.getDecksEdit(deckId)
        }
        setEditName('')
        seteditState(!editState)
    }

    const setStateHandler = (e, func) => {
        let value
        if (e) {
            value = e.currentTarget.value
        }
        func(value)
    }

    const findAllOptions = (isCreator) => {
        let icons = []
        if (isCreator) {
            if (props.deck.flashcards.length > 0) {
                icons.push(<PlayButton func={playDeckHandler}/>)
            } else {
                icons.push(<PlayButton func={showNotification}/>)
            }
            icons.push(<EditButton func={toggleEditStateHandler}/>)
            icons.push(<ToggleStatusButton func={toggleDeckStatusHandler} isPrivate={props.deck.private}/>)
            icons.push(<DeleteButton func={toggleDeleteStatusHandler}/>)
        } else {
            icons.push(<ImportButton func={handleImportButton}/>)
        }
        return icons
    }

    const showOptions = (icons) => {
        return icons.map(icon => (
            <Col xs={6} md={3}>
                {icon}
            </Col>
        ))
    }

    const showDeleteConfirmationBox = () => {
        const boxes = []
        if (deleteStatus) {
            boxes.push(<ConfirmationBox
                message="Confirm delete?"
                boxClass="py-2"
                colClass="my-3"
                func={deleteDeckHandler}
                cancelFunc={toggleDeleteStatusHandler}/>)
        }
        return boxes
    }

    const showEditConfirmationBox = () => {
        const boxes = []
        if (editState) {
            boxes.push(<ConfirmationBox
                message="Confirm edit?"
                boxClass="py-2"
                colClass="my-3"
                func={editDeckHandler}
                cancelFunc={toggleEditStateHandler}/>)
        }
        return boxes
    }


    const showFlashcards = () => {
        return (
            <Row className="my-5">
                <FlashcardsOverview/>
            </Row>
        )
    }

    const toggleListStatusHandler = () => {
        setListStatus(!listStatus)
    }

    const Importlist = () => {
        if (props.username === props.deck.creatorId) {
            return <ImportList
                state={listStatus}
                importedDecks={props.deck.imported}
                func={toggleListStatusHandler}
            />
        }
    }

    let loader, deck, error, flashcardsComp;
    if (props.isLoading) {
        loader = (
            <Row className="mx-auto align-items-center flex-column py-5">
                <Loader type="square-spin" active={true} color={'#758BFE'}/>
                <h2>Loading decks...</h2>
            </Row>
        )
    } else if (props.deck) {
        if (props.deck.toString() === 'Deck was not found') {
            error = (
                <Row className="mx-auto align-items-center flex-column py-5">
                    <h2>Deck not found... ☹️</h2>
                </Row>
            )
        }

        let totalFlashcards = 0;
        if (props.deck.flashcards) {
            totalFlashcards = props.deck.flashcards.length
        }
        if (props.deck.toString() !== 'Deck was not found') {
            const datum = new Date(props.deck.creationDate).toLocaleDateString()
            deck = (
                <>
                    <Card style={{width: '100%'}} bg={'light'} className={'my-5 text-center'}>
                        <Card.Body>
                            <Card.Subtitle>
                                <Row>
                                    <Col xs={12} md={4}>
                                        <b>Created on: </b>{datum ? datum : ''}
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <b>Created
                                            by: </b>{props.deck.creatorId ? props.deck.creatorId.length === 32 ? 'Anon' : props.deck.creatorId : ''}
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <b>Total flashcards: </b>{totalFlashcards}
                                    </Col>
                                </Row>
                                <Row className={'mt-3'}>
                                    <Col xs={12} md={4}>
                                        <b>Imported: </b>{props.deck.imported ? props.deck.imported.length : 0}
                                        {props.deck.imported ? props.deck.imported.length === 1 ? <b> time</b> : <b> times</b> : <b> times</b>}
                                    </Col>
                                    <Col xs={12} md={4}>
                                        {props.username === props.deck.creatorId && props.deck.originalDeck ?
                                        <Button href={`/decks/${props.deck.originalDeck}`} className={'search-deck-suggestions-link transparent'} id={'original'}>
                                            Original deck
                                        </Button> : ''}
                                    </Col>
                                </Row>
                                <Row className={'mt-3'}>
                                    <Col>
                                        {props.deck.imported ? props.deck.imported.length > 0 ? Importlist() : '' : ''}
                                    </Col>
                                </Row>
                            </Card.Subtitle>

                        </Card.Body>
                    </Card>
                    {showOptions(findAllOptions(isCreator))}
                </>
            )

            flashcardsComp = (
                <>
                    {showFlashcards()}
                </>
            )
        }
    }

    const Deckname = () => {
        return <DeckName
            state={editState}
            deck={props.deck}
            handler={setStateHandler}
            func={setEditName}
        />
    }

    const Deckdescription = () => {
        return <DeckDescription
            state={editState}
            deck={props.deck}
            handler={setStateHandler}
            func={seteditDescription}
        />
    }

    const Decktags = () => {
        return <DeckTags 
                    state={editState}
                    deck={props.deck}
                    deckEdit={props.deckEdit}
                    getTagValue={getTagValue}
                    deleteOldTag={props.deleteOldTag}
                    tags={props.tags}
                    value={input}
                    setInput={setInput}
                    deleteNewTag={props.deleteNewTag}
                    />
    }

    const showContent = () => {
        if (isLoading) return <LoadingComponent loadingText="Loading deck for you"/>
        return (
            <>
                <Row>
                    <Col lg={{span: 8, offset: 2}}>
                        <div className="mx-auto text-center pt-5">
                            {Deckname()}
                            {Deckdescription()}
                            {Decktags()}
                        </div>
                    </Col>
                </Row>
                {loader}
                {error}
                {showEditConfirmationBox()}
                <Row>
                    {deck}
                </Row>
                {/* <Row> */}
                <FlashcardTable />
                {/* </Row> */}
                {showDeleteConfirmationBox()}
                {/* {showFlashcards()} */}
                {/* {flashcardsComp} */}
            </>
        )
    }
    return (
        <>
            <NavigatieBar/>
            <Container>
                {showContent()}
            </Container>
            <Footer/>
        </>
    )
}

function mapStateToProps(state) {
    return {
        username: state.login.username,
        deck: state.decks.deck,
        isLoading: state.decks.isLoading,
        tags: state.createDeck.tags,
        deckEdit: state.decks.deckEdit
    }
}

function mapDispatchToProps(dispatch) {
    return {
        isLoggedIn: () => dispatch(isLoggedIn()),
        getDeck: (deckId, setLoader) => dispatch(getDeckAction(deckId, setLoader)),
        importDeck: (deckId, creatorId) => dispatch(importDeckAction(deckId, creatorId)),
        toggleStatus: (deckId, userId) => dispatch(toggleDeckStatus(deckId, userId)),
        deleteDeckFromUser: (deckId, user) => dispatch(deleteDeckFromUser(deckId, user)),
        editDeck: (creatorId, _id, deckName, deckDescription, oldTags, newTags) => dispatch(setDeckEditedAction(creatorId, _id, deckName, deckDescription, oldTags, newTags)),
        addTag: (tag) => dispatch(addTag(tag)),
        deleteOldTag: (tag) => dispatch(deleteOldTag(tag)),
        clearTags: () => dispatch(clearTags()),
        getDecksEdit: (deckId) => dispatch(getDeckEditAction(deckId)),
        deleteNewTag: (tag) => dispatch(deleteTag(tag))
    }
}

export default withRouter(ReactRedux.connect(mapStateToProps, mapDispatchToProps)(UserDecks));