import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const PlayingCard = (props) => {
    const handleClick = (event, status) => {
        event.preventDefault();
        props.changeScore(props.id, status);
    }

    const turnCard = () => {
        let element = document.getElementById("card");
        element.classList.toggle("flipped");
    }

    return (
    <>
    <Container>
        <Card className={"flipCard"}>
            <Card.Header className={"bg-blue text-white text-center"}>
                Card
            </Card.Header>
            <div className="card" id="card" onClick={(e) => turnCard(e)}>
                <Card.Body className={"side"}>
                    {props.front}
                </Card.Body>
                <Card.Body className={"side back"}>
                    {props.back}
                </Card.Body>
            </div>
        </Card>
        <Row className={"row justify-content-between"}>
            <Col lg={{span: 4}}>
                <Button className={"btn btn-block btn-green"} onClick={(e) => handleClick(e, "correct")}>Correct</Button>
            </Col>
            <Col lg={{span: 4}}>
                <Button className={"btn btn-block btn-red"} onClick={(e) => handleClick(e, "wrong")}>Wrong</Button>
            </Col>
        </Row>
    </Container>
    </>
    )
}

export default PlayingCard;