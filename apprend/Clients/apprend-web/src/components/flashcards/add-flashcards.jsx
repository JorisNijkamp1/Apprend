import React, {useState} from "react";
import {connect} from "react-redux";
import Card from "react-bootstrap/Card";
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import EditableFlashcard from "./sub-components/editable-flashcard";
import {changeDeckFlashcards} from "../../redux-store/actions/flashcards/actions";
import {AddFlashcardIcon} from "./sub-components/add-flashcard-icon";

const allFlashcards = (props) => {
    let allFlashcards = props.deckFlashcards.cards.map((flashcard) =>
        <EditableFlashcard key={flashcard.id}/>
    );
};

const Flashcards = (props) => {
        
    const [numbers, setNumbers] = useState([0,1,2,3])

//     let numbers = [0, 1, 2, 3];

    let addFlashcardToDeck = () => {
        console.log(numbers);
        const newArray = numbers.push(numbers.length)
        setNumbers(newArray)
    };

    let listItems = numbers.map((number) =>
        <li key={number}>{number}</li>
    );

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Row>
                        <ul>{listItems}</ul>
                        <EditableFlashcard/>
                        <AddFlashcardIcon onClick={() => addFlashcardToDeck()}/>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
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
