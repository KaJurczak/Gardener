import React from 'react';
import { shallow } from 'enzyme';
import { PlantComponent } from './Plant';

describe('Component Plant', () => {
  it('should render without crashing', () => {
    const component = shallow(<PlantComponent />);
    expect(component).toBeTruthy();
  });
});
