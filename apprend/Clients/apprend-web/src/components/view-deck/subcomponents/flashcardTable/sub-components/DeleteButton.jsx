import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default (props) => {

    return (
        <>
            <FontAwesomeIcon 
                icon={faTrash}
                id={props.giveId}
                className="trash-icon float-right"
                style={{'cursor': 'pointer', 'color': 'red'}}
                name={'delete-'+props.columnId}
                onClick={props.onClick}
                size={'1x'}
                id={'delete-'+props.index}
                />
        </>
    )
}