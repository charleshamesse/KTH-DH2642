import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { fetchBook, fetchComments, updateComments } from '../../actions';
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

  uploadComment = (bookId, username, userId, timestamp) => {
    // Update comments in component
    const text = document.getElementById('commentTextArea').value;
    this.props.comments.push({
      text, username, userId, timestamp,
    });

    // API calls
    this.props.updateComments(bookId, this.props.comments, this.props.firebase);
    this.props.fetchComments(bookId, this.props.firebase);

    // Reset form
    document.getElementById('commentTextArea').value = '';
    document.getElementById('commentTextArea').placeholder = 'Write a comment...';
  }

  renderBookDetail() {
    if (!this.props.loadingBook) {
      const favs = this.props.profile.favorites || [];
      const favBookIds = Object.keys(favs).map(k => favs[k]);
      const { book } = this.props;
      const isFavorite = favBookIds.includes(book.id);
      const { authors, title } = book.volumeInfo;
      const { saleInfo } = book;
      const isForSale = saleInfo.saleability === 'FOR_SALE';
      const buyLink = isForSale ? saleInfo.buyLink : '#';
      const price = isForSale ? `${saleInfo.listPrice.amount}  ${saleInfo.listPrice.currencyCode} ` : 'N/A ';
      return (
        <div className="row">
          <div>
          <BookCard
            apiId={book.id}
            book={book}
            title={title}
            authors={authors || []}
            isFavorite={isFavorite}
            favBookIds={favBookIds}
            auth={this.props.auth}
            firebase={this.props.firebase}
            noLink={true} />
          <div id="book-price">
            <p>Price: {price}</p>
            {isForSale
              ? <a target="_blank" href={saleInfo.buyLink} className="card-link">Buy book </a>
              : <span>Book not availabe for purchase.</span>}
          </div>
          </div>
          <div className="col-md-8">
            <h6>Title</h6>
            <p>{title}</p>
            <h6>Authors</h6>
            <p>{authors ? authors.join(', ') : 'Unknown'}</p>
            <h6>Description</h6>
            {
              // TODO: find an alternative to this dangerouslySetInnerHTML
            }
            <p dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}>
            </p>
            <h6>Comments</h6>
              {!this.props.loadingComments
                ? <CommentList comments={this.props.comments} />
                : <LoadingSpinner/>}
            <div>
              {this.props.auth.isEmpty
              ? <strong>Log in to comment on books</strong>
              : <CreateComment username={this.props.profile.displayName}
                             userId={this.props.auth.uid}
                             bookId={this.props.book.id}
                             timestamp={new Date()}
                             uploadFunc={this.uploadComment} />
              }
            </div>
          </div>
        </div>
      );
    }
    return (
      <LoadingSpinner />
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
  return bindActionCreators({ fetchBook, fetchComments, updateComments }, dispatch);
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
