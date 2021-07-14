import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { loadMe } from '../../actions/profile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import LoadingSpinner from '../layout/LoadingSpinner'

import MainDetails from './MainDetails'
import DeleteAccount from './DeleteAccount'
import Education from './Education'
import Work from './Work'

const Settings = ({ auth , isLoading , profile , loadMe}) => {    

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

    return (
        <Fragment>
            <MainDetails />
            <Education />
            <Work />
            <DeleteAccount />
        </Fragment>
    )
}

Settings.propTypes = {
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

export default connect(mapStateToProps , { loadMe })(Settings)
