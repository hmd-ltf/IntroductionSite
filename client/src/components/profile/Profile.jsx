import React , { Fragment, useEffect } from 'react'
import { useParams } from 'react-router';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Container} from 'react-bootstrap'

import LoadingSpinner from '../layout/LoadingSpinner'

import {loadMe, loadProfile} from '../../actions/profile'
import MainDetails from './MainDetails'
import Contact from './Contact'

const Profile = ({ isLoading , isAuthenticated , authLoading , loadMe ,loadProfile , user}) => {

    const {userName} = useParams();

    useEffect(() => {
        if(!authLoading){
            if(isAuthenticated){
                if(user.userName === userName){
                    console.log('hello')
                    loadMe()
                }
                else{
                    console.log('not hello')
                    loadProfile(userName);
                }
            }
            else{
                console.log('hello no')
                loadProfile(userName);
            }
        }
    } , [userName ,user, loadProfile , isAuthenticated , loadMe , authLoading])

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
    user: PropTypes.object,
    loadMe: PropTypes.func,
    loadProfile: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    authLoading: PropTypes.bool,
}
const mapStateToProps = (state) => ({
    isLoading: state.profile.isLoading,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    authLoading: state.auth.isLoading
});

export default connect(mapStateToProps , {loadProfile , loadMe})(Profile);

