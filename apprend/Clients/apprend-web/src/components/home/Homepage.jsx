import React, {useEffect, useState} from 'react';
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
import { LoadingComponent } from '../shared/loader/loader' 

const HomepageUI = (props) => {

    const [isLoading, setisLoading] = useState(false)

    //Check if user is logged in
    useEffect(() => {
        props.isLoggedIn()
    }, []);

    useEffect(() => {
        props.getHomepageDecks(setisLoading);
    }, []);

    const decksHomepage = () => {
        if (props.deckName) {
            console.log(props.deckName)
            return props.deckName.map((deck, index) => (
                <Col lg={{span: 4}} md={{span: 6}} key={deck.name + index}>
                    <Link to={`/decks/${deck._id}`} className={'deck-card-link'}>
                        <Card className={'hover-shadow mb-4'}>
                            <Card.Header className={'bg-blue text-white text-center'}><h2>{deck.name}</h2>
                            </Card.Header>
                            <Card.Body>
                                <p className={'text-center'} style={{color: '#000'}}>
                                    {deck.description}
                                </p>
                                <strong>
                                    <Link id="creator" to={`/${deck.creatorId}/decks`}>
                                        <FontAwesomeIcon icon={faUser}
                                                         size={'1x'}
                                                         title={`Search`}
                                                         color={'#f00'}
                                        />
                                    <span style={{marginLeft: 5, color: '#000'}}>{deck.creatorId}</span>
                                    </Link>
                                </strong>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            ));
        }
    };

    const showContent = () => {
        if (isLoading){
            return <LoadingComponent giveClass="my-5" loadingText="Loading some decks..." />
        } else if (props.deckName){
            return (
                <>
                <Row className={'mt-7'}>
                    <Col className=" text-center">
                        <h1>Random decks for you!</h1>
                        <p>Here are some decks from users you could play</p>
                    </Col>
                </Row>

                <Row className={'mt-5'}>
                    {decksHomepage()}
                </Row>
                </>
            )
        } else {
            return <h2>We couldn't find any decks</h2>
        }
    }

    return (
        <>
            <NavigatieBar/>
            <div className={"half-circle"}>
                <svg className="wave" preserveAspectRatio="none" viewBox="0 0 1440 95"
                     xmlns="http://www.w3.org/2000/svg">
                    <g stroke="none" strokeWidth="1">
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

                <div className={'pt-3 pb-5'}>
                    <SearchDecksInput linkTo={`/search?q=${props.searchValue}`}/>
                </div>

                {showContent()}

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
        getHomepageDecks: (funct) => dispatch(getHomepageDecks(funct)),
    }
}

export const Homepage = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(HomepageUI);
