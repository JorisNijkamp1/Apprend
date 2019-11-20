import React from "react";
import * as ReactRedux from "react-redux"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/esm/Container";

const NavbarUI = (props) => {
    return (
        <Navbar expand="lg" className={"bg-green"}>
            <Container>
                <Navbar.Brand className={"text-white"} href="#"><h1>Apprend</h1></Navbar.Brand>
                <Nav>
                    <Nav.Link className="text-white pl-30" href="#">Create Deck</Nav.Link>
                    <Nav.Link className="text-white pl-30" href="#">Login</Nav.Link>
                    <Nav.Link className="text-white pl-30" href="#">Register</Nav.Link>
                </Nav>
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
