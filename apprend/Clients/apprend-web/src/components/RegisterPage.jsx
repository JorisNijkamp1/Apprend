import React from 'react';
import {connect} from 'react-redux';
import {Col, Container, Row} from 'react-bootstrap';

const RegisterPageComponent = props => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1>Registeren</h1>
                        <form>

                        </form>
                    </Col>
                </Row>
            </Container>
        </>
    )
};

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {}
};

export const RegisterPage = connect(mapStateToProps, mapDispatchToProps)(RegisterPageComponent);