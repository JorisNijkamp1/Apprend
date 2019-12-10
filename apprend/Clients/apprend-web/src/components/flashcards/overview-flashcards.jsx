import React, {useEffect} from "react";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import {
    Container,
    Card,
    Row,
    Col,
    Button
} from "react-bootstrap";
import EditableFlashcard from "./sub-components/editable-flashcard";
import {changeDeckFlashcards} from "../../redux-store/actions/flashcards/actions";
import {AddFlashcardIcon} from "./sub-components/add-flashcard-icon";
import {NavigatieBar} from "../shared/navbar/NavigatieBar";
import {Footer} from "../shared/footer/Footer";
import {editDeckFlashcardsAction, getDeckFlashcardsAction} from "../../redux-store/actions/flashcards/async-actions";
import Loader from "react-loaders";
import {isLoggedIn} from "../../redux-store/actions/login/async-actions";
import {useHistory} from 'react-router'
import NonEditableFlashcard from "./sub-components/noneditable-flashcard";

const FlashcardsOverview = (props) => {
        const {deckId} = useParams();
        const deckExist = !props.deckData.error;
        const isCreator = (props.username === props.deckData.creatorId);
        const history = useHistory();

        useEffect(() => {
            props.getDeckFlashcards(deckId)
        }, []);

        let flashcard, allFlashcards;
        if (deckExist && isCreator && !props.isSaving) {
            flashcard = (
                <AddFlashcardIcon onClick={() => addFlashcardToDeck()}/>
            );

            allFlashcards = props.deckFlashcards.map((flashcard) => {
                return (
                    <EditableFlashcard key={flashcard.id}
                                       flashcardId={flashcard.id}
                                       term={flashcard.term}
                                       definition={flashcard.definition}
                    />
                )
            });
        } else if (!props.isSaving && !isCreator) {
            flashcard = null

            allFlashcards = props.deckFlashcards.map((flashcard) => {
                return (
                    <NonEditableFlashcard key={flashcard.id}
                                          flashcardId={flashcard.id}
                                          term={flashcard.term}
                                          definition={flashcard.definition}/>
                )
            })
        }

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
                            <span>{props.deckData.deckName}</span>
                            <Button className={'float-right mt-1'}
                                    id={'save-flashcards-button'}
                                    onClick={() => saveFlashcardsAction()}
                                    style={{marginTop: '-8px'}}
                            >Save flashcards</Button>
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
                <Col lg={12} md={12} className={"mb-5"}>
                    <Card style={{backgroundColor: "#EEEEEE"}} text={'dark'}>
                        {deckHeader()}
                        <Card.Body>
                            {isSaving()}
                            <Row>
                                {allFlashcards}
                                {flashcard}
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
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
