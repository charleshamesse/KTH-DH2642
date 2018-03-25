require('./custom.scss');

import React from 'react';
import ReactDOM from 'react-dom';
export default class HelloWorld extends React.Component {
  render() {
     return(
     <div>
       <h1>Hello World...How are you</h1>
       <a href="#" className="btn btn-primary my-2">Main call to action</a>
        <a href="#" className="btn btn-secondary my-2">Secondary action</a>
    </div>);
  }
}
ReactDOM.render(
  <HelloWorld />,
  document.getElementById('app')
);