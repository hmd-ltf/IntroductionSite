import React, { Fragment } from 'react'
import {connect} from 'react-redux'
import {Container , Row , Col} from 'react-bootstrap'
import moment from 'moment'
import PropTypes from 'prop-types'

import '../../App.css';

const singleEducation = (edu) => {
    return (
        <Fragment key ={edu._id}>
         
            <h4>{edu.institution}</h4>
            <p className='ml-5'>{moment(edu.from).format('DD/MM/yyyy')}   -   
            {moment(edu.to).format('DD/MM/yyyy')}</p> 
            <hr />
        </Fragment>
    )
}

const singleExperiance = (exp) => {
    return (
        <Fragment key ={exp._id}>
         
            <h4>{exp.title} in {exp.company}</h4>
            <p className='ml-5'>{moment(exp.from).format('DD/MM/yyyy')}   -   
            {moment(exp.to).format('DD/MM/yyyy')}</p> 
        
            <hr />
        </Fragment>
    )
}

const calCulateTime = (time) => {
    const current = Date.now()
   
    let sec = Math.floor((current - Date.parse(time))/1000);
    let min = Math.floor(sec/60);
    sec = sec%60
    let hours = Math.floor(min/60);
    min = min%60
    let days = Math.floor(hours/24);
    hours = hours%24
    console.log(days)
    
    return (`${days} Days , ${hours} Hours , ${min} Min`);
}

const MainDetails = ({profile}) => {

    console.log(profile.profilePic)

    return (
        <Fragment>
            <Container>
                <Row className='mt-5'>
                    <Col>
                        <img src={profile.profilePic} alt='#' style={{ maxWidth: '24rem' }}/>
                    </Col>
                    <Col>
                        <h1>{profile.name}</h1>
                        <h4>{profile.briefSummary}</h4>
                        <h5>Profile Visits: {profile.totalVisits}</h5>
                        <h6>Active {calCulateTime(profile.lastActiveTime)} ago</h6>
                    </Col>
                </Row>
            </Container>
            <Container className='mt-5'>
                <h2>Education</h2>
                {profile.education.map((edu) => {
                    return (singleEducation(edu)
                    )})}
            </Container>
            <Container className='mt-5'>
                <h2>Work Experiance</h2>
                {profile.work.map((exp) => {
                    return (singleExperiance(exp)
                    )})}
            </Container>
        </Fragment>
    )
}

MainDetails.propTypes = {
    profile: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    profile: state.profile.profile,
}) 

export default connect(mapStateToProps , {})(MainDetails)
