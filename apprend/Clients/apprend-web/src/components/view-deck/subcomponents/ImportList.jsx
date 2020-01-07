import React from 'react';
import {Button, Col} from 'react-bootstrap';

export default props => {
    if (props.state) {
        if (props.importedDecks.length > 0) {
            const allDecks = props.importedDecks.map(deck => (
                <Col key={deck._id}>
                    <Button href={`/decks/${deck.deckId}`} className={'search-deck-suggestions-link transparent mt-1'}>
                        {deck.deckName} from: {deck.user ? deck.user.length === 32 ? 'Anon' : deck.user : ''}
                    </Button>
                </Col>
            ))
    
            return (
                <>
                    <Button className={'search-deck-suggestions-link transparent'} onClick={props.func}>
                        Hide imported decks
                    </Button>
                    <Col>
                        {allDecks}
                    </Col>
                </>
            )
        }
    } else {
        return <Button className={'search-deck-suggestions-link transparent'} onClick={props.func}>Show imported decks</Button>
    }
}