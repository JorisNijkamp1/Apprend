import React, {useState} from "react";
import {connect} from "react-redux";
import Col from "react-bootstrap/Col";
import {Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {AddFlashcardIcon} from "./add-flashcard-icon";
import {changeDeckFlashcards} from "../../../redux-store/actions/flashcards/actions";

let deck = {
    deckName: 'MyDeck',
    cards: []
};



const EditableFlashcard = (props) => {
    console.log(deck)
    const [flashcardTerm, setFlashcardTerm] = useState('New Flashcard');
    const [flashcardDefinition, setFlashcardDefinition] = useState(null);
    const flashcardName = !(flashcardTerm) ? 'New Flashcard' : flashcardTerm;

    const flashcardData = {
        id: deck.cards.length,
        term: flashcardTerm,
        definition: flashcardDefinition,
    };

    return (
        <>
            <Col xs={12} md={6} lg={4}>
                <Card border="primary" className={'mb-4 hover-shadow-editable-flashcard'}>
                    <Card.Header className={"text-center"}>
                        <b>{flashcardName}</b>
                        <span className={"float-right"}>
                        <FontAwesomeIcon icon={faTrash} className={'trash-icon'}/>
                    </span>
                    </Card.Header>
                    <Card.Body>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Term</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Pets"
                                          onChange={(e) => setFlashcardTerm(e.target.value)}
                                          // onBlur={() => props.changeDeckFlashcards(flashcardData)}
                            />
                            <Form.Text className="text-muted">
                                Vul hier de term in waarvan je de definitie wilt leren.
                            </Form.Text>
                            <hr/>
                            <Form.Label>Definition</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Haustiere"
                                          onChange={(e) => setFlashcardDefinition(e.target.value)}
                                          // onBlur={() => props.changeDeckFlashcards(flashcardData)}
                            />
                            <Form.Text className="text-muted">
                                Enter the definition of the term entered above.
                            </Form.Text>
                        </Form.Group>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(EditableFlashcard);
