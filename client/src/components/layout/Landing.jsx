import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import {Container} from 'react-bootstrap'

import Login from '../auth/Login'


const Landing = ({ isAuthenticated , isLoading , user }) => {

    
    if(isAuthenticated & !isLoading & user !== null){
        return <Redirect to={user.userName} />
    }
    return (
        <Fragment>
          <Container className='mt-4'>
              <h1>Welcome To MY Site</h1>
          </Container>
          <Login />
        </Fragment>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    isLoading: state.auth.isLoading,
}) 

export default connect(mapStateToProps)(Landing)

