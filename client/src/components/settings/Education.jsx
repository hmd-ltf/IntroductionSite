import React , { Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import { Container  , Button , Row , Col} from 'react-bootstrap'

import { deleteEducation } from '../../actions/profile'
import AddNewEducation from './AddNewEducation'

const Education = ({ edu , deleteEducation }) => {

    const singleEducation = (education) => {
    
    return (
        <Fragment key ={education._id}>
            <Row>
                <Col>
                    <h4>{education.institution}</h4>
                </Col>
                <Col>
                    <Button variant='danger' onClick={() => {deleteEducation(education._id)}}>Delete</Button>
                </Col>
            </Row>
            <Row>
                <h5 className='ml-5'>Start:{moment(education.from).format('DD/MM/yyyy')} - 
                End: {moment(education.to).format('DD/MM/yyyy')}</h5> 
            </Row>
            <hr />
        </Fragment>
    )
    }
    
    return (
        <Fragment>
            <Container>
                <h2>Education</h2>
            </Container>
            <Container className='mt-4'>
                {edu.map((education) => {
                return (
                    singleEducation(education)
                )
                })}
                <AddNewEducation />
            </Container>
        </Fragment>
    )
}

Education.propTypes = {
    education:PropTypes.array.isRequired,
    deleteEducation: PropTypes.func,
}

const mapStateToProps = (state) => ({
    edu: state.profile.profile.education,
});

export default connect(mapStateToProps , {deleteEducation})(Education)
