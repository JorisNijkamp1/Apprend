import React from 'react';
import {Button, Col} from 'react-bootstrap';

export default props => {
    if (props.state) {
        if (props.importedDecks.length > 0) {
            const allDecks = props.importedDecks.map((deck, index) => (
                <Button href={`/decks/${deck.deckId}`} className={'search-deck-suggestions-link transparent mt-3 mr-3 ml-3'} id={'import-' + index}>
                    {deck.user ? deck.user.length === 32 ? 'Anon' : deck.user : ''} imported at: {new Date(deck.importDate).toLocaleDateString()}
                </Button>
            ))
            return (
                <>
                    <Button className={'search-deck-suggestions-link transparent'} onClick={props.func} id={'importList'}>
                        Hide imported decks
                    </Button>
                    <Col>
                        {allDecks}
                    </Col>
                </>
            )
        }
    } else {
        return <Button className={'search-deck-suggestions-link transparent'} onClick={props.func} id={'importList'}>
            Show imported decks
        </Button>
    }
}