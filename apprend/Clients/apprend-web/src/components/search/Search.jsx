import React, {useEffect} from 'react';
import * as ReactRedux from 'react-redux'
import {NavigatieBar} from '../shared/navbar/NavigatieBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Footer} from '../shared/footer/Footer'
import {getHomepageDecks} from '../../redux-store/actions/home/async-actions';
import {isLoggedIn} from "../../redux-store/actions/login/async-actions";
import SearchDecksInput from "../search-input/SearchDecksInput";
import InfiniteScrollResults from "./LazyLoad";

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
            <div className={"half-circle"}/>
            <Container>
                <Row className={"mt-4"}>
                    <Col lg={{span: 8, offset: 2}}>
                        <div className="mx-auto text-white pt-5">
                            <h1 className="display-5 text-center">Welcome back to <strong>Apprend</strong>!</h1>
                        </div>
                    </Col>
                </Row>

                <div className={'pt-3 pb-5'}>
                    <SearchDecksInput linkTo={`/search?q=${props.searchValue}`}/>
                </div>

                <Row className={'mt-7'}>
                    <h1 className={'text-center w-100'}>Results for <b><i>dutch decks</i></b></h1>
                </Row>

                <InfiniteScrollResults/>

            </Container>
            <Footer/>
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
