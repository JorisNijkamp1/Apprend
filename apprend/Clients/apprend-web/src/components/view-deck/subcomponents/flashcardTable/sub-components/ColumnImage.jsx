import React from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGlobe, faUpload, faTimes} from '@fortawesome/free-solid-svg-icons'

export default props => {

    return(
        <Row className="flex-nowrap">
            <Col xs={6} style={{'maxWidth': '200px', 'minWidth': '150px', 'maxHeight': '200px', 'overflowY': 'hidden' }} className="text-center d-flex align-items-center">
            {props.column.path ? 

                <div className="w-100 h100">
                    <img style={{'ObjectFit': 'fill'}} className="w-100" src={props.image} alt="image" />
                </div>
            : <small>No image</small>}
            </Col>
            
            <Col xs={6} style={{'maxWidth': '200px', 'minWidth': '150px'}} className="ml-auto d-flex align-items-center">
                <Row>
                    <Col xs={6}>
                        <label style={{'cursor': 'pointer', 'maxWidth': '200px'}} 
                        className={`btn ${props.column.path ? 'btn-outline-warning':'btn-outline-dark'}`}
                        title={props.column.path ? 'Replace image with new upload': 'Upload image'}
                        >


                        <FontAwesomeIcon 
                                icon={faUpload}
                                size={'2x'}
                            /> 
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
                    </Col>

                    <Col xs={6}>
                        <Button className="btn btn-danger" title="Clear image"
                            onClick={(e) => {
                                props.handleLink({props: [{prop: 'path', value: ''}, {prop: 'source', value: ''}]}, props.creatorId, props.deckId, props.flashcardId, props.columnId)
                            }
                            }
                            >
                            <FontAwesomeIcon 
                                icon={faTimes}
                                size={'2x'}
                                />
                        </Button>
                    </Col>
                    {`${props.column.path}`}
                    <Col xs={12}>
                        <input 
                            name={`input-${props.column._id}`}
                            style={{'maxWidth': '200px'}} 
                            placeholder="Image url" 
                            className="form-control" 
                            title="Enter image URL from a website"
                            defaultValue={props.column.source === 'web' ? props.column.path : ''}
                            onChange={(e) => {
                                props.handleLink({props: [{prop: 'path', value: e.target.value}, {prop: 'source', value: 'web'}]}, props.creatorId, props.deckId, props.flashcardId, props.columnId)}
                            }
                            />
                    </Col>
                </Row>
            </Col>
        </Row>

    )
}