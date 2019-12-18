import React from "react";
import * as ReactRedux from "react-redux"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import {logoutAction} from "../../shared/actions/actions";
import {Notification} from "./Notification";

const NavbarUI = (props) => {

    const logout = () => {
        if (!props.anonymousUser) {
            return (
                <>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item id={"logout-btn"} onClick={() => {
                        props.logout()
                        Notification("You successfully logged out!", "success")
                    }}>Logout</NavDropdown.Item>
                </>
            )
        }
    };

    const register = () => {
        if (props.anonymousUser) {
            return (
                <>
                    <Nav.Link as={Link} className="pl-30" to="/register">
                        Register
                    </Nav.Link>
                </>
            )
        }
    };

    const login = () => {
        if (props.anonymousUser) {
            return (
                <>
                    <Nav.Link as={Link} className="pl-30" to="/login">
                        Login
                    </Nav.Link>
                </>
            )
        }
    };

    const loggedIn = () => {
        if (props.username === null) {
            return (
                <>
                    <Nav.Link as={Link} className="text-white pl-30" to="/login">
                        Login
                    </Nav.Link>
                    <Nav.Link as={Link} className="text-white pl-30" to="/register">
                        Register
                    </Nav.Link>
                </>
            )
        } else {
            return (
                <>
                    <NavDropdown title={props.anonymousUser ? 'Welcome Guest' : 'Welcome ' + props.username}
                                 id="basic-nav-dropdown" className="text-white pl-30">
                        <Nav.Link as={Link} className="pl-30" to={'/' + props.username + '/decks'}>My Decks</Nav.Link>
                        <Nav.Link as={Link} className="pl-30" to={'/profile/' + props.username}>My Profile</Nav.Link>
                        {login()}
                        {register()}
                        {logout()}
                    </NavDropdown>
                </>
            )
        }
    }

    return (
        <Navbar className={"bg-nav"} expand="lg">
            <Container>
                <Navbar.Brand as={Link} className={"text-white"} to="/"><h1>Apprend</h1></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse className={"justify-content-end"} id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link as={Link} className="text-white pl-30" to="/decks/create">Create
                            Deck</Nav.Link>
                        {loggedIn()}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

function mapStateToProps(state) {
    return {
        username: state.login.username,
        anonymousUser: state.login.anonymousUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logoutAction()),
    }
}

export const NavigatieBar = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(NavbarUI);
