import React from 'react'
import { Card } from 'react-bootstrap'

export default (deck) => {
    let flashcards;
    if (deck.totalFlashcards === undefined) {
        flashcards = deck.flashcards.length;
    } else if (deck.flashcards === undefined) {
        flashcards = deck.totalFlashcards;
    }
    return (
        <Card.Subtitle className="mb-2 text-muted text-center">
            ({flashcards} {(flashcards > 1 || flashcards === 0) ? 'flashcards' : 'flashcard'})
        </Card.Subtitle>
    )
}