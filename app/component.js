import formateDate from './lib/dateFormatter';
import Storage from './resourceLayer';
//import styles from './main.css'; //could be used to import local styles

let store = new Storage();

export default function () {
  const myKeyString = 'oldDate';
  // const h1 = document.createElement('h1');
  // const h2 = document.createElement('h2');
  const headers = {};

  headers.h2 = 'Nothing yet...';
  store.asyncRetrieveAsJSON(myKeyString, function(value){
    headers.h2 = 'OLD VALUE FROM STORAGE IS: ' + value;
  });

  let currentDate = new Date();
  let formattedDate = formateDate(currentDate);

  headers.h1 = 'FRESHLY GENERATED VALUE IS: ' + formattedDate;

  store.asyncPersistAsJSON(myKeyString, formattedDate, function(value){
    console.log('in asyncPersistAsJSON. Value is: ' + value);
    return value;
  });

  return headers;
}
