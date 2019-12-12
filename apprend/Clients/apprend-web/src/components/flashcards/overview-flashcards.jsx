import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import {
    Card,
    Row,
    Button
} from "react-bootstrap";
import EditableFlashcard from "./sub-components/editable-flashcard";
import {changeDeckFlashcards} from "../../redux-store/actions/flashcards/actions";
import {AddFlashcardIcon} from "./sub-components/add-flashcard-icon";
import {editDeckFlashcardsAction, getDeckFlashcardsAction} from "../../redux-store/actions/flashcards/async-actions";
import Loader from "react-loaders";
import {isLoggedIn} from "../../redux-store/actions/login/async-actions";
import {useHistory} from 'react-router'
import NonEditableFlashcard from "./sub-components/noneditable-flashcard";
import Form from "react-bootstrap/Form";

const FlashcardsOverview = (props) => {
        const {deckId} = useParams();
        const deckExist = !props.deckData.error;
        const isCreator = (props.username === props.deckData.creatorId);
        const history = useHistory();

        const [filteredFlashcards, setFilteredFlashcards] = useState(null);
        const [filterInputValue, setFilterInputValue] = useState(null);

        useEffect(() => {
            props.getDeckFlashcards(deckId)
        }, []);

        const filterFlashcards = (e) => {
            const valueInput = e.target.value;
            setFilterInputValue(valueInput)
            if (valueInput) {
                setFilteredFlashcards(
                    props.deckFlashcards.filter(flashcard =>
                        flashcard.term.toLowerCase().includes(valueInput.toLowerCase())
                        ||
                        flashcard.definition.toLowerCase().includes(valueInput.toLowerCase()))
                );
            } else {
                setFilteredFlashcards(null);
            }
        };

        let flashcard, allFlashcards;
        if (deckExist && isCreator && !props.isSaving) {
            if (((filteredFlashcards) ? filteredFlashcards : props.deckFlashcards).length === 0) {
                flashcard = null
            } else if (!filterInputValue) {
                flashcard = (
                    <AddFlashcardIcon onClick={() => addFlashcardToDeck()}/>
                );
            }

            allFlashcards = ((filteredFlashcards) ? filteredFlashcards : props.deckFlashcards).map((flashcard) => {
                return (
                    <EditableFlashcard key={flashcard.id}
                                       flashcardId={flashcard.id}
                                       term={flashcard.term}
                                       definition={flashcard.definition}
                                       allFlashcards={props.deckFlashcards}
                                       filterFunc={setFilteredFlashcards}
                                       filteredFlashcards={filteredFlashcards}
                    />
                )
            });
        } else if (!props.isSaving && !isCreator) {
            flashcard = null
            allFlashcards = ((filteredFlashcards) ? filteredFlashcards : props.deckFlashcards).map((flashcard) => {
                return (

                    <NonEditableFlashcard key={flashcard.id}
                                          flashcardId={flashcard.id}
                                          term={flashcard.term}
                                          definition={flashcard.definition}/>
                )
            })
        }

        const noResultOnFilter = () => {
            if (((filteredFlashcards) ? filteredFlashcards : props.deckFlashcards).length === 0) {
                return (
                    <h2>Geen resultaten gevonden!</h2>
                )
            }
        };

        const isSaving = () => {
            if (props.isSaving) {
                return (
                    <Row className="mx-auto align-items-center flex-column py-5">
                        <Loader type="square-spin" active={true} color={'#758BFE'}/>
                        <h2>Saving flashcards...</h2>
                    </Row>
                )
            }
        };

        const deckHeader = () => {
            if (deckExist && isCreator) {
                return (
                    <Card.Header style={{backgroundColor: "#EEEEEE"}}>
                        <Card.Title>
                            <Card.Title>
                                <Form.Group className={"float-left w-50"} controlId="formFilterFlashcards">
                                    <Form.Control type="text" onChange={(e) => {
                                        filterFlashcards(e);
                                    }} placeholder="Filter flashcards"/>
                                </Form.Group>
                            </Card.Title>

                            <Button className={'float-right mt-1'}
                                    id={'save-flashcards-button'}
                                    onClick={() => saveFlashcardsAction()}
                                    style={{marginTop: '-8px'}}
                            >Save flashcards</Button>
                        </Card.Title>
                    </Card.Header>
                )
            } else {
                return (
                    <Card.Header style={{backgroundColor: "#EEEEEE"}}>
                        <Card.Title>
                            <Form.Group className={"float-left w-50"} controlId="formFilterFlashcards">
                                <Form.Control type="text" onChange={(e) => {
                                    filterFlashcards(e);
                                }} placeholder="Filter flashcards"/>
                            </Form.Group>
                        </Card.Title>
                    </Card.Header>
                )
            }
        };

        const addFlashcardToDeck = () => {
            const flashcards = [...props.deckFlashcards];

            const highestId = Math.max.apply(Math, flashcards.map(function (o) {
                return o.id;
            }));

            flashcards.push({
                id: highestId + 1,
                term: '',
                definition: ''
            });
            props.changeDeckFlashcards(flashcards)
        };

        const saveFlashcardsAction = async () => {
            const result = await props.saveDeckFlashcardsAction(props.deckData.deckId, props.deckFlashcards);
            if (result === 'success') {
                history.push(`/decks/${props.deckData.deckId}`);
            }
        };

        return (
            <>
                <Card style={{backgroundColor: "#EEEEEE", width: "100%"}} text={'dark'}>
                    {deckHeader()}
                    <Card.Body>
                        {isSaving()}
                        {noResultOnFilter()}
                        <Row>
                            {allFlashcards}
                            {flashcard}
                        </Row>
                    </Card.Body>
                </Card>
            </>
        );
    }
;

const mapStateToProps = state => {
    return {
        username: state.login.username,
        deckFlashcards: state.flashcards.deckFlashcards,
        deckData: state.decks.deckData,
        isSaving: state.flashcards.isSaving,
        isLoading: state.decks.isLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        isLoggedIn: () => dispatch(isLoggedIn()),
        getDeckFlashcards: (deckId) => dispatch(getDeckFlashcardsAction(deckId)),
        changeDeckFlashcards: (flashcards) => dispatch(changeDeckFlashcards(flashcards)),
        saveDeckFlashcardsAction: (deckId, flashcards) => dispatch(editDeckFlashcardsAction(deckId, flashcards)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardsOverview);
