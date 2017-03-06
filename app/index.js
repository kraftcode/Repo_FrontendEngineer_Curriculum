import { observer } from "mobx-react";
import ReactDOM from "react-dom";
import React from "react";
import { useStrict, autorun } from "mobx";
import "./main.css";
import Storage from "./Storage";
import Store from "./Store";
import AppComponent from "./components/AppComponent.jsx";
import { STORAGE_KEY, HOURLY_RATE } from "./lib/Constants";

// ==== SETUP
useStrict(true); //mobx - will not allow mutating the state outside of Actions

const storage = new Storage();
let store = new Store(storage, HOURLY_RATE);

let promiseErrorHandler = function(error) {
  console.log("Async storage error caught in index.js :" + error);
};

const storageJSONToState = jsonString => {
  let hydratedState = JSON.parse(jsonString);
  if (hydratedState) {
    store.setListFromStorage(hydratedState);
  }
  store.setLoading(false);
};

window.store = store; //to make the store accessible from the console in browser for debugging
// ===== Execute

storage
  .asyncRetrieveAsJSON(STORAGE_KEY)
  .then(storageJSONToState)
  .catch(promiseErrorHandler);

ReactDOM.render(<AppComponent store={store} />, document.getElementById("app"));
