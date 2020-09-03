/* eslint no-undef: 0 */

import { mount, configure } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import RatingDisplay, { FullStar, EmptyStar } from '../client/RatingDisplay.jsx';
import ReviewList, { Styled } from '../client/ReviewList.jsx';
import dummyData from './dummyData.js';

configure({ adapter: new Adapter() });

describe('RatingDisplay - On Its Own', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<RatingDisplay />);
  });

  it('displays a number of orange stars equal to the rating', () => {
    for (let i = 1; i <= 5; i += 1) {
      wrapper.setProps({ rating: i.toString() });
      expect(wrapper.find(FullStar)).toHaveLength(i);
    }
  });

  it('always displays 5 stars no matter the rating', () => {
    let fullStars;
    let emptyStars;
    for (let i = 1; i <= 5; i += 1) {
      wrapper.setProps({ rating: i.toString() });
      fullStars = wrapper.find(FullStar).length;
      emptyStars = wrapper.find(EmptyStar).length;
      expect(fullStars + emptyStars).toBe(5);
    }
  });

  it('rounds to the nearest star when the rating is not an integer', () => {
    for (let i = 0.75; i < 5; i += 0.5) {
      wrapper.setProps({ rating: i.toString() });
      expect(wrapper.find(FullStar)).toHaveLength(Math.round(i));
    }
  });
});

describe('RatingDisplay - As Part Of ReviewList', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<ReviewList />);
    wrapper.setState({
      reviews: dummyData.sample1,
      rating: dummyData.sample1AverageRating
    });
  });

  it('should have one instance rendered when ReviewList is rendered', () => {
    expect(wrapper.find(RatingDisplay)).toHaveLength(1);
  });

  it('should have a number of instances rendered equal to the number of reviews plus one', () => {
    expect(wrapper.find(Styled.Review)).toHaveLength(0);
    expect(wrapper.find(RatingDisplay)).toHaveLength(1);
    wrapper.find(Styled.Toggle).simulate('click');
    expect(wrapper.find(Styled.Review)).toHaveLength(4);
    expect(wrapper.find(RatingDisplay)).toHaveLength(5);
  });
});
