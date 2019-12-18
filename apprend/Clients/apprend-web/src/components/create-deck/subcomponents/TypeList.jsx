import React from 'react'
import {  Row, Col, Button } from 'react-bootstrap'


export default (props) => {

    const options = ['Text', 'Image', 'Audio']

    const showAllOptions = (options) => {
        return options.map(option => (
            <Col xs={12} className="text-center my-1">
                <Button className="w-100" variant={props.selected === option ? 'primary' : 'outline-primary'} onClick={() => props.func(option)}>{option}</Button>
            </Col>
        ))
    }

    return (
        <>
            <Row>
                <Col xs={12} className="text-center">
                    {props.text ? <b>{props.text}</b> : <> </>}
                </Col>
                {showAllOptions(options)}
            </Row>
        </>
    )
}