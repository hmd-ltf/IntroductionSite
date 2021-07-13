import React from 'react'
import PropTypes from 'prop-types'
import { Fragment } from 'react'

import { deleteUser } from '../../actions/auth'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Button } from 'react-bootstrap'

const Settings = ({ isAuthenticated , isLoading , deleteUser}) => {

    if(!isAuthenticated & !isLoading){
        return <Redirect to='/' />
    }

    return (
        <Fragment>
           <Button className='btn btn-danger'size='lg' onClick={deleteUser}>Delete</Button>
        </Fragment>
    )
}

Settings.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    isLoading: state.auth.isLoading,
}) 

export default connect(mapStateToProps , {deleteUser})(Settings)
