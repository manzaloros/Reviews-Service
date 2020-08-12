import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const UpArrow = styled.img`
  float: right;
  border: solid silver;
  border-width: 0 2px 2px 0;
  padding: 6px;
  margin-right: 20px;
  margin-top: 7px;
  transform: rotate(-135deg);
  &:hover {
    border-right: 2px solid orange;
    border-bottom: 2px solid orange;
  }
`;

export const DownArrow = styled.img`
  float: right;
  border: solid silver;
  border-width: 0 2px 2px 0;
  padding: 6px;
  margin-right: 20px;
  transform: rotate(45deg);
  &:hover {
    border-right: 2px solid orange;
    border-bottom: 2px solid orange;
  }
`;

const StyledArrow = ({ isShowingReviews }) => {
  if (isShowingReviews) {
    return (
      <span>
        <UpArrow />
      </span>
    );
  }
  return (
    <span>
      <DownArrow />
    </span>
  );
};

StyledArrow.propTypes = {
  isShowingReviews: PropTypes.bool
};

StyledArrow.defaultProps = {
  isShowingReviews: false
};

export default StyledArrow;
