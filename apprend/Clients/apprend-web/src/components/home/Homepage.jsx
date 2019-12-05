import React, {useEffect} from 'react';
import * as ReactRedux from 'react-redux'
import {NavigatieBar} from '../shared/navbar/NavigatieBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {Footer} from '../shared/footer/Footer'
import {getHomepageDecks} from '../../redux-store/actions/home/async-actions';
import {Link} from 'react-router-dom';
import {isLoggedIn} from "../../redux-store/actions/login/async-actions";

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
            <div className={"half-circle"}>
                <svg className="wave" preserveAspectRatio="none" viewBox="0 0 1440 95"
                     xmlns="http://www.w3.org/2000/svg">
                    <g stroke="none" stroke-width="1">
                        <g transform="translate(0.000000, -475.000000)">
                            <path
                                d="M1440,475.58902 L1440,570 L0,570 L0,476.754103 C202.386092,535.456501 450.250742,570 718,570 C987.51583,570 1236.8838,534.99917 1440,475.58902 Z"></path>
                        </g>
                    </g>
                </svg>
            </div>
            <Container>
                <Row className={"mt-4"}>
                    <Col lg={{span: 8, offset: 2}}>
                        <div className="mx-auto text-white pt-5">
                            <h1 className="display-5 text-center">Welcome back to <strong>Apprend</strong>!</h1>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={{span: 6, offset: 3}} xs={{span: 12}} md={{span: 10, offset: 1}}>
                        <InputGroup className="mb-3 pt-2">
                            <FormControl
                                placeholder="Search for a Deck"
                                aria-label="Search bar"
                                aria-describedby="Search"
                            />
                            <InputGroup.Append>
                                <Button className={'bg-green text-white hover-shadow'}>Submit</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className={'mt-10 mb-5'}>
                    {decksHomepage()}
                </Row>
            </Container>
            <Footer/>
        </>
    )
}

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
