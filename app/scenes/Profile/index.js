import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import BookshelfCard from '../../components/BookshelfCard';
import BookshelfContainer from '../../components/BookshelfContainer';
import { fetchFavorites, fetchProfile } from '../../actions/';

class Profile extends Component {
  componentDidMount() {
    const profileIdFromURL = this.props.match.params.id;
    this.props.fetchProfile(profileIdFromURL, this.props.firebase);
  }

  renderContent() {
    const { loadingProfile, profile, error } = this.props.profile;
    if (!loadingProfile && !isEmpty(profile)) {
      if (!error) {
        return (
                <div className="row flex-xl-nowrap my-3 py-3">
                  <div className="col-md-4">
                    <div className="card profile-card">
                      <img className="rounded mx-auto d-block profile-card-image" width="50%" src={profile.avatarUrl} alt="Avatar" />
                      <div className="card-body text-center">
                        <h5 className="card-title">{profile.displayName}</h5>
                      </div>
                      <div className="card-body">
                        <p className="card-text">
                          <strong>Mail</strong><br />
                          {profile.email}<br />
                          <br />
                          <strong>Activity</strong><br />
                          {Object.keys(profile.favorites).length} favorite books
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                  <h2>Favorites</h2>
                    <BookshelfContainer bookIds={profile.favorites} editable={false} />
                  </div>
                </div>
        );
      }
      return (<ErrorMessage />);
    }
    return (<LoadingSpinner />); // Auth not loaded
  }

  render() {
    return (
      <div className="container">
        {this.props.match.params.id === 'undefined'
        ? <Redirect to='/home' />
        : this.renderContent()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProfile }, dispatch);
}

const ProfileWithFirebase = compose(
  firebaseConnect(),
  connect(
    state => ({
      profile: state.profileDetail,
      auth: state.firebase.auth,
      favorites: state.favorite,
      // profileDetail: state.profileDetail,
    }),
    mapDispatchToProps,
  ),
)(Profile);

export default ProfileWithFirebase;
