import React, { Component } from 'react';

import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators, compose } from 'redux'
import { fetchBooks } from "../../actions";
import BookCard from '../../components/BookCard';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'


class Recommendations extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchBooks("Deep Learning");
  }

  addBookToFavorites(book, favBooks) {
    const id = this.props.auth.uid
    favBooks.push(book.id);
    this.props.firebase.database().ref(`users/${id}`).update({
      favorites: favBooks
    })
  }

  removeBookFromFavorites(book, favBooks) {
    const index = favBooks.indexOf(book.id);
    const id = this.props.auth.uid    
    if (index !== -1) favBooks.splice(index, 1);
    this.props.firebase.database().ref(`users/${id}`).update({
      favorites: favBooks
    });
  }

  renderBooks() {
    const favs = this.props.profile.favorites || [];
    const favBookIds = Object.keys(favs).map((k) => favs[k]);
    return _.map(this.props.books, book => {
      let isFavorite = favBookIds.includes(book.id);
        return (
          <BookCard key={book.id} apiId={book.id} book={book} title={book.volumeInfo.title} authors={book.volumeInfo.authors}
                    thumbnail={book.volumeInfo.imageLinks.thumbnail} 
                    isFavorite={isFavorite} 
                    onClickFunc={() => console.log("clicked")}
                    addToFavoritesFunc={isFavorite 
                      ? () => this.removeBookFromFavorites(book, favBookIds) 
                      : () => this.addBookToFavorites(book, favBookIds)
                    }
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
              <h2 className="display-5">Today's Recommendations</h2>
              <p className="lead">Here's a list of books carefully picked by our team of experts.</p>
              
            </div>
            <div className="card-columns">
              {this.props.profile ? this.renderBooks() : "Loading"}
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
  firebaseConnect((props) => {
    return [
    ]
  }),
  connect(
    (state) => ({
      books: state.bookHandler.books,
      profile: state.firebase.profile,
      auth: state.firebase.auth,
    }),
    mapDispatchToProps
  )
)(Recommendations)

export default RecommendationsWithFirebase
