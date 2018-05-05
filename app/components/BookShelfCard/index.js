import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const ItemTypes = {
  CARD: 'card',
};

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    if (props.editable) { // Make it optional for profile display
      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      props.moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
    }
  },
};

const propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  text: PropTypes.string.isRequired,
  moveCard: PropTypes.func.isRequired,
};

const getAuthors = (authors) => {
  if (authors) {
    return authors.join(', ');
  }
  return '';
};

class BookshelfCard extends Component {
  render() {
    const {
      title,
      authors,
      id,
      isDragging,
      connectDragSource,
      connectDropTarget,
    } = this.props;
    const opacity = isDragging ? 0 : 1;

    const style = {
      cursor: this.props.editable ? 'move' : 'default',
    };

    const content = (
      <div style={{ ...style, opacity }} className="col-md-2 p-1">
        <div className="card box-shadow">
          <Link style={{ color: 'black' }} to={`/books/${id}`}>
            <img className="card-img-top book-card-img-small" src={`https://books.google.com/books/content/images/frontcover/${id}?fife=w300-h450`} alt="Card image cap" />
            <div className="card-body">
              <h6>{_.truncate(title)}</h6>
              <p className="card-text"><small className="text-muted">{_.truncate(getAuthors(authors))}</small></p>
            </div>
          </Link>
        </div>
      </div>
    );
    if (this.props.editable) {
      return connectDragSource(connectDropTarget(content));
    }
    return content;
  }
}

function collectDragTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

function collectDragSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

function makeDragSource(types, source, collectSource, card) {
  return DragSource(types.CARD, source, collectSource)(card);
}

function makeDragTarget(types, target, collectTarget, card) {
  return DropTarget(types.CARD, target, collectTarget)(card);
}

const BookshelfCardSource = makeDragSource(
  ItemTypes,
  cardSource,
  collectDragSource,
  BookshelfCard,
);
const BookshelfCardTarget = makeDragTarget(
  ItemTypes,
  cardTarget,
  collectDragTarget,
  BookshelfCardSource,
);
export default BookshelfCardTarget;
