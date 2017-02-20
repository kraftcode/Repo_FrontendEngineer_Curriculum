import { useStrict, autorun } from 'mobx';
import snabbdom from 'snabbdom';
import './main.css';
import Storage from './storage';
import Store from './Store';
import EntryList from './components/EntryList.jsx';
import Button from './components/Button.jsx';

useStrict(true); //mobx

const patch = snabbdom.init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/props').default,
  require('snabbdom/modules/style').default,
  require('snabbdom/modules/eventlisteners').default,
]);

const storage = new Storage();
const persistKey = 'oldStoreEntryList';

let errorHandler = function (error){
  console.log('Async error caught in index.js :' + error);
};

let renderEntryList = function(store, vnode = document.getElementById('entry-list')){
  let entryList = <EntryList currentList={store.getCurrentList()} />;
  return patch(
    vnode,
    entryList
  );
};

let storageJSONToState = function(jsonString) {
  let temp = {};
  temp = JSON.parse(jsonString);
  let result = [];
  for(let entry in temp){
    let listEntry = JSON.parse(temp[entry]);
    result.push(listEntry);
  }
  let hourlyRate = temp[0];
  result.shift();
  return new Store(hourlyRate, result);
};


let p = {};
p.message = 'Moin!';
p.className = 'button__red__inactive';
let redButton = Button(p);
let buttonNode = document.getElementById('button');
buttonNode = patch(buttonNode, redButton);
p.className = 'button__blue__inactive';
let blueButon = Button(p);
buttonNode = patch(buttonNode, blueButon);

let store = new Store(12);
let first = store.addNewEntry(new Date('2015-03-04 15:05:06'));
let second = store.addNewEntry(new Date('2016-07-08 15:05:06'));
store.setEndForEntry(first);

renderEntryList(store);

// storage.asyncRetrieveAsJSON(persistKey)
// .then(storageJSONToState)
// .then(renderEntryList)
// .catch(errorHandler);
