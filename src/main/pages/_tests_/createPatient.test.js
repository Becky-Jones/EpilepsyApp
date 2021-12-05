import React from 'react';
import renderer from 'react-test-renderer';
import { Patient } from '../../components/Patient';
import createPatient from "../createPatient";

describe('<createPatient />', () => {
    it('renders correctly', () => {
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
        const route = { Patient : "", Movies: "", Patients: "", User: user };
        const tree = renderer.create(<createPatient route = {route} navigation = {navigate} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})