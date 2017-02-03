import formateDate from './lib/dateFormatter';
import Storage from './resourceLayer';
//import styles from './main.css'; //could be used to import local styles

let store = new Storage();

export default function () {
  const myKeyString = 'oldDate';
  const h1 = document.createElement('h1');
  const h2 = document.createElement('h2');
  const headers = {};

  h2.innerHTML = 'Nothing yet...';
  store.asyncRetrieveAsJSON(myKeyString, function(value){
    h2.innerHTML = 'OLD VALUE FROM STORAGE IS: ' + value;
    //return value;
  });

  let currentDate = new Date();
  let formattedDate = formateDate(currentDate);

  h1.innerHTML = 'FRESHLY GENERATED VALUE IS: ' + formattedDate;

  store.asyncPersistAsJSON(myKeyString, formattedDate, function(value){
    return value;
  });

  headers.h1 = h1;
  headers.h2 = h2;

  return headers;
}
