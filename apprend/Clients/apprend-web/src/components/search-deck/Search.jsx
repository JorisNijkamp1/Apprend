import React, {useEffect} from 'react';
import * as ReactRedux from 'react-redux'
import {NavBar} from '../shared/components/NavBar';
import Container from 'react-bootstrap/Container';
import {isLoggedIn} from "../shared/actions/actions";
import SearchResults from "./subcomponents/SearchResults";

const Search = (props) => {

    //Check if user is logged in
    useEffect(() => {
        props.isLoggedIn()
    }, []);

    return (
        <>
            <NavBar/>
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
