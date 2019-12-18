import React, {useEffect} from 'react';
import * as ReactRedux from 'react-redux'
import {NavigatieBar} from '../shared/NavigatieBar';
import Container from 'react-bootstrap/Container';
import {isLoggedIn} from "../../../src_old/redux-store/actions/login/async-actions";
import SearchResults from "./subcomponents/SearchResults";

const Search = (props) => {

    //Check if user is logged in
    useEffect(() => {
        props.isLoggedIn()
    }, []);

    return (
        <>
            <NavigatieBar/>
            <Container>
                <SearchResults/>
            </Container>
        </>
    )
};

function mapStateToProps(state) {
    return {
        username: state.login.username,
        deckName: state.client.decksHome,
        searchValue: state.search.searchValue,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        isLoggedIn: () => dispatch(isLoggedIn()),
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Search);
