import {NavBar} from '../shared/components/NavBar';
import React from 'react';
import {Footer} from '../shared/components/Footer';
import * as ReactRedux from 'react-redux';
import Row from 'react-bootstrap/Row';
import {Container} from 'react-bootstrap';

const PrivacyUI = (props) => {
    return <>
        <NavBar/>
        <Container className={'pt-5 pb-5'}>
            <Row>
                <p><b>Privacy Policy for ApprendLearning</b>
                    <br/>
                    <br/>
                    At Apprend, accessible from https://apprend-learning.com, one of our main priorities is the privacy
                    of our visitors. This Privacy Policy document contains types of information that is collected and
                    recorded by Apprend and how we use it.
                    <br/>
                    <br/>
                    If you have additional questions or require more information about our Privacy Policy, do not
                    hesitate to contact us.
                    <br/>
                    <br/>
                    <b>General Data Protection Regulation (GDPR)</b>
                    <br/>
                    <br/>
                    We are a Data Controller of your information.
                    <br/>
                    <br/>
                    ApprendLearning legal basis for collecting and using the personal information described in this
                    Privacy Policy depends on the Personal Information we collect and the specific context in which we
                    collect the information:
                    <br/>
                    <br/>
                    ApprendLearning needs to perform a contract with you
                    You have given ApprendLearning permission to do so
                    Processing your personal information is in ApprendLearning legitimate interests
                    ApprendLearning needs to comply with the law
                    ApprendLearning will retain your personal information only for as long as is necessary for the
                    purposes set out in this Privacy Policy. We will retain and use your information to the extent
                    necessary to comply with our legal obligations, resolve disputes, and enforce our policies. Our
                    Privacy Policy was generated with the help of GDPR Privacy Policy Generator and the Privacy Policy
                    Generator.
                    <br/>
                    <br/>
                    If you are a resident of the European Economic Area (EEA), you have certain data protection rights.
                    If you wish to be informed what Personal Information we hold about you and if you want it to be
                    removed from our systems, please contact us.
                    <br/>
                    <br/>
                    In certain circumstances, you have the following data protection rights:
                    <br/>
                    <br/>
                    <ul>
                        <li>The right to access, update or to delete the information we have on you.</li>
                        <li>The right of rectification.</li>
                        <li>The right to object.</li>
                        <li>The right of restriction.</li>
                        <li>The right to data portability.</li>
                        <li>The right to withdraw consent.</li>
                    </ul>
                    <br/>
                    <br/>
                    <b>Log Files</b>
                    <br/>
                    <br/>
                    Apprend follows a standard procedure of using log files. These files log visitors when they visit
                    websites. All hosting companies do this and a part of hosting services' analytics. The information
                    collected by log files include internet protocol (IP) addresses, browser type, Internet Service
                    Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These
                    are not linked to any information that is personally identifiable. The purpose of the information is
                    for analyzing trends, administering the site, tracking users' movement on the website, and gathering
                    demographic information.
                    <br/>
                    <br/>
                    <b>Cookies and Web Beacons</b>
                    <br/>
                    <br/>
                    Like any other website, Apprend uses 'cookies'. These cookies are used to store information
                    including visitors' preferences, and the pages on the website that the visitor accessed or visited.
                    The information is used to optimize the users' experience by customizing our web page content based
                    on visitors' browser type and/or other information.
                    <br/>
                    <br/>
                    <b>Privacy Policies</b>
                    <br/>
                    <br/>
                    You may consult this list to find the Privacy Policy for each of the advertising partners of
                    Apprend.
                    <br/>
                    <br/>
                    Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons
                    that are used in their respective advertisements and links that appear on Apprend, which are sent
                    directly to users' browser. They automatically receive your IP address when this occurs. These
                    technologies are used to measure the effectiveness of their advertising campaigns and/or to
                    personalize the advertising content that you see on websites that you visit.
                    <br/>
                    <br/>
                    Note that Apprend has no access to or control over these cookies that are used by third-party
                    advertisers.
                    <br/>
                    <br/>
                    <b>Third Party Privacy Policies</b>
                    <br/>
                    <br/>
                    Apprend's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you
                    to consult the respective Privacy Policies of these third-party ad servers for more detailed
                    information. It may include their practices and instructions about how to opt-out of certain
                    options. You may find a complete list of these Privacy Policies and their links here: Privacy Policy
                    Links.
                    <br/>
                    <br/>
                    You can choose to disable cookies through your individual browser options. To know more detailed
                    information about cookie management with specific web browsers, it can be found at the browsers'
                    respective websites. What Are Cookies?
                    <br/>
                    <br/>
                    <b>Children's Information</b>
                    <br/>
                    <br/>
                    Another part of our priority is adding protection for children while using the internet. We
                    encourage parents and guardians to observe, participate in, and/or monitor and guide their online
                    activity.
                    <br/>
                    <br/>
                    Apprend does not knowingly collect any Personal Identifiable Information from children under the age
                    of 13. If you think that your child provided this kind of information on our website, we strongly
                    encourage you to contact us immediately and we will do our best efforts to promptly remove such
                    information from our records.
                    <br/>
                    <br/>
                    <b>Online Privacy Policy Only</b>
                    <br/>
                    <br/>
                    Our Privacy Policy applies only to our online activities and is valid for visitors to our website
                    with regards to the information that they shared and/or collect in Apprend. This policy is not
                    applicable to any information collected offline or via channels other than this website.
                    <br/>
                    <br/>
                    <b>Consent</b>
                    <br/>
                    <br/>
                    By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                </p>
            </Row>
        </Container>
        <Footer/>
    </>;
};

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PrivacyUI);
