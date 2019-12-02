import React, {useState} from "react";
import {Container, Row, Col, Button, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCreativeCommonsSa} from "@fortawesome/free-brands-svg-icons";


const PlayingCard = (props) => {
    const [cardText, setCardText] = useState("Term");
    const handleClick = (event, status) => {
        event.preventDefault();
        props.changeScore(props.id, status);
    }

    const turnCard = () => {
        let element = document.getElementById("card");
        element.classList.toggle("flipped");
        if (cardText === "Term") {
            setCardText("Definition")
        } else if (cardText === "Definition") {
            setCardText("Term")
        }
    }

    return (
    <>
    <Container>
        <Card className={"flipCard"}>
            <Card.Header className={"bg-blue text-white text-center"}>
                {cardText}
                <span className={"pointer float-right"} onClick={() => turnCard()}>
                    <FontAwesomeIcon icon={faCreativeCommonsSa} className={'fab fa-creative-commons-sa'} title={`Turn card`}/>
                </span>
            </Card.Header>
            <div className="pointer card" id="card" onClick={() => turnCard()}>
                <Card.Body className={"side"}>
                    {props.front || "No question"}
                </Card.Body>
                <Card.Body className={"side back"}>
                    {props.back || "No answer"}
                </Card.Body>
            </div>
        </Card>
        <Row className={"row justify-content-between"}>
            <Col lg={{span: 4}}>
                <Button id="correct" className={"btn btn-block btn-green"} onClick={(e) => handleClick(e, "correct")}>Correct</Button>
            </Col>
            <Col lg={{span: 4}}>
                <Button id="wrong" className={"btn btn-block btn-red"} onClick={(e) => handleClick(e, "wrong")}>Wrong</Button>
            </Col>
        </Row>
    </Container>
    </>
    )
}

export default PlayingCard;