import React from 'react';
import {Button, Col} from 'react-bootstrap';

export default props => {
    if (props.importedDecks.length > 0) {
            const allDecks = props.importedDecks.map((deck, index) => (
                <Button href={`/decks/${deck.deckId}`} className={'search-deck-suggestions-link transparent mt-3 mr-3 ml-3'} id={'import-' + index}>
                    <b>{deck.user ? deck.user.length === 32 ? 'Anonymous' : deck.user : ''}:</b> {new Date(deck.importDate).toLocaleDateString()}
                </Button>
            ))
            return (
                <>
                    <Col style={{'maxHeight': '170px', 'overflowY': 'scroll'}}>
                        {allDecks}
                    </Col>
                </>
            )
    } else {
        return (
            <small>No imports</small>
        )
    }
}