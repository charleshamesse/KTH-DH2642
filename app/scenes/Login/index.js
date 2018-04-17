import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import LoadingSpinner from '../../components/LoadingSpinner'

// import GoogleButton from 'react-google-button' // optional

const renderLoginResponse = (auth, firebase) => {
    if(!isLoaded(auth)){ // Waiting for auth info from server
        return (
            <LoadingSpinner />
        )
    } else if(isEmpty(auth) && isLoaded(auth)){ // user not logged in
        return (
            <button // <GoogleButton/> button can be used instead
                className="btn btn-large btn-outline-secondary"
                onClick={() => firebase.login({ provider: 'google', type: 'popup' })}
            >Login With Google</button>
        )
    } else if(!isEmpty(auth) && isLoaded(auth))  { // user is logged in
        return (
            <div>
                <Redirect to="/home"/>
            </div>
        )
    }
}

export const Login = ({ firebase, auth }) => (
    <section className="jumbotron text-center">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    { renderLoginResponse(auth, firebase) }
                </div>
            </div>
        </div>
    </section>
)

Login.propTypes = {
    firebase: PropTypes.shape({
        login: PropTypes.func.isRequired
    }),
    auth: PropTypes.object
}


export default compose(
    firebaseConnect(), // withFirebase can also be used
    connect(({ 
        firebase: { auth } 
    }) => ({ auth }))
)(Login)
