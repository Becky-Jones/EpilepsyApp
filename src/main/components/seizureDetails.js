export class SeizureDetails {
  constructor(
    seizureTriggers,
    seizureTypes,
    seizureFreq,
    yearsSuffered,
    MHIssues
  ) {
    this.seizureFreq = seizureFreq;
    this.seizureTriggers = seizureTriggers;
    this.seizureTypes = seizureTypes;
    this.yearsSuffered = yearsSuffered;
    this.MHIssues = MHIssues;
  }

  getSeizureFreq() {
    return this.seizureFreq;
  }

  getSeizureTriggers() {
    return this.seizureTriggers;
  }

  getSeizureTypes() {
    return this.seizureTypes;
  }

  getYearsSuffered() {
    return this.yearsSuffered;
  }

  getMHIssues() {
    return this.MHIssues;
  }

  getSeizureDetails() {
    return [
      this.seizureFreq,
      this.seizureTriggers,
      this.seizureTypes,
      this.yearsSuffered,
      this.MHIssues,
    ];
  }

  /*****************************
   * SETTERS
   *****************************/

  setSeizureFreq(freq) {
    this.seizureFreq = freq;
  }

  setSeizureTriggers(triggers) {
    this.seizureTriggers = triggers;
  }

  setSeizureTypes(types) {
    this.seizureTypes = types;
  }

  setYearsSufffered(years) {
    this.yearsSuffered = years;
  }

  setMHIssues(issues) {
    this.MHIssues = issues;
  }
}
