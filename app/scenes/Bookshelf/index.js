import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import LoadingSpinner from '../../components/LoadingSpinner';
import BookShelfBar from '../../components/BookShelfBar';

class Bookshelf extends Component {
  renderFavorites(favorites) {
    // TODO if no favorites, display that
    const arr = Object.keys(favorites).map(k => favorites[k]);
    const listItems = arr.map(id => <li key={id}>{id}</li>);
    return (<ul>{listItems}</ul>);
  }


  renderContent() {
    if (isLoaded(this.props.auth)) {
      if (isLoaded(this.props.profile) && !isEmpty(this.props.profile)) {
        return (
          <div>
            <h2>BookShelf</h2>
            { <BookShelfBar books={this.props.profile.favorites} /> }
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
      <section className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {this.renderContent()}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

const BookshelfWithFirebase = compose(
  firebaseConnect(),
  connect(
    state => ({
      profile: state.firebase.profile,
      auth: state.firebase.auth,
    }),
    mapDispatchToProps,
  ),
)(Bookshelf);

export default BookshelfWithFirebase;