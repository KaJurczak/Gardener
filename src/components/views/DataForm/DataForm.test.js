import React from 'react';
import { shallow } from 'enzyme';
import { DataFormComponent } from './DataForm';

describe('Component DataForm', () => {
  it('should render without crashing', () => {
    const component = shallow(<DataFormComponent />);
    expect(component).toBeTruthy();
  });
});
