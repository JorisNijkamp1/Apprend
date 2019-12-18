import React, {useState} from "react";
import {connect} from "react-redux";
import {Row, Col, Form, Card, Alert} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faCheck, faTimes} from '@fortawesome/free-solid-svg-icons'
import {changeDeckFlashcards} from "../../shared/actions/actions";
import {store} from 'react-notifications-component';

const EditableFlashcard = (props) => {
    const [flashcardTerm, setFlashcardTerm] = useState('');
    const [flashcardTermEdited, setFlashcardTermEdited] = useState(false);

    const [flashcardDefinition, setFlashcardDefinition] = useState('');
    const [flashcardDefinitionEdited, setFlashcardDefinitionEdited] = useState(false);

    const [deleteNotification, setDeleteNotification] = useState(false);

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
        let deckFlashcards = props.allFlashcards.filter(fc => fc.id !== flashcardId);

        if (props.filteredFlashcards) {
            let filteredFlashcards = props.filteredFlashcards.filter(fc => fc.id !== flashcardId);
            props.filterFunc(filteredFlashcards)
        }
        props.changeDeckFlashcards(deckFlashcards)

        setDeleteNotification(false);
        return (
            store.addNotification({
                title: "You successfully deleted a card",
                message: " ",
                type: "info",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "bounceIn"],
                animationOut: ["animated", "bounceOut"],
                dismiss: {
                    duration: 3000
                },
                width: 250
            })
        )
    };

    const confirmationBox = (bool) => {
        if (bool) return (
            <Card.Footer>
                <Row>
                    <Col className="text-left" xs={8}>
                        Are you sure?
                    </Col>
                    <Col xs={2} className="text-center text-green">
                        <FontAwesomeIcon icon={faCheck} name={props.flashcardId} id={"green"}
                                         onClick={() => deleteFlashcard(props.flashcardId)}/>
                    </Col>
                    <Col xs={2} className="text-center text-red">
                        <FontAwesomeIcon icon={faTimes} name={props.flashcardId} id={"red"}
                                         onClick={() => setDeleteNotification(false)}/>
                    </Col>
                </Row>
            </Card.Footer>
        )
        else return (
            <>
            </>
        )
    }

    let flashcardDeleteIcon;
    if (props.deckFlashcards.length > 1) {
        flashcardDeleteIcon = (
            <FontAwesomeIcon icon={faTrash}
                             className={'trash-icon'}
                             id={'flashcard-' + flashcardData.id + '-delete-icon'}
                             onClick={() => setDeleteNotification(true)}
            />
        )
    }

    const showDeleteNotification = () => {
        let aCard;
        deckFlashcards.forEach(card => {
            if (card.id === props.flashcardId) {
                aCard = card
            }
        })
        return deleteNotification ? confirmationBox(aCard.id === props.flashcardId) : ""
    }

    return (
        <>
            <Col xs={12} md={6} lg={4} id={'flashcard-' + flashcardData.id}>
                <Card border={(flashcardData.term && flashcardData.definition) ? 'success' : 'danger'}
                      className={'mb-4 hover-shadow-editable-flashcard'}
                      text={'dark'}>
                    <Card.Header className={"text-center"}>
                        <b>{flashcardName}</b>
                        <span className={"float-right"}>
                            {flashcardDeleteIcon}
                        </span>
                        {showDeleteNotification()}
                    </Card.Header>
                    <Card.Body>
                        <Form.Group>
                            <Form.Label>Term</Form.Label>
                            <Form.Control type="text"
                                          id={'flashcard-' + flashcardData.id + '-term'}
                                          placeholder="Pets"
                                          onChange={(e) => {
                                              setFlashcardTerm(e.target.value);
                                              setFlashcardTermEdited(true);
                                          }}
                                          value={flashcardData.term}
                                          isValid={(flashcardData.term !== null && flashcardData.term !== '')}
                            />
                            <Form.Text className="text-muted">
                                Enter the term you want to learn the definition.
                            </Form.Text>
                            <hr/>
                            <Form.Label>Definition</Form.Label>
                            <Form.Control type="text"
                                          id={'flashcard-' + flashcardData.id + '-definition'}
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
