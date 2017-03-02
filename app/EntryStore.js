import { extendObservable, computed } from "mobx";
import { now } from "mobx-utils";

class EntryStore {
  constructor(startDate = new Date(), endDate = null, rate) {
    extendObservable(this, {
      startDate,
      endDate,
      rate,
      duration: computed(function() {
        let end = this.endDate ? this.endDate : now();
        return (end - this.startDate) / 1000;
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
    return new this(new Date(startDate), new Date(endDate), rate);
  }
}

export default EntryStore;
