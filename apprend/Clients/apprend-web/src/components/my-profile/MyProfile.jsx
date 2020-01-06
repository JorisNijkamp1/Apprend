import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {NavigatieBar} from "../shared/components/NavigatieBar";
import {Col, Container, Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {FormLabel} from "react-bootstrap/FormLabel";
import {getUser} from "./actions";
import {useParams} from "react-router";

const MyProfileUI = (props) => {
    const {userId} = useParams();
    useEffect(() => {
        console.log(userId)
        props.getUserInfo(userId)
    }, [])

    return (
        <>
            <NavigatieBar/>
            <Container className={"pt-5 pb-5"}>
                <Row>
                    <Form.Label
                        className="text-center"
                        column
                        sm="12"
                    >
                        <h2 className={'text-center'}>Account details</h2>
                    </Form.Label>
                </Row>
                <Row>
                    <Col md={{'span': 12}}>
                        <Form.Label
                            className="text-center"
                            column
                            sm="12"
                        >
                            <b>Username:</b>
                        </Form.Label>
                    </Col>
                    <Col md={{'span': 12}}>
                        <p className={'text-center'}>{props.user._id}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={{'span': 12}}>
                        <Form.Label
                            className="text-center"
                            column
                            sm="12"
                        >
                            <b>Email:</b>
                        </Form.Label>
                    </Col>
                    <Col md={{'span': 12}}>
                        <p className={'text-center'}>{props.user.email}</p>
                    </Col>
                </Row>
                <Row>
                    <Form.Label
                        className="text-center"
                        column
                        sm="12"
                    >
                        <b>Password:</b>
                    </Form.Label>
                </Row>
            </Container>
        </>
    )
};

const mapStateToProps = state => {
    return {
        user: state.client.user,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getUserInfo: (user) => dispatch(getUser(user)),
    }
}

export const MyProfile = connect(mapStateToProps, mapDispatchToProps)(MyProfileUI);