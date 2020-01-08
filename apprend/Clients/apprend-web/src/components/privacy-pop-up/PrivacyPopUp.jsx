import * as ReactRedux from 'react-redux';
import React, {useState} from 'react';
import Row from 'react-bootstrap/Row';
import {Container} from 'react-bootstrap';

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
        <Container className={'pt-5 pb-5'}>
            <Row>
                <div className="privacy-pop-up-inner">
                    <p>
                        <b>Privacy Policy for ApprendLearning</b>
                        <br/>
                        <br/>
                        At Apprend, accessible from https://apprend-learning.com, one of our main priorities is the
                        privacy
                        of our visitors. This Privacy Policy document contains types of information that is collected
                        and
                        recorded by Apprend and how we use it.
                        <br/>
                        <br/>
                        If you have additional questions or require more information about our Privacy Policy, do not
                        hesitate to contact us.
                    </p>
                    <a href="/privacy">Read more</a>
                    <div className="btn-green privacy-accept-button" onClick={acceptPrivacyPopUp}>Accept</div>
                </div>
            </Row>
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