import React, {useState} from 'react';
import {connect} from 'react-redux';
import {NavBar} from "../shared/components/NavBar";
import {Button, Col, Container, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {Footer} from "../shared/components/Footer";
import { isLoggedIn, userLogin } from '../shared/actions/actions'
import {useHistory} from 'react-router'

const LoginPageUI = (props) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await props.userLogin(username, password);
        if (result === 'success') {
            props.isLoggedIn();
            history.push('/');
        } else {
            setErrorMessage(result)
        }
    };

    return (
        <>
            <NavBar/>
            <Container>
                <Row>
                    <Col xs={{'span': 10, 'offset': 1}} md={{'span': 6, 'offset': 3}} className="text-center">
                        <h2 className={'text-center my-5'}>Login to Apprend</h2>
                        <Form name={"login"} onSubmit={handleSubmit}>
                            <FormGroup>
                                <FormLabel column={false}><strong>Enter username</strong></FormLabel>
                                <FormControl placeholder={'Your username'}
                                             type={'text'}
                                             id={'loginUsernameInput'}
                                             required
                                             onChange={(e) => setUsername(e.target.value)}/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel column={false}><strong>Enter password</strong></FormLabel>
                                <FormControl placeholder={'Your password'}
                                             type={'password'}
                                             id={'loginPasswordInput'}
                                             required
                                             onChange={(e) => setPassword(e.target.value)}/>
                            </FormGroup>
                            <FormLabel className={"text-danger w-100"} column={false}>{errorMessage}</FormLabel>
                            <Button className={"w-100"}
                                    type={'submit'}
                                    // variant="primary"
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
        username: state.login.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        isLoggedIn: (username) => dispatch(isLoggedIn(username)),
        userLogin: (username, password) => dispatch(userLogin(username, password)),
    }
}

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPageUI);
