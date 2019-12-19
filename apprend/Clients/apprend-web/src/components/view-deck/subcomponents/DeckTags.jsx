import React from 'react'
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
                            {(props.deck.tags) ? props.deck.tags.map((tag) =>
                            <li key={tag} className="listItem">
                                {tag}
                                <i id='deleteTag' className='fa fa-times tagButton' onClick={() => props.deleteTag(tag)}/>
                            </li>) : ""}
                            {props.tags.map((tag) =>
                            <li key={tag} className="listItem">
                                {tag}
                                <i id='deleteTag' className='fa fa-times tagButton' onClick={() => props.deleteTag(tag)}/>
                            </li>)}
                        </ul>
                    </Col>
                    <InputGroup className="mb-3 pt-2">
                        <Form.Control
                            id="tags"
                            placeholder="Add a tag"
                            className="text-center"
                        />
                        <InputGroup.Append>
                            <Button className={'bg-blue text-white hover-shadow'} onClick={() => props.getTagValue()}>Add tag</Button>
                        </InputGroup.Append>
                    </InputGroup>
        
                </Form.Group>
                </Form>
            </>
            )
    } else {
        if (props.deck && props.deck.tags && props.deck.tags.length > 0) {

            const allTags = props.deck.tags.map(tag => (
                <>
                    <Col sm={6} md={3} className="text-center my-1">
                        <Card>
                        <h6>{tag}</h6>

                        </Card>
                    </Col>
                </>
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