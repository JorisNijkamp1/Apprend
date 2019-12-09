import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {NavigatieBar} from "../../shared/navbar/NavigatieBar";
import {Footer} from "../../shared/footer/Footer";
import {Button, Container, Form, Row, InputGroup} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {getDeckEditAction} from "../../../redux-store/actions/decks/async-actions";
import {useParams} from "react-router-dom";
import {setDeckEditAction, deleteTag} from "../../../redux-store/actions/decks/actions";
import {setDeckEditedAction} from "../../../redux-store/actions/decks/async-actions";
import {Link} from "react-router-dom";
import { PageTitle } from '../../shared/PageTitle';
import { addTag, clearTags } from '../../../redux-store/actions/create-deck/actions';
import { store } from 'react-notifications-component';

const DeckEditUI = (props) => {
    const [deckName, setDeckname] = useState('');
    const [deckNameEdited, setDecknameEdited] = useState(false);

    const [deckDescription, setDeckDescription] = useState('');
    const [deckDescriptionEdited, setDeckDescriptionEdited] = useState(false);

    let {deckId} = useParams();

    useEffect(() => {
        props.getDecksEdit(deckId)
        .then((response) => {
            if (response.tags !== 0) {
                response.tags.forEach(tag => {
                    makeList(tag);
                })
            }
        })
    }, []);

    const makeList = (name) => {
        let tagList = document.getElementById('tagList');
        let entry = document.createElement('li');
        let button = document.createElement('button');
        button.innerHTML = "Delete tag";
        button.className = "tagButton btn btn-blue hover-shadow";
        button.addEventListener ("click", (e) => {
            e.preventDefault();
            props.deleteTag(name);
            tagList.removeChild(entry);
        });
        entry.appendChild(document.createTextNode(name));
        entry.appendChild(button);
        tagList.appendChild(entry);
    }

    const deckData = {
        deckName: (!deckNameEdited && props.deckEdit.name) ? props.deckEdit.name : deckName,
        deckDescription: (!deckDescriptionEdited && props.deckEdit.description) ? props.deckEdit.description : deckDescription,
        oldDeckTags: props.deckEdit.tags,
        newDeckTags: props.tags
    }

    const getTagValue = () => {
        console.log(props.tags)
        let tagValue = document.getElementById("tags").value;
        document.getElementById("tags").value = "";
        props.tags.forEach(tag => {
            console.log(tag)
            console.log(tagValue)
            if (tag === tagValue) {
                console.log('hoi')
            }
        })
        if (tagValue.trim() !== "") {
            props.addTag(tagValue);
            makeList(tagValue);
        } else {
            return <Row>
            {store.addNotification({
                title: "You can't add an empty tag",
                message: " ",
                type: "info",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "bounceIn"],
                animationOut: ["animated", "bounceOut"],
                dismiss: {
                    duration: 3000
                },
                width: 250
            })}
        </Row>
        }
    }

    const saveDeck = () => {
        props.setDeckEditedAction(props.deckEdit.creatorId, props.deckEdit._id, deckData.deckName, deckData.deckDescription, deckData.oldDeckTags, deckData.newDeckTags)
        props.clearTags()
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
                                        onClick={() =>
                                            saveDeck()
                                        }
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
                                        <hr/>
                                        <Form.Group>
                                            <Form.Label>Deck tags</Form.Label>
                                            <InputGroup className="mb-3 pt-2">
                                                <Form.Control
                                                    id="tags"
                                                    placeholder="Your tags"
                                                    className="text-center"
                                                />
                                                <InputGroup.Append>
                                                    <Button className={'bg-blue text-white hover-shadow'} onClick={() => getTagValue()}>Add tag</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                            <Form.Text className="text-muted">
                                                Change here you deck tags
                                            </Form.Text>
                                            <Form.Label 
                                                className="text-center" 
                                                column 
                                                sm="12"
                                            >
                                                Your tags
                                            </Form.Label>
                                            <Col sm={{span: 6, offset: 3}}>
                                                <ul id="tagList"></ul>
                                            </Col>
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
        deckEdit: state.decks.deckEdit,
        tags: state.createDeck.tags
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDecksEdit: (deckId) => dispatch(getDeckEditAction(deckId)),
        setDeckEditedAction: (creatorId, _id, deckName, deckDescription, oldTags, newTags) => dispatch(setDeckEditedAction(creatorId, _id, deckName, deckDescription, oldTags, newTags)),
        addTag: (tag) => dispatch(addTag(tag)),
        deleteTag: (tag) => dispatch(deleteTag(tag)),
        clearTags: () => dispatch(clearTags())
    }
}

export const DeckEdit = connect(mapStateToProps, mapDispatchToProps)(DeckEditUI);
