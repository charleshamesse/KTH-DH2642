import React, { Component } from 'react';

import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { fetchBooks } from "../../actions";
import BookCard from '../../components/BookCard'


class Recommendations extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchBooks("Deep Learning");
  }

  renderBooks() {
    console.log(this.props)
    if(this.props.loading) {
      return (<div>Loading..</div>)
    }
    else {
      return _.map(this.props.books, book => {
        return (
  //        <div className="col-md-3">
            <BookCard key={book.id}  apiId={book.id} book={book} title={book.volumeInfo.title} thumbnail={book.volumeInfo.imageLinks.thumbnail} />
    //      </div>
        );
      });
    }
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
              {this.renderBooks()}
            </div>

          </div>
        </div>
      </div>
    );
  }
}



function mapStateToProps(state) {
  // console.log("mstp", state)

  return { books: state.bookHandler.books };
}

// Anything returned from this function will end up as props
// on the BookList container
function mapDispatchToProps(dispatch) {
  // Whenever selectBook is called, the result shoudl be passed
  // to all of our reducers
  return bindActionCreators({ fetchBooks: fetchBooks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Recommendations)
  // mapStateToProps, { fetchBooks })(Recommendations);
