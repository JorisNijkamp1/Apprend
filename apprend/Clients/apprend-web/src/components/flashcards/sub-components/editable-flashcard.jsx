import Col from "react-bootstrap/Col";
import {Form} from "react-bootstrap";
import React, { useState } from "react";
import Card from "react-bootstrap/Card";

export const EditableFlashcard = () => {
    const [flashcardTerm, setFlashcardTerm] = useState('Nieuwe flashcard');

    return (
        <Col>
            <Card border="primary">
                <Card.Header className={"text-center"}>{flashcardTerm}</Card.Header>
                <Card.Body>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Term</Form.Label>
                        <Form.Control type="text" placeholder="Huisdieren" onChange={(e) => setFlashcardTerm(e.target.value)}/>
                        <Form.Text className="text-muted">
                            Vul hier de term in waarvan je de definitie wilt leren.
                        </Form.Text>
                        <hr/>
                        <Form.Label>Definitie</Form.Label>
                        <Form.Control type="text" placeholder="Pets"/>
                        <Form.Text className="text-muted">
                            Vul hier de definitie van de hierboven ingevulde term in.
                        </Form.Text>
                    </Form.Group>
                </Card.Body>
            </Card>
        </Col>
    )
};
