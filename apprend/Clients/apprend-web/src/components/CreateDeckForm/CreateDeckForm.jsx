import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Form, Row, Col, Button, InputGroup } from 'react-bootstrap'
import { changeDeckName, addTag, deleteTag } from '../../redux-store/actions/create-deck/actions'
import { PageTitle } from '../shared/PageTitle'
import { createDeck } from '../../redux-store/actions/create-deck/async-actions'
import { CreateButton } from './sub-components/CreateButton';
import { useHistory } from 'react-router'
import { NavigatieBar } from '../shared/navbar/NavigatieBar';
import { Footer } from '../shared/footer/Footer';
import { store } from 'react-notifications-component';

const CreateDeckFormComponent = (props) => {

    useEffect(() => {
        props.changeDeckName('')
    }, [])

    const history = useHistory()

    const showDeckNameOrThis = (text) => props.deckName ? <b>'{props.deckName}'</b> : text

    const handleCreateDeck = async (e) => {
        try {
            e.preventDefault()
            const deck = {
                deckName: props.deckName,
                description: e.target.description.value,
                tags: props.tags
            }
            const response = await props.createNewDeck(deck)
            let deckId;
            if (response){
                if (response.decks){
                    deckId = response.decks[0]._id.toString()
                } else {
                    deckId = response._id.toString()
                }
                history.push(`/decks/${deckId}/cards/`)
            } else {
                throw Error('Something went wrong')
            }
        } catch (e) {
            console.log(e)
        }
    }

    const getTagValue = () => {
        let tagValue = document.getElementById("tags").value;
        document.getElementById("tags").value = "";
        let match = false;
        console.log(props.tags)
        if (props.tags.length !== 0) {
            console.log('nee')
            props.tags.forEach(tag => {
                console.log('1')
                if (tag === tagValue) {
                    return <Row>
                        {store.addNotification({
                            title: "You already have that tag",
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
                console.log('2')
                return match = true;
            })
            if (match === true) {
                if (tagValue.trim() !== "") {
                    props.addTag(tagValue);
                    let tagList = document.getElementById('tagList');
                    let entry = document.createElement('li');
                    let button = document.createElement('button');
                    button.innerHTML = "Delete tag";
                    button.className = "tagButton btn btn-blue hover-shadow";
                    button.addEventListener ("click", (e) => {
                        e.preventDefault();
                        props.deleteTag(tagValue);
                        tagList.removeChild(entry);
                    });
                    entry.appendChild(document.createTextNode(tagValue));
                    entry.appendChild(button);
                    tagList.appendChild(entry);
                    match = false;
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
        } else {
            console.log('ja')
            if (tagValue.trim() !== "") {
                props.addTag(tagValue);
                let tagList = document.getElementById('tagList');
                let entry = document.createElement('li');
                let button = document.createElement('button');
                button.innerHTML = "Delete tag";
                button.className = "tagButton btn btn-blue hover-shadow";
                button.addEventListener ("click", (e) => {
                    e.preventDefault();
                    props.deleteTag(tagValue);
                    tagList.removeChild(entry);
                });
                entry.appendChild(document.createTextNode(tagValue));
                entry.appendChild(button);
                tagList.appendChild(entry);
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
    }

    return (
        <>
            <NavigatieBar/>
            <Container className={"pt-5 pb-5"}>
                <PageTitle  title="Create your deck" />

                <Form name="create-deck" onSubmit={(e) => handleCreateDeck(e)}>
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
                    <Form.Group as={Row}>
                        <Form.Label 
                            className="text-center" 
                            column 
                            sm="12"
                        >
                            Give {showDeckNameOrThis('your deck')} tags
                        </Form.Label>
                        <Col sm={{span: 6, offset: 3}}>
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
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
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
                    <Row>
                        <Col sm={{span: 6, offset: 3}}>
                            <CreateButton />
                        </Col>
                    </Row>
                </Form>
            </Container>
            <Footer />
        </>
    )
}

const mapStateToProps = state => {
    return {
        deckName: state.createDeck.deckName,
        isLoading: state.createDeck.isLoading,
        tags: state.createDeck.tags
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeDeckName: (name) => dispatch(changeDeckName(name)),
        createNewDeck: (deck) => dispatch(createDeck(deck)),
        addTag: (tag) => dispatch(addTag(tag)),
        deleteTag: (tag) => dispatch(deleteTag(tag))
    }
}

export const CreateDeckForm = connect(mapStateToProps, mapDispatchToProps)(CreateDeckFormComponent);