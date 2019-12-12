import React, {useEffect} from 'react';
import * as ReactRedux from 'react-redux'
import {NavigatieBar} from '../shared/navbar/NavigatieBar';
import Container from 'react-bootstrap/Container';
import {getHomepageDecks} from '../../redux-store/actions/home/async-actions';
import {isLoggedIn} from "../../redux-store/actions/login/async-actions";
import SearchResults from "./SearchResults";

const Search = (props) => {

    //Check if user is logged in
    useEffect(() => {
        props.isLoggedIn()
    }, []);

    useEffect(() => {
        props.getHomepageDecks();
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
        getHomepageDecks: (deckName) => dispatch(getHomepageDecks(deckName)),
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Search);
