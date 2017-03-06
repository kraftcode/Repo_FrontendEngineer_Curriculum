import { observable, action, reaction, extendObservable, computed } from "mobx";
import { Component } from "react";
import { observer } from "mobx-react";
import { STORAGE_KEY } from "./lib/Constants";
import EntryStore from "./EntryStore";

class Store extends Component {
  constructor(storage, _hourlyRate, EntryListComponent = []) {
    super();
    this.hourlyRate = _hourlyRate;
    this.currentList = observable(EntryListComponent);
    this.addNewEntry = action(this.addNewEntry).bind(this);
    this.setEndForEntry = action(this.setEndForEntry).bind(this);
    this.removeEntry = action(this.removeEntry);
    this.setLoading = action(this.setLoading);
    this.setListFromStorage = action(this.setListFromStorage);
    this.storage = storage;

    extendObservable(this, {
      active: null,
      isLoading: true,
      getStateJSONForStorage: computed(function() {
        const result = this.currentList.map(
          item => item.getStateJSONForStorage()
        );
        return JSON.stringify(result);
      })
    });

    reaction(() => this.getStateJSONForStorage, currentList => {
      this.storage.asyncPersistAsJSON(STORAGE_KEY, currentList);
    });
  }

  getCurrentList() {
    return this.currentList;
  }

  setActive(isActive) {
    this.isActive = isActive;
  }

  setListFromStorage(storageList) {
    this.currentList.replace(storageList.map(item => EntryStore.hydrate(item)));
  }

  setLoading(isLoading) {
    this.isLoading = isLoading;
  }

  setEndForEntry(activeEntry = this.active, date = new Date()) {
    if (activeEntry) {
      activeEntry.endDate = date;
      activeEntry = null;
      return this.currentList.length - 1;
    } else {
      console.error("No timer is active");
      return null;
    }
  }

  addNewEntry(date = new Date()) {
    let entry = new EntryStore(date, null, this.hourlyRate);
    this.active = entry;
    this.currentList.push(entry);
    return this.currentList.length - 1;
  }

  removeEntry(index) {
    if (this.currentList[index]) {
      return this.currentList.splice(index, 1);
    } else {
      console.error("ERROR Store.js: Attempted to delete from invalid index!");
      return null;
    }
  }

  updateTimeOnCurrentEntry(index, time) {
    this.currentList[index].duration = time;
  }
}

export default Store;
