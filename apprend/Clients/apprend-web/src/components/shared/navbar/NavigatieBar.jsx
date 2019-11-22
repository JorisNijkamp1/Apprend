import React from "react";
import * as ReactRedux from "react-redux"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container";

const NavbarUI = (props) => {
    return (

        <Navbar className={"bg-green"} expand="lg">
            <Container>
                <Navbar.Brand className={"text-white"} href="/"><h1>Apprend</h1></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse className={"justify-content-end"} id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link className="text-white pl-30" href="/decks/create">Create
                            Deck</Nav.Link>
                        <Nav.Link className="text-white pl-30" href="/login">
                            Login
                        </Nav.Link>
                        <Nav.Link className="text-white pl-30" href="/register">
                            Register
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export const NavigatieBar = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(NavbarUI);
