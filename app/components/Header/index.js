import React from 'react';

const Header = () => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#">G. Readmore</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-nav flex-row ml-md-auto d-none d-md-flex" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Search</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Bookshelf</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                My Account
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="#">Profile</a>
                <a className="dropdown-item" href="#">Privacy Settings</a>
                <a className="dropdown-item" href="#">Contact us</a>
              </div>
            </li>
          </ul>
        </div>



      </div>
    </nav>
  </header>
)

export default Header;