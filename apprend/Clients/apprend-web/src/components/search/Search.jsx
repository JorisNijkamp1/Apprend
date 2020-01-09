import React, {useEffect, useState} from 'react';
import * as ReactRedux from 'react-redux'
import {NavBar} from '../shared/components/NavBar';
import Container from 'react-bootstrap/Container';
import {isLoggedIn, setSearchValue} from "../shared/actions/actions";
import SearchResults from "./subcomponents/SearchResults";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useHistory} from "react-router";

const Search = (props) => {
    const [searchValue, setSearchValue] = useState([]);

    //Check if user is logged in
    useEffect(() => {
        props.isLoggedIn()
    }, []);

    let history = useHistory()
    const onSubmit = (e) => {
        e.preventDefault();
        props.setSearchValue(searchValue)
        history.push(`/search?q=${props.searchValue}`)
    };

    return (
        <>
            <NavBar/>
            <Container>
                <Row>
                    <Col md={{span: 4, offset: 0}} className={'pt-3'}>
                        <h3>Search results</h3>
                        <form onSubmit={(e) => onSubmit(e)}>
                            <input className={'form-control'}
                                   placeholder={'Search'}
                                   onChange={(e) => setSearchValue(e.target.value)}/>
                                   <small>Press <b>enter</b> for all results.</small>
                        </form>
                    </Col>
                </Row>
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
        setSearchValue: (searchValue) => dispatch(setSearchValue(searchValue))
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Search);
