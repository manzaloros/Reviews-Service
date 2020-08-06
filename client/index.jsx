import React from 'react';
import ReactDOM from 'react-dom';
import ReviewList from './ReviewList.jsx';

class App extends React.Component {
  render() {
    return(
      <div>
        <ReviewList/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('body'));