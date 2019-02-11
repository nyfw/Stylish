import React from 'react';
import { create } from 'react-test-renderer';
import Login from '../Login.jsx';

test('Login snapshot', () => {
  const login = create(<Login />);
  expect(login.toJSON().toMatchSnapshot());
});
