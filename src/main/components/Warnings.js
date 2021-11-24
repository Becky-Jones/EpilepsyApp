export class Warnings {
    constructor(
      triggerStart,
      triggerEnd
    ) {
      this.triggerStart = triggerStart;
      this.triggerEnd = triggerEnd;
    }
    /*****************************
     * GETTERS
     *****************************/
  
    getTriggerStart() {
      return this.triggerStart;
    }
  
    getTriggerEnd() {
      return this.triggerEnd;
    }
  
    /*****************************
     * SETTERS
     *****************************/
  
    setTriggerStart(triggerStart) {
      this.triggerStart = triggerStart;
    }
  
    setTriggerEnd(triggerEnd) {
      this.triggerEnd = triggerEnd;
    }
  
  
  }
  