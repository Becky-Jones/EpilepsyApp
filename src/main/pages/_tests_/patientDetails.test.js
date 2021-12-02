import React from 'react';
import renderer from 'react-test-renderer';
import { Patient } from '../../components/Patient';

import PatientDetail from '../patientDetails';

describe('<PatientDetail />', () => {
  it('renders correctly for given patient', () => {
    const navigate = jest.fn();
    const patient = {"_id":"619277a7190407ffdfc8a6f8","first_name":"Barry","surname":"Manilow","date_of_birth":"25/10/1989","gender":"Female","email":"neal19@berge.com","password":"UIEInM","address1":"9755 Mill Road","address2":"HUDDERSFIELD","postcode":"HD87 2OC","user_type":"Patient","patient_details":{"seizure_type":["absence seizure"],"years_suffered":4,"seizure_triggers":["lack of sleep"," caffeine"],"seizure_monthly_frequency":1,"mental_health_issues":["Anxiety"],"practitioner_id":"619257063e933ddf5443cb5d"}};
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
    const route = { params: { Patient: patient, Movies: "", Patients: "", User: user} }
    const tree = renderer.create(<PatientDetail route = {route} navigation= {{navigate}}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});