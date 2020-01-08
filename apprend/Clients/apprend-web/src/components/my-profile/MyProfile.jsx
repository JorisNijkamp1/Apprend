import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {NavigatieBar} from "../shared/components/NavigatieBar";
import {Card, Col, Container, Form, FormControl, FormGroup, FormText} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {FormLabel} from "react-bootstrap/FormLabel";
import {getUser} from "./actions";
import {useParams} from "react-router";
import Button from "react-bootstrap/Button";
import {setAccountDetailsAction, deleteUserAction} from "./actions";
import {
    emailValid,
    passwordValid,
    repeatPasswordValid,
    usernameValid
} from "../../util/form-validation/validationRules";
import {checkEmailExists} from "../register/actions";
import {Notification} from '../shared/components/Notification';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {logoutAction} from "../shared/actions/actions";
import {useHistory} from 'react-router'

const MyProfileUI = (props) => {
    const {userId} = useParams();
    const history = useHistory();
    const [editAccountDetails, setEditAccountDetails] = useState(false);
    const [editEmail, setEditEmail] = useState('');

    const [editPassword, setEditPassword] = useState('');
    const [editRepeatPassword, setEditRepeatPassword] = useState('');

    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        props.getUserInfo(userId)
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        props.setAccountDetails(props.user._id, editEmail, editPassword);
        setEditAccountDetails(false);
        setEditPassword(false);
        Notification('Changes saved', 'success'
        )
    };

    const deleteUser = async () => {
        const response = await props.deleteUser(userId);
        props.logout();
        Notification(response, "success");
        history.push('/');
    }

    const confirmationBox = () => {
        if (confirm) {
            return (
                <Row>
                    <Col md={{span: 2, offset: 5}} className="text-center mt-4" xs={8}>
                        Are you sure?
                        <Col className="text-green">
                            <FontAwesomeIcon icon={faCheck} name={'check'} id={"green"}
                                             onClick={() => {
                                                 deleteUser()
                                             }}/>
                        </Col>
                        <Col className="text-red">
                            <FontAwesomeIcon icon={faTimes} name={'times'} id={"red"}
                                             onClick={() => {
                                                 setConfirm(false);
                                             }}/>
                        </Col>
                    </Col>

                </Row>
            )
        }
    };

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
                            <Button
                                disabled={false}
                                type={'submit'}
                                variant="outline-warning"
                                className={'mr-2'}
                                onClick={() => {
                                    setEditAccountDetails(false);
                                    setEditPassword(false);
                                }}
                            >Cancel</Button>
                            {(maySubmitEmail(editEmail) || props.emailExists) ?
                                <Button
                                    disabled={false}
                                    type={'submit'}
                                    variant="outline-primary"
                                    className={'ml-2'}
                                >Confirm</Button> :
                                <Button
                                    disabled={true}
                                    type={'submit'}
                                    variant="outline-primary"
                                    className={'ml-2'}
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
                            <Button
                                disabled={false}
                                type={'submit'}
                                variant="outline-warning"
                                className={'mr-2'}
                                onClick={() => {
                                    setEditAccountDetails(false);
                                    setEditPassword(false);
                                }}
                            >Cancel</Button>
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
                        <Col className={'justify-content-center di-f'}>
                            <Button
                                variant="outline-success"
                                className={'pull-right mr-3'}
                                onClick={() => {
                                    setEditAccountDetails(true)
                                }}>Edit account details</Button>
                            <Button
                                variant="outline-primary"
                                className={'ml-2'}
                                onClick={() => {
                                    setEditPassword(true)
                                }}>Change password</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{span: 4, offset: 4}} className={'mt-4'}>
                            <Button
                                variant={'outline-danger'}
                                className={'w-100'}
                                onClick={() => {
                                    setConfirm(true);
                                }}>
                                Delete account
                            </Button>
                        </Col>
                    </Row>
                    {confirmationBox()}
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
        deleteUser: (username) => dispatch(deleteUserAction(username)),
        logout: () => dispatch(logoutAction()),
    }
}

export const MyProfile = connect(mapStateToProps, mapDispatchToProps)(MyProfileUI);