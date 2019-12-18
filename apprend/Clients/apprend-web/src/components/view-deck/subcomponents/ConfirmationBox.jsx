import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'

export default  (props) => {
    return (
        <>
            <Row>
                <Col className={props.colClass}>
                    <Card className={`${props.boxClass} text-center`} bg="light">
                        <Row>
                            <Col xs={8}>
                                <h5>{props.message}</h5>
                            </Col>
                            <Col xs={2} className="text-center">
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    size={`2x`}
                                    onClick={props.func}
                                    className="text-green"
                                    name={`confirm-${props.actionName}-icon-button`}
                                    id={`confirm-${props.actionName}-icon-button`}
                                    />
                            </Col>
                            <Col xs={2} className="text-center">
                            <FontAwesomeIcon
                                    icon={faTimes}
                                    size={`2x`}
                                    onClick={props.cancelFunc}
                                    className="text-red"
                                    name={`cancel-${props.actionName}-icon-button`}
                                    id={`cancel-${props.actionName}-icon-button`}

                                    />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    )
}