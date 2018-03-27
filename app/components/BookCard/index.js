import React from 'react';

export default class Recommendations extends React.Component {
  render() {
    return (
      <div className="card mb-4 box-shadow">
        <img className="card-img-top" src={"https://books.google.com/books/content/images/frontcover/" + this.props.apiId + "?fife=w300-h450"} alt="Card image cap" />
        <div className="card-body">
          <h3>{this.props.title}</h3>
          <p className="card-text">
            Text
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
              <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
            </div>
            <small className="text-muted">9 mins</small>
          </div>
        </div>
      </div>
    )
  }
}