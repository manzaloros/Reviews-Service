import React from 'react';
import ReactDOM from 'react-dom';
import ReviewList from './ReviewList.jsx';

class App extends React.Component {
  render() {
    return(
      <div>
        <div>Hello, world!</div>
        <ReviewList/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('body'));