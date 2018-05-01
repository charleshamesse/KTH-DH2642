import React, { Component } from 'react';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import BookShelfCard from '../BookShelfCard';
import { setBookCardPosition } from '../../actions/';

class BookshelfContainer extends Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    // console.log(props.books);
  }

  moveCard(dragIndex, hoverIndex) {
    this.props.setBookCardPosition(dragIndex, hoverIndex);
  }

  render() {
    const { books } = this.props.favorites;
    return (
      <div className="row px-2">
        { // div>{JSON.stringify(this.props.books)}</div>
        }
        {books.map((book, i) => (
            <BookShelfCard
              key={book.data.id}
              index={i}
              id={book.data.id}
              title={book.data.volumeInfo.title}
              moveCard={this.moveCard}
            />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    favorites: state.favorite, // examples: state.bookshelf.books,
  };
}

const BookshelfContainerDnD = DragDropContext(HTML5Backend)(BookshelfContainer);
const BookshelfContainerConnected = connect(mapStateToProps, { setBookCardPosition })(BookshelfContainerDnD);
export default BookshelfContainerConnected;
