import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link , Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { setAlert } from "../../actions/alert";
import { signUp } from '../../actions/auth'
import { PropTypes } from "prop-types";
import { Fragment } from 'react';

import { LOGIN_LINK , SETTING_LINK } from '../routes/NavLinks';

const SignUp = ({ setAlert , signUp , isAuthenticated}) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword ,setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
   
        e.preventDefault();
    
        if(password !== confirmPassword) {
          setAlert('Passwords Donot Match' , 'danger');
        }
        else{
          signUp(email , name , password);
        }
      
      };

    //   if user successfully logged in then redirect
      if(isAuthenticated){
        return <Redirect to={SETTING_LINK} />
      }

      return (
        <Fragment>
            <Container className='form'>
            <h1 className='mb-3'>SignUp</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </Form.Group>
                    <Form.Group size="lg" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    autoFocus
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </Form.Group>
                <Form.Group size="lg" controlId="confirm-password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                </Form.Group>
                <Button block  size="lg" type="submit">
                SignUp
                </Button>
                <p className='additionalText'>Already have an Account? <Link to={LOGIN_LINK}>LogIn</Link></p>
            </Form>
            </Container>
        </Fragment>
      );
    
};

SignUp.propTypes ={
    setAlert: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  }
  
  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  })
  
  export default connect(mapStateToProps , {setAlert , signUp})(SignUp);
  