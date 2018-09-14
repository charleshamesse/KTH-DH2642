import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import LoadingSpinner from '../../components/LoadingSpinner';
import library from '../../assets/img/bright.jpg';


class Introduction extends Component {
  renderContent() {
    const loggedIn = this.props.profile.displayName !== undefined;
    return (
      <div>
        <img src={library} className="bg" id="background-image" alt={'Library picture'}></img>
        <div id="introtext" className="row">
          <div className="col-md-12">
            <h1 id="frontpage-header" className="jumbotron-heading font-weight-light text-white frontpage-text text-center">G. Readmore</h1>
            <p className="frontpage-text lead font-weight-light text-white frontpage-text text-center">{loggedIn ? `Hey ${this.props.profile.displayName}! ` : ''}</p>
            <p className="frontpage-text lead font-weight-light text-white frontpage-text text-center">
                It is my goal to make your read more. I know of almost any book in the world! Try my search
            </p>
            <p>
              {!loggedIn ? <a href="/login" className="btn btn-primary my-2 mx-1">Sign In</a> : ''}
              <a href="/search" className="btn btn-lg btn-secondary my-2 mx-1">Discover Books</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const loaded = this.props.profile.isLoaded;
    return (
            <section className="jumbotron text-center">
                <div className="container">
                  {loaded ? this.renderContent() : <LoadingSpinner />}
                </div>
            </section>
    );
  }
}
function mapStateToProps(state) {
  return {};
}

// Anything returned from this function will end up as props
// on the BookList container
function mapDispatchToProps(dispatch) {
  // Whenever selectBook is called, the result shoudl be passed
  // to all of our reducers
  return bindActionCreators({}, dispatch);
}

const IntroductionWithFirebase = compose(
  firebaseConnect(),
  connect(state => ({
    profile: state.firebase.profile, // load profile
  })),
)(Introduction);

export default connect(mapStateToProps, mapDispatchToProps)(IntroductionWithFirebase);
