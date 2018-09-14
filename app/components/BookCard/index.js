import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { bindActionCreators, compose } from 'redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { updateFavorites } from '../../actions/';
import './heart.css';

class BookCard extends Component {
  addBookToFavorites = (book, favorites) => {
    favorites.push(book.id);
    this.props.updateFavorites(this.props.firebase, this.props.auth.uid, favorites);
  }

  removeBookFromFavorites = (book, favorites) => {
    const index = favorites.indexOf(book.id);
    if (index !== -1) favorites.splice(index, 1);
    this.props.updateFavorites(this.props.firebase, this.props.auth.uid, favorites);
  }

  handleBookFavoriteClick = (isFavorite, book, favBookIds) => {
    this.props.auth.isEmpty && window.location.replace('/login?favorite'); // user not logged in, redirect to login

    isFavorite
      ? this.removeBookFromFavorites(book, favBookIds)
      : this.addBookToFavorites(book, favBookIds);
  }

  getAuthors = (authors) => {
    if (authors) {
      return authors.join(', ');
    }
    return '';
  }

  render() {
    const {
      apiId, book, title, authors, isFavorite, favBookIds, noLink,
    } = this.props;

    return (
      <div className={noLink ? 'col-md-12 mb-3' : 'col-md-3 mb-3'}>
        <div className="card box-shadow">
          <div className="card-header" data-toggle="tooltip" data-placement="top">
            <div className={`HeartAnimation ${isFavorite ? 'animate' : ''}`} onClick={() => this.handleBookFavoriteClick(isFavorite, book, favBookIds)}></div>
          </div>
          <Link className={noLink ? 'noHover' : ''} style={{ color: 'black' }} to={noLink ? '#' : `/books/${apiId}`}>
            <img className={noLink ? 'card-img-top' : 'card-img-top book-card-img'} src={`https://books.google.com/books/content/images/frontcover/${apiId}?fife=w300-h450`} alt="Card image cap" />
            <div className="card-body">
              <h4>{_.truncate(title)}</h4>
              <p className="card-text"><small className="text-muted">{_.truncate(this.getAuthors(authors))}</small></p>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.firebase.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateFavorites }, dispatch);
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(BookCard);
