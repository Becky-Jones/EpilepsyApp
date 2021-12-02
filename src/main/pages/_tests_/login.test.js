import React from 'react';
import renderer from 'react-test-renderer';

import LoginScreen from '../login';

describe('<LoginScreen />', () => {
  it('has 4 children', () => {
    const tree = renderer.create(<LoginScreen />).toJSON();
    expect(tree.children.length).toBe(4);
  });
  it('renders correctly', () => {
    const tree = renderer.create(<LoginScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});