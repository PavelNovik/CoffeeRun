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
    return $.post(this.serverUrl, val, function (serverResponse) {
      console.log(serverResponse);

      // console.log(`The object - ${val} - was created.`);
    });
  };

  RemoteDataStore.prototype.getAll = function (cb) {
    return $.get(this.serverUrl, function (serverResponse) {
      serverResponse.forEach((element) => {
        // console.log(element);
      });
      if (cb) {
        console.log(serverResponse);
        cb(serverResponse);
      }
    });
  };

  RemoteDataStore.prototype.get = function (key, cb) {
    return $.get(
      this.serverUrl + '?emailAddress=' + key,
      function (serverResponse) {
        console.log(serverResponse[0]);
        if (cb) {
          console.log(serverResponse);
          cb(serverResponse);
        }
      }
    );
  };

  RemoteDataStore.prototype.remove = function (key) {
    const serverUrlLocal = this.serverUrl;
    return $.get(serverUrlLocal + '?emailAddress=' + key, function (resp) {
      $.ajax(serverUrlLocal + '/' + resp[0].id, {
        type: 'DELETE',
      });
    });

    console.log(`The order id = ${key} is deleted.`);
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
