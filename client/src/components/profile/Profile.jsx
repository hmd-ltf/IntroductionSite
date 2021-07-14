import React , { Fragment, useEffect } from 'react'
import { useParams } from 'react-router';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Container} from 'react-bootstrap'

import LoadingSpinner from '../layout/LoadingSpinner'

import {loadProfile} from '../../actions/profile'
import MainDetails from './MainDetails'
import Contact from './Contact'

const Profile = ({loadProfile , profile , isLoading}) => {

    const {userName} = useParams();

    useEffect(() => {
        loadProfile(userName)
    } , [userName , loadProfile])

    if(isLoading){
        return (
            <LoadingSpinner />
        );
    }

    return (
        <Fragment>
            <Container className='form'>
                <MainDetails />
                
            </Container>
            <Contact />
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

