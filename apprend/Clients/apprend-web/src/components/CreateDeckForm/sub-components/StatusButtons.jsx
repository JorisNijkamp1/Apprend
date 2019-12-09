import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Form, Row, Col,
         } from 'react-bootstrap'


const StatusButtonsComponent = (props) => {

    return (
        <>
        <Row>
            <Col className="text-center my-3">
                <Form.Check
                    type="switch"
                    id="status-switch"
                    label="Make this deck private"
                    name="status-deck"
                    onChange={props.handleSwitch}
                    />
                <p className="small">You can always change this setting after creation</p>
                
            </Col>
        </Row>

        </>
    )
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export const StatusButtons = connect(mapStateToProps, mapDispatchToProps)(StatusButtonsComponent);