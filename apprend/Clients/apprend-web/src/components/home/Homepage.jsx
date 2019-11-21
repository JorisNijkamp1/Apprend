import React, {useEffect, useState} from "react";
import * as ReactRedux from "react-redux"
import {NavigatieBar} from "../shared/navbar/NavigatieBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import {Footer} from "../shared/footer/Footer"
import {getHomepageDecks} from "../../redux-store/actions/home/async-actions";

const HomepageUI = (props) => {

    useEffect(() => {
        getHomepageDecks();
    });

    return (
        <>
            <NavigatieBar/>
            <Container>
                <Row>
                    <Col lg={{span: 8, offset: 2}}>
                        <div className="mx-auto text-green pt-5">
                            <h1 className="display-5 text-center">Welcome back to school, and
                                by <strong>Apprend</strong>!</h1>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={{span: 6, offset: 3}} xs={{span: 12}} md={{span: 10, offset: 1}}>
                        <Form.Label column={12} className={"text-center pt-5"}><h3>Search for a Deck!</h3>
                        </Form.Label>
                    </Col>
                    <Col lg={{span: 6, offset: 3}} xs={{span: 12}} md={{span: 10, offset: 1}}>
                        <InputGroup className="mb-3 pt-2">
                            <FormControl
                                placeholder="Search for a Deck"
                                aria-label="Search bar"
                                aria-describedby="Search"
                            />
                            <InputGroup.Append>
                                <Button className={"bg-blue text-white hover-shadow"}>Submit</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className={"mt-5 mb-5"}>
                    <Col lg={{span: 4}} md={{span: 6}}>
                        <Card className={"hover-shadow"}>
                            <Card.Header className={"bg-blue text-white"} style={{textAlign: 'center'}}>Deck
                                #1</Card.Header>
                            <Card.Body>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label column={true}
                                                className={"text-center"}>
                                        This Deck contains cool words about nothing
                                    </Form.Label>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={{span: 4}} md={{span: 6}}>
                        <Card className={"hover-shadow"}>
                            <Card.Header className={"bg-blue text-white"} style={{textAlign: 'center'}}>Deck
                                #2</Card.Header>
                            <Card.Body>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label column={true}
                                                className={"text-center"}>
                                        This Deck contains cool words about nothing
                                    </Form.Label>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={{span: 4}} md={{span: 6}}>
                        <Card className={"hover-shadow"}>
                            <Card.Header className={"bg-blue text-white"} style={{textAlign: 'center'}}>Deck
                                #3</Card.Header>
                            <Card.Body>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label column={true}
                                                className={"text-center"}>
                                        This Deck contains cool words about nothing
                                    </Form.Label>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </>
    )
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export const Homepage = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(HomepageUI);
