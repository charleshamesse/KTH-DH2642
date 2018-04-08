import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { reactReduxFirebase } from 'react-redux-firebase'
import firebase from 'firebase'

import Header from './components/Header'
import Introduction from './scenes/Introduction'
import Search from './scenes/Search'
import Recommendations from './scenes/Recommendations'
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
            <Route path="/home" component={Introduction} />
            <Route path="/search" component={Search} />
            <Route path="/bookshelf" component={Recommendations} />
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
