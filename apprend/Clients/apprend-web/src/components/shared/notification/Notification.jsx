import React from 'react';
import { Row } from 'react-bootstrap';
import { store } from 'react-notifications-component';

export const Notification = title => {
    return <Row>
        {store.addNotification({
            title: title,
            message: " ",
            type: "info",
            insert: "top",
            container: "top-center",
            animationIn: ["animated", "bounceIn"],
            animationOut: ["animated", "bounceOut"],
            dismiss: {
                duration: 3000
            },
            width: 250
        })}
    </Row>
};