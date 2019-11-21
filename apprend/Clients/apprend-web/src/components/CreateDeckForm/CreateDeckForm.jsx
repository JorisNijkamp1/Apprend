import React from 'react';
import { connect } from 'react-redux';
import { Container, Form, Row, Col, 
         } from 'react-bootstrap'

import { changeDeckName } from '../../redux-store/actions/create-deck/actions'

import { PageTitle } from '../shared/PageTitle'
import { createDeck } from '../../redux-store/actions/create-deck/async-actions'
import { CreateButton } from './sub-components/CreateButton';
import { useHistory } from 'react-router'

const CreateDeckFormComponent = (props) => {

    let history = useHistory()

    const showDeckNameOrThis = (text) => props.deckName ? <b>'{props.deckName}'</b> : text

    const handleCreateDeck = async (e) => {
        e.preventDefault()
        const deck = {
            deckName: props.deckName,
            description: e.target.description.value
        }
        const response = await props.createNewDeck(deck)
        let deckId;
        if (response.decks){
            deckId = response.decks[0]._id.toString()
        } else {
            deckId = response._id.toString()
        }
        history.push(`/decks/${deckId}`)
    }

    return (
        <>
            <Container> 
                <PageTitle title="Create your deck" />

                <Form onSubmit={(e) => handleCreateDeck(e)}>
                    <Form.Group as={Row} controlId="create-deck-form-deckname">
                        <Form.Label 
                            className="text-center" 
                            column 
                            sm="12"
                        >
                            Give your deck a name
                        </Form.Label>
                        <Col sm={{span: 6, offset: 3}}>
                            <Form.Control 
                                required 
                                onChange={(event) => props.changeDeckName(event.target.value)} 
                                placeholder="Your deckname" 
                                className="text-center" 
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="create-deck-form-description">
                        <Form.Label 
                            className="text-center" 
                            column 
                            sm="12"
                        >
                            Give {showDeckNameOrThis('your deck')} a description
                        </Form.Label>
                        <Col sm={{span: 6, offset: 3}}>
                            <Form.Control 
                                as="textarea"
                                name="description" 
                                placeholder={`Your description`} 
                                className="text-center" 
                            />
                        </Col>
                    </Form.Group>
                    <Row>
                        <Col sm={{span: 6, offset: 3}}>
                            <CreateButton />
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    )
}

const mapStateToProps = state => {
    return {
        deckName: state.createDeck.deckName,
        isLoading: state.createDeck.isLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeDeckName: (name) => dispatch(changeDeckName(name)),
        createNewDeck: (deck) => dispatch(createDeck(deck)), 
    }
}

export const CreateDeckForm = connect(mapStateToProps, mapDispatchToProps)(CreateDeckFormComponent);