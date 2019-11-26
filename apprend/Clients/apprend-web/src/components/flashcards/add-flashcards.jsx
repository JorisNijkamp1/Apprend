import React, {useEffect} from "react";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import {
    Container,
    Card,
    Row
} from "react-bootstrap";
import EditableFlashcard from "./sub-components/editable-flashcard";
import {changeDeckFlashcards} from "../../redux-store/actions/flashcards/actions";
import {AddFlashcardIcon} from "./sub-components/add-flashcard-icon";
import {NavigatieBar} from "../shared/navbar/NavigatieBar";
import {Footer} from "../shared/footer/Footer";
import {getDeckFlashcardsAction} from "../../redux-store/actions/flashcards/async-actions";
import Loader from "react-loaders";

const Flashcards = (props) => {
    const {deckId} = useParams();

    useEffect(() => {
        props.getDeckFlashcards(deckId)
    }, []);

    let loader, flashcard, allFlashcards;
    if (props.isLoading) {
        loader = (
            <Row className="mx-auto align-items-center flex-column py-5">
                <Loader type="square-spin" active={true} color={'#758BFE'}/>
                <h2>Loading decks...</h2>
            </Row>
        )
    } else {
        flashcard = (
            <AddFlashcardIcon onClick={() => addFlashcardToDeck()}/>
        );

        allFlashcards = props.deckFlashcards.map((flashcard) =>
            <EditableFlashcard key={flashcard.id}
                               flashcardId={flashcard.id}
                               term={flashcard.term}
                               definition={flashcard.definition}
            />
        );
    }

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

    return (
        <>
            <NavigatieBar/>
            <Container className={"py-5"}>
                <Card bg={'dark'} className={'pt-3'} text={'white'}>
                    <Card.Header>
                        <Card.Title>Deckname</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        {loader}
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
};

const mapStateToProps = state => {
    return {
        deckFlashcards: state.flashcards.deckFlashcards,
        isLoading: state.flashcards.isLoading,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getDeckFlashcards: (deckId) => dispatch(getDeckFlashcardsAction(deckId)),
        changeDeckFlashcards: (flashcards) => dispatch(changeDeckFlashcards(flashcards)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Flashcards);
