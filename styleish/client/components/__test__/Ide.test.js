import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import Ide from '../Ide.jsx';
import { TranslateButton } from '../../styles/Ide.jsx';

describe('Ide', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Ide />);
  });

  it('matches snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('translate button get clicked', () => {
    const mockHandleSubmit = jest.fn();
    const button = shallow(<TranslateButton onClick={mockHandleSubmit} />);
    button.simulate('click');
    expect(mockHandleSubmit.mock.calls.length).toBe(1);
  });
});
