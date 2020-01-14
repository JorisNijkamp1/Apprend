import React from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGlobe, faUpload, faTimes} from '@fortawesome/free-solid-svg-icons'

export default props => {

    const showClearButton = (bool) => {
        if (!bool) return ''

        return (
            <Col className="justify-content-center" style={{'border': '1px solid green'}}>
            <Button className="btn btn-danger" title="Clear audio"
            onClick={(e) => {
                props.handleLink({props: [{prop: 'path', value: ''}, {prop: 'source', value: ''}]}, props.creatorId, props.deckId, props.flashcardId, props.columnId)
            }
            }
            >
            <FontAwesomeIcon 
                icon={faTimes}
                size={'1x'}
                />
        </Button> 
        </Col> 
        )
    }

    return(

        <Row>
            {props.column.path ?
            <Col>
                <Row className="d-flex flex-nowrap align-items-center">
                    <Col>
                    <div>
                        <audio controls src={`http://localhost:3001/api/v1/audio/${props.column.path}`} alt="Audio" />
                    </div>
                    </Col>
                    <Col>
                        <Button className="btn btn-danger" title="Clear audio"
                            onClick={(e) => {
                                props.handleLink({props: [{prop: 'path', value: ''}, {prop: 'source', value: ''}]}, props.creatorId, props.deckId, props.flashcardId, props.columnId)
                            }
                            }
                            >
                            <FontAwesomeIcon 
                                icon={faTimes}
                                size={'1x'}
                                />
                        </Button> 
                    </Col>
                </Row>
            </Col>

            :
            
            <Col className="d-flex justify-content-center">
                    <label style={{'cursor': 'pointer'}} className={`btn ${props.column.path ? 'btn-outline-warning':'btn-outline-dark'}`}>
                    <FontAwesomeIcon 
                            icon={faUpload}
                            size={'1x'}
                        /> {props.column.path ? 'Change' : 'Upload'} 
                                        <input
                                            id={props.giveId}
                                            accept='audio/*'
                                            onChange={(e) => {
                                                props.handler(e, 'audio', props.creatorId, props.deckId, props.flashcardId, props.columnId)
                                            }}
                                            style={{'display': 'none'}}
                                            type="file"
                                            label="audio"
                                            name="audio"
                                        />  
                    </label>
            </Col>
            
            }
        </Row>
        // <Row className="d-flex">
        //     <Col className="text-center align-items-center" xs={12}>
        //     {props.column.path ? 

        //         // <div style={{'maxWidth': '150px', 'maxHeight': '100px', 'overflow': 'hidden'}}>
        //         <div>
        //             <audio controls src={`http://localhost:3001/api/v1/audio/${props.column.path}`} alt="Audio" />
        //         </div>
        //     : <small>No audio</small>}
        //     </Col>
            
        //     <Col xs={12}>
        //         <Row classname="d-flex flex-nowrap justify-content-around">
        //             <Col xs={8}>
        //                 <label style={{'cursor': 'pointer'}} className={`btn ${props.column.path ? 'btn-outline-warning':'btn-outline-dark'}`}>
        //                 <FontAwesomeIcon 
        //                         icon={faUpload}
        //                         size={'1x'}
        //                     /> {props.column.path ? 'Change' : 'Upload'} 
        //                                     <input
        //                                         accept='audio/*'
        //                                         onChange={(e) => {
        //                                             props.handler(e, 'audio', props.creatorId, props.deckId, props.flashcardId, props.columnId)
        //                                         }}
        //                                         style={{'display': 'none'}}
        //                                         type="file"
        //                                         label="audio"
        //                                         id={'123'}
        //                                         name="audio"
        //                                     />  
        //                 </label>
        //             </Col>
        //             {showClearButton(props.column.path)}
        //         </Row>
        //     </Col>
        // </Row>

    )
}