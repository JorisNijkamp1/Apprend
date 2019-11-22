import React from 'react';
import {connect} from 'react-redux';
import {Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row} from 'react-bootstrap';
import {registerNewUser} from '../redux-store/actions/actions';

export const RegisterPageComponent = props => {
    return (
        <>
            <Container>
                <Row>
                    <Col xs={{'span': 6, 'offset': 3}}>
                        <h3 className={'text-center'}>Register a new account</h3>
                        <Form>
                            <FormGroup>
                                <FormLabel column={false}>Username</FormLabel>
                                <FormControl placeholder={'johndoe'}
                                             type={'text'}
                                             id={'registerUsernameInput'}
                                             required/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel column={false}>E-mail</FormLabel>
                                <FormControl placeholder={'johndoe@foo.com'}
                                             type={'email'}
                                             id={'registerEmailInput'}
                                             required/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel column={false}>Password</FormLabel>
                                <FormControl placeholder={'...'}
                                             type={'password'}
                                             id={'registerPasswordInput'}
                                             required/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel column={false}>Repeat password</FormLabel>
                                <FormControl placeholder={'...'}
                                             type={'password'}
                                             id={'registerRepeatPasswordInput'}
                                             required/>
                            </FormGroup>
                            <Button variant={'primary'}
                                    type={'submit'}
                                    id={'registerSubmitButton'}>Register</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
};

const mapStateToProps = state => {
    return {
        'isLoading': state.register.isLoading,
        'error': state.register.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        'doRegisterNewUser': (username, email, password) => dispatch(registerNewUser(username, email, password))
    }
};

export const RegisterPage = connect(mapStateToProps, mapDispatchToProps)(RegisterPageComponent);