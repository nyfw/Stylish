import React from 'react';
import toJson from 'enzyme-to-json';
import App from '../App.jsx';
import { shallow, mount } from 'enzyme';
// import '../../setupTests';

describe('App', () => {
  let wrapper;
  it('renders without crashing', () => {
    wrapper = shallow(<App />);
  });
  it('matches snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
