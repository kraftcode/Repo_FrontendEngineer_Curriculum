import localForage from 'localforage';

/*
  Persists a key value pair asynchronously using localforage.
  On successful loading of the promise, returns the persisted value.
  On failure, returns the error loaded by the promise.
*/
export function asyncPersistAsJSON(key, value) {
  localForage.setItem(key, value)
  .then(function (value) {
    return value;
  }).catch(function (err) {
    console.log('ERROR: localForage.setItem in asyncPersistAsJSON promise returned: ' + err);
    return err;
  });
}


/*
  Retrieves the corresponding value to the key parameter from storage using an
  asynchronous call via localForage.
  On success, returns the value from storage.
  On failure, returns the error loaded by the promise.
*/
export function asyncRetrieveAsJSON(key) {
  localForage.getItem(key).then(function(value) {
    return value;
  }).catch(function(err) {
    console.log('ERROR: localForage.getItem in asyncRetrieveAsJSON promise returned: ' + err);
    return err;
  });
}
