import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { fetchBooks } from '../../actions';
import BookCard from '../../components/BookCard';


class Recommendations extends Component {
  componentDidMount() {
    this.props.fetchBooks('Deep Learning');
  }

  renderBooks() {
    const favs = this.props.profile.favorites || [];
    const favBookIds = Object.keys(favs).map(k => favs[k]);
    return _.map(this.props.books, (book) => {
      const isFavorite = favBookIds.includes(book.id);
      return (
          <BookCard key={book.id} apiId={book.id} book={book}
            title={book.volumeInfo.title} authors={book.volumeInfo.authors}
            isFavorite={isFavorite} favBookIds={favBookIds} auth={this.props.auth}
            firebase={this.props.firebase}
          />
      );
    });
  }

  render() {
    return (
      <div>
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="my-3 py-3">
              <h2 className="display-5">{'Today\'s Recommendations'}</h2>
              <p className="lead">{'Here\'s a list of books carefully picked by our team of experts.'}</p>

            </div>
            <div className="card-columns">
              {this.props.profile ? this.renderBooks() : 'Loading'}
            </div>

          </div>
        </div>
      </div>
    );
  }
}


// Anything returned from this function will end up as props
// on the BookList container
function mapDispatchToProps(dispatch) {
  // Whenever selectBook is called, the result shoudl be passed
  // to all of our reducers
  return bindActionCreators({ fetchBooks }, dispatch);
}

const RecommendationsWithFirebase = compose(
  firebaseConnect(),
  connect(
    state => ({
      books: state.bookHandler.books,
      profile: state.firebase.profile,
      auth: state.firebase.auth,
    }),
    mapDispatchToProps,
  ),
)(Recommendations);

export default RecommendationsWithFirebase;
