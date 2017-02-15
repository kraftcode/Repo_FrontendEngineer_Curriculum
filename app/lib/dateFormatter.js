import moment from 'moment';

class dateFormatter {

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

  diffDurationInHours(startDate, endDate){
    var duration = moment.duration(endDate.diff(startDate));
    var hours = duration.asHours();
    return hours;
  }

}

export default dateFormatter;
