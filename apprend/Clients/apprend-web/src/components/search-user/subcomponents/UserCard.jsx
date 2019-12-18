import React, { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default (props) => {

    const [avatar, setAvatar] = useState('')

    return (
        <Col xs={12} md={3}>
            <NavLink to={`/users/${props.user._id}`}>
        <Card>
            <Row>
                <Col xs={5} style={{'overflow': 'hidden'}}>
                    <img className="w-100" src={`http://localhost:3001/api/v1/images/${props.user.avatar}`} alt="fk"/>
                </Col>
                <Col xs={7}>
                    <Row>
                        <Col xs={12}>
                            <h5> {props.user._id}</h5>
                        </Col>
                        <Col xs={12}>
                            <small>Decks: {props.user.decks}</small>
                        </Col>
                        <Col xs={12}>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
        </NavLink>
        </Col>

    )
}
