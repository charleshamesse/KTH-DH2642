import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import _ from 'lodash';
import { debounce } from 'throttle-debounce';
import InfiniteScroll from 'react-infinite-scroll-component';
import { editSearch, fetchBooks, fetchMoreBooks } from '../../actions';
import BookCard from '../../components/BookCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.hasMore = this.hasMore.bind(this);
    this.fetchMoreBooks = this.fetchMoreBooks.bind(this);
    this.search = debounce(300, this.search);
  }

  handleChange(event) {
    // Handles change on the search parameters
    if (event.target.id === 'search-input') {
      // this.props.searchData.searchString = event.target.value;
      this.props.editSearch(event.target.value, this.props.searchData.searchCategory);
      this.search(event.target.value, this.props.searchData.searchCategory);
    } else {
      // this.props.searchData.searchCategory = event.target.value;
      this.props.editSearch(this.props.searchData.searchString, event.target.value);
      this.search(this.props.searchData.searchString, event.target.value);
    }
  }

  search(queryString, type) {
    // Does the search when changing parameters
    this.props.fetchBooks(queryString, type);
  }

  fetchMoreBooks() {
    // Does the search when loading more, called in the InfiniteScroll component
    return this.props.fetchMoreBooks(this.props.searchData.searchString, this.props.searchData.searchCategory, this.props.nextIndex);
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
            isFavorite={isFavorite} favBookIds={favBookIds}
          />
        );
      }
      return '';
    });
  }

  renderBookCardContainer() {
    // Renders the InfiniteScroll container
    if (!this.props.error) {
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
    return (
      <ErrorMessage />
    );
  }

  renderResults() {
    // Renders the higher-level component of results
    if (this.props.searchData.searchString) {
      if (Object.keys(this.props.books).length > 0) {
        return (
            <div className="container">
              <div className="mt-3 py-3">
                <h2 className="display-5">
                  Results ({Object.keys(this.props.books).length} / {this.props.totalBooks})
                  {
                    // This makes sure we already display the persisted favorites with a spinner
                    // and update with the correct ones whenever it's ready
                    this.props.loading
                      ? <LoadingSpinner inline={true} />
                      : ''
                  }
                </h2>
                <p className="lead">{'Here\'s a list of the best books matching your query.'}</p>

              </div>
              <div className="book-results-container">
                {
                  this.props.profile ? this.renderBookCardContainer() : '<LoadingSpinner/>'
                }
              </div>
            </div>
        );
      }
      return (
        <div className="col-md-3 offset-md-4 text-center">
          {
            this.props.loading
              ? <LoadingSpinner />
              : <strong>No results found for that query...</strong>
          }
        </div>
      );
    }
    return (
      <div id='search-helper' className="my-5">Search for any book you want..</div>
    );
  }

  render() {
    // Main render method
    return (
      <div className="container-fluid">
        <div className="row flex-xl-nowrap">
          <div className="col-sm-4 offset-sm-4 below-nav">
            <h2>Search</h2>
            <form className="form-group row">
              <div className="col-md-6">
                <input id="search-input" className="form-control" onChange={this.handleChange} value={this.props.searchData.searchString} />
              </div>
              <label className="col-form-label col-md-1">in</label>
              <div className="col-md-5">
                  <select value={this.props.searchData.searchCategory} id="search-categories" onChange={this.handleChange} className="form-control">
                    <option value="intitle">Book titles</option>
                    <option value="inauthor" >Authors</option>
                    <option value="inpublisher">Publishers</option>
                    <option value="subject">Categories</option>
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
  return bindActionCreators({ editSearch, fetchBooks, fetchMoreBooks }, dispatch);
}

const SearchWithFirebase = compose(
  firebaseConnect(),
  connect(
    state => ({
      books: state.search.books,
      totalBooks: state.search.totalBooks,
      error: state.search.error,
      loading: state.search.loading,
      nextIndex: state.search.nextIndex,
      profile: state.firebase.profile,
      auth: state.firebase.auth,
      searchData: state.search,
    }),
    mapDispatchToProps,
  ),
)(Search);

export default SearchWithFirebase;
