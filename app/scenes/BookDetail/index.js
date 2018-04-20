import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { fetchBook } from '../../actions';
import BookCard from '../../components/BookCard';
import LoadingSpinner from '../../components/LoadingSpinner';


class BookDetail extends Component {
  componentDidMount() {
    const bookIdFromURL = this.props.match.params.id;
    this.props.fetchBook(bookIdFromURL);
  }

  renderBookDetail(isFavorite) {
    if (!this.props.loading) {
      const favs = this.props.profile.favorites || [];
      const favBookIds = Object.keys(favs).map(k => favs[k]);
      const { book } = this.props;
      const { authors } = book.volumeInfo;
      return (
        <div className="row">
          <div className="col-md-4 card bg-light">
            <div className="card-body">
              <h5 className="card-title">{book.volumeInfo.title}</h5>
              <p className="card-text">{book.volumeInfo.subtitle}</p>
            </div>

            <img className="card-img" src={`https://books.google.com/books/content/images/frontcover/${book.id}?fife=w300-h450`} alt="Card image cap" />

            <div className="card-body">
              <a href="#" className="card-link">Card link</a>
              <a href="#" className="card-link">Another link</a>
            </div>
          </div>
          <div className="col-md-8">
            <h6>Authors</h6>
            <p>{authors ? authors.join(', ') : 'Unknown'}</p>
            <h6>Description</h6>
            {
              // TODO: find an alternative to this dangerouslySetInnerHTML
            }
            <p dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}>
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className="w-100 text-center">
        <LoadingSpinner />
      </div>
    );
  }

  render() {
    console.log(this.props);
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 below-nav">
            {this.renderBookDetail()}
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchBook }, dispatch);
}

const BookDetailWithFirebase = compose(
  firebaseConnect(),
  connect(
    state => ({
      book: state.bookDetail.book,
      loading: state.bookDetail.loading,
      profile: state.firebase.profile,
      auth: state.firebase.auth,
    }),
    mapDispatchToProps,
  ),
)(BookDetail);

export default BookDetailWithFirebase;
