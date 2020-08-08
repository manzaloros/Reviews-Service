import React from 'react';
import ReactDOM from 'react-dom';
import ReviewList from './ReviewList';

const App = () => (
  <div>
    <ReviewList />
  </div>
);

ReactDOM.render(<App />, document.getElementById('body'));
