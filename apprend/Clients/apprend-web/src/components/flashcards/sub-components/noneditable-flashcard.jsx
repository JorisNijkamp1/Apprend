import React, {useState} from "react";
import {connect} from "react-redux";
import {Row, Col, Form, Card, Alert} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faCheck, faTimes} from '@fortawesome/free-solid-svg-icons'
import {changeDeckFlashcards} from "../../../redux-store/actions/flashcards/actions";
import {store} from 'react-notifications-component';

const NonEditableFlashcard = (props) => {
    return (
        <>
            <Col className={"mb-5"} xs={12} md={6} lg={4} id={'flashcard-' + props.flashcardId}>
                <Card text={'dark'}>
                    {/*<Card.Header className={"text-center"}>*/}
                    {/*    <b>{flashcardName}</b>*/}
                    {/*</Card.Header>*/}
                    <Card.Body>
                        <Card.Title>Term</Card.Title>
                        <Card.Text><b>{props.term}</b></Card.Text>
                        <hr/>
                        <Card.Title>Definition</Card.Title>
                        <Card.Text><b>{props.definition}</b></Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
};

const mapStateToProps = state => {
    return {
        deckFlashcards: state.flashcards.deckFlashcards,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeDeckFlashcards: (flashcards) => dispatch(changeDeckFlashcards(flashcards)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NonEditableFlashcard);
