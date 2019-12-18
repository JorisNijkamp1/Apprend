import React from 'react';
import {connect} from 'react-redux';
import {
    Container, Form, Row, Col,
    Button,
    Spinner
} from 'react-bootstrap'
import {Notification} from "../../shared/notification/Notification";

import {changeDeckName} from '../../../redux-store/actions/create-deck/actions'

import {createDeck} from '../../../redux-store/actions/create-deck/async-actions'

const CreateButtonComponent = (props) => {

    const createButton = () => {
        if (props.isLoading) {
            return (
                <Button variant="primary" disabled className="w-100" id="create-deck-button">
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Creating...
                </Button>
            )
        } else {
            return (
                <Button
                    className="w-100"
                    variant="primary"
                    type="submit"
                    id="create-deck-button"
                    disabled={props.deckName ? false : true}
                    onClick={() => {
                        Notification("You successfully created a deck", "success")
                    }}
                >
                    {props.deckName ? 'Create deck!' : 'Please fill in a deckname'}
                </Button>
            )
        }
    }

    return (
        <>
            {createButton()}
        </>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.createDeck.isLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeDeckName: (name) => dispatch(changeDeckName(name)),
        createNewDeck: (deck) => dispatch(createDeck(deck)),
    }
}

export const CreateButton = connect(mapStateToProps, mapDispatchToProps)(CreateButtonComponent);