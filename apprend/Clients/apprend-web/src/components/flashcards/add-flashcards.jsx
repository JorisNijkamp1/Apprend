import React from "react";
import {connect} from "react-redux";
import Card from "react-bootstrap/Card";
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import EditableFlashcard from "./sub-components/editable-flashcard";
import {changeDeckFlashcards} from "../../redux-store/actions/flashcards/actions";
import {AddFlashcardIcon} from "./sub-components/add-flashcard-icon";
import {NavigatieBar} from "../shared/navbar/NavigatieBar";
import {Footer} from "../shared/footer/Footer";

const Flashcards = (props) => {

    const addFlashcardToDeck = () => {
        const flashcards = [...props.deckFlashcards];

        const highestId = Math.max.apply(Math, flashcards.map(function (o) {
            return o.id;
        }));

        flashcards.push({
            id: highestId + 1,
            term: null,
            definition: null
        });
        props.changeDeckFlashcards(flashcards)
    };

    const allFlashcards = props.deckFlashcards.map((flashcard) =>
        <EditableFlashcard key={flashcard.id}
                           flashcardId={flashcard.id}
            // term={flashcard.term}
        />
    );

    return (
        <>
            <NavigatieBar/>
            <Container className={"pt-5 pb-5"}>
                <Card>
                    <Card.Body>
                        <Row>
                            {allFlashcards}
                            <AddFlashcardIcon onClick={() => addFlashcardToDeck()}/>
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
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeDeckFlashcards: (flashcards) => dispatch(changeDeckFlashcards(flashcards)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Flashcards);
