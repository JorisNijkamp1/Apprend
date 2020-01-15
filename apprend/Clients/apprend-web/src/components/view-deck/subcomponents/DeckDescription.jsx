import React from 'react'
import { Form } from 'react-bootstrap'

export default props => {
    if (props.state){
        return (
            <Form.Group controlId="formBasicEmail" className={"text-center"}>
                <Form.Label column={true}>
                        <strong>Edit description</strong>
                </Form.Label>
                <Form.Control type="text"
                            name={props.deck._id}
                            placeholder={props.deck.description}
                            defaultValue={props.deck.description}
                            id={`input-description`}
                            onChange={(e) => {
                                props.handler(e, props.func)
                            }}
                />
            </Form.Group>
        )
    }
    return (
        <h4 className="display-5 text-black ">
            {props.deck.description}
        </h4>
    )
}
