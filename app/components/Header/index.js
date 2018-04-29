import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div id="wrapper" className="container-fluid">
        <div id="header-title">
          <Link to="/home" className="navbar-brand">G. Readmore</Link>
        </div>
        <button className="navbar-toggler in" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarNavDropdown" className="collapse d-lg-block">
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
                <a className="dropdown-item" href="/profile">Profile</a>
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

export default Header;
