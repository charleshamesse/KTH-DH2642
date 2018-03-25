require('./custom.scss');
import booksImage from './assets/img/books.png'

import React from 'react';
import ReactDOM from 'react-dom';
export default class HelloWorld extends React.Component {
  render() {
     return(
       <section className="jumbotron text-center">
            <div className="container">
              <div className="row">
              <div className="col-md-4">
                <img src={booksImage} className="img-fluid" alt={"Books"}/> 
              </div>
              <div className="col-md-8 text-left">
              <h1 className="jumbotron-heading">Waaazzaaaaaaa</h1>
              <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
              <p>
                <a href="#" className="btn btn-primary my-2 mx-1">Sign Up</a>
                <a href="#" className="btn btn-secondary my-2 mx-1">Discover Books</a>
              </p>
              </div>
              </div>
            </div>
          </section>);
  }
}
ReactDOM.render(
  <HelloWorld />,
  document.getElementById('app')
);