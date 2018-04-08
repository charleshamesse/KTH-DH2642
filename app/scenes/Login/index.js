import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

// import GoogleButton from 'react-google-button' // optional

export const Login = ({ firebase, auth }) => (
    <section className="jumbotron text-center">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <button // <GoogleButton/> button can be used instead
                        className="btn btn-large btn-outline-secondary"
                        onClick={() => firebase.login({ provider: 'google', type: 'popup' })}
                    >Login With Google</button>
                    <h2>Auth</h2>
                    {
                        isLoaded(auth)
                            ?
                            <span>Loading...</span>
                            : isEmpty(auth)
                                ? <span>Not Authed</span>
                                : <pre>{JSON.stringify(auth, null, 2)}</pre>
                    }
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
