import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import LoadingSpinner from '../../components/LoadingSpinner';
import BookshelfCard from '../../components/BookshelfCard';
import BookshelfContainer from '../../components/BookshelfContainer';
import { fetchFavorites } from '../../actions/';

class Profile extends Component {
  renderFavorites(favorites) {
    // TODO if no favorites, display that
    // TODO remove book from favorites
    const arr = Object.keys(favorites).map(k => favorites[k]);
    const listItems = arr.map((id, i) => {
      const a = 10;
      return (
        <div className="col-md-2 p-1" key={id}>
        <div className="card box-shadow">
          <Link style={{ color: 'black' }} to={`/books/${id}`}>
            <img className="card-img-top book-card-img-small" src={`https://books.google.com/books/content/images/frontcover/${id}?fife=w300-h450`} alt="Card image cap" />
            <div className="card-body">
              <h6>{ // _.truncate(title)
              }</h6>
              <p className="card-text"><small className="text-muted">{ // _.truncate(getAuthors(authors))
              }</small></p>
            </div>
          </Link>
        </div>
      </div>
      );
    });
    return (
      <div className="row">
        {listItems}
      </div>);
  }


  renderContent() {
    if (isLoaded(this.props.auth)) {
      if (isLoaded(this.props.profile) && !isEmpty(this.props.profile)) {
        console.log(this.props.favorites);
        return (
                <div className="row flex-xl-nowrap my-3 py-3">
                  <div className="col-md-4">
                    <div className="card profile-card">
                      <img className="rounded mx-auto d-block profile-card-image" width="50%" src={this.props.profile.avatarUrl} alt="Avatar" />
                      <div className="card-body text-center">
                        <h5 className="card-title">{this.props.profile.displayName}</h5>
                      </div>
                      <div className="card-body">
                        <p className="card-text">
                          <strong>Mail</strong><br />
                          {this.props.profile.email}<br />
                          <br />
                          <strong>Activity</strong><br />
                          {Object.keys(this.props.profile.favorites).length} favorite books
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                  <h2>Favorites</h2>
                    <BookshelfContainer bookIds={this.props.profile.favorites} editable={false} />
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
  return bindActionCreators({ fetchFavorites }, dispatch);
}

const ProfileWithFirebase = compose(
  firebaseConnect(),
  connect(
    state => ({
      profile: state.firebase.profile,
      auth: state.firebase.auth,
      favorites: state.favorite,
    }),
    mapDispatchToProps,
  ),
)(Profile);

export default ProfileWithFirebase;
