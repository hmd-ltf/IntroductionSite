import React, { useState } from 'react';
import { Button, Form , Container } from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { logIn } from '../../actions/auth'
import { PropTypes } from "prop-types";
import { Fragment } from 'react';

import { SIGNUP_LINK } from '../routes/NavLinks';

const Login = ({ logIn , isAuthenticated}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
   
        e.preventDefault();

        logIn(email , password);

      };

    //   if user successfully logged in then redirect
      if(isAuthenticated){
        return <Redirect to='/' />
      }

      return (
        <Fragment>
          <Container className='form'>
              <Form onSubmit={handleSubmit}>
                  <Form.Group size="lg" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                  
                  <Button block size="lg" type="submit">
                    Login
                  </Button>
                   
                  <p className='additionalText'>Don't have an Account? <Link to={SIGNUP_LINK}>Sign Up</Link></p>
                   
              </Form>
            </Container>
        </Fragment>
      );
    
};


Login.propTypes ={
    logIn: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  }
  
  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  })
  
  export default connect(mapStateToProps , {logIn})(Login);
  