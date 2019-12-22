import React from 'react'

export default props => {
    return(
        <div style={{'maxWidth': '100px', 'overflow': 'hidden'}}>
            <img style={{'ObjectFit': 'contain'}} className="w-100" src={props.image} alt="image" />
        </div>
    )
}