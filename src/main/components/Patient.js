import { Address } from "./Address";
import { SeizureDetails } from "./seizureDetails";

export class Patient {
  constructor(
    user_id,
    userType,
    firstName,
    surname,
    dob,
    email,
    password,
    gender,
    address,
    city,
    postcode,
    seizureTriggers,
    seizureTypes,
    seizureFreq,
    yearsSuffered,
    MHIssues
  ) {
    this.userType = userType;
    this.user_id = user_id;
    this.firstName = firstName;
    this.surname = surname;
    this.dob = dob;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.Address = new Address(address, city, postcode);
    this.seizureDetails = new SeizureDetails(
      seizureTriggers,
      seizureTypes,
      seizureFreq,
      yearsSuffered,
      MHIssues
    );
  }
  /*****************************
   * GETTERS
   *****************************/

  getName() {
    return this.firstName + " " + this.surname;
  }

  getFirstName() {
    return this.firstName;
  }

  getSurname() {
    return this.surname;
  }

  getDOB() {
    return this.dob;
  }

  getEmail() {
    return this.email;
  }

  getType() {
    return this.userType;
  }

  getId() {
    return this.user_id;
  }

  getPassword() {
    return this.password;
  }

  getGender() {
    return this.gender;
  }

  getAddress() {
    return this.Address;
  }

  getSeizureDetails() {
    return this.seizureDetails;
  }

  /*****************************
   * SETTERS
   *****************************/

  setFirstName(name) {
    this.firstName = name;
  }

  setSurname(name) {
    this.surname = name;
  }

  setDOB(dob) {
    this.dob = dob;
  }

  setEmail(email) {
    this.email = email;
  }

  setType(type) {
    this.userType = type;
  }

  setPassword(password) {
    this.password = password;
  }

  setGender(gender) {
    this.gender = gender;
  }

}
