import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators, compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'

import booksImage from '../../assets/img/books.png'


class Introduction extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log(this.props)
        /*
        this.props.firebase.login({
            email: 'test@test.com',
            password: 'test123'
        })
        */
    }
    renderContent() {
        const loggedIn = this.props.profile.displayName != undefined
        if(this.props.profile.isLoaded) {
            return (
                <div className="col-md-8 text-left">
                <h1 className="jumbotron-heading">G. Readmore</h1>
                
                <p className="lead text-muted">{loggedIn ? "Hey " + this.props.profile.displayName: ""}! It is my goal to make your read more. I know of almost any book in the world! Try my search</p>
                <p>
                    {!loggedIn ? <a href="/login" className="btn btn-primary my-2 mx-1">Sign In</a>: ""}
                    <a href="/search" className="btn btn-secondary my-2 mx-1">Discover Books</a>
                </p>
            </div>
            );
        }
    }

    render() {
        const loaded = this.props.profile.isLoaded;
        
        return (
            <section className="jumbotron text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={booksImage} className="img-fluid" alt={"Books"} />
                        </div>
                        {this.renderContent()}                        
                    </div>
                </div>
            </section>
        )
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
    firebaseConnect((props) => {
        return [

        ]
    }),
    connect(
        (state) => ({
            profile: state.firebase.profile // load profile
        })
    )
)(Introduction)

export default connect(mapStateToProps, mapDispatchToProps)(IntroductionWithFirebase)
