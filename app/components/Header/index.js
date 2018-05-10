import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as book from '@fortawesome/fontawesome-free-brands/faReadme';

class Header extends Component {
  render() {
    const link = this.props.isEmpty ? '/home' : `/profiles/${this.props.auth.uid}`;
    return (
    <header>
    <nav className="navbar navbar-expand navbar-dark bg-secondary">
      <div id="wrapper" className="container-fluid">
        <div id="header-title">
          <Link to="/home" className="navbar-brand">
            <FontAwesomeIcon size="lg" color="white" icon={book} />&nbsp;
            G. Readmore
          </Link>
        </div>
        <div id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/home" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/search" className="nav-link">Search</Link>
            </li>
            <li className="nav-item">
              <Link to="/bookshelf" className="nav-link">Bookshelf</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                My Account
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href={link}>Profile</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/logout">Log out</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

const HeaderWithFirebase = compose(
  firebaseConnect(),
  connect(
    state => ({
      auth: state.firebase.auth,
    }),
    mapDispatchToProps,
  ),
)(Header);

export default HeaderWithFirebase;
