export class Movie {
  constructor(id, title, length, warnings) {
    this.id = id;
    this.title = title;
    this.warnings = warnings;
    this.length = length;
  }
  /*****************************
   * GETTERS
   *****************************/

  getTitle() {
    return this.title;
  }

  getWarnings() {
    return this.warnings.toString();
  }

  getLength() {
    return this.length;
  }

  getId() {
    return this.id;
  }

  /*****************************
   * SETTERS
   *****************************/

  settitle(title) {
    this.title = title;
  }

  setWarnings(warnings) {
    this.warnings = warnings;
  }
  
  setId(id) {
    this.id = id;
  }

  setLength(length) {
    this.length = length;
  }
}
