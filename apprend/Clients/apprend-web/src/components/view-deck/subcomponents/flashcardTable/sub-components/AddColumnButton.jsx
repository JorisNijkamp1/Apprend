import React from 'react'
import { Button } from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default props => {

    return (
        <>
            <Button id={props.giveId} className={`w-100 ${props.className}`} variant={props.variant ? props.variant : 'outline-dark'} name={props.name} onClick={props.onClick} value={props.value}>
                <FontAwesomeIcon icon={faPlus} size={'1x'} /> {props.buttonType} {props.buttonType === 'FLASHCARD' ? '' : 'column'}
            </Button>
        </>
    )
}
