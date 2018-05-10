import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { fetchFavorites, updateFavorites } from '../../actions';
import LoadingSpinner from '../../components/LoadingSpinner';
import BookshelfContainer from '../../components/BookshelfContainer';

class Bookshelf extends Component {
  constructor(props) {
    super(props);
    this.updateFavorites = this.updateFavorites.bind(this);
  }

  updateFavorites(favorites) {
    this.props.updateFavorites(this.props.firebase, this.props.auth.uid, favorites);
  }

  renderContent() {
    // When auth is loaded
    if (isLoaded(this.props.auth)) {
      // When auth is loaded and not empty
      if (isLoaded(this.props.profile) && !isEmpty(this.props.profile)) {
        return (
          <div className="container">
            <div className="my-3 py-3">
              <h2 className="display-5">
                Bookshelf
                {
                  // This makes sure we already display the persisted favorites with a spinner
                  // and update with the correct ones whenever it's ready
                  this.props.favorites.loading
                    ? <LoadingSpinner inline={true} />
                    : ''
                }
              </h2>
                {this.props.profile.favorites
                  ? <div>
                      <p className="text-lead">Have your favorite books organized the way you want.</p>
                      <BookshelfContainer bookIds={this.props.profile.favorites} updateFavoritesFunc={this.updateFavorites} editable={true} />
                    </div>
                  : <p>Pick some books as favorites so that you can order them!</p>
                }
            </div>
          </div>
        );
      } else if (isLoaded(this.props.profile) && isEmpty(this.props.profile)) {
        return ( // user is logged in
          <div>
            <Redirect to="/home" />
          </div>
        );
      }
    }
    return (<LoadingSpinner />); // Auth not loaded
  }

  render() {
    return (
      <div className="container">
        <div className="row flex-xl-nowrap">
          <div className="col-12">
            {this.renderContent()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
    favorites: state.favorite,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchFavorites, updateFavorites }, dispatch);
}

const BookshelfWithFirebase = compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Bookshelf);

export default BookshelfWithFirebase;
