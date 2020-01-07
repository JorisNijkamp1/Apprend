import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {NavigatieBar} from "../shared/components/NavigatieBar";
import {Col, Container, Form, FormControl, FormGroup, FormText} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {FormLabel} from "react-bootstrap/FormLabel";
import {getUser} from "./actions";
import {useParams} from "react-router";
import Button from "react-bootstrap/Button";
import {setAccountDetailsAction} from "./actions";
import {
    emailValid,
    passwordValid,
    repeatPasswordValid,
    usernameValid
} from "../../util/form-validation/validationRules";
import {checkEmailExists} from "../register/actions";
import {Notification} from '../shared/components/Notification';

const MyProfileUI = (props) => {
    const {userId} = useParams();

    const [editAccountDetails, setEditAccountDetails] = useState(false);
    const [editEmail, setEditEmail] = useState('');

    const [editPassword, setEditPassword] = useState('');
    const [editRepeatPassword, setEditRepeatPassword] = useState('');

    useEffect(() => {
        props.getUserInfo(userId)
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        props.setAccountDetails(props.user._id, editEmail, editPassword);
        setEditAccountDetails(false);
        setEditPassword(false);
        Notification('Changes saved', 'success')
    }

    const maySubmitEmail = function (email) {
        return emailValid(email);
    };

    const maySubmitPassword = function (password, repeatPassword) {
        return repeatPasswordValid(password, repeatPassword);
    };

    const accountDetails = () => {
        if (editAccountDetails) {
            return (
                <Form onSubmit={(e) => onSubmit(e)}>
                    <Row className={'d-flex justify-content-center'}>
                        <Col md={{'span': 12}}>
                            <Form.Label className="text-center" column sm="12">
                                <b>Username:</b>
                            </Form.Label>
                        </Col>
                        <Col md={{'span': 12}}>
                            <p className={'text-center'}>{props.user._id}</p>
                        </Col>
                    </Row>
                    <Row className={'d-flex justify-content-center'}>
                        <Form.Group controlId="formEmail" className={'text-center'}>
                            <Col md={{'span': 12}}>
                                <Form.Label className="text-center" column sm="12">
                                    <b>Email:</b>
                                </Form.Label>
                            </Col>
                            <Col md={{'span': 12}}>
                                <Form.Control type="text"
                                              name={userId}
                                              placeholder={'Email'}
                                              defaultValue={props.user.email}
                                              onChange={(e) => setEditEmail(e.target.value)}
                                              onBlur={() => {
                                                  props.doCheckEmailExists(editEmail)
                                              }}
                                              isValid={emailValid(editEmail)}
                                              isInvalid={props.emailExists}
                                />
                                {(props.emailExists) ? <FormText className="text-muted" id={'emailExistsWarning'}>
                                    '{editEmail}' is already in use!
                                </FormText> : ''}
                            </Col>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col className={'d-flex justify-content-center'}>
                            {(maySubmitEmail(editEmail) || props.emailExists) ?
                                <Button
                                    disabled={false}
                                    type={'submit'}
                                    variant="outline-primary"
                                    className={''}
                                >Confirm</Button> :
                                <Button
                                    disabled={true}
                                    type={'submit'}
                                    variant="outline-primary"
                                    className={''}
                                >Confirm</Button>
                            }
                        </Col>
                    </Row>
                </Form>
            )
        } else if (editPassword) {
            return (
                <Form onSubmit={(e) => onSubmit(e)}>
                    <Row className={'d-flex justify-content-center'}>
                        <Form.Group controlId="formPassword" className={'text-center'}>
                            <Col md={{'span': 12}}>
                                <Form.Label className="text-center" column sm="12">
                                    <b>New password:</b>
                                </Form.Label>
                            </Col>
                            <Col md={{'span': 12}} className={'mb-3'}>
                                <Form.Control type="password"
                                              name={userId}
                                              placeholder={'Password'}
                                              onChange={(e) => setEditPassword(e.target.value)}
                                              isValid={passwordValid(editPassword)}
                                />
                            </Col>
                            <Col md={{'span': 12}}>
                                <Form.Label className="text-center" column sm="12">
                                    <b>Repeat password:</b>
                                </Form.Label>
                            </Col>
                            <Col md={{'span': 12}}>
                                <Form.Control type="password"
                                              name={userId}
                                              placeholder={'Password'}
                                              onChange={(event) => setEditRepeatPassword(event.target.value)}
                                              isValid={repeatPasswordValid(editPassword, editRepeatPassword)}
                                />
                            </Col>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col className={'d-flex justify-content-center'}>
                            {(maySubmitPassword(editPassword, editRepeatPassword)) ?
                                <Button
                                    disabled={false}
                                    type={'submit'}
                                    variant="outline-primary"
                                    className={''}
                                >Confirm</Button> :
                                <Button
                                    disabled={true}
                                    type={'submit'}
                                    variant="outline-primary"
                                    className={''}
                                >Confirm</Button>
                            }
                        </Col>
                    </Row>
                </Form>
            )
        } else {
            return (
                <>
                    <Row>
                        <Col md={{'span': 12}}>
                            <Form.Label className="text-center" column sm="12">
                                <b>Username:</b>
                            </Form.Label>
                        </Col>
                        <Col md={{'span': 12}}>
                            <p className={'text-center'}>{props.user._id}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{'span': 12}}>
                            <Form.Label className="text-center" column sm="12">
                                <b>Email:</b>
                            </Form.Label>
                        </Col>
                        <Col md={{'span': 12}}>
                            <p className={'text-center'}>{props.user.email}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button
                                variant="outline-success"
                                className={'pull-right'}
                                onClick={() => {
                                    setEditAccountDetails(true)
                                }}>Edit account deatils</Button>
                        </Col>
                        <Col>
                            <Button
                                variant="outline-primary"
                                className={''}
                                onClick={() => {
                                    setEditPassword(true)
                                }}>Change password</Button>
                        </Col>
                    </Row>
                </>
            )
        }
    };

    return (
        <>
            <NavigatieBar/>
            <Container className={"pt-5 pb-5"}>
                <Row>
                    <Form.Label className="text-center" column sm="12">
                        <h2 className={'text-center'}>Account details</h2>
                    </Form.Label>
                </Row>
                {accountDetails()}
            </Container>
        </>
    )
};

const mapStateToProps = state => {
    return {
        user: state.client.user,
        emailExists: state.register.emailExists,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getUserInfo: (user) => dispatch(getUser(user)),
        setAccountDetails: (username, email, password) => dispatch(setAccountDetailsAction(username, email, password)),
        doCheckEmailExists: (email) => dispatch(checkEmailExists(email)),
    }
}

export const MyProfile = connect(mapStateToProps, mapDispatchToProps)(MyProfileUI);