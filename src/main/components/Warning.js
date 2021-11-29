export class Warning {
    constructor(
      start_time,
      end_time
    ) {
      this.start_time = start_time;
      this.end_time = end_time;
    }
    /*****************************
     * GETTERS
     *****************************/
  
    getTriggerStart() {
      return this.start_time;
    }
  
    getTriggerEnd() {
      return this.end_time;
    }
  
    /*****************************
     * SETTERS
     *****************************/
  
    setTriggerStart(triggerStart) {
      this.start_time = triggerStart;
    }
  
    setTriggerEnd(triggerEnd) {
      this.end_time = triggerEnd;
    }
  
  
  }
  