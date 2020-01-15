import React from 'react'
import {Link} from 'react-router-dom'
import { Form, Col, InputGroup, Button, Card, Row } from 'react-bootstrap'

export default props => {
    if (props.state){
        return (
            <>
            <Form onSubmit={e => {
                    e.preventDefault()
                    props.getTagValue()
                }}>
                <Form.Group>
                    <Form.Label><b>Deck tags</b></Form.Label>
                    <Col sm={12}>
                        <ul id="tagList">
                            {(props.deckEdit.data.tags) ? props.deckEdit.data.tags.map((tag) =>
                            <li key={tag} className="listItem" key={`li1=${tag}`}>
                                {tag}
                                <i id='deleteTag' className='fa fa-times tagButton' onClick={() => props.deleteOldTag(tag)}/>
                            </li>) : ""}
                            {props.tags.map((tag) =>
                            <li key={tag} className="listItem" key={`li2-${tag}`}>
                                {tag}
                                <i id='deleteTag' className='fa fa-times tagButton' onClick={() => props.deleteNewTag(tag)}/>
                            </li>)}
                        </ul>
                    </Col>
                    <InputGroup className="mb-3 pt-2">
                        <Form.Control
                            id="tags"
                            placeholder="Add a tag"
                            className="text-center"
                            value={props.value}
                            onChange={e => props.setInput(e.target.value)}
                        />
                        <InputGroup.Append>
                            <Button id={'add-tag-button'} className={'bg-blue text-white hover-shadow'} onClick={() => props.getTagValue()}>Add tag</Button>
                        </InputGroup.Append>
                    </InputGroup>
        
                </Form.Group>
                </Form>
            </>
            )
    } else {
        if (props.deck && props.deck.tags && props.deck.tags.length > 0) {
            const allTags = props.deck.tags.map(tag => (
                    <Col xs={6} md={3} className="text-center my-1" key={`col-${tag}`}>
                        <Card>
                            <Link key={tag} to={`/tags/${tag}`} className={'search-deck-suggestions-link'}>
                                <h6>{tag}</h6>
                            </Link>
                        </Card>
                    </Col>
            ))

            return  (
                <Row>
                    {allTags}
                </Row>
            )
        } else {
            return null
        }
    } 
}