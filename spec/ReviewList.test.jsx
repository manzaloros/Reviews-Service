/* eslint no-undef: 0 */

import { mount, shallow, configure } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import ReviewList, { Styled } from '../client/ReviewList.jsx';
import dummyData from './dummyData.js';

configure({ adapter: new Adapter() });

describe('ReviewList - Basics', () => {
  it('renders correctly', () => {
    shallow(<ReviewList />);
  });

  it('has a properly formatted state component', () => {
    const wrapper = shallow(<ReviewList />);
    const instance = wrapper.instance();
    expect(instance.state.reviews).toEqual([]);
    expect(instance.state.rating).toEqual(0);
    expect(instance.state.isShowingReviews).toEqual(false);
  });
});

describe('ReviewList - State', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<ReviewList />);
    wrapper.setState({
      reviews: dummyData.sample1,
      rating: dummyData.sample1AverageRating
    });
  });

  it('displays reviews that are stored within its state', () => {
    wrapper.setState({
      isShowingReviews: true
    });
    expect(wrapper.find(Styled.Review)).toHaveLength(4);
  });

  it('only displays reviews when the Style.Toggle component is clicked', () => {
    expect(wrapper.find(Styled.Review)).toHaveLength(0);
    wrapper.find(Styled.Toggle).simulate('click');
    expect(wrapper.find(Styled.Review)).toHaveLength(4);
    wrapper.find(Styled.Toggle).simulate('click');
    expect(wrapper.find(Styled.Review)).toHaveLength(0);
  });

  it('only displays the five most recent reviews', () => {
    wrapper.setState({
      reviews: dummyData.sample2,
      rating: dummyData.sample2AverageRating
    });
    expect(dummyData.sample2).toHaveLength(8);
    wrapper.find(Styled.Toggle).simulate('click');
    expect(wrapper.find(Styled.Review)).toHaveLength(5);
  });
});
