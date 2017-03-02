import { useStrict, autorun } from 'mobx';
import snabbdom from 'snabbdom';
import './main.css';
import { STORAGE_KEY, HOURLY_RATE } from './lib/Constants';
import Storage from './Storage';
import Store from './Store';
import AppComponent from './components/AppComponent.jsx';

// ==== SETUP
useStrict(true); //mobx - will not allow mutating the state outside of Actions

let store;

const patch = snabbdom.init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/props').default,
  require('snabbdom/modules/style').default,
  require('snabbdom/modules/eventlisteners').default,
]);

const render = function (tree, store) {
  let currentApp = <AppComponent store={store} />;
  return patch(
    tree,
    currentApp
  );
};


let promiseErrorHandler = function (error) {
  console.log('Async storage error caught in index.js :' + error);
};

// ===== Execute

const storage = new Storage();
store = new Store(storage, HOURLY_RATE);

let tree = document.getElementById('app');

autorun(() => {
  tree = render(tree, store);
});

const storageJSONToState = (jsonString) => {
  let hydratedState = JSON.parse(jsonString);

  if (hydratedState) {
    store.setListFromStorage(hydratedState);
  }

  store.setLoading(false);
};

storage
  .asyncRetrieveAsJSON(STORAGE_KEY)
  .then(storageJSONToState)
  .catch(promiseErrorHandler);


