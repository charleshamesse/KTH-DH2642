import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators, compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

import LoadingSpinner from '../../components/LoadingSpinner'

class Profile extends Component {

    constructor(props) {
        super(props)
    }

    renderFavorites(favorites) {
        const listItems = favorites.map((favorite) =>
            <li key={favorite}>{favorite}</li>
        );
        return (
            <ul>
                {listItems}
            </ul>
        );
    }

    renderContent() {
        console.log(this.props)
        if(isLoaded(this.props.auth)) {

            if(isLoaded(this.props.profile) && !isEmpty(this.props.profile)) {
                return (
                    <div>
                    <h1>Hi, {this.props.profile.displayName}</h1>

                    
                    <h2>Favorites</h2>
                        {this.renderFavorites(this.props.profile.favorites)}
                    </div>
                );
            }
            return (<LoadingSpinner />); // Auth not loaded, profile not loaded or empty
        }
        return (<LoadingSpinner />); // Auth not loaded
        
    }

    render() {
        return (
            <section className="content">
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
