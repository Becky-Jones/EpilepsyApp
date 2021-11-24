export class Warnings {
    constructor(
      warningsList,
    ) {
      this.warningsList = warningsList;
    }
    /*****************************
     * GETTERS
     *****************************/
  
    getWarnings() {
      return this.warningsList.toString();
    }
  
    /*****************************
     * SETTERS
     *****************************/
  
    setWarnings(warningsList) {
      this.warningsList = warningsList;
    }  
  }
  