import moment from 'moment';

moment.locale('de');


export function formatDay(date) {
  return moment(date).format('dd.');
}

export function formatDate(date){
  return moment(date).format('D. MMMM YYYY');
}

export function formatFlorianDate(date) {
  let withoutDay = moment(date).format('LLL');
  let justFullDay = moment(date).format('dddd');

  // leaving only first two letters of full Day:
  let abbrDay = justFullDay.substring(0, justFullDay.length - (justFullDay.length - 2));

  return abbrDay.concat('. ' + withoutDay);
}

export function formatTime(date) {
  return moment(date).format('LT');
}

export function formatDuration(seconds) {
  let format = (seconds < 60 * 60) ? 'mm:ss' : 'HH:mm:ss';

  return moment().startOf('day').seconds(seconds).format(format);
}
export function diffDuration(startDate, endDate) {
  let duration = moment.duration(endDate.diff(startDate));
  let result = '';
  if (duration._data.days > 0) {
    result += duration._data.days + ':';
  }
  if (duration._data.hours < 10) {
    result += '0';
  }
  result += duration._data.hours + ':';
  if (duration._data.minutes < 10) {
    result += '0';
  }
  result += duration._data.minutes + ':';
  if (duration._data.seconds < 10) {
    result += '0';
  }
  return result += duration._data.seconds;
}

export function diffDurationInHours(startDate, endDate) {
  let duration = moment.duration(endDate.diff(startDate));
  let hours = duration.asHours();
  return hours;
}
