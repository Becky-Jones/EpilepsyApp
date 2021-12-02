import React from 'react';
import renderer from 'react-test-renderer';
import { Movies } from '../../components/Movies';
import { Patient } from '../../components/Patient';
import { Admin } from '../../components/Admin';

import Home from '../home';

describe('<Home />', () => {
  it('renders correctly with patient logged in', () => {
    const navigate = jest.fn();
    const user = new Patient("TESTId",
      "Patient",
      "Bob",
      "Bobby",
      "04-08-1998",
      "test@gmail.com",
      "password",
      "male",
      "5 testing lane",
      "liverpool",
      "TR6 0GH",
      "12345678",
      ["Flashing lights"],
      ["Absense Seizure"],
      "4",
      "1",
      ["Anxiety"]);
    const route = { params: { User: user, Movies: "", Patients: ""} }
    const tree = renderer.create(<Home route = {route} navigation= {{navigate}}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});