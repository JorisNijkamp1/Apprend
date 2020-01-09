import React from 'react'
import { Col, Row } from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGlobe, faUpload, faTimes} from '@fortawesome/free-solid-svg-icons'

export default props => {

    return(
        <Row>
            <Col className="text-center align-items-center">
            {props.column.path ? 

                // <div style={{'maxWidth': '150px', 'maxHeight': '100px', 'overflow': 'hidden'}}>
                <div>
                    <audio controls src={`http://localhost:3001/api/v1/audio/${props.column.path}`} alt="Audio" />
                </div>
            : <small>No audio</small>}
            </Col>
            
            <Col>
                <Row>
                    <Col xs={12}>

                        <label style={{'cursor': 'pointer'}} className={`btn w-100 ${props.column.path ? 'btn-outline-danger':'btn-outline-dark'}`}>
                        <FontAwesomeIcon 
                                icon={faUpload}
                                size={'1x'}
                            /> {props.column.path ? 'Change' : 'Upload'} 
                                            <input
                                                accept='audio/*'
                                                onChange={(e) => {
                                                    props.handler(e, 'audio', props.creatorId, props.deckId, props.flashcardId, props.columnId)
                                                }}
                                                style={{'display': 'none'}}
                                                type="file"
                                                label="audio"
                                                id={'123'}
                                                name="audio"
                                            />  
                        </label>
                    </Col>
                </Row>
            </Col>
        </Row>

    )
}