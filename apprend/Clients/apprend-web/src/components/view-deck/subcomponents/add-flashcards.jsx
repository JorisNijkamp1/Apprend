import React, {useEffect} from "react";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import {
    Container,
    Card,
    Row,
    Button
} from "react-bootstrap";
import EditableFlashcard from "./editable-flashcard";
import {changeDeckFlashcards} from "../../../../src_old/redux-store/actions/flashcards/actions";
import {AddFlashcardIcon} from "./add-flashcard-icon";
import {NavigatieBar} from "../../shared/NavigatieBar";
import {Footer} from "../../shared/Footer";
import {editDeckFlashcardsAction, getDeckFlashcardsAction} from "../../../../src_old/redux-store/actions/flashcards/async-actions";
import Loader from "react-loaders";
import {isLoggedIn} from "../../../../src_old/redux-store/actions/login/async-actions";
import {useHistory} from 'react-router'

const Flashcards = (props) => {
        const {deckId} = useParams();
        const deckExist = !props.deckData.error;
        const isCreator = (props.username === props.deckData.creatorId);
        const history = useHistory();

        useEffect(() => {
            props.getDeckFlashcards(deckId)
        }, []);

        let loader, flashcard, allFlashcards;
        if (props.isLoading) {
            loader = (
                <Row className="mx-auto align-items-center flex-column py-5">
                    <Loader type="square-spin" active={true} color={'#758BFE'}/>
                    <h2>Loading flashcards...</h2>
                </Row>
            )
        } else if (deckExist && isCreator && !props.isSaving) {
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
            if (deckExist && !props.isLoading && isCreator) {
                return (
                    <Card.Header style={{backgroundColor: "#EEEEEE"}}>
                        <Card.Title>
                            <span>{props.deckData.deckName}</span>
                            <Button className={'float-right'}
                                    id={'save-flashcards-button'}
                                    onClick={() => saveFlashcardsAction()}
                                    style={{marginTop: '-8px'}}
                            >Save flashcards</Button>
                        </Card.Title>
                    </Card.Header>
                )
            }
        };

        const deckError = () => {
            if (!deckExist) {
                return (
                    <Row className="mx-auto align-items-center flex-column py-5">
                        <h2>This deck doesn't exist.. 😥</h2>
                    </Row>
                )
            }

            if (!isCreator && deckExist && !props.isLoading) {
                return (
                    <Row className="mx-auto align-items-center flex-column py-5">
                        <h2>You don't own this deck... 🙄</h2>
                    </Row>
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
                <NavigatieBar/>
                <Container className={"py-5"}>
                    <Card style={{backgroundColor: "#EEEEEE"}} className={'pt-3'} text={'dark'}>
                        {deckHeader()}
                        <Card.Body>
                            {deckError()}

                            {loader}

                            {isSaving()}
                            <Row>
                                {allFlashcards}
                                {flashcard}
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
                <Footer/>
            </>
        );
    }
;

const mapStateToProps = state => {
    return {
        username: state.login.username,
        deckFlashcards: state.flashcards.deckFlashcards,
        deckData: state.decks.deckData,
        isLoading: state.flashcards.isLoading,
        isSaving: state.flashcards.isSaving,
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

export default connect(mapStateToProps, mapDispatchToProps)(Flashcards);
