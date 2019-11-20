import React from "react";
import * as ReactRedux from "react-redux"
import {NavigatieBar} from "../shared/navbar/NavigatieBar";
import Container from "react-bootstrap/Container";

function HomepageUI(props) {
    return (
        <Container>
            <NavigatieBar/>
        </Container>
    )
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export const Homepage = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(HomepageUI);
