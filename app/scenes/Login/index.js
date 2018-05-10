import React, { Component } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as googleIcon from '@fortawesome/fontawesome-free-brands/faGoogle';
import LoadingSpinner from '../../components/LoadingSpinner';


class Login extends Component {
  renderLoginResponse() {
    if (!isLoaded(this.props.auth)) { // Waiting for auth info from server
      return (<LoadingSpinner />);
    } else if (isEmpty(this.props.auth) && isLoaded(this.props.auth)) { // user not logged in
      return (
              <button // <GoogleButton/> button can be used instead
                  className="btn btn-large btn-outline-secondary"
                  onClick={() => this.props.firebase.login({ provider: 'google', type: 'popup' })}
              >
                <FontAwesomeIcon icon={googleIcon} />&nbsp;
                Sign in with Google
              </button>
      );
    }
    // user is logged in
    return (<div><Redirect to="/home"/></div>);
  }

  render() {
    return (
        <section className="jumbotron">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Sign in</h2>
                        Currently, we only support authentication with Google.
                        <div className="text-center mt-3">
                          { this.renderLoginResponse() }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}


// Login.propTypes = {
//   firebase: PropTypes.shape({
//     login: PropTypes.func.isRequired,
//   }),
//   auth: PropTypes.object,
// };


const LoginWithFirebase = compose(
  firebaseConnect(), // withFirebase can also be used
  connect(state => ({
    auth: state.firebase.auth,
  })),
)(Login);

export default connect(mapStateToProps, mapDispatchToProps)(LoginWithFirebase);
