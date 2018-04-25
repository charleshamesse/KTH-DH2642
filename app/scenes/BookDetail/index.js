import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { fetchBook } from '../../actions';
import BookCard from '../../components/BookCard';
import CreateComment from '../../components/CreateComment';
import CommentCard from '../../components/CommentCard';
import LoadingSpinner from '../../components/LoadingSpinner';


class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  componentDidMount() {
    const bookIdFromURL = this.props.match.params.id;
    this.props.fetchBook(bookIdFromURL);
    this.getComments();
  }

  getComments() {
    const ref = this.props.firebase.database().ref(`bookComments/${this.props.book.id}`);
    ref.on('value', (snapshot) => {
      this.setState({
        comments: snapshot.val().comments,
      });
    }, (errorObject) => {
      console.log(`The read failed: ${errorObject.code}`);
    }, this);
  }

  renderComments() {
    // TODO if no favorites, display that
    // TODO remove book from favorites
    const arr = Object.keys(this.state.comments).map(k => this.state.comments[k]);
    const listItems = arr.map((comment, i) => <CommentCard key={i}
                                                           username={comment.username}
                                                           commentText={comment.text} />);
    return (listItems);
  }

  renderBookDetail(isFavorite) {
    if (!this.props.loading) {
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
              {this.state.comments ? <h3>Comments </h3> : <h3>No comments for this book yet...</h3>}
              {this.renderComments()}
            </div>
            <br />
            <br />
            <div>
              <CreateComment username={this.props.profile.displayName}
                             bookId={this.props.book.id}
                             timestamp={new Date()}
                             firebase={this.props.firebase}
                             comments={this.state.comments} />
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
