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
    this.props.searchData.searchString = event.target.value;
    this.search(event.target.value);
  }

  search(query) {
    this.props.fetchBooks(query);
  }

  hasMore() {
    console.log('hasMore');
    const { totalBooks } = this.props;
    const currentBooks = Object.keys(this.props.books).length;
    return currentBooks < totalBooks;
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
      return (<LoadingSpinner />);
    }
    */
    if (this.props.searchData.searchString) {
      if (Object.keys(this.props.books).length > 0) {
        return (
          <div className="album py-5">
            <div className="container">
              <div className="my-3 py-3">
                <h2 className="display-5">Results ({Object.keys(this.props.books).length} / {this.props.totalBooks})</h2>
                <p className="lead">{'Here\'s a list of the best books matching your query.'}</p>

              </div>
              <div className="card-columns">
                {// this.props.profile ? this.renderBooks() : 'Loading'
                }
                <InfiniteScroll
                  dataLength={this.props.books.length}
                  next={this.fetchMoreData}
                  hasMore={this.hasMore()}
                  loader={<h4>Loading...</h4>}
                >
                    {this.renderBooks()}
                  </InfiniteScroll>
              </div>

            </div>
          </div>
        );
      }
      return (
        <LoadingSpinner />
      );
    }
    return (
      <p>On your mark..</p>
    );
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row flex-xl-nowrap">
          <div className="col-md-4 offset-md-4 below-nav">
            <h2>Search</h2>
            <p>
              <input className="form-control" onChange={this.handleChange} value={this.props.searchData.searchString} />
            </p>
          </div>
        </div>
        <div className="row flex-xl-nowrap">
          <div className="col-12 py-md-3 pl-md-5 bd-content">
            {this.renderContent()}
          </div>
        </div>
      </div >
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
