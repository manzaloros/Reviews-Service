import React from 'react';
import ReactDOM from 'react-dom';
import ReviewList from './ReviewList.jsx';
import Description from './Description.jsx';

const App = () => (
  <div>
    <div>
      <Description />
    </div>
    <div>
      <ReviewList />
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById('body'));
