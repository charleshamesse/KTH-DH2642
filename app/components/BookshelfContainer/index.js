import React, { Component } from 'react';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { bindActionCreators } from 'redux';
import { fetchFavorites, setBookCardPosition } from '../../actions/';
import BookshelfCard from '../BookshelfCard';
import ErrorMessage from '../ErrorMessage';
import LoadingSpinner from '../LoadingSpinner';

class BookshelfContainer extends Component {
  constructor(props) {
    super(props);

    // This component is used in a drag-and-drop and a static situation
    if (props.editable) {
      this.moveCard = this.moveCard.bind(this);
    } else {
      this.moveCard = null;
    }
  }

  componentWillMount() {
    // It receives the ids of the books to load as props, calls the API the get these books
    this.props.fetchFavorites(this.props.bookIds);
  }

  moveCard(dragIndex, hoverIndex) {
    // Card reordering is implemented using redux
    this.props.setBookCardPosition(dragIndex, hoverIndex);

    // Here are the newly ordered favorites in array
    const updatedFavoritesArray = this.props.favorites.books.map(bookData => bookData.data.id);

    // Make a dict with it and update
    const updatedFavoritesDict = {};
    updatedFavoritesArray.forEach((fav, index) => {
      updatedFavoritesDict[index] = fav;
    });
    this.props.updateFavoritesFunc(updatedFavoritesDict);
  }

  render() {
    if (this.props.favorites) {
      const { books, error } = this.props.favorites;
      if (!error) {
        return (
          <div className="row px-2">
            {
              books.map((book, i) => (
              <BookshelfCard
                key={book.data.id}
                index={i}
                id={book.data.id}
                title={book.data.volumeInfo.title}
                authors={book.data.volumeInfo.authors}
                moveCard={this.moveCard}
                editable={this.props.editable}
              />
            ))
          }
          </div>
        );
      }
      return (<ErrorMessage />);
    }
    return (
      <LoadingSpinner />
    );
  }
}

function mapStateToProps(state) {
  return {
    favorites: state.favorite, // examples: state.bookshelf.books,
    profile: state.firebase.profile, // examples: state.bookshelf.books,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchFavorites, setBookCardPosition }, dispatch);
}

const BookshelfContainerDnD = DragDropContext(HTML5Backend)(BookshelfContainer);
const BookshelfContainerConnected = connect(mapStateToProps, mapDispatchToProps)(BookshelfContainerDnD);
export default BookshelfContainerConnected;
