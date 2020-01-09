import React, {useEffect, useState} from 'react';
import * as ReactRedux from 'react-redux'
import {NavBar} from '../shared/components/NavBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Footer} from '../shared/components/Footer'
import {getHomepageDecks} from './actions';
import {Link} from 'react-router-dom';
import {isLoggedIn} from '../shared/actions/actions'
import SearchDecksInput from "../shared/components/SearchInput";
import {LoadingComponent} from '../shared/components/LoadingComponent'

const HomepageUI = (props) => {

    const [isLoading, setisLoading] = useState(false)

    //Check if user is logged in
    useEffect(() => {
        props.isLoggedIn()
        props.getHomepageDecks(setisLoading);

    }, []);

    const deckTags = (tags) => {
        if (tags) {
            return tags.map((tag, index) => {
                    if (index <= 3) {
                        return (
                            <span className={'badge badge-light text-center'} style={{color: '#000', margin: '0 10px',}}>
                                    {tag}
                                </span>

                        )
                    } else {
                        return null
                    }
                }
            )
        } else {
            return null
        }
    }

    const decksHomepage = () => {
        if (props.deckName) {
            return props.deckName.map((deck, index) => (
                <Col className={"my-md-3 my-4 my-lg-0"} lg={{span: 4}} md={{span: 6}} key={deck.name + index}>
                    <Link to={`/decks/${deck._id}`} className={'deck-card-link'} id={'card-' + index}>
                        <div className={`card-animation`}>
                            <div className={"imgBx"}>
                                <h2>{deck.name}</h2>
                                <strong>
                                    <Link id="creator" to={`/${deck.creatorId}/decks`}>
                                        <span style={{marginLeft: 5, color: '#fff'}}>Made by {deck.creatorId}</span>
                                    </Link>
                                </strong>
                                <div className={"amount-flashcards"}>
                                    {deck.flashcards.length}
                                </div>
                            </div>
                            <div className={"details"}>
                                <>
                                    <p className={'text-center description-cutoff'} style={{color: '#000'}}>
                                        {deck.description}
                                    </p>
                                    <Row className={"justify-content-center"}>
                                        {deckTags(deck.tags)}
                                    </Row>
                                </>
                            </div>
                        </div>
                    </Link>
                </Col>
            ));
        }
    };

    const showContent = () => {
        if (isLoading) {
            return <LoadingComponent giveClass="my-5" loadingText="Loading some decks..."/>
        } else if (props.deckName && props.deckName.length > 0) {
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
            return (
                <Row className="mt-7">
                    <Col className="text-center">
                        <h2>We couldn't find any decks</h2>
                    </Col>
                </Row>
            )
        }
    }

    return (
        <>
            <NavBar/>
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
            <Container className={"pb-5"}>
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
