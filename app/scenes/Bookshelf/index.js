import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { fetchFavorites } from '../../actions';
import LoadingSpinner from '../../components/LoadingSpinner';
import BookshelfContainer from '../../components/BookshelfContainer';

class Bookshelf extends Component {
  constructor(props) {
    super(props);
    this.updateFavorites = this.updateFavorites.bind(this);
  }

  componentDidMount() {
    // this.props.fetchFavorites();
  }

  fetchFavoritesIfNeeded() {
    /*
    if (!this.props.favorites.loading) {
      console.log('loading fav');
      this.props.fetchFavorites(this.props.profile.favorites);
    }
    return this.props.favorites;
    */
    return true;
  }

  updateFavorites(favorites) {
    this.props.firebase.database().ref(`users/${this.props.auth.uid}`).update({
      favorites,
    });
  }

  renderContent() {
    // When auth is loaded
    if (isLoaded(this.props.auth)) {
      // When auth is loaded and not empty
      if (isLoaded(this.props.profile) && !isEmpty(this.props.profile)) {
        // When favorites are loaded, display content
        if (this.fetchFavoritesIfNeeded()) {
          return (
            <div className="container">
              <div className="my-3 py-3">
                <h2 className="display-5">Bookshelf</h2>
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
        }
        return (
          <LoadingSpinner />
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchFavorites }, dispatch);
}

const BookshelfWithFirebase = compose(
  firebaseConnect(),
  connect(
    state => ({
      profile: state.firebase.profile,
      auth: state.firebase.auth,
      // favorites: state.favorite || [],
    }),
    mapDispatchToProps,
  ),
)(Bookshelf);

export default BookshelfWithFirebase;
