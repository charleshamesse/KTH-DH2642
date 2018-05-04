import React, { Component } from 'react';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { bindActionCreators } from 'redux';
import BookShelfCard from '../BookShelfCard';
import { fetchFavorites, setBookCardPosition } from '../../actions/';

// TODO
// For saving: do auto-save every few seconds?

class BookshelfContainer extends Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
  }

  componentWillMount() {
    console.log('cwm');
    console.log(this.props);
    this.props.fetchFavorites(this.props.bookIds);
  }

  moveCard(dragIndex, hoverIndex) {
    this.props.setBookCardPosition(dragIndex, hoverIndex);
    console.log('update');

    // Newly ordered favorites in array
    const updatedFavoritesArray = this.props.favorites.books.map(bookData => bookData.data.id);

    // Make a dict out of it
    const updatedFavoritesDict = {};
    updatedFavoritesArray.forEach((fav, index) => {
      updatedFavoritesDict[index] = fav;
    });

    console.log(updatedFavoritesDict);
    this.props.updateFavoritesFunc(updatedFavoritesDict);
  }

  render() {
    // const { books } = this.props;
    console.log('render');
    console.log(this.props.favorites);
    if (this.props.favorites) {
      const { books } = this.props.favorites;
      console.log(books);
      return (
        <div className="row px-2">
          {
            books.map((book, i) => (
            <BookShelfCard
              key={book.data.id}
              index={i}
              id={book.data.id}
              title={book.data.volumeInfo.title}
              authors={book.data.volumeInfo.authors}
              moveCard={this.moveCard}
            />
          ))
        }
        </div>
      );
    }
    return (
      <div>Loading..</div>
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
