import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'

export default  (message, deck, funct, stateFunct, property, index) => {
    return (
        <Card.Footer>
            <Row>
                <Col className="text-left" xs={8}>
                    {message}
                </Col>
                <Col xs={2} className="text-center text-green">
                    <FontAwesomeIcon icon={faCheck} name={deck._id}
                                     style={{'cursor': 'pointer'}}
                                     id={`confirm-icon-button-${index}`}
                                     onClick={(event) => {
                                         funct(event)
                                     }}
                    />
                </Col>
                <Col xs={2} className="text-center text-red">
                    <FontAwesomeIcon icon={faTimes} name={deck._id} id={`cancel-icon-button-${index}`}
                                     style={{'cursor': 'pointer'}}
                                     onClick={(event) => {
                                         stateFunct(event, property)
                                     }}/>
                </Col>
            </Row>
        </Card.Footer>
    )
}