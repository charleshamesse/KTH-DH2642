import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators, compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

class Profile extends Component {

    constructor(props) {
        super(props)
    }

    renderContent() {
        if(isLoaded(this.props.auth) && !isEmpty(this.props.auth)) {
            return (
                <div>
                    <h1>Hi, {this.props.profile.displayName}</h1>
                    <pre>
                        Profile info: {JSON.stringify(this.props.profile, null, 2)}
                    </pre>
                    <pre>
                        auth: {JSON.stringify(this.props.auth, null, 2)}
                    </pre>
                </div>
            );
        }
        else {
            return (
                <div>
                    <h1>No, no, no</h1>
                    <pre>
                        auth: {JSON.stringify(this.props.auth)}
                    </pre>
                </div>
            )
        }
    }

    render() {
        return (
            <section className="jumbotron">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {this.renderContent()}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}


// Anything returned from this function will end up as props
// on the BookList container
function mapDispatchToProps(dispatch) {
    // Whenever selectBook is called, the result shoudl be passed
    // to all of our reducers
    return bindActionCreators({}, dispatch);
}

const ProfileWithFirebase = compose(
    firebaseConnect((props) => {
        return [

        ]
    }),
    connect(
        (state) => ({
            //todos: state.firebase.data.todos,
            profile: state.firebase.profile, // load profile
            auth: state.firebase.auth // load profile
        }),
        mapDispatchToProps
    )
)(Profile)

export default ProfileWithFirebase
