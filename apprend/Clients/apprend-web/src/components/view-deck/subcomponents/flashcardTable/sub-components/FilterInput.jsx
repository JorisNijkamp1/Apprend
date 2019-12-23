import React from 'react'
import { Col, Row } from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

export default props => {

    return (
        <>
            <Row>
                <Col>
                    <input
                        className="form-control"
                        name="filter-flashcards"
                        id="filter-flashcards"
                        placeholder="filter..."
                        onChange={(e) => props.func(e)}
                        />
                </Col>
            </Row>
        </>
    )
}