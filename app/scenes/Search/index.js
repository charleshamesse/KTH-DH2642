import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { debounce } from 'throttle-debounce';
import { fetchBooks } from '../../actions';
import BookCard from '../../components/BookCard';

class Search extends Component {
  constructor(props) {
    super(props);

    // TODO:
    // Manage state properly with redux
    // Add loaders and manage errors
    this.state = {
      searchQuery: '',
    };
  }

  componentDidMount() {
    this.props.fetchBooks('Deep Learning');
    this.search = debounce(500, this.search);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      searchQuery: event.target.value,
    });
    this.search(this.state.searchQuery);
  }

  search(e) {
    this.props.fetchBooks(e);
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

  renderContent() {
    return (
      <div className="album py-5">
        <div className="container">
          <div className="my-3 py-3">
            <h2 className="display-5">Results</h2>
            <p className="lead">{'Here\'s a list of the best books matching your query.'}</p>

          </div>
          <div className="card-columns">
            {this.props.profile ? this.renderBooks() : 'Loading'}
          </div>

        </div>
      </div>
    );
  }

  render() {
    console.log(this.props.books);
    return (
      <div className="container-fluid">
        <div className="row flex-xl-nowrap">
          <div className="col-md-4 offset-md-4 below-nav">
            <h2>Search</h2>
            <p>
              <input className="form-control" onChange={this.handleChange} value={this.state.searchQuery} />
            </p>
          </div>
        </div>
        <div className="row flex-xl-nowrap">
          <div className="col-12 py-md-3 pl-md-5 bd-content ">
            {this.renderContent()}
          </div>
        </div>
      </div >
    );
  }
}

// Anything returned from this function will end up as props
// on the BookList container
function mapDispatchToProps(dispatch) {
  // Whenever selectBook is called, the result should be passed
  // to all of our reducers
  return bindActionCreators({ fetchBooks }, dispatch);
}

const SearchWithFirebase = compose(
  firebaseConnect(),
  connect(
    state => ({
      books: state.bookHandler.books,
      profile: state.firebase.profile,
      auth: state.firebase.auth,
    }),
    mapDispatchToProps,
  ),
)(Search);

export default SearchWithFirebase;
