import localForage from 'localforage';

class Storage {

  constructor (storageService = localForage.createInstance()){ //Default is localForage if no parameter is passed in
    this.storageService = storageService;
  }

  /*
    Persists a key value pair asynchronously using localforage.
    Returns a Promise for the persist operation to the caller.
  */
  asyncPersistAsJSON(key, value) {
    return this.storageService.setItem(key, value);
  }


  /*
    Asynchronously retrieves the corresponding value to the key parameter from storage
    using localforage.
    Returns a Promise for the retrieve operation to the caller.
  */
  asyncRetrieveAsJSON(key) {
    return this.storageService.getItem(key);
  }
}

export default Storage;
