import React from "react";
import * as ReactRedux from "react-redux"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";

const NavbarUI = (props) => {
    const logedIn = () => {
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
                    <Nav.Link as={Link} className="text-white pl-30" to={"#"}>
                        Logged in as: <strong>{props.username}</strong>
                    </Nav.Link>
                </>
            )
        }
    }

    return (
        <Navbar className={"bg-green"} expand="lg">
            <Container>
                <Navbar.Brand as={Link} className={"text-white"} to="/"><h1>Apprend</h1></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse className={"justify-content-end"} id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link as={Link} className="text-white pl-30" to="/decks/create">Create
                            Deck</Nav.Link>
                        {logedIn()}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

function mapStateToProps(state) {
    return {
        username: state.login.username,
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export const NavigatieBar = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(NavbarUI);
