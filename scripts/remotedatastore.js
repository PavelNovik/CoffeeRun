'use strict';
(function (window) {
  const App = window.App || {};
  const $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
    }

    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function (key, val) {
    // fetch(this.serverUrl, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(val),
    // })
    //   .then((resp) => {
    //     console.log(resp);
    //   })
    //   .catch((err) => console.error('Error', err));

    $.post(this.serverUrl, val, function (serverResponse) {
      console.log(serverResponse);

      // console.log(`The object - ${val} - was created.`);
    });
    return false;
  };

  RemoteDataStore.prototype.getAll = function (cb) {
    $.get(this.serverUrl, function (serverResponse) {
      // console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.get = function (key, cb) {
    $.get(this.serverUrl + '/' + key, function (serverResponse) {
      // console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.remove = function (key) {
    $.ajax(this.serverUrl + '/' + key, {
      type: 'DELETE',
    });
    // console.log(`The order id = ${key} is deleted.`);
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
