import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import promiseMiddleware from 'redux-promise-middleware';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { reactReduxFirebase } from 'react-redux-firebase';
import firebase from 'firebase';

import Header from './components/Header';
import Introduction from './scenes/Introduction';
import Login from './scenes/Login';
import Logout from './scenes/Logout';
import Search from './scenes/Search';
import Bookshelf from './scenes/Bookshelf';
import Profile from './scenes/Profile';
import BookDetail from './scenes/BookDetail';
import rootReducer from './reducers';
import { firebaseConfig } from './config';

import './custom.scss';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = persistReducer(persistConfig, rootReducer);

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
};

// initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Add reactReduxFirebase enhancer when making store creator
// firebase instance as first argument
// reduxFirestore(firebase) // <- needed if using firestore
const createStoreWithFirebase = compose(reactReduxFirebase(firebase, rrfConfig))(createStore);

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware())(createStoreWithFirebase);

const store = createStoreWithMiddleware(reducers);
const persistor = persistStore(store);


export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Header />

          <main className='mt-5' role="main">
            {/* This redirect needs to be complex to handle deep linking urls later
                https://stackoverflow.com/a/43958016/4789016
            */}
            <Switch>
              {/* <Route exact path="/" render={() => (
                  <Redirect to="/home"/>
              )}/> */}
              <Route exact path="/home" component={Introduction} />
              <Route path="/books/:id" component={BookDetail} />
              <Route path="/search" component={Search} />
              <Route path="/login" component={Login} />
              <Route path="/bookshelf" component={Bookshelf} />
              <Route path="/profile" component={Profile} />
              <Route path="/profiles/:id" component={Profile} />
              <Route path="/logout" component={Logout} />
              <Redirect to="/home"/>
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('app'),
);
