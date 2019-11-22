import React from 'react';
import { connect } from 'react-redux';
import { Container, Form, Row, Col, 
        Button
         } from 'react-bootstrap'

import { changeDeckName } from '../../redux-store/actions/create-deck/actions'

import { PageTitle } from '../shared/PageTitle'
import {NavigatieBar} from "../shared/navbar/NavigatieBar";
import {Footer} from "../shared/footer/Footer";

const CreateDeckFormComponent = (props) => {

    const showDeckNameOrThis = (text) => props.deckName ? <b>'{props.deckName}'</b> : text

    const handleCreateDeck = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <NavigatieBar/>
            <Container className={"pt-5 pb-5"}>
                <PageTitle  title="Create your deck" />

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
                            <Button 
                                className="w-100" 
                                variant="primary" 
                                type="submit"
                                disabled={props.deckName ? false: true}
                            >
                                {props.deckName ? 'Create deck!' : 'Please fill in a deckname'}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <Footer/>
        </>
    )
}

const mapStateToProps = state => {
    return {
        deckName: state.createDeck.deckName,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeDeckName: (name) => dispatch(changeDeckName(name)),
    }
}

export const CreateDeckForm = connect(mapStateToProps, mapDispatchToProps)(CreateDeckFormComponent);