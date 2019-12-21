import React from 'react'
import { Row, Col, Form } from 'react-bootstrap'

export default (props) => {
    return (
        <>
        <Row>
            <Col className="text-center my-3">
                <Form.Check
                    type="switch"
                    id="status-switch"
                    label={props.label}
                    name="status-deck"
                    defaultChecked={props.state ? true : false}
                    onChange={props.handleSwitch}
                    />
                    <p className="small">{props.text}</p>

            </Col>
        </Row>

        </>
    )
}