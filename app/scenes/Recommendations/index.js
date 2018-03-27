import React from 'react';

import BookCard from '../../components/BookCard'

export default class Recommendations extends React.Component {
  render() {
     return(
         <div>
     <div className="album py-5 bg-light">
            <div className="container">
              <div className="my-3 py-3">
                <h2 className="display-5">Today's Recommendations</h2>
                <p className="lead">Here's a list of books carefully picked by our team of experts.</p>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <BookCard />
                </div>
                <div className="col-md-4">
                  <BookCard />
                </div>
                <div className="col-md-4">
                  <BookCard />
                </div>
    
                </div>
               
                </div>
              </div>
            </div>
      );
  }
}