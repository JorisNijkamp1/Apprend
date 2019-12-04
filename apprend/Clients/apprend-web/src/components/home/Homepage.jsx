import React, {useEffect} from 'react';
import * as ReactRedux from 'react-redux'
import {NavigatieBar} from '../shared/navbar/NavigatieBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {Footer} from '../shared/footer/Footer'
import {getHomepageDecks} from '../../redux-store/actions/home/async-actions';
import {Link} from 'react-router-dom';
import {isLoggedIn} from "../../redux-store/actions/login/async-actions";
import {SearchDecksInput} from "../search-input/SearchDecksInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

const HomepageUI = (props) => {

    //Check if user is logged in
    useEffect(() => {
        props.isLoggedIn()
    }, []);

    useEffect(() => {
        props.getHomepageDecks();
    }, []);

    const decksHomepage = () => {
        if (props.deckName) {
            return props.deckName.map((deck, index) => (
                <Col lg={{span: 4}} md={{span: 6}} key={deck.deckName + index}>
                    <Card className={'hover-shadow mb-4'}>
                        <Card.Header className={'bg-blue text-white text-center'}><h2>{deck.deckName}</h2></Card.Header>
                        <Card.Body>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label column={true}
                                            className={'text-center'}>
                                    {deck.deckDescription}
                                </Form.Label>
                                <Form.Label column={true}
                                            className={''}>
                                    <strong>
                                        <Link id="creator" to={`/${deck.deckUserId}/decks`}>
                                            {deck.deckCreator}
                                        </Link>
                                    </strong>
                                </Form.Label>
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
            ));
        }
    };

    return (
        <>
            <NavigatieBar/>
            <Container>
                <Row>
                    <Col lg={{span: 8, offset: 2}}>
                        <div className="mx-auto text-green pt-5">
                            <h1 className="display-5 text-center">Welcome back to <strong>Apprend</strong>!</h1>
                        </div>
                    </Col>
                </Row>
                <Row className={'pt-3'}>
                    <Col xs={{span: 8}} md={{span: 8, offset: 1}} lg={{span: 6, offset: 2}}>
                        <InputGroup className="mb-3">
                            <SearchDecksInput/>
                        </InputGroup>
                    </Col>
                    <Col xs={{span: 2}} md={{span: 2}} lg={{span: 2}}>
                        <InputGroup.Append>
                            <Button className={'bg-blue text-white hover-shadow'}>
                                <FontAwesomeIcon icon={faSearch}
                                                 className={'trash-icon'}
                                                 size={'1x'}
                                                 title={`Search`}
                                />
                                <span className={'ml-1'}>Search</span>
                            </Button>
                        </InputGroup.Append>
                    </Col>
                </Row>
                <Row className={'mt-5 mb-5'}>
                    {decksHomepage()}
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
    }
}

function mapDispatchToProps(dispatch) {
    return {
        isLoggedIn: () => dispatch(isLoggedIn()),
        getHomepageDecks: (deckName) => dispatch(getHomepageDecks(deckName)),
    }
}

export const Homepage = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(HomepageUI);
