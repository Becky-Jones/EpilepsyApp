export class Address {
  constructor(address, city, postcode) {
    this.address = address;
    this.city = city;
    this.postcode = postcode;
  }

  /*****************************
   * GETTERS
   *****************************/

  getAddressLine() {
    return this.address;
  }

  getCity() {
    return this.city;
  }

  getPostcode() {
    return this.postcode;
  }

  getFullAddress() {
    return this.address + ", " + this.city + ", " + this.postcode;
  }

  /*****************************
   * SETTERS
   *****************************/

  setAddress(address) {
    this.address = address;
  }

  setCity(city) {
    this.city = city;
  }

  setPostcode(postcode) {
    this.postcode = postcode;
  }
}
