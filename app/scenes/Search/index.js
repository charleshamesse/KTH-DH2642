import React, { Component } from 'react';

export default class Introduction extends Component {
    render() {
        return (
            <section className="jumbotron text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            <h1 className="jumbotron-heading">Search</h1>
                            <p>
                                <a href="#" className="btn btn-primary my-2 mx-1">Sign Up</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}