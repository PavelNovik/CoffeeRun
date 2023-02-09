'use strict';
(function (window) {
  // console.log('Running datastore.js');
  const App = window.App || {};
  const Promise = window.Promise;

  function DataStore() {
    // console.log('running the DataStore function');
    this.data = {};
  }

  function promiseResolveedWith(value) {
    const promise = new Promise(function (resolve, reject) {
      resolve(value);
    });
    return promise;
  }

  DataStore.prototype.add = function (key, val) {
    this.data[key] = val;
    // const promise = new Promise(
    //   function (resolve, reject) {
    //     this.data[key] = val;
    //     resolve(null);
    //   }.bind(this)
    // );
    // return promise;
    return promiseResolveedWith(null);
  };

  DataStore.prototype.get = function (key) {
    // return this.data[key];
    return promiseResolveedWith(this.data[key]);
  };
  DataStore.prototype.getAll = function () {
    // return this.data;
    return promiseResolveedWith(this.data);
  };

  DataStore.prototype.remove = function (key) {
    delete this.data[key];
    return promiseResolveedWith(null);
  };

  App.DataStore = DataStore;
  window.App = App;
})(window);
