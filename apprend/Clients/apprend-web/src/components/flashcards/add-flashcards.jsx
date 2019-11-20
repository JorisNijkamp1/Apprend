import React from "react";
import Card from "react-bootstrap/Card";
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {EditableFlashcard} from "./sub-components/editable-flashcard";

export const Flashcards = () => (
    <Container>
        <Card>
            <Card.Body>
                <Row>
                    <EditableFlashcard/>
                </Row>
            </Card.Body>
        </Card>
    </Container>
);
