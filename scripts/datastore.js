'use strict';
(function (window) {
  // console.log('Running datastore.js');
  const App = window.App || {};
  const Promise = window.Promise;

  function DataStore() {
    // console.log('running the DataStore function');
    this.data = {};
  }

  DataStore.prototype.add = function (key, val) {
    // this.data[key] = val;
    const promise = new Promise(
      function (resolve, reject) {
        this.data[key] = val;
        resolve(null);
      }.bind(this)
    );
    return promise;
  };

  DataStore.prototype.get = function (key) {
    return this.data[key];
  };
  DataStore.prototype.getAll = function () {
    return this.data;
  };

  DataStore.prototype.remove = function (key) {
    delete this.data[key];
  };

  App.DataStore = DataStore;
  window.App = App;
})(window);
