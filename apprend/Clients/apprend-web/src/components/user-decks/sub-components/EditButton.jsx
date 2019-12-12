import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEdit } from '@fortawesome/free-solid-svg-icons'

export default (props) => {
    return (
        <Button 
            className="w-100" 
            variant={`${props.buttonVariant ? props.buttonVariant : 'outline-dark'}`} 
            onClick={props.func} 
            name={`${props.buttonId ? props.buttonId : 'edit-deck-button'}`}
            id={`${props.buttonId ? props.buttonId : 'edit-deck-button'}`}
            
            >
        <Row>
            <Col xs={12} className={`text-center ${props.textColor ? props.textColor : 'text-black'}`}>
            <FontAwesomeIcon 
            icon={faEdit}
            size={`${props.buttonSize ? props.buttonSize : 2}x`}
            />
            </Col>
            <Col xs={12} className={'text-center'}>
                {props.buttonText ? props.buttonText : 'Edit deck'}
            </Col>
        </Row>
    </Button>
    )
}