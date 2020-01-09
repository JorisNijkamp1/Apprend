import React from 'react'
import Loader from "react-loaders";
import { Row } from 'react-bootstrap'

export const LoadingComponent = (props) => {
    return (
        <Row className={`mx-auto align-items-center flex-column py-5 ${props.giveClass}`}>
            <Loader type="square-spin" active={true} color={props.loadingColor ? props.loadingColor : '#712E9A'}/>
            <h2>{props.loadingText}</h2>
        </Row>
    )
}
