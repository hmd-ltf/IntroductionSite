import React from 'react'
import {Spinner } from 'react-bootstrap'
import '../../App.css'

const LoadingSpinner = () => {
    return (
        <Spinner className='loading' animation="border" variant="primary" />
    )
}

export default LoadingSpinner;