import React from "react";
import * as ReactRedux from "react-redux"

const FooterUI = (props) => {
    return (
        <>
            {/* <footer className='footer mt-auto py-4 mt-3 bg-gray text-white'>
                <div className='container text-center display-3 '>Apprend</div>
            </footer> */}
        </>

    )
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export const Footer = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(FooterUI);
