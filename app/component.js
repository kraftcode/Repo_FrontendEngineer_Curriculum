import formateDate from './lib/dateFormatter';
import styles from './main.css';

export default function () {
  const element = document.createElement('h1');
  var currentDate = new Date();

  var formattedDate = formateDate(currentDate);

  element.innerHTML = String(formattedDate);

  return element;
}
