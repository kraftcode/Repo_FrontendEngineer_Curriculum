import moment from 'moment';

class DateFormatter {

  constructor(localeString = 'de'){
    moment.locale(localeString);
  }

  formatDate(date){
    return moment(date).format('D. MMMM YYYY');
  }

  formatFlorianDate(date) {
    let withoutDay = moment(date).format('LLL');
    let justFullDay = moment(date).format('dddd');

    // leaving only first two letters of full Day:
    let abbrDay = justFullDay.substring(0, justFullDay.length - (justFullDay.length-2));

    return abbrDay.concat('. ' + withoutDay);
  }

  formatTime(date) {
    return moment(date).format('LT');
  }

  diffDuration(startDate, endDate){
    let duration = moment.duration(endDate.diff(startDate));
    let result = '';
    if(duration._data.days > 0){
      result += duration._data.days + ':';
    }
    if(duration._data.hours < 10){
      result += '0';
    }
    result += duration._data.hours + ':';
    if(duration._data.minutes < 10){
      result += '0';
    }
    result += duration._data.minutes + ':';
    if(duration._data.seconds < 10){
      result += '0';
    }
    return result += duration._data.seconds;
  }

  diffDurationInHours(startDate, endDate){
    let duration = moment.duration(endDate.diff(startDate));
    let hours = duration.asHours();
    return hours;
  }

}

export default DateFormatter;
