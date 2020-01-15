import * as ReactRedux from 'react-redux';
import React, {useState} from 'react';
import Row from 'react-bootstrap/Row';
import {Col, Container} from 'react-bootstrap';

const PrivacyPopUpUI = (props) => {
    const [accepted = false, setAccepted] = useState();
    const cookieName = 'privacyAccepted';

    const acceptPrivacyPopUp = () => {
        setAccepted(true);
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 2030 00:00:00 CET;`;
    };

    if (accepted || document.cookie.includes(cookieName)) {
        return null;
    }

    return <div className={`privacy-pop-up`}>
        <Container className={'pt-3 pb-2'}>
            <div className="privacy-pop-up-inner">
                <Row>
                    <Col md={{span: 9}}>
                        <p>
                            <b>Privacy Policy for ApprendLearning</b>
                            <br/>
                            At Apprend, accessible from apprend-learning.com, one of our main priorities is the
                            privacy
                            of our visitors. This Privacy Policy document contains types of information that is
                            collected
                            and
                            recorded by Apprend and how we use it.
                        </p>
                    </Col>
                    <Col md={{span: 3}}>
                        <div className="row justify-content-center align-items-center h-100">
                            <div className="btn-green privacy-accept-button m-4" id="cookie"
                                 onClick={acceptPrivacyPopUp}>Accept
                            </div>
                            <br/>
                            <a href="/privacy">Read more</a>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    </div>;
};

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PrivacyPopUpUI);
