import { extendObservable, computed, observable } from "mobx";
import { now } from "mobx-utils";
import {
  formatDay,
  formatDate,
  formatTime,
  formatDuration
} from "./lib/DateFormatter.js";

class EntryStore {
  // @observable duration:number = 0;
  constructor(startDate = new Date(), endDate = null, rate) {
    let messages = ['started at ' + formatTime(startDate), 'done at ' + (formatTime(startDate.getTime() + 28800000))]; //8h in milisec
    const start = now();
    let counter = 0;
    extendObservable(this, {
      startDate,
      endDate,
      rate,
      duration: computed(function() {
        let end = this.endDate ? this.endDate : now(1000); //The date time is read from an observable which is updated automatically after the given interval. So basically it treats time as an observable.
        let computation = (end - this.startDate) / 1000;
        if(computation >= 0){
          return computation;
        }
        return 0;
      }),
      message: computed(function() {
        (now(4000) - start) / 4000;
        counter++;
        return messages[counter % 2];
      }),
      earnings: computed(function() {
        return this.duration * (this.rate / (60 * 60));
      })
    });
  }

  getStateJSONForStorage() {
    return {
      startDate: this.startDate.getTime(),
      endDate: this.endDate ? this.endDate.getTime() : null,
      rate: this.rate
    };
  }

  static hydrate({ startDate, endDate, rate }) {
    if (endDate) {
      return new this(new Date(startDate), new Date(endDate), rate);
    } else {
      return new this(new Date(startDate), null, rate);
    }
  }
}

export default EntryStore;
