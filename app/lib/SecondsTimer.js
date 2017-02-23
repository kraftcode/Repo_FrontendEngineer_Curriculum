import moment from 'moment';

class SecondsTimer {

  constructor(_store){
    this.store = _store;
  }

  startTimer(){
    this.currentTime = 1;
    this.timer = setInterval(this.updateStore.bind(this), 1000); // must bind the correct this scope since callback gets called in global window scope!
  }

  endTimer(){
    console.log(this.timer);
    clearInterval(this.timer);
  }

  updateStore(){
    this.store.updateTimeOnCurrentEntry(this.currentTime++);
  }

}

export default SecondsTimer;
