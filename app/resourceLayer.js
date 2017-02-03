import localForage from 'localforage';

class Storage {

  constructor (storageService = localForage.createInstance()){
    this.storageService = storageService;
  }

  /*
    Persists a key value pair asynchronously using localforage.
    On successful loading of the promise, returns the persisted value.
    On failure, returns the error loaded by the promise.
  */
  asyncPersistAsJSON(key, value, handlerFunc) {
    return this.storageService.setItem(key, value)
    .then(handlerFunc)
    .catch(function (err) {
      console.log('ERROR: localForage.setItem in asyncPersistAsJSON promise returned: ' + err);
      handlerFunc(err);
    });
  }


  /*
    Retrieves the corresponding value to the key parameter from storage using an
    asynchronous call via localForage.
    On success, returns the value from storage.
    On failure, returns the error loaded by the promise.
  */
  asyncRetrieveAsJSON(key, handlerFunc) {
    return this.storageService.getItem(key).then(handlerFunc).catch(function(err) {
      console.log('ERROR: localForage.getItem in asyncRetrieveAsJSON promise returned: ' + err);
      handlerFunc(err);
    });
  }
}

export default Storage;
