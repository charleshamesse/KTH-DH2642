import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { debounce } from 'throttle-debounce';
import { fetchBooks } from '../../actions';
import BookCard from '../../components/BookCard';
import LoadingSpinner from '../../components/LoadingSpinner';

class Search extends Component {
  constructor(props) {
    super(props);
    // TODO:
    // Manage state properly with redux (problems when switching pages)
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    // this.search = debounce(100, this.search);
  }

  handleChange(event) {
    console.log('event', event.target);
    if (event.target.id === 'search-input') {
      this.props.searchData.searchString = event.target.value;
    } else {
      this.props.searchData.searchCategory = event.target.value;
    }
    this.search(this.props.searchData.searchString, this.props.searchData.searchCategory);
  }

  search(s, c) {
    this.props.fetchBooks(s, c);
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
    if (this.props.loading) {
      return (<LoadingSpinner />);
    }
    if (this.props.searchData.searchString) {
      if (Object.keys(this.props.books).length > 0) {
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
      return (
        <LoadingSpinner />
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
          <div className="col-12 py-md-3 pl-md-5 bd-content">
            {this.renderContent()}
          </div>
        </div>
      </div >
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchBooks }, dispatch);
}

const SearchWithFirebase = compose(
  firebaseConnect(),
  connect(
    state => ({
      books: state.bookHandler.books,
      loading: state.bookHandler.loading,
      profile: state.firebase.profile,
      auth: state.firebase.auth,
      searchData: state.searchData,
    }),
    mapDispatchToProps,
  ),
)(Search);

export default SearchWithFirebase;
