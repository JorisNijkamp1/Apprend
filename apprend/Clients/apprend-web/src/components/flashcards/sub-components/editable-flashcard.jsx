import Col from "react-bootstrap/Col";
import {Form} from "react-bootstrap";
import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'


export const EditableFlashcard = () => {
    const [flashcardTerm, setFlashcardTerm] = useState('New Flashcard');
    const [flashcardDefinition, setFlashcardDefinition] = useState(null);

    let flashcardData = {
        term: flashcardTerm,
        definition: flashcardDefinition,
    };

    return (
        <>
            <Col xs={12} md={6} lg={4}>
                <Card border="primary" className={'mb-4 hover-shadow-editable-flashcard'}>
                    <Card.Header className={"text-center"}>
                        {flashcardTerm}
                        <span className={"float-right"}>
                        <FontAwesomeIcon icon={faTrash} className={'trash-icon'}/>
                    </span>
                    </Card.Header>
                    <Card.Body>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Term</Form.Label>
                            <Form.Control type="text" placeholder="Huisdieren"
                                          onChange={(e) => setFlashcardTerm(e.target.value)}/>
                            <Form.Text className="text-muted">
                                Vul hier de term in waarvan je de definitie wilt leren.
                            </Form.Text>
                            <hr/>
                            <Form.Label>Definition</Form.Label>
                            <Form.Control type="text" placeholder="Pets"
                                          onChange={(e) => setFlashcardDefinition(e.target.value)}/>
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
