import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const UpArrow = styled.img`
  float: right;
  width: 0;
  height: 0;
  margin-right: 10px;
  border-radius: 8px;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 20px solid silver;
  &:hover {
    border-bottom: 20px solid orange;
  }
`;

const DownArrow = styled.img`
  float: right;
  width: 0;
  height: 0;
  margin-right: 10px;
  border-radius: 8px;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid silver;
  &:hover {
    border-top: 20px solid orange;
  }
`;

const StyledArrow = ({ isShowingReviews }) => {
  if (isShowingReviews) {
    return (
      <span>
        <DownArrow />
      </span>
    );
  }
  return (
    <span>
      <UpArrow />
    </span>
  );
};

StyledArrow.propTypes = {
  isShowingReviews: PropTypes.bool.isRequired
};

export default StyledArrow;
