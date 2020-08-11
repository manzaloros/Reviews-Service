import { shallow, configure } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import ReviewList from '../client/ReviewList.jsx';

configure({ adapter: new Adapter() });

describe('ReviewList', () => {
  it('renders correctly', () => {
    shallow(<ReviewList />);
  });

  it('has a properly formatted state component', () => {
    const wrapper = shallow(<ReviewList />);
    expect(wrapper.instance().state.currentItem).toEqual({});
    expect(wrapper.instance().state.reviews).toEqual([]);
    expect(wrapper.instance().state.rating).toEqual(0);
    expect(wrapper.instance().state.isShowingReviews).toEqual(false);
  });

  it('sets the isShowingReviews state when toggleReadMore is called', () => {
    const wrapper = shallow(<ReviewList />);
    const instance = wrapper.instance();
    expect(instance.state.isShowingReviews).toEqual(false);
    instance.toggleReadMore();
    expect(instance.state.isShowingReviews).toEqual(true);
    instance.toggleReadMore();
    expect(instance.state.isShowingReviews).toEqual(false);
  });
});
