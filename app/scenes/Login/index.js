import React, { Component } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
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
              >Login With Google</button>
      );
    }
    // user is logged in
    return (<div><Redirect to="/home"/></div>);
  }

  render() {
    return (
        <section className="jumbotron text-center">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        { this.renderLoginResponse() }
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
