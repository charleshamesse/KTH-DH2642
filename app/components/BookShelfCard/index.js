import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

const style = {
  cursor: 'move',
};

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
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    console.log(hoverIndex);

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical and horizontal middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) * (1 / 3);
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) * (1 / 3);

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    const hoverClientX = clientOffset.x - hoverBoundingRect.left;
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
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

class BookshelfCard extends Component {
  render() {
    const {
      text,
      isDragging,
      connectDragSource,
      connectDropTarget,
    } = this.props;
    const opacity = isDragging ? 0 : 1;

    const content = (
      <div style={{ ...style, opacity }} className="col-md-3 p-1">
        <div className="card">
          {text}
        </div>
      </div>
    );
    return connectDragSource(connectDropTarget(content));
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
