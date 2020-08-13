import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const FullStar = styled.span`
  font-size: 16px;
  color: orange;
  margin-right: 1px;
`;

export const EmptyStar = styled.span`
  font-size: 16px;
  color: silver;
  margin-right: 1px;
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
        const key = 'star'.concat(i);
        if (toggle === 1) {
          return (<FullStar key={key}>&#9733;</FullStar>);
        }
        return (<EmptyStar key={key}>&#9733;</EmptyStar>);
      })}
    </span>
  );
};

RatingDisplay.propTypes = {
  rating: PropTypes.string
};

RatingDisplay.defaultProps = {
  rating: '0'
};

export default RatingDisplay;
