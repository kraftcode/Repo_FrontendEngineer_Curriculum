const moment = require('moment');
moment.locale('de');

export default function formateDate(date) {
  let withoutDay = moment(date).format('LLL');
  let justFullDay = moment(date).format('dddd');

  // leaving only first two letters of full Day:
  let abbrDay = justFullDay.substring(0, justFullDay.length - (justFullDay.length-2));
  
  return abbrDay.concat('. ' + withoutDay);
}
