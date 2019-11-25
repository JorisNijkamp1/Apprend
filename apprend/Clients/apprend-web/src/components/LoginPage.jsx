import React, {useState} from 'react';
import {connect} from 'react-redux';
import {NavigatieBar} from "./shared/navbar/NavigatieBar";
import {Button, Col, Container, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {Footer} from "./shared/footer/Footer";
import {userLogin} from "../redux-store/actions/login/async-actions";

const LoginPageUI = (props) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.userLogin(username, password);
    };

    return (
        <>
            <NavigatieBar/>
            <Container className={"pt-5 pb-5"}>
                <Row>
                    <Col xs={{'span': 10, 'offset': 1}} md={{'span': 6, 'offset': 3}}>
                        <h3 className={'text-center'}>Login with your account</h3>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <FormLabel column={false}>Username</FormLabel>
                                <FormControl placeholder={'johndoe'}
                                             type={'text'}
                                             id={'loginUsernameInput'}
                                             required
                                             onChange={(e) => setUsername(e.target.value)}/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel column={false}>Password</FormLabel>
                                <FormControl placeholder={'...'}
                                             type={'password'}
                                             id={'loginPasswordInput'}
                                             required
                                             onChange={(e) => setPassword(e.target.value)}/>
                            </FormGroup>
                            <Button variant={'primary'}
                                    type={'submit'}
                                    id={'loginSubmitButton'}>Login</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </>
    )
}

const mapStateToProps = state => {
    return {
        username: state.login.username,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userLogin: (username, password) => dispatch(userLogin(username, password)),
    }
}

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPageUI);