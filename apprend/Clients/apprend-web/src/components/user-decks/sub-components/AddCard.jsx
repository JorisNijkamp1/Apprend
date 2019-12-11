import React from "react";
import {Link} from "react-router-dom";
import { Card, Col, Row, Button } from "react-bootstrap";

export const AddCard = (deck, key) => {
    let end, id;
    if (deck.totalFlashcards === undefined) {
        end = deck.flashcards.length;
        id = deck._id;
    } else if (deck.flashcards === undefined) {
        end = deck.totalFlashcards;
        id = deck.deckId;
    }

    return <Card.Body>
        <Card.Title>
            <Row>
                <Col xs={12} className="text-center">
                    {deck.name}
                </Col>
            </Row>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted text-center">
            ({end} {(end > 1 || end === 0) ? 'flashcards' : 'flashcard'})
        </Card.Subtitle>
        <Card.Text className="text-center">
            {deck.description}
        </Card.Text>
        <Row>
            <Col xs={{span: 6, offset: 3}}>
                <Link to={`/decks/${id}`}>
                    <Button variant="outline-primary" className={'w-100'} id={'card-' + key + '-link'}>View deck</Button>
                </Link>
            </Col>
        </Row>
    </Card.Body>
}