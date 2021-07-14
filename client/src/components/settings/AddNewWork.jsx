import React , {Fragment , useState} from 'react'
import PropTypes from 'prop-types'
import { Button , Form , Modal } from 'react-bootstrap'
import { postExperiance } from '../../actions/profile'
import { connect } from 'react-redux'

const ExperianceForm = (props) => {

    const [title , setTitle] = useState('');
    const [company , setCompany] = useState('');
    const [from, setFrom] = useState();
    const [to , setTo] = useState();

    return (
        <Fragment {...props}>
            <Form onSubmit={(e) => {
                e.preventDefault();
                props.onSave(title, company , from , to);
            }}>
                <Form.Group size="lg" controlId="name">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    autoFocus
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                </Form.Group>

                <Form.Group size="lg" controlId="name">
                <Form.Label>Company</Form.Label>
                <Form.Control
                    autoFocus
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                </Form.Group>

                <Form.Group controlId="start-from">
                    <Form.Label>From</Form.Label>
                    <Form.Control 
                        type="date" 
                        max ={Date.now}
                        value={from} 
                        onChange={(e) => setFrom(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="end-to">
                    <Form.Label>To</Form.Label>
                    <Form.Control 
                        type="date" 
                        min={from}
                        max={Date.now()}
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

const AddExperianceModal = (props) => {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                Experiance
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ExperianceForm onSave = { (title, company , from , to) => {
                    props.onSave(title, company , from , to);
                }}/>
            </Modal.Body>
        </Modal>
    );
};

const AddNewWork = ({ postExperiance }) => {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <Fragment>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Add Education
            </Button>

            <AddExperianceModal
                show={modalShow}
                onSave={ ( 
                    title, 
                    company ,
                    from,
                    to,
                    ) => {
                    setModalShow(false);
                    postExperiance( title, company , from , to );
                }
            }
            />
        </Fragment>
    )
}

AddNewWork.propTypes = {
    postExperiance: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps , {postExperiance})(AddNewWork);
