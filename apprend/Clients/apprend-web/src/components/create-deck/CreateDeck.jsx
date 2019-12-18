import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Container, Form, Row, Col, Button, InputGroup } from 'react-bootstrap'
import { changeDeckName, addTag, deleteTag } from './actions'
import { PageTitle } from '../shared/components/PageTitle'
import { createDeck } from './actions'
import { CreateButton } from './subcomponents/CreateButton';
import { useHistory } from 'react-router'
import { NavigatieBar } from '../shared/components/NavigatieBar';
import { Footer } from '../shared/components/Footer';
import { StatusButtons } from './subcomponents/StatusButtons'
import { Notification } from '../shared/components/Notification';
import TypeList from './subcomponents/TypeList'

const CreateDeckFormComponent = (props) => {

    const [status, setStatus] = useState(false)
    const [deckName, setDeckName] = useState('')
    const [typeOne, setTypeOne] = useState('Text')
    const [typeTwo, setTypeTwo] = useState('Text')

    useEffect(() => {
        props.changeDeckName('')
    }, [])

    const history = useHistory()

    const showDeckNameOrThis = (text) => deckName ? <b>'{deckName}'</b> : text

    const handleSwitch = (e) => {
        console.log(status)
        setStatus(!status)
    }

    const handleCreateDeck = async (e) => {
        try {
            e.preventDefault()
            const deck = {
                deckName: deckName,
                description: e.target.description.value,
                private: status,
                tags: props.tags,
                columns: [typeOne, typeTwo]
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
            return tag === tagValue.trim()
        });
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
                    props.addTag(tagValue);
                    match = false;
                } else {
                    Notification("You can't add an empty tag");
                }
            }
        } else {
            if (tagValue.trim() !== "") {
                props.addTag(tagValue);
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
                                onChange={(event) => setDeckName(event.target.value)} 
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
                        <Col xs={12} className="text-center">
                            <p> What sides do you want? </p>
                            <small>You can change or add more later!</small>
                        </Col>
                        <Col xs={6} md={{span: 3, offset: 3}}>
                            <TypeList func={setTypeOne} selected={typeOne} text="Side 1"/>
                        </Col>
                        <Col xs={6} md={3}>
                            <TypeList func={setTypeTwo} selected={typeTwo} text="Side 2"/>
                        </Col>
                    </Row>
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
                            <ul id="tagList">
                                {props.tags.map((tag) => <li key={tag} className="listItem">
                                    {tag}
                                    <i id='deleteTag' className='fa fa-times tagButton' onClick={() => props.deleteTag(tag)}/>
                                </li>)}
                            </ul>
                        </Col>
                    </Form.Group>
                    <Row>
                        <Col sm={{span: 6, offset: 3}}>
                            <CreateButton deckName={deckName}/>
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

export const CreateDeck = connect(mapStateToProps, mapDispatchToProps)(CreateDeckFormComponent);