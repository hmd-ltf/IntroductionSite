import React, { Fragment } from 'react'
import {Container , Navbar , Nav} from 'react-bootstrap'
import {LOGIN_LINK , SIGNUP_LINK} from '../routes/NavLinks'

import '../../App.css';


const Navmenu = () => {
    return (
        <Fragment>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className='endNav'>
                        <Nav.Link href={LOGIN_LINK}>LogIn</Nav.Link>
                        <Nav.Link href={SIGNUP_LINK}>SignUp</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
}

export default Navmenu;