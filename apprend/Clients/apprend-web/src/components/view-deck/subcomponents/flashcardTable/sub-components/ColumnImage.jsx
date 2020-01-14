import React from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGlobe, faUpload, faTimes} from '@fortawesome/free-solid-svg-icons'

export default props => {

    return(

        <Row>
            <Col className="d-flex align-items-center">
                {props.column.path ?                 <div className="d-flex align-items-center" style={{'height': '100px', 'width': '100px', 'overflow': 'hidden'}}>
                    <img style={{'ObjectFit': 'fill'}} className="w-100" src={props.image} alt="image" />
                </div> : 

                    <label style={{'cursor': 'pointer', 'maxWidth': '200px'}} 
                        className={`w-100 btn ${props.column.path ? 'btn-outline-warning':'btn-outline-dark'}`}
                        title={props.column.path ? 'Replace image with new upload': 'Upload image'}
                        >


                        <FontAwesomeIcon 
                                icon={faUpload}
                                size={'1x'}
                            /> Upload
                                            <input
                                                accept='image/*'
                                                onChange={(e) => {
                                                    props.handler(e, 'image', props.creatorId, props.deckId, props.flashcardId, props.columnId)
                                                }}
                                                style={{'display': 'none'}}
                                                type="file"
                                                label="image"
                                                id={'123'}
                                                name="image"
                                            />  
                        </label>
}
            </Col>
            <Col className="d-flex align-items-center justify-content-center" >
            {props.column.path ?                         <Button className="btn btn-danger" title="Clear image"
                            onClick={(e) => {
                                props.handleLink({props: [{prop: 'path', value: ''}, {prop: 'source', value: ''}]}, props.creatorId, props.deckId, props.flashcardId, props.columnId)
                            }
                            }
                            >
                            <FontAwesomeIcon 
                                icon={faTimes}
                                size={'1x'}
                                />
                        </Button> :                         <input 
                            name={`input-${props.column._id}`}
                            style={{'minWidth': '80px'}} 
                            placeholder="Image url" 
                            className="form-control" 
                            title="Enter image URL from a website"
                            defaultValue={props.column.source === 'web' ? props.column.path : ''}
                            onChange={(e) => {
                                props.handleLink({props: [{prop: 'path', value: e.target.value}, {prop: 'source', value: 'web'}]}, props.creatorId, props.deckId, props.flashcardId, props.columnId)}
                            }
                            id={'image-' + props.index}
                            />}
            </Col>
        </Row>
    )
}