import React from 'react';
import { create } from 'react-test-renderer';
import Login from '../Login.jsx';

describe('<Login />', () => {
  it('matches snapshot', () => {
    const login = create(<Login />).toJSON();
    expect(login).toMatchSnapshot();
  });
});
