import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default (props) => {

    const side = (side) => {
        return (
            <Col xs={12} md={6}>
                <Card>
                <Row>
                    <Col xs={12}>
                    <Col xs={12}>
                        {`Choose the ${side}side`}
                    </Col>
                    {props.deck.columns.map((col, index) => (
                    <Col xs={12} className="my-1">
                        <Row>
                            <Col>
                                {col.type}
                            </Col>
                            <Col>
                            <Button onClick={() => props.func(index, side)} variant={props.columns[side] === index ? 'primary' : 'outline-primary' } className="w-100">
                                {col.name ? col.name : col.type}
                            </Button>
                            </Col>
                        </Row>
                    </Col>
                    ))}
                    </Col>
                </Row>
                </Card>
            </Col>
        )
    }

    const checkAllColumns = () => {
        let bool = false
        Object.entries(props.columns).forEach(([key, value]) => {
            if (typeof value === 'string') bool = true
        })
        return bool
    }

    return (
        <Container className="my-5">
        <Row className="text-center">
            <Col xs={12} className="my-3">
                <h4>Columnselection</h4>
            </Col>
            {side('front')}
            {side('back')}
            <Col xs={12} className="my-3"> 
                <Row>
                    <Col>
                        <Link to={`/decks/${props.deck._id}`}>
                            <Button variant="info" className="w-100">
                                Back to deck
                            </Button>
                        </Link>
                    </Col>
                    <Col>
                    {checkAllColumns() ? <h5>Please choose a column for each side</h5> :
                        <Button onClick={props.funcSetColumns} className="w-100" variant="success"  title="Start the game">
                            Start game
                        </Button> }
                    </Col>
                </Row>

            </Col>
        </Row>
    </Container>
    )
}