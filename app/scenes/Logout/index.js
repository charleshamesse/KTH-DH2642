import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { logout } from '../../actions/';
import LoadingSpinner from '../../components/LoadingSpinner';

class Logout extends Component {
  componentWillMount() {
    this.props.logout(this.props.firebase);
  }

  renderContent() {
    if (!isLoaded(this.props.auth)) { // Waiting for auth info from server
      return (<LoadingSpinner />);
    } else if (isEmpty(this.props.auth) && isLoaded(this.props.auth)) { // user not logged in
      return (
        <div className="text-center">{"You're out. We hope to see you again soon!"}</div>
      );
    }
    // user is logged in
    return (<div className="text-center">{"You're not out yet."}</div>);
  }

  render() {
    return (
      <section className="jumbotron text-center">
          <div className="container">
              <div className="row">
                  <div className="col-md-12">
                    <h2>Thanks for visiting!</h2>
                    <div className="pt-3 mt-3">
                      {this.renderContent()}
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
  return bindActionCreators({ logout }, dispatch);
}

const LogoutWithFirebase = compose(
  firebaseConnect(),
  connect(state => ({
    profile: state.firebase.profile,
    auth: state.firebase.auth,
  })),
)(Logout);

export default connect(mapStateToProps, mapDispatchToProps)(LogoutWithFirebase);
