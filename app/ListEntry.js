import moment from 'moment';
import accounting from 'accounting';
import dateFormatter from './lib/dateFormatter';

class ListEntry {
  constructor(_myStore){
    this.myStore = _myStore;
    this.dateFormatter = new dateFormatter();
    this.hourlyRate = this.myStore.hourlyRate;
    this.getPropsObj = this.getPropsObj; //shitty syntax to make function a member variable of the object instance
  }

  start(date = new Date()){
    this.standardStartDate = moment(date);
    this.startDay = moment(date).format('dd.');
    this.startDate = this.dateFormatter.formatDate(this.standardStartDate);
    this.startTime = this.dateFormatter.formatTime(this.standardStartDate);
    this.id = this.startDate + this.startTime;
  }

  end(date = new Date()){
    this.standardEndDate = moment(date);
    this.endDate = this.dateFormatter.formatDate(this.standardEndDate);
    this.endTime = this.dateFormatter.formatTime(this.standardEndDate);
    this.duration = this.dateFormatter.diffDurationInHours(this.standardStartDate, this.standardEndDate);
    this.earnings = accounting.formatMoney((this.hourlyRate * this.duration), '€', 2, '.', ',');
  }

  getPropsObj() {
    return this.propObj = {
      hourlyRate : this.hourlyRate,
      startDay : this.startDay,
      startDate : this.startDate,
      earnings : this.earnings,
      startTime : this.startTime,
      endTime : this.endTime,
      duration : this.duration,
    };
  }

  getId(){
    return this.id;
  }

  getEndDate(){
    return this.endDate;
  }
}

export default ListEntry;
