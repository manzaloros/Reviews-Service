import React from 'react';
import ReactDOM from 'react-dom';
import ReviewList from './ReviewList.jsx';

const App = () => (
  <div>
    <div>
      <ReviewList />
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById('reviews'));
