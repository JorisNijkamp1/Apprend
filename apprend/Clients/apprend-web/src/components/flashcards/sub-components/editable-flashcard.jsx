import React, {useState} from "react";
import {connect} from "react-redux";
import Col from "react-bootstrap/Col";
import {Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {changeDeckFlashcards} from "../../../redux-store/actions/flashcards/actions";

const EditableFlashcard = (props) => {
    const [flashcardTerm, setFlashcardTerm] = useState('');
    const [flashcardTermEdited, setFlashcardTermEdited] = useState(false);

    const [flashcardDefinition, setFlashcardDefinition] = useState('');
    const [flashcardDefinitionEdited, setFlashcardDefinitionEdited] = useState(false);
    const flashcardName = (flashcardTerm === '' && !props.term) ? 'Empty flashcard' : ((props.term && !flashcardTermEdited) ? props.term : flashcardTerm);

    const flashcardData = {
        id: props.flashcardId,
        term: (props.term && !flashcardTermEdited) ? props.term : flashcardTerm,
        definition: (props.definition && !flashcardDefinitionEdited) ? props.definition : flashcardDefinition,
    };

    let deckFlashcards = props.deckFlashcards;
    deckFlashcards.forEach(function (arrayItem, key) {
        if (arrayItem['id'] === flashcardData.id) {
            deckFlashcards[key].term = flashcardData.term;
            deckFlashcards[key].definition = flashcardData.definition;
        }
    });
    props.changeDeckFlashcards(deckFlashcards);

    const deleteFlashcard = (flashcardId) => {
        let deckFlashcards = props.deckFlashcards.filter(fc => {
            return fc.id !== flashcardId
        });
        props.changeDeckFlashcards(deckFlashcards)
    };

    let flashcardDeleteIcon;
    if (props.deckFlashcards.length > 1) {
        flashcardDeleteIcon = (
            <FontAwesomeIcon icon={faTrash}
                             className={'trash-icon'}
                             onClick={() => deleteFlashcard(props.flashcardId)}
            />
        )
    }

    return (
        <>
            <Col xs={12} md={6} lg={4}>
                <Card border={(flashcardData.term && flashcardData.definition) ? 'success' : 'danger'}
                      className={'mb-4 hover-shadow-editable-flashcard'}
                      text={'dark'}>
                    <Card.Header className={"text-center"}>
                        <b>{flashcardName}</b>
                        <span className={"float-right"}>
                            {flashcardDeleteIcon}
                    </span>
                    </Card.Header>
                    <Card.Body>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Term</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Pets"
                                          onChange={(e) => {
                                              setFlashcardTerm(e.target.value);
                                              setFlashcardTermEdited(true);
                                          }}
                                          value={flashcardData.term}
                                          isValid={(flashcardData.term !== null && flashcardData.term !== '')}
                            />
                            <Form.Text className="text-muted">
                                Vul hier de term in waarvan je de definitie wilt leren.
                            </Form.Text>
                            <hr/>
                            <Form.Label>Definition</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Haustiere"
                                          onChange={(e) => {
                                              setFlashcardDefinition(e.target.value);
                                              setFlashcardDefinitionEdited(true);
                                          }}
                                          value={flashcardData.definition}
                                          isValid={(flashcardData.definition !== null && flashcardData.definition !== '')}
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
