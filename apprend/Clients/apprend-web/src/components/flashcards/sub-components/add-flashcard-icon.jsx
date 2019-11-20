import Col from "react-bootstrap/Col";
import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'

export const AddFlashcardIcon = () => {
    return (
        <Col xs={12} md={6} lg={4}>
            <div className="row h-100">
                <div className="col-sm-12 my-auto">
                    <FontAwesomeIcon icon={faPlusCircle} size={"4x"} color={'#7ad765'} className={'hover-shadow'} onClick={() => console.log(1234)}/>
                </div>
            </div>
        </Col>
    )
};
