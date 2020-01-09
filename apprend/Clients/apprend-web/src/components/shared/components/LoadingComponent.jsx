import React from 'react'
import Loader from "react-loaders";
import { Row, Button } from 'react-bootstrap'
import {Redirect} from 'react-router';
import { Link } from 'react-router-dom'


export const LoadingComponent = (props) => {

    return (
        <Row className={`mx-auto align-items-center flex-column py-5 ${props.giveClass}`}>
            <Loader type="square-spin" active={true} color={props.loadingColor ? props.loadingColor : '#758BFE'}/>
            <h2>{props.loadingText}</h2>
            {/* <Link to={'/'}>
            <Button variant="outline-dark">
                Go to home instead
            </Button>
            </Link> */}

        </Row>
    )
} 