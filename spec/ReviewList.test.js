import { mount, shallow, configure } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import ReviewList from './../client/ReviewList.jsx';

test('<ReviewList />', () => {
  const wrapper = mount(<ReviewList />);
  expect(wrapper.find('div')).toExist();
});