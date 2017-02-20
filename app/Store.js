import { action } from 'mobx';
import moment from 'moment';
import accounting from 'accounting';
import DateFormatter from './lib/dateFormatter';

class Store {

  constructor(_hourlyRate, entryList = []){
    this.hourlyRate = _hourlyRate;
    this.currentList = entryList;
    this.dateFormatter = new DateFormatter();
    this.addNewEntry = action(this.addNewEntry);
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
    let id = this.currentList.push(entry) - 1;
    this.currentList[id].id = id;
    return id;
  }

  setEndForEntry(entryID, date = new Date()){
    if(this.currentList[entryID]){
      let standardEndDate = moment(date);
      this.currentList[entryID].endDate = this.dateFormatter.formatDate(standardEndDate);
      this.currentList[entryID].endTime = this.dateFormatter.formatTime(standardEndDate);
      this.currentList[entryID].duration = Math.round(this.dateFormatter.diffDurationInHours(this.currentList[entryID].standardStartDate, standardEndDate));
      this.currentList[entryID].earnings = accounting.formatMoney((this.hourlyRate * this.currentList[entryID].duration), '€', 2, '.', ',');
    } else {
      console.error('Store.js setEndForEntry(): entryID does not exist! ');
      return null;
    }
  }

  removeEntry(index){
    if(this.currentList[index]){
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
    for(var entry in storageObj.list){
      key++;
      let stringEntry = JSON.stringify(storageObj.list[entry]);
      entryStrings[key] = stringEntry;
    }
    return JSON.stringify(entryStrings);
  }

}

export default Store;
