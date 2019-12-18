import React from 'react'
import UserCard from './UserCard'
import { Row } from 'react-bootstrap'

export default (props) => {

    const showAllUsers = () => {
        if (props.users && props.users.length > 0)
        return props.users.map(user => <UserCard user={user} />)
        else
        return <p>No users</p>
    } 


    return (
        <Row>
            {showAllUsers()}
        </Row>
    )
}