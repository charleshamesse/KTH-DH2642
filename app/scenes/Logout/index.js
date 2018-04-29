import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

class Logout extends Component {
  componentDidMount() {
    this.props.firebase.logout();
  }

  render() {
    return (
            <section className="jumbotron text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">{"You're out."}</div>
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

const LogoutWithFirebase = compose(
  firebaseConnect(),
  connect(state => ({
    profile: state.firebase.profile, // load profile
  })),
)(Logout);

export default connect(mapStateToProps, mapDispatchToProps)(LogoutWithFirebase);
