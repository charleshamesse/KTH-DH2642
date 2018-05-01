import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import _ from 'lodash';
import { debounce } from 'throttle-debounce';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchBooks, fetchMoreBooks } from '../../actions';
import BookCard from '../../components/BookCard';
import LoadingSpinner from '../../components/LoadingSpinner';

class Search extends Component {
  constructor(props) {
    super(props);
    // TODO:
    // Manage state properly with redux (problems when switching pages)
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.hasMore = this.hasMore.bind(this);
    this.fetchMoreBooks = this.fetchMoreBooks.bind(this);
  }

  componentDidMount() {
    // this.search = debounce(100, this.search);
  }

  handleChange(event) {
    // Handles change on the search parameters
    if (event.target.id === 'search-input') {
      this.props.searchData.searchString = event.target.value;
    } else {
      this.props.searchData.searchCategory = event.target.value;
    }
    this.search(this.props.searchData.searchString, this.props.searchData.searchCategory);
  }

  search(queryString, type) {
    // Does the search when changing parameters
    this.props.fetchBooks(queryString, type);
  }

  fetchMoreBooks() {
    // Does the search when loading more, called in the InfiniteScroll component
    console.log('fetchMore');
    return this.props.fetchMoreBooks(this.props.searchData.searchString, this.props.nextIndex);
  }

  hasMore() {
    // Checks if there are other books to load
    const { totalBooks } = this.props;
    const currentBooks = Object.keys(this.props.books).length;
    return currentBooks < totalBooks;
  }

  renderBookCards() {
    // Renders the list of book cards inside the InfiniteScroll container
    const favs = this.props.profile.favorites || [];
    const favBookIds = Object.keys(favs).map(k => favs[k]);
    return _.map(this.props.books, (book) => {
      const isFavorite = favBookIds.includes(book.id);
      if (book.volumeInfo) {
        return (
          <BookCard key={book.id} apiId={book.id} book={book}
            title={book.volumeInfo.title} authors={book.volumeInfo.authors}
            isFavorite={isFavorite} favBookIds={favBookIds} auth={this.props.auth}
            firebase={this.props.firebase}
          />
        );
      }
      return '';
    });
  }

  renderBookCardContainer() {
    // Renders the InfiniteScroll container
    return (
      <InfiniteScroll
        dataLength={Object.keys(this.props.books).length}
        next={this.fetchMoreBooks}
        hasMore={this.hasMore()}
        loader={<div className="col-md-3"><LoadingSpinner/></div>}
        endMessage={<div className="row p-4">{'That\'s all we could find!'}</div>}
        style={{ overflowY: 'hidden' }}
        >
        <div className="row">
          {this.renderBookCards()}
        </div>
      </InfiniteScroll>
    );
  }

  renderResults() {
    // Renders the higher-level component of results
    if (this.props.searchData.searchString) {
      if (Object.keys(this.props.books).length > 0) {
        return (
            <div className="container">
              <div className="my-3 py-3">
                <h2 className="display-5">Results ({Object.keys(this.props.books).length} / {this.props.totalBooks})</h2>
                <p className="lead">{'Here\'s a list of the best books matching your query.'}</p>

              </div>
              <div className="book-results-container">
                {
                  this.props.profile ? this.renderBookCardContainer() : 'Loading'
                }
              </div>
            </div>
        );
      }
      return (
        <strong className="col-md-3 offset-md-4">No results found for that query...</strong>
      );
    }
    return (
      <div id='search-helper'>Search for any book you want..</div>
    );
  }

  render() {
    // Main render method
    return (
      <div className="container-fluid">
        <div className="row flex-xl-nowrap">
          <div className="col-md-4 offset-md-4 below-nav">
            <h2>Search</h2>
            <form id="this-is-form-id">
              <input id="search-input" className="form-control" onChange={this.handleChange} value={this.props.searchData.searchString} />
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect2">Search in:</label>
                <select value={this.props.searchData.searchCategory} id="search-categories" onChange={this.handleChange} className="form-control">
                  <option value="intitle">Book Titles</option>
                  <option value="inauthor" >Author names</option>
                  <option value="subject">Subject text</option>
                  <option value="isbn">ISBN</option>
                </select>
              </div>
            </form>
          </div>
        </div>
        <div className="row flex-xl-nowrap">
          <div className="col-12">
            {this.renderResults()}
          </div>
        </div>
      </div>
    );
  }
}


// Redux and firebase bindings
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchBooks, fetchMoreBooks }, dispatch);
}

const SearchWithFirebase = compose(
  firebaseConnect(),
  connect(
    state => ({
      books: state.bookHandler.books,
      totalBooks: state.bookHandler.totalBooks,
      loading: state.bookHandler.loading,
      nextIndex: state.bookHandler.nextIndex,
      profile: state.firebase.profile,
      auth: state.firebase.auth,
      searchData: state.searchData,
    }),
    mapDispatchToProps,
  ),
)(Search);

export default SearchWithFirebase;
