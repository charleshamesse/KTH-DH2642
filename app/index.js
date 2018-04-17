import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { reactReduxFirebase } from 'react-redux-firebase'
import firebase from 'firebase'

import Header from './components/Header'
import Introduction from './scenes/Introduction'
import Login from './scenes/Login'
import Logout from './scenes/Logout'
import Search from './scenes/Search'
import Recommendations from './scenes/Recommendations'
import Profile from './scenes/Profile'
import Footer from './components/Footer'

import reducers from './reducers';

require('./custom.scss');

const firebaseConfig = {
  apiKey: "AIzaSyCIEdAaHlo6AiAjxpvxfQ4OlvHKba7sZWw",
  authDomain: "kth-dh2642-books.firebaseapp.com",
  databaseURL: "https://kth-dh2642-books.firebaseio.com",
  projectId: "kth-dh2642-books",
  storageBucket: "kth-dh2642-books.appspot.com",
  messagingSenderId: "488315825230"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
}

// initialize firebase instance
firebase.initializeApp(firebaseConfig)

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  // reduxFirestore(firebase) // <- needed if using firestore
)(createStore)

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware())(createStoreWithFirebase)

const store = createStoreWithMiddleware(reducers)


export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Header />

          <main role="main"> 
            {/* This redirect needs to be complex to handle deep linking urls later
                https://stackoverflow.com/a/43958016/4789016
            */}
            <Switch>
              <Route exact path="/" render={() => (
                  <Redirect to="/home"/>
              )}/>
              <Route path="/home" component={Introduction} />
              <Route path="/search" component={Search} />
              <Route path="/login" component={Login} />
              <Route path="/bookshelf" component={Recommendations} />
              <Route path="/profile" component={Profile} />
              <Route path="/logout" component={Logout} />
              <Route path="/books/:id" component={Profile} />
              <Redirect to="/home"/>
            </Switch>
          </main>

          <Footer />
        </div>
      </Router>
    );
  }
}
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
