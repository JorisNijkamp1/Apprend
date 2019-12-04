import React from 'react'
import { Row, Col } from "react-bootstrap"

export const PageTitle = props => {
    return (
        <>
            <Row className="my-2 my-lg-5" >
                <Col xs={12}>
                    <h1 className="text-center">
                        {props.title}
                    </h1>
                </Col>
            </Row>
        </>
    )
}