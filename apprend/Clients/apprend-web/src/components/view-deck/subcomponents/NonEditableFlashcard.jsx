import React from "react";
import {connect} from "react-redux";
import {Col, Card} from "react-bootstrap";
import {changeDeckFlashcards} from "../../shared/actions/actions";

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
