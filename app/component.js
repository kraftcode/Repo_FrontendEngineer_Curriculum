import formateDate from './lib/dateFormatter';
import {asyncPersistAsJSON, asyncRetrieveAsJSON} from './resource_layer';
//import styles from './main.css'; //could be used to import local styles

export default function () {
  const element = document.createElement('h1');
  var currentDate = new Date();
  var formattedDate = formateDate(currentDate);

  element.innerHTML = String(formattedDate);

  asyncPersistAsJSON('myDateString', formattedDate);

  console.log('RETRIEVED FROM STORAGE: ' + asyncRetrieveAsJSON('myDateString'));

  return element;
}
