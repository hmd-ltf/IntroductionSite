import React , { Fragment, useEffect } from 'react'
import { useParams } from 'react-router';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import LoadingSpinner from '../layout/LoadingSpinner'

import {loadProfile} from '../../actions/profile'


const Profile = ({loadProfile , profile , isLoading}) => {

    const {userName} = useParams();

    useEffect(() => {
        loadProfile(userName)
    } , [userName])

    if(isLoading){
        return (
            <LoadingSpinner />
        );
    }

    return (
        <Fragment>
            <h1>{profile.totalVisits}</h1>
            <h3>{profile.name}</h3>
            <p>{profile.totalVisits}</p>
        </Fragment>
    )
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    loadProfile: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
}
const mapStateToProps = (state) => ({
    profile: state.profile.profile,
    isLoading: state.profile.isLoading
});

export default connect(mapStateToProps , {loadProfile})(Profile);

