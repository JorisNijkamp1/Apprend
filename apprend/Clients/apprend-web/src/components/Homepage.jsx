import React from "react";
import * as ReactRedux from "react-redux"

function HomepageUI(props) {
    return <h1>Test</h1>
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export const Homepage = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(HomepageUI);
