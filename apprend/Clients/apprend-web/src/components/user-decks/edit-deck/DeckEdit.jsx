import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {NavigatieBar} from "../../shared/navbar/NavigatieBar";
import {Footer} from "../../shared/footer/Footer";
import {Button, Container, Form, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {getDeckEditAction} from "../../../redux-store/actions/decks/async-actions";
import {useParams} from "react-router-dom";
import {setDeckEditAction} from "../../../redux-store/actions/decks/actions";
import {setDeckEditedAction} from "../../../redux-store/actions/decks/async-actions";
import {Link} from "react-router-dom";

const DeckEditUI = (props) => {
    const [deckName, setDeckname] = useState('');
    const [deckNameEdited, setDecknameEdited] = useState(false);

    const [deckDescription, setDeckDescription] = useState('');
    const [deckDescriptionEdited, setDeckDescriptionEdited] = useState(false);

    let {deckId} = useParams();

    useEffect(() => {
        props.getDecksEdit(deckId)
    }, []);

    const deckData = {
        deckName: (!deckNameEdited && props.deckEdit.name) ? props.deckEdit.name : deckName,
        deckDescription: (!deckDescriptionEdited && props.deckEdit.description) ? props.deckEdit.description : deckDescription
    }

    return (
        <>
            <NavigatieBar/>
            <Container className={"pt-5 pb-5"}>
                <Card style={{backgroundColor: "#EEEEEE"}} className={'pt-3'} text={'dark'}>
                    <Card.Header style={{backgroundColor: "#EEEEEE"}}>
                        <Card.Title>
                            Edit deck
                            <Link to={`/decks/${props.deckEdit._id}`}>
                                <Button className={'float-right'}
                                        onClick={() => {
                                            console.log(props.deckEdit.creatorId);
                                            console.log(props.deckEdit._id)
                                            console.log(deckData.deckName)
                                            console.log(deckData.deckDescription)
                                            props.setDeckEditedAction(props.deckEdit.creatorId, props.deckEdit._id, deckData.deckName, deckData.deckDescription)
                                        }}
                                        name={"save-deck"}
                                >Save deck</Button>
                            </Link>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Row className={"justify-content-center align-items-center"}>
                            <Col xs={12} md={10} lg={8}>
                                <Card className={'mb-4 hover-shadow-editable-flashcard'}
                                      text={'dark'}>
                                    <Card.Header className={"text-center"}>
                                        <b>Deck van {props.deckEdit.creatorId}</b>
                                        <span className={"float-right"}></span>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Edit your deck</Form.Label>
                                            <Form.Control type="text"
                                                          name="name"
                                                          placeholder="Haustiere"
                                                          value={deckData.deckName}
                                                          onChange={(e) => {
                                                              setDeckname(e.target.value)
                                                              setDecknameEdited(true)
                                                          }}
                                            />
                                            <Form.Text className="text-muted">
                                                Change here your deckname
                                            </Form.Text>
                                            <hr/>
                                            <Form.Label>Deck description</Form.Label>
                                            <Form.Control type="text"
                                                          as="textarea"
                                                          name="description"
                                                          value={deckData.deckDescription}
                                                          className="text-center"
                                                          onChange={(e) => {
                                                              setDeckDescription(e.target.value)
                                                              setDeckDescriptionEdited(true)
                                                          }}
                                            />
                                            <Form.Text className="text-muted">
                                                Change here you deck description
                                            </Form.Text>
                                        </Form.Group>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
            <Footer/>
        </>
    )
}

const mapStateToProps = state => {
    return {
        deckEdit: state.decks.deckEdit
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDecksEdit: (deckId) => dispatch(getDeckEditAction(deckId)),
        setDeckEditedAction: (creatorId, _id, deckName, deckDescription) => dispatch(setDeckEditedAction(creatorId, _id, deckName, deckDescription))
    }
}

export const DeckEdit = connect(mapStateToProps, mapDispatchToProps)(DeckEditUI);
