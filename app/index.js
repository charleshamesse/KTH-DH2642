import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import Introduction from './scenes/Introduction'
import Search from './scenes/Search'
import Recommendations from './scenes/Recommendations'
import Footer from './components/Footer'

import reducers from './reducers';

require('./custom.scss');

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware())(createStore);

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
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById('app')
);
