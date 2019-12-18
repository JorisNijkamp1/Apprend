import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Container } from 'react-bootstrap'
import { NavigatieBar } from '../shared/components/NavigatieBar';
import { PageTitle } from '../shared/components/PageTitle';
import { getAllUsers } from './actions'
import UserCard from './subcomponents/UserCard';
import UserList from './subcomponents/UserList';


const SearchUserComponent = (props) => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        props.getAllUsers(setUsers)
    }, [])

    return (
        <>
            <NavigatieBar />
            <Container>
                <PageTitle title="Users"/>
                <UserList users={users} />
            </Container>
        </>
    )
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllUsers: (func) => dispatch(getAllUsers(func)),
    }
}

export const SearchUser = connect(mapStateToProps, mapDispatchToProps)(SearchUserComponent);

