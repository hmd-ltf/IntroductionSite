import React , {Fragment , useState} from 'react'
import PropTypes from 'prop-types'
import { Button , Form , Modal } from 'react-bootstrap'
import { postEducation } from '../../actions/profile'
import { connect } from 'react-redux'

const EducationForm = (props) => {

    const [institution , setInstitution] = useState('');
    const [from, setFrom] = useState();
    const [to , setTo] = useState();

    return (
        <Fragment {...props}>
            <Form onSubmit={(e) => {
                e.preventDefault();
                props.onSave(institution , from , to);
            }}>
                <Form.Group size="lg" controlId="name">
                <Form.Label>Institution</Form.Label>
                <Form.Control
                    autoFocus
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                />
                </Form.Group>

                <Form.Group controlId="start-from">
                    <Form.Label>From</Form.Label>
                    <Form.Control 
                        type="date" 
                        min='1950-01-01'
                        max ={new Date().toJSON().split('T')[0]}
                        value={from} 
                        onChange={(e) => setFrom(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="end-to">
                    <Form.Label>To</Form.Label>
                    <Form.Control 
                        type="date" 
                        min={from}
                        max={new Date().toJSON().split('T')[0]}
                        value={to} 
                        onChange={(e) => setTo(e.target.value)}
                    />
                </Form.Group>


                <hr />
                <Button block size="lg" type="submit">
                    Save
                </Button>
            </Form>
        </Fragment>
    )
}

const AddEducationModal = (props) => {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                Education
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EducationForm onSave = { (institutiion, from, to) => {
                    props.onSave(institutiion, from, to);
                }}/>
            </Modal.Body>
        </Modal>
    );
};

const AddNewEducation = ({ postEducation }) => {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <Fragment>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Add Education
            </Button>

            <AddEducationModal
                show={modalShow}
                onSave={ ( 
                    institutiion,
                    from,
                    to,
                    ) => {
                    setModalShow(false);
                    postEducation( institutiion, from, to );
                }
            }
            />
        </Fragment>
    )
}

AddNewEducation.propTypes = {
    postEducation: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps , {postEducation})(AddNewEducation);
