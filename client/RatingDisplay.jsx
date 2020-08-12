import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FullStar = styled.span`
  font-size: 14px;
  color: orange;
`;

const EmptyStar = styled.span`
  font-size: 14px;
  color: silver;
`;

const starRating = (rating) => {
  const output = [0, 0, 0, 0, 0];
  for (let i = 0; i < rating; i += 1) {
    if (i + 1 <= rating || rating > Math.floor(rating) + 0.5) {
      output[i] = 1;
    }
  }
  return output;
};

const RatingDisplay = ({ rating }) => {
  const ratingArray = starRating(rating);
  return (
    <span>
      {ratingArray.map((toggle, i) => {
        if (toggle === 1) {
          return (<FullStar key={i}>&#9733;</FullStar>);
        }
        return (<EmptyStar key={i}>&#9733;</EmptyStar>);
      })}
    </span>
  );
};

RatingDisplay.propTypes = {
  rating: PropTypes.number.isRequired
};

export default RatingDisplay;
