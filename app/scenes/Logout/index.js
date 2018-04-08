import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators, compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'

class Logout extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.firebase.logout()
    }

    render() {
        return (
            <section className="jumbotron text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            You're out.
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

const LogoutWithFirebase = compose(
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
)(Logout)

export default connect(mapStateToProps, mapDispatchToProps)(LogoutWithFirebase)
