import React from 'react'
import { Form } from 'react-bootstrap'

export default props => {
    if (props.state){
        return (
            <Form.Group controlId="formBasicEmail" className={"text-center"}>
                <Form.Label column={true}>
                    <strong>Edit {props.deck.name}</strong>
                </Form.Label>
                <Form.Control type="text"
                            name={props.deck._id}
                            placeholder={props.deck.name}
                            defaultValue={props.deck.name}
                            id={`input-name`}
                            onChange={(e) => {
                                props.handler(e, props.func)
                            }}
                />
            </Form.Group>
        )
    }
    return (
        <h1 className="display-5 text-green ">
            {props.deck.name}
        </h1>
    )
}
