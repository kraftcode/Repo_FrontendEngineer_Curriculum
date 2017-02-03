let store = {};

export default {
  _driver: 'localForageDriverMock',
  _initStorage: function() {
    store = {};
    return Promise.resolve();
  },
  _support: true,
  clear: function() {
    store = {};
    return Promise.resolve(true);
  },
  iterate: function() {
    
  },
  getItem: function(key) {
    if (store[key]) {
      return Promise.resolve(store[key]);
    } else {
      return Promise.resolve(null);
    }
  },
  key: function(n) {
    let keys = Object.keys(store);
    let key = keys[n] || null;
    return Promise.resolve(key);
  },
  keys: function() {
    return Promise.resolve(Object.keys(store));
  },
  length: function() {
    return Promise.resolve(Object.keys(store).length);
  },
  removeItem: function(key) {
    if (store[key]) {
      return Promise.resolve(delete store[key]);
    } else {
      return Promise.resolve(null);
    }
  },
  setItem: function(key, value) {
    store[key] = value;

    return Promise.resolve(value);
  },
};
