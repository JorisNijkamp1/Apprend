import React, {useEffect} from "react";
import * as ReactRedux from "react-redux"
import {NavigatieBar} from "../shared/navbar/NavigatieBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useParams} from "react-router-dom";
import {Footer} from "../shared/footer/Footer"
import {getUserDecks} from "../../redux-store/actions/flashcards/async-actions";

const MyDeck = (props) => {
    let {username} = useParams();

    useEffect(() => {
        getUserDecks(username)
    }, []);

    return (
        <>
            <NavigatieBar/>
            <Container>
                <Row>
                    <Col lg={{span: 8, offset: 2}}>
                        <div className="mx-auto text-green pt-5">
                            <h1 className="display-5 text-center">
                                Your own decks
                            </h1>
                        </div>
                    </Col>
                </Row>
                <Row>

                </Row>
            </Container>
            <Footer/>
        </>
    )
};

function mapStateToProps(state) {
    return {
        deckName: state.client.decksHome,
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(MyDeck);
