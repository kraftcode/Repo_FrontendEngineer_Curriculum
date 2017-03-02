import { observable, action, reaction, extendObservable, computed } from 'mobx';
import { STORAGE_KEY } from './lib/Constants';
import EntryStore from './EntryStore';

class Store {

  constructor(storage, _hourlyRate, EntryListComponent = []){
    this.hourlyRate = _hourlyRate;
    this.currentList = observable(EntryListComponent);
    this.addNewEntry = action(this.addNewEntry).bind(this);
    this.setEndForEntry = action(this.setEndForEntry).bind(this);
    this.removeEntry = action(this.removeEntry);
    this.setLoading = action(this.setLoading);
    this.setListFromStorage = action(this.setListFromStorage);
    this.storage = storage;

    this.active = null;

    extendObservable(this, {
      isLoading: true,
      getStateJSONForStorage: computed(function() {
        const result = this.currentList.map((item) => item.getStateJSONForStorage());
        return JSON.stringify(result);
      })
    });

    reaction(
      () => this.getStateJSONForStorage,
      (currentList) => {
        this.storage.asyncPersistAsJSON(STORAGE_KEY, currentList);
      }
    );
  }

  getCurrentList(){
    return this.currentList;
  }

  updateTimeOnCurrentEntry(time){
    this.currentList[this.currentIndex].duration = time;
  }

  addNewEntry(date = new Date()){
    let entry = new EntryStore(date, null, this.hourlyRate);
    this.active = entry;
    this.currentList.push(entry);
  }

  setEndForEntry(entryID = this.currentIndex, date = new Date()){
    if(this.active){
      this.active.endDate = date;
      this.active = null;
    } else {
      console.error('No timer is active');
      return null;
    }
  }

  removeEntry(index) {
    if(this.currentList[index]){
      return this.currentList.splice(index, 1);
    } else {
      console.error('ERROR Store.js: Attempted to delete from invalid index!');
      return null;
    }
  }

  setListFromStorage(storageList) {
    this.currentList.replace(storageList.map((item) => EntryStore.hydrate(item)));
  }

  setLoading(isLoading) {
    this.isLoading = isLoading;
  }
}

export default Store;
