import { useStrict, autorun } from 'mobx';
import snabbdom from 'snabbdom';
import './main.css';
import Storage from './Storage';
import Store from './Store';
import AppComponent from './components/AppComponent.jsx';

useStrict(true); //mobx - will not allow mutating the state outside of Actions

const patch = snabbdom.init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/props').default,
  require('snabbdom/modules/style').default,
  require('snabbdom/modules/eventlisteners').default,
]);

const persistKey = 'TodoListAppPersistKey';
const storage = new Storage();
const store = new Store(12);
let tree = document.getElementById('app');

store.addNewEntry(new Date('2015-03-04 15:05:06'));
store.setEndForEntry(store.currentIndex);

const render = function(tree){
  let currentApp = AppComponent(store);
  return patch(
    tree,
    currentApp
  );
};

const storageJSONToState = (jsonString) => {
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

autorun(()=>{
  tree = render(tree);
});

let promiseErrorHandler = function (error){
  console.log('Async storage error caught in index.js :' + error);
};

// storage.asyncPersistAsJSON(persistKey, store.getStateJSONForStorage());

storage.asyncRetrieveAsJSON(persistKey)
.then(storageJSONToState)
.then(render)
.catch(promiseErrorHandler);
