import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Button, Col, Container, Form, FormControl, FormGroup, FormLabel, FormText, Row} from 'react-bootstrap';
import {checkEmailExists, registerNewUser} from './actions';
import {PageTitle} from '../shared/components/PageTitle';
import {NavBar} from '../shared/components/NavBar';
import {Footer} from '../shared/components/Footer';
import {checkUsernameExists} from './actions';
import {
    emailValid,
    passwordValid,
    repeatPasswordValid,
    usernameValid,
    registerFormMaySubmit
} from '../../util/form-validation/validationRules';
import {isLoggedIn, userLogin} from '../shared/actions/actions';
import {useHistory} from 'react-router-dom';

export const RegisterPageComponent = props => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [repeatPassword, setRepeatPassword] = useState();
    const history = useHistory();

    //Check if user is logged in
    useEffect(() => {
        props.isLoggedIn()
    }, []);

    //If user is already logged in
    useEffect(() => {
        if (!props.anonymousUser) {
            history.push('/');
        }
    });

    const handleSubmit = event => {
        event.preventDefault();
        props.doRegisterNewUser(username, email, password);
    };

    if (props.newUserRegistered) {
        if (props.anonymousUser) {
            props.doLogin(username, password);
        }
    }

    return (
        <>
            <NavBar/>
            <Container>
                <Row>
                    <Col xs={{'span': 12}} md={{'span': 6, 'offset': 3}}>
                        <PageTitle title={'Register a new user'}/>
                        {(props.newUserRegistered) ?
                            <p className={'bg-success text-white text-center rounded p-2'}>
                                You registered a new account! Log in <a href="/login">here</a>.
                            </p> : ''}
                        {(props.error !== null) ?
                            <p className={'bg-danger text-white text-center rounded p-2'}>{props.error}</p> : ''}
                        <Form className={'text-center'}>
                            <FormGroup>
                                <FormLabel column={false}><b>Username</b></FormLabel>
                                <FormControl placeholder={'Enter username'}
                                             type={'text'}
                                             id={'registerUsernameInput'}
                                             onChange={(event) => setUsername(event.target.value)}
                                             onBlur={() => props.doCheckUsernameExists(username)}
                                             isValid={usernameValid(username)}
                                             isInvalid={props.usernameExists}
                                             required/>
                                {(props.usernameExists) ? <FormText className="text-muted" id={'usernameExistsWarning'}>
                                    '{username}' is already in use!
                                </FormText> : ''}
                            </FormGroup>
                            <FormGroup>
                                <FormLabel column={false}><b>Email</b></FormLabel>
                                <FormControl placeholder={'Enter email'}
                                             type={'email'}
                                             id={'registerEmailInput'}
                                             onChange={(event) => setEmail(event.target.value)}
                                             onBlur={() => props.doCheckEmailExists(email)}
                                             isValid={emailValid(email)}
                                             isInvalid={props.emailExists}
                                             required/>
                                {(props.emailExists) ? <FormText className="text-muted" id={'emailExistsWarning'}>
                                    '{email}' is already in use!
                                </FormText> : ''}
                            </FormGroup>
                            <FormGroup>
                                <FormLabel column={false}><b>Password</b></FormLabel>
                                <FormControl placeholder={'Enter password'}
                                             type={'password'}
                                             id={'registerPasswordInput'}
                                             onChange={(event) => setPassword(event.target.value)}
                                             isValid={passwordValid(password)}
                                             required/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel column={false}><b>Repeat password</b></FormLabel>
                                <FormControl placeholder={'Repeat password'}
                                             type={'password'}
                                             id={'registerRepeatPasswordInput'}
                                             onChange={(event) => setRepeatPassword(event.target.value)}
                                             isValid={repeatPasswordValid(password, repeatPassword)}
                                             required/>
                            </FormGroup>
                            {(registerFormMaySubmit(username, email, password, repeatPassword)) ?
                                <Button className={'mx-auto'}
                                        variant={'primary'}
                                        type={'submit'}
                                        id={'registerSubmitButton'}
                                        className="w-100"
                                        onClick={(event) => handleSubmit(event)}>Register</Button> :
                                <Button className={'mx-auto'}
                                        variant={'primary'}
                                        type={'submit'}
                                        id={'registerSubmitButton'}
                                        disabled
                                        className="w-100"
                                        onClick={(event) => handleSubmit(event)}>Register</Button>}
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </>
    )
};

const mapStateToProps = state => {
    return {
        username: state.login.username,
        anonymousUser: state.login.anonymousUser,
        'newUserRegistered': state.register.newUserRegistered,
        'usernameExists': state.register.usernameExists,
        'emailExists': state.register.emailExists,
        'isLoading': state.register.isLoading,
        'error': state.register.error,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        'doRegisterNewUser': (username, email, password) => dispatch(registerNewUser(username, email, password)),
        'doCheckUsernameExists': username => dispatch(checkUsernameExists(username)),
        'doCheckEmailExists': email => dispatch(checkEmailExists(email)),
        'doLogin': (username, password) => dispatch(userLogin(username, password)),
        'isLoggedIn': () => dispatch(isLoggedIn())
    }
};

export const RegisterPage = connect(mapStateToProps, mapDispatchToProps)(RegisterPageComponent);
