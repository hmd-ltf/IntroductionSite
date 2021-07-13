import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { Redirect } from 'react-router'


const Landing = ({ isAuthenticated , isLoading , user }) => {

    
    if(isAuthenticated & !isLoading & user !== null){
        return <Redirect to={user.userName} />
    }
    return (
        <div>
          Hello and Welcome
        </div>
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

