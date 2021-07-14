import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Container , Button } from 'react-bootstrap'
import LoadingSpinner from '../layout/LoadingSpinner'
import { deleteMessage , loadMe } from '../../actions/profile'

const Messages = ({ auth , isLoading , profile , loadMe , deleteMessage}) => {
    
    useEffect(() => {
        loadMe();
    }, [loadMe])                          

    if(!auth.isAuthenticated & !auth.isLoading){
        return <Redirect to='/' />
    }
    if(isLoading | profile == null) {
        loadMe()
        return <LoadingSpinner />
    }
    
    const singleMessage = (msg) => {
        return (
            <Fragment key = {msg._id}>
                <h2>From: {msg.name}</h2>
                <p>{msg.message}</p>
                <p>Reply him <b>{msg.email}</b></p>
                <Button variant='danger' onClick={() => {deleteMessage(msg._id)}}>Delete</Button>
                <hr />
            </Fragment>
        )
    }

    return (
        <Fragment>
            <Container className='mt-4'>
                {profile.messages.map((msg) => {
                    return (
                        singleMessage(msg)
                    )
                })}
                {!profile.messages.length ? <h3>All Done No More Messages</h3>: <div />}
            </Container>
        </Fragment>
    )
}

Messages.propTypes = {
    auth: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    profile: PropTypes.object.isRequired,
    loadMe: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.auth.user,
    isLoading: state.profile.isLoading,
    profile: state.profile.profile,
}) 

export default connect(mapStateToProps , {loadMe , deleteMessage})(Messages)
