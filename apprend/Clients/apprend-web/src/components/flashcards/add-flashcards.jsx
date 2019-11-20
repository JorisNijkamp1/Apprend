import React from "react";
import Card from "react-bootstrap/Card";
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {EditableFlashcard} from "./sub-components/editable-flashcard";
import {AddFlashcardIcon} from "./sub-components/add-flashcard-icon";

const allFlashcards = () => {
    let rows = [];
    for (let i = 0; i < 7; i++) {
        rows.push(<EditableFlashcard key={i} />);
    }
    return rows
};

export const Flashcards = () => {
    return (
        <Container>
            <Card>
                <Card.Body>
                    <Row>
                        {/*<EditableFlashcard/>*/}
                        {allFlashcards()}
                        <AddFlashcardIcon/>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};
