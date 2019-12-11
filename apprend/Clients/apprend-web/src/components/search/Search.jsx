import React, {useEffect} from 'react';
import * as ReactRedux from 'react-redux'
import {NavigatieBar} from '../shared/navbar/NavigatieBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import {Footer} from '../shared/footer/Footer'
import {getHomepageDecks} from '../../redux-store/actions/home/async-actions';
import {Link} from 'react-router-dom';
import {isLoggedIn} from "../../redux-store/actions/login/async-actions";
import SearchDecksInput from "../search-input/SearchDecksInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

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
            <div className={"half-circle"}>

            </div>
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
                    <h1 className={'text-center w-100'}>Results for <b>dutch decks</b></h1>
                </Row>

                <Row className={'mt-5'}>
                    <Col lg={{span: 6}} md={{span: 6}}>
                        <Link to={`/decks/1`} className={'deck-card-link'}>
                            <Card className={'hover-shadow mb-4'}>
                                <Card.Header className={'bg-blue text-white text-center'}><h2>Deck #1 Dutch</h2>
                                </Card.Header>
                                <Card.Body>
                                    <p className={'text-center'} style={{color: '#000'}}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, similique.
                                    </p>
                                    <strong>
                                        <Link id="creator" to={`/Aaron/decks`}>
                                            <FontAwesomeIcon icon={faUser}
                                                             size={'1x'}
                                                             title={`Search`}
                                                             color={'#000'}
                                            />
                                            <span style={{marginLeft: 5, color: '#000'}}>Aaron</span>
                                        </Link>
                                    </strong>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>

                    <Col lg={{span: 6}} md={{span: 6}}>
                        <Link to={`/decks/1`} className={'deck-card-link'}>
                            <Card className={'hover-shadow mb-4'}>
                                <Card.Header className={'bg-blue text-white text-center'}><h2>Deck #2 English</h2>
                                </Card.Header>
                                <Card.Body>
                                    <p className={'text-center'} style={{color: '#000'}}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, similique.
                                    </p>
                                    <strong>
                                        <Link id="creator" to={`/Aaron/decks`}>
                                            <FontAwesomeIcon icon={faUser}
                                                             size={'1x'}
                                                             title={`Search`}
                                                             color={'#000'}
                                            />
                                            <span style={{marginLeft: 5, color: '#000'}}>Aaron</span>
                                        </Link>
                                    </strong>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>

                    <Col lg={{span: 6}} md={{span: 6}}>
                        <Link to={`/decks/1`} className={'deck-card-link'}>
                            <Card className={'hover-shadow mb-4'}>
                                <Card.Header className={'bg-blue text-white text-center'}><h2>Deck #3 Spanish</h2>
                                </Card.Header>
                                <Card.Body>
                                    <p className={'text-center'} style={{color: '#000'}}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, similique.
                                    </p>
                                    <strong>
                                        <Link id="creator" to={`/Aaron/decks`}>
                                            <FontAwesomeIcon icon={faUser}
                                                             size={'1x'}
                                                             title={`Search`}
                                                             color={'#000'}
                                            />
                                            <span style={{marginLeft: 5, color: '#000'}}>Aaron</span>
                                        </Link>
                                    </strong>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>

                    <Col lg={{span: 6}} md={{span: 6}}>
                        <Link to={`/decks/1`} className={'deck-card-link'}>
                            <Card className={'hover-shadow mb-4'}>
                                <Card.Header className={'bg-blue text-white text-center'}><h2>Deck #4 Dutch</h2>
                                </Card.Header>
                                <Card.Body>
                                    <p className={'text-center'} style={{color: '#000'}}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, similique.
                                    </p>
                                    <strong>
                                        <Link id="creator" to={`/Aaron/decks`}>
                                            <FontAwesomeIcon icon={faUser}
                                                             size={'1x'}
                                                             title={`Search`}
                                                             color={'#000'}
                                            />
                                            <span style={{marginLeft: 5, color: '#000'}}>Aaron</span>
                                        </Link>
                                    </strong>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>

                    <Col lg={{span: 6}} md={{span: 6}}>
                        <Link to={`/decks/1`} className={'deck-card-link'}>
                            <Card className={'hover-shadow mb-4'}>
                                <Card.Header className={'bg-blue text-white text-center'}><h2>Deck #5 English</h2>
                                </Card.Header>
                                <Card.Body>
                                    <p className={'text-center'} style={{color: '#000'}}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, similique.
                                    </p>
                                    <strong>
                                        <Link id="creator" to={`/Aaron/decks`}>
                                            <FontAwesomeIcon icon={faUser}
                                                             size={'1x'}
                                                             title={`Search`}
                                                             color={'#000'}
                                            />
                                            <span style={{marginLeft: 5, color: '#000'}}>Aaron</span>
                                        </Link>
                                    </strong>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                </Row>
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
