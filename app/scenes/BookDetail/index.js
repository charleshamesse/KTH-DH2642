import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { fetchBooks } from '../../actions';
import BookCard from '../../components/BookCard';


class BookDetail extends Component {
  componentDidMount() {
    // TODO Fetch book if not in booklist.
  }

  renderBookDetail(isFavorite) {
    const favs = this.props.profile.favorites || [];
    const favBookIds = Object.keys(favs).map(k => favs[k]);
    return (
        <div>Book tails here plz</div>
    );
  }

  render() {
    return (
      <div>
        <div className="album py-5 bg-light">
          <div className="container">
            <h1>Welcome to this books screen.</h1>
            <h2>{this.props.match.params.id}</h2>
          </div>
        </div>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchBooks }, dispatch);
}

const BookDetailWithFirebase = compose(
  firebaseConnect(),
  connect(
    state => ({
      books: state.bookHandler.books,
      profile: state.firebase.profile,
      auth: state.firebase.auth,
    }),
    mapDispatchToProps,
  ),
)(BookDetail);

export default BookDetailWithFirebase;
