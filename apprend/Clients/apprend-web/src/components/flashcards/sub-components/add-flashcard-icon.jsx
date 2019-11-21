import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import Col from "react-bootstrap/Col";

export const AddFlashcardIcon = (props) => {
    return (
        <Col xs={12} md={6} lg={4}>

            <div className="h-100 row justify-content-center align-items-center">
                <FontAwesomeIcon icon={faPlusCircle}
                                 size={"4x"}
                                 color={'#7ad765'}
                                 className={'hover-shadow'}
                                 onClick={() => props.onClick()}
                />
            </div>
        </Col>
    )
};
