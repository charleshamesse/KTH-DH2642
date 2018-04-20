import React, { Component } from 'react';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import BookShelfCard from '../BookShelfCard';
import { setBookCardPosition } from '../../actions/';

class BookShelfBar extends Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
  }

  moveCard(dragIndex, hoverIndex) {
    this.props.setBookCardPosition(dragIndex, hoverIndex);
  }

  render() {
    const { books } = this.props;
    return (
      <div className="">
        {books.map((card, i) => (
          <BookShelfCard
            key={card.id}
            index={i}
            id={card.id}
            text={card.text}
            moveCard={this.moveCard}
          />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.BookShelfBar.books,
  };
}

const BookShelfBarDnD = DragDropContext(HTML5Backend)(BookShelfBar);
const BookShelfBarConnected = connect(mapStateToProps, { setBookCardPosition })(BookShelfBarDnD);
export default BookShelfBarConnected;
