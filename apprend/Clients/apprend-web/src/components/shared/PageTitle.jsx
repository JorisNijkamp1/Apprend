import React from 'react'
import { Row, Col } from "react-bootstrap"

export const PageTitle = props => {
    return (
        <>
            <Row>
                <Col>
                    <h2 className="text-center">
                        {props.title}
                    </h2>
                </Col>
            </Row>
        </>
    )
}