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
        this.props.firebase.login({
            email: 'test@test.com',
            password: 'test123'
        })
    }

    render() {
        return (
            <section className="jumbotron text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={booksImage} className="img-fluid" alt={"Books"} />
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
            //todos: state.firebase.data.todos,
            profile: state.firebase.profile // load profile
        })
    )
)(Introduction)

export default connect(mapStateToProps, mapDispatchToProps)(IntroductionWithFirebase)
