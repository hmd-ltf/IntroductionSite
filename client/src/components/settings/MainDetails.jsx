import React, { Fragment , useState } from 'react'
import PropTypes from 'prop-types'
import { postDetails } from '../../actions/profile'
import { connect } from 'react-redux'

import { Container , Form , Row , Col , Button } from 'react-bootstrap'

const MainDetails = ({ postDetails , profile}) => {

    const [name , setName] = useState(profile.name);
    const [profilePic , setProfilePic] = useState(profile.profilePic);
    const [briefSummary , setBriefSummary] = useState(profile.briefSummary);

    return (
        <Fragment>
            <Container className='mt-5 mb-5'>
                <h2>Edit Your Profile</h2>
                <Container className='mt-5'>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    postDetails(name, profilePic , briefSummary);
                }}>
                    <Row>
                        <Col>
                            <Form.Group size="lg" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group size="lg" controlId="summary">
                            <Form.Label>Summary</Form.Label>
                            <Form.Control
                            type="text"
                            value={briefSummary}
                            onChange={(e) => setBriefSummary(e.target.value)}
                            />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type='submit'>
                        Save
                    </Button>
                </Form>
                </Container>
            </Container>
        </Fragment>
    )
}

MainDetails.propTypes = {
    postDetails: PropTypes.func.isRequired,
    profile: PropTypes.object,
}
const mapStateToProps = (state) => ({
    profile: state.profile.profile,
}) 

export default connect(mapStateToProps , {postDetails})(MainDetails)
