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
      return (
        <div>
          <h2>{this.props.book.volumeInfo.title}</h2>
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
      <div className="container-fluid">
        <div className="row flex-xl-nowrap">
          <div className="col-12 below-nav">
            {this.renderBookDetail()}
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
