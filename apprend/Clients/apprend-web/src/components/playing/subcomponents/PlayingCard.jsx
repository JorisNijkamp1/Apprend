import React, {useState} from "react";
import {Container, Row, Col, Button, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";


const PlayingCard = (props) => {
    const [cardText, setCardText] = useState("Term");
    const [side, setSide] = useState(false)

    const handleClick = (event, status) => {
        event.preventDefault();
        props.changeScore(props.activeCard, status);
        if (cardText === "Definition") {
            turnCard()
        }
        setSide(false)
    }

    const turnCard = () => {
        // let element = document.getElementById("card");
        // element.classList.toggle("flipped");
        // if (cardText === "Term") {
        //     setCardText("Definition")
        // } else if (cardText === "Definition") {
        //     setCardText("Term")
        // }
        setSide(!side)
        
    }

    const showCorrectColumnType = (col) => {
        switch(col.type){
            case 'Image':
                    return col.path ? <img className="h-100" src={col.source === 'web' ? col.path : `http://localhost:3001/api/v1/images/${col.path}`} alt='Image' /> : 'Nothing to show!'
            case 'Text':
                return col.value
            case 'Audio':
                return col.path ? <audio controls src={`http://localhost:3001/api/v1/audio/${col.path}`} alt="Audio" /> : 'Nothing to show!'
            default: 
                return 'Nothing to show!'
        }
    }

    return (
    <>
    <Container>
        <Card className={"flipCard"}>
            <Card.Header className={"bg-blue text-white text-center"}>
                {side ? 'Backside': 'Frontside'}
                <span className={"pointer float-right"} onClick={() => turnCard()}>
                    <FontAwesomeIcon icon={faSync} title={`Turn card`}/>
                </span>
            </Card.Header>
            <div className="pointer card" id="card" onClick={() => turnCard()}>
                {/* <Card.Body className={"side"}> */}
                    {/* {props.front || "No question"} */}
                    {/* {showCorrectColumnType(props.front)} */}
                {/* </Card.Body> */}
                <Card.Body className={side ? 'side' : 'side'}>
                    {/* {props.back || "No answer"} */}
                    {showCorrectColumnType(side ? props.back : props.front )}
                </Card.Body>
            </div>
        </Card>
        <Row className={"row justify-content-between"}>
            <Col md={{span: 4}} className="order-2 order-md-1">
                <Button id="correct" className={"btn w-100"} variant="outline-success" onClick={(e) => handleClick(e, "correct")}>Correct</Button>
            </Col>
            <Col md={4} className=" order-1 order-md-2"> 
                <Button variant="outline-primary" className="w-100" onClick={() => turnCard()} title="Flip this card">
                    <FontAwesomeIcon icon={faSync} />
                </Button>
            </Col>
            <Col md={{span: 4}} className=" order-3 order-md 3">
                <Button id="wrong" className={"btn w-100"} variant="outline-danger" onClick={(e) => handleClick(e, "wrong")}>Wrong</Button>
            </Col>
        </Row>
    </Container>
    </>
    )
}

export default PlayingCard;