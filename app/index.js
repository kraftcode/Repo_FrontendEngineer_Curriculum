import snabbdom from 'snabbdom';
import './main.css';
import Storage from './storage';
import Store from './Store';

const patch = snabbdom.init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/props').default,
  require('snabbdom/modules/style').default,
  require('snabbdom/modules/eventlisteners').default,
]);

const storage = new Storage();
const persistStore = 'oldStoreEntryList';

let errorHandler = function (error){
  console.log('Async error caught in index.js :' + error);
};

let renderEntryList = function(store, vnode = document.getElementById('entry-list')){
  store.setEndForEntry(second);
  return patch(vnode, store.getRenderEntryList());
};

let storageJSONToState = function(jsonString) {
  let temp = {};
  temp = JSON.parse(jsonString);
  let result = {};
  for(let entry in temp){
    let listEntry = JSON.parse(temp[entry]);
    result[listEntry.startDate + listEntry.startTime] = listEntry;
  }
  let hourlyRate = result[Object.keys(result)[0]];
  delete result[Object.keys(result)[0]];
  return new Store(hourlyRate, result);
};

let store = new Store(12);
let first = store.addNewEntry(new Date('2015-03-04 15:05:06'));
let second = store.addNewEntry(new Date('2016-07-08 15:05:06'));
store.setEndForEntry(first);

storage.asyncRetrieveAsJSON(persistStore)
.then(storageJSONToState)
.then(renderEntryList)
.catch(errorHandler);
