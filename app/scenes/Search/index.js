import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
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
  }

  componentDidMount() {
    // this.search = debounce(100, this.search);
  }

  handleChange(event) {
    if (event.target.id === 'search-input') {
      this.props.searchData.searchString = event.target.value;
    } else {
      this.props.searchData.searchCategory = event.target.value;
    }
    this.search(this.props.searchData.searchString, this.props.searchData.searchCategory);
  }

  hasMore() {
    console.log('hasMore');
    const { totalBooks } = this.props;
    const currentBooks = Object.keys(this.props.books).length;
    const ans = currentBooks < totalBooks;
    console.log(ans);
    return true; // ans;
  }

  search(s, c) {
    this.props.fetchBooks(s, c);
  }

  renderBooks() {
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

  fetchMoreData = () => {
    console.log('fetchMoreData');
    this.props.fetchMoreBooks(this.props.searchData.searchString, this.props.bookPage);
  };

  renderContent() {
    /*
    if (this.props.loading) {
      return (<div className="col-md-4 offset-md-5 "><LoadingSpinner/></div>);
    }
    */
    if (this.props.searchData.searchString) {
      if (Object.keys(this.props.books).length > 0) {
        console.log('render');
        return (
            <div className="container">
              <div className="my-3 py-3">
                <h2 className="display-5">Results ({Object.keys(this.props.books).length} / {this.props.totalBooks})</h2>
                <p className="lead">{'Here\'s a list of the best books matching your query.'}</p>

              </div>
              <div className="card-columns">
                {// this.props.profile ? this.renderBooks() : 'Loading'
                }
                <InfiniteScroll
                  dataLength={Object.keys(this.props.books).length}
                  next={this.fetchMoreData}
                  hasMore={this.hasMore()}
                  loader={<h4>Loading...</h4>}
                  endMessage={
                    <p>Done!</p>
                  }
                >
                    {this.renderBooks()}
                  </InfiniteScroll>
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
            {this.renderContent()}
          </div>
        </div>
      </div>
    );
  }
}

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
      bookPage: state.bookHandler.bookPage,
      profile: state.firebase.profile,
      auth: state.firebase.auth,
      searchData: state.searchData,
    }),
    mapDispatchToProps,
  ),
)(Search);

export default SearchWithFirebase;
