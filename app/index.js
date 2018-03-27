import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'

import Header from './components/Header'
import Introduction from './scenes/Introduction'
import Recommendations from './scenes/Recommendations'
import Footer from './components/Footer'

import reducers from './reducers';

require('./custom.scss');

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware())(createStore);

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />

        <main role="main">
          <Introduction />
          <Recommendations />
        </main>

        <Footer />
      </div>
    );
  }
}
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById('app')
);
