import React from 'react';
import { shallow } from 'enzyme';
import { OrderTableComponent } from './OrderTable';

describe('Component OrderTable', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderTableComponent />);
    expect(component).toBeTruthy();
  });
});
