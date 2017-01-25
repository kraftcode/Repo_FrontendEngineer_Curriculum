import formateDate from './lib/dateFormatter';

export default function () {

  const element = document.createElement('h1');

  var currentDate = new Date();

  var formattedDate = formateDate(currentDate);

  element.innerHTML = String(formattedDate);

  return element;        
}
