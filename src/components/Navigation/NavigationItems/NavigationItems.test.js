import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
  it('should render two <NavigationItem /> elements if not authenticated', () => {
    // create an instance of this component as it would be rendered to the dom
    const wrapper = shallow(<NavigationItems />);
    // check if the wrapper contains a certain element
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
});