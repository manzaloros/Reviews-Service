/* eslint no-undef: 0 */

import { mount, configure } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import StyledArrow, { UpArrow, DownArrow } from '../client/StyledArrow.jsx';
import ReviewList, { Styled } from '../client/ReviewList.jsx';
import dummyData from './dummyData.js';

configure({ adapter: new Adapter() });

describe('StyledArrow - On Its Own', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<StyledArrow />);
  });

  it('should have "false" as its default isShowingReviews prop', () => {
    expect(wrapper.prop('isShowingReviews')).toEqual(false);
  });

  it('should display DownArrow, not UpArrow, when isShowingReviews is false', () => {
    expect(wrapper.prop('isShowingReviews')).toEqual(false);
    expect(wrapper.find(DownArrow)).toHaveLength(1);
    expect(wrapper.find(UpArrow)).toHaveLength(0);
  });

  it('should display UpArrow, not DownArrow, when isShowingReviews is true', () => {
    wrapper.setProps({ isShowingReviews: true });
    expect(wrapper.find(UpArrow)).toHaveLength(1);
    expect(wrapper.find(DownArrow)).toHaveLength(0);
  });
});

describe('StyledArrow - As Part Of ReviewList', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<ReviewList />);
    wrapper.setState({
      reviews: dummyData.sample1,
      rating: dummyData.sample1AverageRating
    });
  });

  it('should be rendered when ReviewList is rendered', () => {
    expect(wrapper.find(StyledArrow)).toHaveLength(1);
  });

  it('should have isShowingReviews as false when ReviewList\'s isShowingReviews is false', () => {
    expect(wrapper.state('isShowingReviews')).toEqual(false);
    expect(wrapper.find(StyledArrow).prop('isShowingReviews')).toEqual(false);
  });

  it('should have isShowingReviews as true when ReviewList\'s isShowingReviews is true', () => {
    wrapper.find(Styled.Toggle).simulate('click');
    expect(wrapper.state('isShowingReviews')).toEqual(true);
    expect(wrapper.find(StyledArrow).prop('isShowingReviews')).toEqual(true);
  });

  it('should display DownArrow when ReviewList\'s isShowingReviews is false', () => {
    expect(wrapper.state('isShowingReviews')).toEqual(false);
    expect(wrapper.find(StyledArrow).find(DownArrow)).toHaveLength(1);
    expect(wrapper.find(StyledArrow).find(UpArrow)).toHaveLength(0);
  });

  it('should display UpArrow when ReviewList\'s isShowingReviews is true', () => {
    wrapper.find(Styled.Toggle).simulate('click');
    expect(wrapper.state('isShowingReviews')).toEqual(true);
    expect(wrapper.find(StyledArrow).find(UpArrow)).toHaveLength(1);
    expect(wrapper.find(StyledArrow).find(DownArrow)).toHaveLength(0);
  });
});
