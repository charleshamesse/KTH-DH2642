import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import LoadingSpinner from '../../components/LoadingSpinner';

class Profile extends Component {
  renderFavorites(favorites) {
    // TODO if no favorites, display that
    // TODO remove book from favorites
    const arr = Object.keys(favorites).map(k => favorites[k]);
    const listItems = arr.map(id => <li key={id}>{id}</li>);
    return (<ul>{listItems}</ul>);
  }


  renderContent() {
    if (isLoaded(this.props.auth)) {
      if (isLoaded(this.props.profile) && !isEmpty(this.props.profile)) {
        return (
                <div className="row flex-xl-nowrap my-3 py-3">
                  <div className="col-md-4">
                    <div className="card profile-card">
                      <img className="rounded mx-auto d-block profile-card-image" width="50%" src={this.props.profile.avatarUrl} alt="Avatar" />
                      <div className="card-body text-center">
                        <h5 className="card-title">{this.props.profile.displayName}</h5>
                      </div>
                      <div className="card-body">
                        <p className="card-text">{this.props.profile.email}</p>
                        <p className="card-text">{Object.keys(this.props.profile.favorites).length} favorite books</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                  <h2>Favorites</h2>
                      {this.renderFavorites(this.props.profile.favorites)}
                  </div>
                </div>
        );
      } else if (isLoaded(this.props.profile) && isEmpty(this.props.profile)) {
        return ( // user is logged in
          <div>
              <Redirect to="/home"/>
          </div>
        );
      }
    }
    return (<LoadingSpinner />); // Auth not loaded
  }

  render() {
    return (
      <div className="container">
        {this.renderContent()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

const ProfileWithFirebase = compose(
  firebaseConnect(),
  connect(
    state => ({
      profile: state.firebase.profile,
      auth: state.firebase.auth,
    }),
    mapDispatchToProps,
  ),
)(Profile);

export default ProfileWithFirebase;
