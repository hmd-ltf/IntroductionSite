import React, { Fragment } from 'react'
import {Container , Navbar , Nav} from 'react-bootstrap'
import {LOGIN_LINK , SIGNUP_LINK} from '../routes/NavLinks'

import { PropTypes } from 'prop-types'
import { connect } from "react-redux";
import { logOut } from '../../actions/auth';

import '../../App.css';


const Navmenu = ({isAuthenticated  , logOut}) => {

    const guestMenu = (
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className='endNav'>
                    <Nav.Link href={LOGIN_LINK}>LogIn</Nav.Link>
                    <Nav.Link href={SIGNUP_LINK}>SignUp</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        );

    const authMenu = (
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='endNav'>
                <Nav.Link onClick={logOut}>
                    Log Out
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>
    );
    
    

    return (
        <Fragment>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                   
                        {isAuthenticated? authMenu : guestMenu}
                  
                </Container>
            </Navbar>
        </Fragment>
    )
}

Navmenu.prototype = {
    logOut: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  }
  
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
  
export default connect(mapStateToProps , {logOut})(Navmenu);
  