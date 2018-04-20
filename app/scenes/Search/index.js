import React, { Component } from 'react';

import Recommendations from '../Recommendations';
import BookShelfBar from '../../components/BookShelfBar';

export default class Introduction extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row flex-xl-nowrap">
          <div className="col-12 col-md-9 col-xl-9 py-md-3 pl-md-5 bd-content below-nav">
            <h2>Search</h2>
            <p>
              <input className="form-control" />
            </p>

            <Recommendations />
          </div>

          <div className="col-12 col-md-3 col-xl-2">
            <div className="sticky-top">
              <div className="spacer"></div>
              <h2>Bookshelf</h2>
                [ Drag and drop area ]
                <BookShelfBar />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
