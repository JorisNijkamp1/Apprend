import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Button, Col, Container, Form, FormControl, FormGroup, FormLabel, FormText, Row} from 'react-bootstrap';
import {checkEmailExists, registerNewUser} from '../../redux-store/actions/register/async-actions';
import {PageTitle} from '../shared/PageTitle';
import {NavigatieBar} from '../shared/navbar/NavigatieBar';
import {Footer} from '../shared/footer/Footer';
import {checkUsernameExists} from '../../redux-store/actions/register/async-actions';
import {
    emailValid,
    passwordValid,
    repeatPasswordValid,
    usernameValid,
    registerFormMaySubmit
} from '../../redux-store/form-validation/validationRules';
import {isLoggedIn} from "../../redux-store/actions/login/async-actions";
import {useHistory} from 'react-router'


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

    useEffect(() => {
        if (props.username) {
            history.push('/');
        }
    });

    const handleSubmit = event => {
        event.preventDefault();
        props.doRegisterNewUser(username, email, password);
    };

    return (
        <>
            <NavigatieBar/>
            <Container>
                <Row>
                    <Col xs={{'span': 6, 'offset': 3}} className={'py-5'}>
                        <PageTitle title={'Register a new user'}/>
                        {(props.newUserRegistered) ?
                            <p className={'bg-success text-white text-center rounded p-2'}>
                                You registered a new account! Log in <a href="/login">here</a>.
                            </p> : ''}
                        {(props.error !== null) ?
                            <p className={'bg-danger text-white text-center rounded p-2'}>{props.error}</p> : ''}
                        <Form>
                            <FormGroup>
                                <FormLabel column={false}>Username</FormLabel>
                                <FormControl placeholder={'e.g. johndoe'}
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
                                <FormLabel column={false}>E-mail</FormLabel>
                                <FormControl placeholder={'e.g. johndoe@foo.com'}
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
                                <FormLabel column={false}>Password</FormLabel>
                                <FormControl placeholder={'...'}
                                             type={'password'}
                                             id={'registerPasswordInput'}
                                             onChange={(event) => setPassword(event.target.value)}
                                             isValid={passwordValid(password)}
                                             required/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel column={false}>Repeat password</FormLabel>
                                <FormControl placeholder={'...'}
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
                                        onClick={(event) => handleSubmit(event)}>Register</Button> :
                                <Button className={'mx-auto'}
                                        variant={'primary'}
                                        type={'submit'}
                                        id={'registerSubmitButton'}
                                        disabled
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
        'newUserRegistered': state.register.newUserRegistered,
        'usernameExists': state.register.usernameExists,
        'emailExists': state.register.emailExists,
        'isLoading': state.register.isLoading,
        'error': state.register.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        'doRegisterNewUser': (username, email, password) => dispatch(registerNewUser(username, email, password)),
        'doCheckUsernameExists': username => dispatch(checkUsernameExists(username)),
        'doCheckEmailExists': email => dispatch(checkEmailExists(email)),
        isLoggedIn: () => dispatch(isLoggedIn()),
    }
};

export const RegisterPage = connect(mapStateToProps, mapDispatchToProps)(RegisterPageComponent);
