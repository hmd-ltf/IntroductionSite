import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Container ,Form , Col , Row , Button } from 'react-bootstrap'
import {connect} from 'react-redux'

import {postMessage} from '../../actions/profile'

const Contact = ({profile , postMessage}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('')

    return (
      <Fragment>
          <Container className='mt-5 mb-5'>
            <h3>Send A Message</h3>
            <Form onSubmit={(e) => {
                    e.preventDefault();
                    postMessage(profile._id ,name, email , message);
                }}>
                <Row>
                <Col>
                    <Form.Group size="lg" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Your Name'
                    />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group size="lg" controlId="summary">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                    type="text"
                    value={email}
                    placeholder='Contact Email name@example.com'
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    </Form.Group>
                </Col>
                </Row>
                <Form.Group className="mb-3" controlId="Textarea">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={3} 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                />
                </Form.Group>
                <Button variant="primary" type='submit'>
                        Send
                    </Button>
            </Form>
        </Container>
      </Fragment>
    )
}

Contact.propTypes = {
    profile: PropTypes.object.isRequired,
    postMessage: PropTypes.func,
}
const mapStateToProps = (state) => ({
    profile: state.profile.profile,
}) 

export default connect(mapStateToProps , {postMessage})(Contact)

