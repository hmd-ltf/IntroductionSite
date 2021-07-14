import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'

import { deleteUser } from '../../actions/auth'
import { setAlert } from '../../actions/alert'
import { connect } from 'react-redux'
import { Button, Container, Form } from 'react-bootstrap'

const DeleteAccount = ({ deleteUser , setAlert }) => {

    const[confirm , setConfirm] = useState('');

    return (
        <Fragment>
            <Container className='mt-5 mb-5'>
                <h2>Delete Your Profile</h2>
                <Form>
                    <Form.Group size="lg" controlId="summary">
                        <Form.Control
                        type="text"
                        placeholder='Confirm'
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                    />
                    </Form.Group>
                    <Button block variant="danger" onClick={() => {
                        if(confirm === 'Confirm'){
                            deleteUser()
                        }else{
                            setAlert('Enter Confirm to Delete Account' , 'danger');
                        }
                    }}>
                        Delete
                    </Button>
                </Form>
            </Container>
        </Fragment>
    )
}

DeleteAccount.propTypes = {
    deleteUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({}) 

export default connect(mapStateToProps , {deleteUser , setAlert})(DeleteAccount)
