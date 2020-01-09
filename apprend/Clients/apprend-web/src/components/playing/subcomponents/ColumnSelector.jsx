import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

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
        <Container>
        <Row className="text-center">
            {side('front')}
            {side('back')}
            <Col xs={12}> 
                {checkAllColumns() ? <h5>Please choose a column for each side</h5> :
                <Button onClick={props.funcSetColumns} variant="success" className="my-3" title="Start the game">
                    Start game
                </Button> }
            </Col>
        </Row>
    </Container>
    )
}