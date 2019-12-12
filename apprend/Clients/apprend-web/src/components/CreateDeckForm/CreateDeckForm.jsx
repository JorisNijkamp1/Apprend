import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Container, Form, Row, Col, Button, InputGroup } from 'react-bootstrap'
import { changeDeckName, addTag, deleteTag } from '../../redux-store/actions/create-deck/actions'
import { PageTitle } from '../shared/PageTitle'
import { createDeck } from '../../redux-store/actions/create-deck/async-actions'
import { CreateButton } from './sub-components/CreateButton';
import { useHistory } from 'react-router'
import { NavigatieBar } from '../shared/navbar/NavigatieBar';
import { Footer } from '../shared/footer/Footer';
import { StatusButtons } from './sub-components/StatusButtons'
import { Notification } from '../shared/notification/Notification';

const CreateDeckFormComponent = (props) => {

    const [status, setStatus] = useState(false)

    useEffect(() => {
        props.changeDeckName('')
    }, [])

    const history = useHistory()

    const showDeckNameOrThis = (text) => props.deckName ? <b>'{props.deckName}'</b> : text

    const handleSwitch = (e) => {
        console.log(status)
        setStatus(!status)
    }

    const handleCreateDeck = async (e) => {
        try {
            e.preventDefault()
            const deck = {
                deckName: props.deckName,
                description: e.target.description.value,
                private: status,
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

    const checkAdded = tagValue => {
        return props.tags.some(tag => {
            return tag === tagValue
        });
    }

    const addListItem = name => {
        props.addTag(name);
        let tagList = document.getElementById('tagList');
        let entry = document.createElement('li');
        let button = document.createElement('i');
        entry.className = "listItem"
        button.innerHTML = "<i id='deleteTag' class='fa fa-times tagButton'/>";
        button.addEventListener ("click", e => {
            e.preventDefault();
            props.deleteTag(name);
            tagList.removeChild(entry);
        });
        entry.appendChild(document.createTextNode(name));
        entry.appendChild(button);
        tagList.appendChild(entry);
    }

    const getTagValue = () => {
        let tagValue = document.getElementById("tags").value;
        document.getElementById("tags").value = "";
        let match = false;
        if (props.tags.length !== 0) {
            if (checkAdded(tagValue)){
                Notification("You already have that tag");
            } else {
                match = true;
            }
            if (match === true) {
                if (tagValue.trim() !== "") {
                    addListItem(tagValue);
                    match = false;
                } else {
                    Notification("You can't add an empty tag");
                }
            }
        } else {
            if (tagValue.trim() !== "") {
                addListItem(tagValue);
            } else {
                Notification("You can't add an empty tag");
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
                    <StatusButtons handleSwitch={handleSwitch} />
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
                                    <Button id="addTag" className={'bg-blue text-white hover-shadow'} onClick={() => getTagValue()}>Add tag</Button>
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