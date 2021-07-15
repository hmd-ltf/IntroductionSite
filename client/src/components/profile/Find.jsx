import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

import {loadAllProfiles , getUserName} from '../../actions/profile'
import { Container , Row , Col , Button} from 'react-bootstrap'

const Find = ({ profiles , userName , loadAllProfiles , getUserName}) => {

    useEffect(() => {
        loadAllProfiles();
    } , [loadAllProfiles])

    if(userName !=='') {
        return (
            <Redirect to={userName}/>
        )
    }

    const singleProfile = (profile) => {
        return(
            <Fragment key = {profile._id}>
                <Row className='mt-3'>
                    <Col>
                        <img src={profile.profilePic} alt='No Pic' style={{ maxWidth: '24rem' }}/>
                    </Col>
                    <Col>
                        <h2>{profile.name}</h2>
                    </Col>
                    <Col>
                        <Button onClick={() => {getUserName(profile._id)}}>Visit</Button>
                    </Col>
                </Row>
                <hr/>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <Container className='mt-4'>
                {profiles.map((profile) => {
                    return(
                        singleProfile(profile)
                    )
                })}
            </Container>
        </Fragment>
    )
}

Find.propTypes = {
    profiles: PropTypes.array.isRequired,
    loadAllProfiles: PropTypes.func,
    getUserName: PropTypes.func,
    userName: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
    profiles: state.profile.profiles,
    userName: state.profile.userName
}) 

export default connect(mapStateToProps , {loadAllProfiles , getUserName})(Find)
