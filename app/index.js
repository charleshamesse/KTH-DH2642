import React from 'react'
import ReactDOM from 'react-dom'

import Header from './components/Header'
import Introduction from './scenes/Introduction'
import Recommendations from './scenes/Recommendations'
import Footer from './components/Footer'

require('./custom.scss');


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
  <App />,
  document.getElementById('app')
);