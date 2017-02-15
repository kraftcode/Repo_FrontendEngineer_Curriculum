import moment from 'moment';
import accounting from 'accounting';
import DateFormatter from './lib/dateFormatter';
import Entry from './components/Entry.jsx';
import EntryList from './components/EntryList.jsx';

class Store {

  constructor(_hourlyRate, entryList = {}){
    this.hourlyRate = _hourlyRate;
    this.currentList = entryList;
    this.dateFormatter = new DateFormatter();
  }

  addNewEntry(date = new Date()){
    let _standardStartDate = date;
    let entry = {
      standardStartDate : _standardStartDate,
      startDay : moment(date).format('dd.'),
      startDate : this.dateFormatter.formatDate(_standardStartDate),
      startTime : this.dateFormatter.formatTime(_standardStartDate),
    };
    let id = entry.startDate + entry.startTime;
    if(this.currentList[id]){
      console.error('Store.js addNewEntry(): entryID already exists! ');
    }else {
      this.currentList[id] = entry;
      return id;
    }
  }

  setEndForEntry(entryID, date = new Date()){
    if(this.currentList[entryID]){
      let entry = this.currentList[entryID];
      let standardEndDate = moment(date);
      entry.endDate = this.dateFormatter.formatDate(standardEndDate);
      entry.endTime = this.dateFormatter.formatTime(standardEndDate);
      entry.duration = this.dateFormatter.diffDurationInHours(entry.standardStartDate, standardEndDate);
      entry.earnings = accounting.formatMoney((this.hourlyRate * entry.duration), '€', 2, '.', ',');
    } else {
      console.error('Store.js setEndForEntry(): entryID does not exist! ');
      return null;
    }
  }

  removeEntry(entryID){
    delete this.currentList[entryID];
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

  getRenderEntryList(){
    let entries = [];
    for(var entry in this.currentList){
      let props = this.currentList[entry];
      if(props.endDate){
        entries.push(<Entry className={props.startDayClass} startDay={props.startDay} startDate={props.startDate} earnings={props.earnings} startTime={props.startTime} endTime={props.endTime} duration={props.duration} />);
      }else{
        entries.push(<Entry className={props.startDayClass} startDay={props.startDay} startDate={props.startDate} earnings={''} startTime={props.startTime} endTime={''} duration={''} />);
      }
    }
    return <EntryList list={entries} />;
  }
}

export default Store;
