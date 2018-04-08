import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">G. Readmore</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-nav flex-row ml-md-auto d-none d-md-flex" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
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
                <a className="dropdown-item" href="#">Privacy Settings</a>
                <a className="dropdown-item" href="#">Contact us</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/logout">Log out</a>
              </div>
            </li>
          </ul>
        </div>



      </div>
    </nav>
  </header>
)

export default Header;