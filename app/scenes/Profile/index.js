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
        // TODO if no favorites, display that
        // TODO remove book from favorites
        let arr = Object.keys(favorites).map((k) => favorites[k])
        let listItems = arr.map((id) => 
            <li key={id}>{id}</li>
        )
        return (
            <ul>
                {listItems}
            </ul>
        );
        
    }

    renderContent() {
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

const ProfileWithFirebase = compose(
    firebaseConnect((props) => {
        return [

        ]
    }),
    connect(
        (state) => ({
            profile: state.firebase.profile, 
            auth: state.firebase.auth,
        }),
        mapDispatchToProps
    )
)(Profile)

export default ProfileWithFirebase
