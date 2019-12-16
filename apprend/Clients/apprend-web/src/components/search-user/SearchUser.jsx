import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Container } from 'react-bootstrap'
import { NavigatieBar } from '../shared/navbar/NavigatieBar';
import { PageTitle } from '../shared/PageTitle';
import { getAllUsers } from './actions/actions'
import UserCard from './sub-components/UserCard';
import UserList from './sub-components/UserList';


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

