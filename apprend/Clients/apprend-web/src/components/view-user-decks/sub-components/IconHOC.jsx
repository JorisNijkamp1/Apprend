import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col } from 'react-bootstrap'

export default (icon, deck, index) => {
    return (
        <Col xs={2}>
        <span className={'float-right'} name={deck._id}
              onClick={(event) => {
                  icon.funct(event, icon.statePropertyName)
              }}>
            <FontAwesomeIcon icon={icon.icon}
                             style={{'cursor': 'pointer'}}
                             className={`trash-icon ${icon.classColor}`}
                             size={`1x`}
                             title={icon.ownTitle ? icon.title : `${icon.title} ${deck.name}`}
                             id={`${icon.title.toLowerCase().replace(/\s/g, '')}-icon-button-${index}`}
            />
        </span>
        </Col>
    )
}