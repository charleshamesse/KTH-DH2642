import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { fetchBook, fetchComments } from '../../actions';
import BookCard from '../../components/BookCard';
import CreateComment from '../../components/CreateComment';
import CommentList from '../../components/CommentList';
import LoadingSpinner from '../../components/LoadingSpinner';


class BookDetail extends Component {
  componentDidMount() {
    const bookIdFromURL = this.props.match.params.id;
    this.props.fetchBook(bookIdFromURL);
    this.props.fetchComments(bookIdFromURL, this.props.firebase);
  }

  uploadComment = (bookId, username, timestamp) => {
    const text = document.getElementById('commentTextArea').value;
    this.props.comments.push({ text, username, timestamp });
    this.props.firebase.database().ref(`bookComments/${bookId}`).update({
      comments: this.props.comments,
    });
    this.props.fetchComments(bookId, this.props.firebase);
    document.getElementById('commentTextArea').value = '';
    document.getElementById('commentTextArea').placeholder = 'Write a comment...';
  }

  renderBookDetail(isFavorite) {
    if (!this.props.loadingBook) {
      const favs = this.props.profile.favorites || [];
      const favBookIds = Object.keys(favs).map(k => favs[k]);
      const { book } = this.props;
      const { authors } = book.volumeInfo;
      const { saleInfo } = book;
      const isForSale = saleInfo.saleability === 'FOR_SALE';
      const buyLink = isForSale ? saleInfo.buyLink : '#';
      const price = isForSale ? `${saleInfo.listPrice.amount}  ${saleInfo.listPrice.currencyCode} ` : 'N/A ';
      return (
        <div className="row">
          <div className="col-md-4 card bg-light">
            <div className="card-body">
              <h5 className="card-title">{book.volumeInfo.title}</h5>
              <p className="card-text">{book.volumeInfo.subtitle}</p>
            </div>
            <img className="card-img" src={`https://books.google.com/books/content/images/frontcover/${book.id}?fife=w300-h450`} alt="Card image cap" />
            <div className="card-body">
              <p>Price: {price}</p>
              {isForSale
                ? <a href={saleInfo.buyLink} className="card-link">Buy book </a>
                : <span>Book not availabe for purcash.</span>}
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
            <div>
              {!this.props.loadingComments
                ? <CommentList comments={this.props.comments} />
                : <LoadingSpinner/>}
            </div>
            <br />
            <br />
            <div>
              <CreateComment username={this.props.profile.displayName}
                             bookId={this.props.book.id}
                             timestamp={new Date()}
                             uploadFunc={this.uploadComment} />
            </div>
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
  return bindActionCreators({ fetchBook, fetchComments }, dispatch);
}

const BookDetailWithFirebase = compose(
  firebaseConnect(),
  connect(
    state => ({
      book: state.bookDetail.book,
      comments: state.bookDetail.comments,
      loadingBook: state.bookDetail.loadingBook,
      loadingComments: state.bookDetail.loadingComments,
      profile: state.firebase.profile,
      auth: state.firebase.auth,
    }),
    mapDispatchToProps,
  ),
)(BookDetail);

export default BookDetailWithFirebase;
