import { useStrict, observable, action } from 'mobx';
import moment from 'moment';
import accounting from 'accounting';
import DateFormatter from './lib/DateFormatter';

useStrict(true); //mobx - will not allow mutating the state outside of Actions

class Store {

  constructor(_hourlyRate, EntryListComponent = []){
    this.hourlyRate = _hourlyRate;
    this.currentList = observable(EntryListComponent);
    this.dateFormatter = new DateFormatter();
    this.addNewEntry = action(this.addNewEntry);
    this.setEndForEntry = action(this.setEndForEntry);
    this.removeEntry = action(this.removeEntry);
    this.currentIndex = this.currentList.length - 1;
    this.button = observable({});
    if(this.currentList[this.currentIndex] && this.currentList[this.currentIndex].endTime){
      this.setButtonInactive();
    } else {
      this.setButtonActive();
    }
  }

  getCurrentList(){
    return this.currentList;
  }

  addNewEntry(date = new Date()){
    let _standardStartDate = date;
    let entry = {
      standardStartDate : _standardStartDate,
      startDay : moment(date).format('dd.'),
      startDate : this.dateFormatter.formatDate(_standardStartDate),
      startTime : this.dateFormatter.formatTime(_standardStartDate),
      endDate : '',
      endTime : '',
      duration : '',
      earnings : ''
    };
    this.currentIndex++;
    this.setButtonActive();
    let id = this.currentList.push(entry) - 1;
    this.currentList[id].id = id;
    return id;
  }

  setEndForEntry(entryID = this.currentIndex, date = new Date()){
    if(this.currentList[entryID]){
      let standardEndDate = moment(date);
      this.currentList[entryID].endDate = this.dateFormatter.formatDate(standardEndDate);
      this.currentList[entryID].endTime = this.dateFormatter.formatTime(standardEndDate);
      this.currentList[entryID].duration = this.dateFormatter.diffDuration(this.currentList[entryID].standardStartDate, standardEndDate);
      this.currentList[entryID].hoursWorked = this.dateFormatter.diffDurationInHours(this.currentList[entryID].standardStartDate, standardEndDate);
      this.currentList[entryID].earnings = accounting.formatMoney((this.hourlyRate * this.currentList[entryID].hoursWorked), '€', 2, '.', ',');
      this.setButtonInactive();
    } else {
      console.error('Store.js setEndForEntry(): entryID does not exist! ');
      return null;
    }
  }

  removeEntry(index){
    if(this.currentList[index]){
      this.currentIndex--;
      return this.currentList.splice(index, 1);
    } else {
      console.error('ERROR Store.js: Attempted to delete from invalid index!');
      return null;
    }
  }

  getStateJSONForStorage(){
    let storageObj = {
      hourlyRate : this.hourlyRate,
      list: this.currentList,
    };
    let key = 0;
    let entryStrings = {};
    entryStrings[key]= storageObj.hourlyRate;
    storageObj.list.map(function(element){
      key++;
      let stringEntry = JSON.stringify(element);
      entryStrings[key] = stringEntry;
    });
    return JSON.stringify(entryStrings);
  }

  setButtonActive(){
    this.button.disabled = false;
    this.button.className = 'button__red__active';
    this.button.text = 'Clock Out Now';
  }

  setButtonInactive(){
    this.button.disabled = true;
    this.button.className = 'button__blue__inactive';
    this.button.text = 'Clock In Now';
  }

}

export default Store;
