import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPlay } from '@fortawesome/free-solid-svg-icons'

export default (props) => {
    return (
        <Button 
            className="w-100" 
            variant={`${props.buttonVariant ? props.buttonVariant : 'outline-dark'}`} 
            onClick={props.func} 
            name={`${props.buttonId ? props.buttonId : 'play-deck-button'}`}
            id={`${props.buttonId ? props.buttonId : 'play-deck-button'}`}
            
            >
        <Row>
            <Col xs={12} className={`text-center ${props.textColor ? props.textColor : 'text-green'}`}>
            <FontAwesomeIcon 
            icon={faPlay}
            size={`${props.buttonSize ? props.buttonSize : 1}x`}
            />
            </Col>
            <Col xs={12} className={'text-center'}>
                {props.buttonText ? props.buttonText : 'Play deck'}
            </Col>
        </Row>
    </Button>
    )
}