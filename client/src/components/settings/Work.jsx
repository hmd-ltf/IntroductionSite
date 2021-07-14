import React , { Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import { Container  , Button , Row , Col} from 'react-bootstrap'

import { deleteExperiance } from '../../actions/profile'
import AddNewWork from './AddNewWork'

const Work = ({ work , deleteExperiance }) => {

    const singleWorkExp = (experiance) => {
    
    return (
        <Fragment key ={experiance._id}>
            <Row>
                <Col>
                    <h4>{experiance.title} in {experiance.company}</h4>
                </Col>
                <Col>
                    <Button variant='danger' onClick={() => {deleteExperiance(experiance._id)}}>Delete</Button>
                </Col>
            </Row>
            <Row>
                <h5 className='ml-5'>Start:{moment(experiance.from).format('DD/MM/yyyy')} - 
                End: {moment(experiance.to).format('DD/MM/yyyy')}</h5> 
            </Row>
            <hr />
        </Fragment>
    )
    }
    
    return (
        <Fragment>
            <Container className='mt-5'>
                <h2>Work</h2>
            </Container>
            <Container className='mt-4'>
                {work.map((experiance) => {
                return (
                    singleWorkExp(experiance)
                )
                })}
                <AddNewWork />
            </Container>
        </Fragment>
    )
}

Work.propTypes = {
    work:PropTypes.array.isRequired,
    deleteExperiance: PropTypes.func,
}

const mapStateToProps = (state) => ({
    work: state.profile.profile.work,
});

export default connect(mapStateToProps , {deleteExperiance})(Work)
