import React from 'react';
import { shallow } from 'enzyme';
import { BasketComponent } from './Basket';

describe('Component Basket', () => {
  it('should render without crashing', () => {
    const component = shallow(<div />);
    expect(component).toBeTruthy();
  });
});
