import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Col, Container, Form, FormText, Table} from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import {FormLabel} from 'react-bootstrap/FormLabel';
import {getUser} from './actions';
import {useParams} from 'react-router';
import {NavBar} from '../shared/components/NavBar';
import Button from 'react-bootstrap/Button';
import {setAccountDetailsAction, deleteUserAction} from './actions';
import {
    passwordValid,
    repeatPasswordValid
} from '../../util/form-validation/validationRules';
import {checkEmailExists} from '../register/actions';
import {Notification} from '../shared/components/Notification';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faEdit, faTimes} from '@fortawesome/free-solid-svg-icons';
import {logoutAction} from '../shared/actions/actions';
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
        Notification(response, 'success');
        history.push('/');
    }

    const confirmationBox = () => {
        if (confirm) {
            return (
                <Row>
                    <Col md={{span: 2, offset: 5}} className="text-center mt-4" xs={8}>
                        Are you sure?
                        <Col className="text-green">
                            <FontAwesomeIcon icon={faCheck} name={'check'} id={'green'}
                                             onClick={() => {
                                                 deleteUser()
                                             }}/>
                        </Col>
                        <Col className="text-red">
                            <FontAwesomeIcon icon={faTimes} name={'times'} id={'red'}
                                             onClick={() => {
                                                 setConfirm(false);
                                             }}/>
                        </Col>
                    </Col>

                </Row>
            )
        }
    };


    const maySubmitPassword = function (password, repeatPassword) {
        return repeatPasswordValid(password, repeatPassword);
    };

    const accountDetails = () => {
        if (editAccountDetails) {
            return (
                <Form onSubmit={(e) => onSubmit(e)}>
                    <Row>
                        <Col md={{span: 6, offset: 3}} className={'mt-3 mb-3'}>
                            <Table bordered>
                                <tbody>
                                <tr>
                                    <td><b>Username</b></td>
                                    <td>{props.user._id}</td>
                                </tr>
                                <tr>
                                    <td><b>E-mail</b></td>
                                    <td>
                                        <Form.Control type="email"
                                                      id={'formEmail'}
                                                      name={userId}
                                                      placeholder={'Enter your new email!'}
                                                      onChange={(e) => setEditEmail(e.target.value)}
                                                      onBlur={() => {
                                                          props.doCheckEmailExists(editEmail)
                                                      }}
                                                      isInvalid={props.emailExists}
                                        />
                                        {(props.emailExists) ?
                                            <FormText className="text-muted" id={'emailExistsWarning'}>
                                                '{editEmail}' is already in use!
                                            </FormText> : ''}
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'d-flex justify-content-center'}>
                            <Button
                                disabled={false}
                                type={'submit'}
                                variant="warning"
                                className={'mr-2'}
                                onClick={() => {
                                    setEditAccountDetails(false);
                                    setEditPassword(false);
                                }}
                            >Cancel</Button>
                            {(props.emailExists || !editEmail) ?
                                <Button
                                    disabled={true}
                                    type={'submit'}
                                    variant="primary"
                                    className={'ml-2'}
                                    id={'confirm'}
                                >Confirm</Button> :
                                <Button
                                    disabled={false}
                                    type={'submit'}
                                    id={'confirm'}
                                    variant="primary"
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
                                    <b>New password</b>
                                </Form.Label>
                            </Col>
                            <Col md={{'span': 12}} className={'mb-3'}>
                                <Form.Control type="password"
                                              name={userId}
                                              id={'password'}
                                              placeholder={'Password'}
                                              onChange={(e) => setEditPassword(e.target.value)}
                                              isValid={passwordValid(editPassword)}
                                />
                            </Col>
                            <Col md={{'span': 12}}>
                                <Form.Label className="text-center" column sm="12">
                                    <b>Repeat password</b>
                                </Form.Label>
                            </Col>
                            <Col md={{'span': 12}}>
                                <Form.Control type="password"
                                              id={'repeat-password'}
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
                                variant="warning"
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
                                    id={'confirm'}
                                    variant="primary"
                                    className={''}
                                >Confirm</Button> :
                                <Button
                                    disabled={true}
                                    type={'submit'}
                                    id={'confirm'}
                                    variant="primary"
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
                        <Col md={{span: 6, offset: 3}} className={'mt-3 mb-3'}>
                            <Table bordered>
                                <tbody>
                                <tr>
                                    <td><b>Username</b></td>
                                    <td>{props.user._id}</td>
                                </tr>
                                <tr>
                                    <td><b>E-mail</b></td>
                                    <td>
                                        {props.user.email}
                                        <FontAwesomeIcon
                                            icon={faEdit}
                                            className={'float-right mt-1 color-green cursor-pointer pointer'}
                                            onClick={() => {
                                                setEditAccountDetails(true)
                                            }}
                                            id={'edit-account'}
                                            size={`${props.buttonSize ? props.buttonSize : 1}x`}
                                        />
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'justify-content-center di-f'}>
                            <Button
                                variant="primary"
                                id={'change-password'}
                                onClick={() => {
                                    setEditPassword(true)
                                }}>Change password</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'justify-content-center di-f mt-4'}>
                            <Button
                                variant={'danger'}
                                id={'delete-account'}
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
            <NavBar/>
            <Container className={'pt-5 pb-5'}>
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
